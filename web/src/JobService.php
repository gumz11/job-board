<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;    

class JobService {
    
    const GITHUB_JOB_URL = 'https://jobs.github.com';
    const GOOGLE_GEO_URL = 'https://maps.googleapis.com';

    private $database;
    private $response;
    
    public function __invoke(Request $request, Response $response, array $args) {
        $this->response = $response;

        try {
            $this->dbConnect();
            $this->getJobs();
        } catch (PDOException $e) {
            $this->setResponse(false, $e->getMessage());
        }

        return $this->response;
    }
    
    private function dbConnect() {
        $config = parse_url(getenv('DATABASE_URL'));
        $connectionString = "pgsql:host=" . $config['host'];

        if (isset($config['port'])) $connectionString .= ";port=" . $config['port'];
        if (isset($config['user'])) $connectionString .= ";user=" . $config['user'];
        if (isset($config['pass'])) $connectionString .= ";password=" . $config['pass'];
        if (isset($config['path'])) $connectionString .= ";dbname=" . ltrim($config["path"], "/");

        $this->database = new PDO($connectionString);
        $this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    private function setResponse($result, $values) {
        if ($result) {
            $this->response = $this->response->withJson($values);
        } else {
            $this->response = $this->response->withJson([
                'error' => '1',
                'message' => $values
            ], 500);
        }
    }
    
    // GET /jobs/
    private function getJobs() {
        $request = new RestClient([
            'base_url' => $this::GITHUB_JOB_URL
        ]);

        $result = $request->get('positions.json', ['search' => $_GET['search'], 'page' => $_GET['page']]);

        if ($result->error !== '') {
            return $this->setResponse(false, $result->error);
        }

        $jobs = json_decode($result->response);

        foreach ($jobs as $job) {
            if (!$this->appendLocationFromDb($job)) {
                $this->appendLocationFromGoogleGeocoding($job);
            }
        }

        return $this->setResponse(true, $jobs);
    }

    private function appendLocationFromDb($job) {
        $prepare = $this->database->prepare('select * from geolocation where location = ?');
        $result  = $prepare->execute(array(
            $job->location
        ));
    
        $row = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $job->lat = $row['latitude'];
            $job->lng = $row['longitude'];
            return true;
        }
    }

    private function appendLocationFromGoogleGeocoding($job) {
        $request = new RestClient([
            'base_url' => $this::GOOGLE_GEO_URL
        ]);
            
        $result = $request->get('maps/api/geocode/json', ['address' => $job->location, 'key' => getenv('GOOGLE_KEY')]);
        
        if ($result->error !== '') {
            return;
        }

        $location = json_decode($result->response)->results[0]->geometry->location;
        $job->lat = $location->lat;
        $job->lng = $location->lng;
        $this->insertLocationToDb($location, $job->location);
    }

    private function insertLocationToDb($geo, $location) {
        $prepare = $this->database->prepare('insert into geolocation (location, latitude, longitude) values (?, ?, ?)');
        $result  = $prepare->execute(array(
            $location,
            $geo->lat,
            $geo->lng
        ));
    }
}

?>