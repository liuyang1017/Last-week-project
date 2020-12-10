<?php

$username = $_POST['username'];
$password = $_POST['password'];

$link = mysqli_connect('127.0.0.1', 'root', 'root', 'project');
$sql = "SELECT * FROM `project` WHERE `username`='$username' AND `password`='$password'";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
mysqli_close($link);

if (count($data)) {
  echo json_encode(array(
    'message' => 'true',
    'code' => 1,
    'data' => $data
  ));
} else {
  echo json_encode(array(
    'message' => 'false',
    'code' => 1,
    'data' => $data
  ));
}


?>