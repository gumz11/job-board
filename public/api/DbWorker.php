<?php

require_once 'config.php';

new DbWorker();

class DbWorker {

    private $database;

    public function __construct() {
        $this->dbConnect();
        $this->work();
    }
    
    private function dbConnect() {
        try {
            global $config;
            $this->database = new PDO("mysql:host=" . $config['db-host'] . ";dbname=" . $config['db-name'], $config['db-user'], $config['db-pass']);
            $this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e) {
            print "Unable to open database: " . $e->getMessage();
            exit();
        }
    }

    private function work() {
        if ($this->database) {
            try {
                $count = $this->database->exec('delete from geolocation where created_at < (current_timestamp() - interval 1 month)');
                print $count;
            }
            catch (PDOException $e) {
                print $e->getMessage();
            }
        }
    }
    
}


?>