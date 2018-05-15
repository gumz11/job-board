<?php
require_once 'ApiRequest.php';
require_once 'config.php';

new JobService();

class JobService {
    
    const GITHUB_JOB_URL = 'https://jobs.github.com/positions.json';
    const GOOGLE_GEO_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

    private $database;

    public function __construct() {
        $this->dbConnect();
        $this->requestHandle();
    }
    
    private function dbConnect() {
        try {
            global $config;
            $this->database = new PDO("mysql:host=" . $config['db-host'] . ";dbname=" . $config['db-name'], $config['db-user'], $config['db-pass']);
            $this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        
        catch (PDOException $e) {
            $this->response(0, "Unable to open database: " . $e->getMessage());
            exit();
        }
    }
    
    private function requestHandle() {
        $request  = $_SERVER['REQUEST_URI'];
        $method   = $_SERVER['REQUEST_METHOD'];
        $request  = explode("/", $request);
        $resource = $request[count($request)-1];
        if (strpos($resource, 'jobs') !== false ) {
            switch ($method) {
                case 'GET':
                    $this->getJobs();
                    break;
                default:
                    header('HTTP/1.1 405 Method Not Allowed');
                    $this->response(0, 'Method not allowed.');
                    break;
            }    
        } else {
            $this->response(0, 'Resource not found.');
        }
    }
    
    private function response($result, $values = null) {
        $json;
        if ($result) {
            $json = $values;
        } else {
            header('HTTP/1.1 404');
            $json = array(
                'error' => '1',
                'message' => $values
            );
        }
        
        print json_encode($json);
    }
    
    // GET /jobs/
    private function getJobs() {
        $get = isset($_GET['search']) ? urlencode($_GET['search']) : '';
        $page = isset($_GET['page']) ? urlencode($_GET['page']) : 0;
        
        $request = new ApiRequest('GET', 
            $this::GITHUB_JOB_URL . 
            '?search=' . $get . 
            '&page=' . $page);

        $jobs = $request->request();

        if (!isset($jobs->error)) {
            foreach ($jobs as $job) {
                try {
                    $this->appendLocationFromDb($job);
                    if (!isset($job->lat)) {
                        $this->appendLocationFromGoogleGeocoding($job);
                    }
                }
                catch (PDOException $e) {
                    return $this->response(0, $e);
                }
            }

            return $this->response(1, $jobs);
        }
        
        return $this->response(0, $jobs->message);
    }

    private function appendLocationFromDb($job) {
        if ($this->database) {
            $prepare = $this->database->prepare('select * from geolocation where location = ?');
            $result  = $prepare->execute(array(
                $job->location
            ));
        
            $row = $prepare->fetch(PDO::FETCH_ASSOC);

            $job->lat = $row['latitude'];
            $job->lng = $row['longitude'];   
        }
    }

    private function appendLocationFromGoogleGeocoding($job) {
        global $config;
        $request = new ApiRequest('GET', 
            $this::GOOGLE_GEO_URL . 
            '?address=' . urlencode($job->location) . 
            '&key=' . $config['google-key']);
            
        $location = $request->request();

        if (!isset($location->error) && isset($location->results[0]->geometry->location)) {
            $location = $location->results[0]->geometry->location;

            $job->lat = $location->lat;
            $job->lng = $location->lng;
            $this->insertLocationToDb($location, $job->location);
        }
    }

    private function insertLocationToDb($geo, $location) {
        if ($this->database) {
            $prepare = $this->database->prepare('insert into geolocation (location, latitude, longitude) values (?, ?, ?)');
            $result  = $prepare->execute(array(
                $location,
                $geo->lat,
                $geo->lng
            ));
        }
    }
}

?>