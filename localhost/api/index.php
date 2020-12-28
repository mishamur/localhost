<?php
error_reporting(-1);
require_once('application/Application.php');

function router($params) {
    $method = $params['method'];
    if($method) {
        $app = new Application();
        switch($method) {
            //user
            case 'login':return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);
            case 'getName':return $app->getName($params);
            case 'getBestScore': return $app->getBestScore($params);
            case 'setBestScore' :return $app->setBestScore($params);
        }
    }
    return false;
}

function answer($data) {
    if($data) {
        return array (
            'result' => 'ok',
            'data' => $data
        );
    }
    return array(
        'result' => 'error',
        'error' => array(
            'code' => 9000,
            'text' => 'unknown error'
        )
    );
}


echo json_encode(answer(router($_GET)));

?>