<?php

$worker = new DbWorker();
$worker->work();

class DbWorker {

    private $database;

    public function __construct() {
        $this->connect();
    }

    public function work() {
        $this->clean();
    }
    
    private function connect() {
        try {
            $config = parse_url(getenv('DATABASE_URL'));
            $connectionString = "pgsql:host=" . $config['host'];

            if (isset($config['port'])) $connectionString .= ";port=" . $config['port'];
            if (isset($config['user'])) $connectionString .= ";user=" . $config['user'];
            if (isset($config['pass'])) $connectionString .= ";password=" . $config['pass'];
            if (isset($config['path'])) $connectionString .= ";dbname=" . ltrim($config["path"], "/");

            $this->database = new PDO($connectionString);
            $this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e) {
            print "Unable to open database: " . $e->getMessage();
            exit();
        }
    }

    private function clean() {
        if ($this->database) {
            try {
                $count = $this->database->exec("delete from geolocation where created_at < CURRENT_TIMESTAMP - INTERVAL '1 months'");
                print $count;
            }
            catch (PDOException $e) {
                print $e->getMessage();
            }
        }
    }
    
}


?>