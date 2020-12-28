<?php

class User {

    function __construct($db) {
        $this->db = $db;
    }

    public function login($login, $password) {
        $user = $this->db->getUserByLoginPassword($login, $password);
        if ($user) {
            $token = md5(rand() * 100000);
            $this->db->updateToken($user->id, $token);
            return array('token' => $token);
        }
        return false;
    }

    public function getName($token) {
        $user = $this->db->getUserByToken($token);
        if($user) {
            return $user->login;
        }
        return false;
    }

    public function getBestScore($token) {
        $user = $this->db->getUserByToken($token);
        if($user) {
            return $user->bestScore;
        }
        return false;
    }

    public function setBestScore($token, $score) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateScore($user->id, $score);
            return $user->bestScore;
        }
        return false;
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return false;
    }

    public function registration($login, $password) {
        
        $user = $this->db->getUserByLogin($login);
        if (!$user) {
            return $this->db->setUserByLoginPassword($login, $password);
        }
        return false;
    }

}



?>