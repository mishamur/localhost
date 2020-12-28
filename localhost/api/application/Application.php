<?php

require_once('db/DB.php');
require_once('user/User.php');

class Application {
    function __construct(){
        $db = new DB();
        $this->user = new User($db);
       

  

    }
    //User // User // User
    public function login($params) {
        if($params['login'] && $params['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
        return false;
    }

    public function logout($params) {
        if ($params['token']) {
            return $this->user->logout($params['token']);
        }
        return false;
    }

    public function registration($params) {
       
        if ($params['login'] && $params['password']) {
            return $this->user->registration($params['login'], $params['password']);
        }
       
        return false;
    }

    public function getName($params) {
        if($params['token']){
              
            return $this->user->getName($params['token']); 
        }
        return false;
    }

    public function getBestScore($params) {
        if($params['token']){
              
            return $this->user->getBestScore($params['token']); 
        }
        return false;
    }

    

    public function setBestScore($params) {
        if($params['token'] && $params['score']){
            return $this->user->setBestScore($params['token'], $params['score']); 
        }
        return false;
    }
}



?>