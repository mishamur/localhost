<?php

class DB {
    function __construct(){
        $host = 'localhost';
        $user = 'root';
        $password = '';
        $db = 'myDB';

        $this->conn = new mysqli($host, $user, $password, $db);
       
        if($this->conn->connect_errno) {
            printf("failed succefully: ", $this->conn->connect_error);
            die("failed succefully: ". $this->conn->connect_error);
        }
    }

    function __destruct(){
        $this->conn->close();
        
    }


    public function setUserByLoginPassword($login, $password) {
        $query = "INSERT INTO users (login, password) 
                  VALUES ('" . $login . "', '" . $password . "')";
        $this->conn->query($query);
        return true;
    }

    public function getUserByLogin($login) {
        $query = 'SELECT * FROM users WHERE login="' . $login . '"';
        $result = $this->conn->query($query);
        return $result->fetch_object();
    }

    public function getUserByLoginPassword($login, $password) {
        $query = 'SELECT * 
                  FROM users 
                  WHERE login="' . $login . '" AND password="'.$password.'"';
        $result = $this->conn->query($query);
        return $result->fetch_object();
    }

    public function updateToken($id, $token) {
        $query = 'UPDATE users SET token="'.$token.'" WHERE id='.$id;
        $this->conn->query($query);
        return true;
    }

    public function updateScore($id, $score) {
        $query = 'UPDATE users SET bestScore="'.$score.'" WHERE id='.$id;
        $this->conn->query($query);
        return true;
    }

    public function getUserByToken($token) {
        $query = 'SELECT * FROM users WHERE token="'.$token.'"';
        $result = $this->conn->query($query);
        return $result->fetch_object();
    }
}


?>