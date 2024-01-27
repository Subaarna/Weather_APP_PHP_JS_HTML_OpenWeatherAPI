<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$mysqli = new mysqli("localhost","root","");
if ($mysqli -> connect_errno) {
echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
exit();
}

$db = "CREATE DATABASE IF NOT EXISTS weather_db";
$mysqli -> query ($db);

$mysqli -> select_db("weather_db");

$table = "CREATE TABLE IF NOT EXISTS weather ( 
    Weather_condition varchar(100) NOT NULL, 
    Weather_description varchar(100) NOT NULL, 
    Weather_temperature float NOT NULL, 
    Weather_wind float NOT NULL, 
    weather_time datetime NOT NULL, 
    City varchar(100) NOT NULL, 
    Humidity float NOT NULL, 
    Direction_of_wind float NOT NULL, 
    Pressure float NOT NULL, 
    Icon varchar(11) NOT NULL,
    ID int(4) NOT NULL)";

$mysqli -> query ($table);

include('myapi.php');

$sql = "SELECT *
FROM weather
WHERE City = '{$_GET['City']}'
AND weather_time >= DATE_SUB(NOW(), INTERVAL 1000 SECOND)
ORDER BY weather_time DESC limit 1";

$result = $mysqli -> query($sql);
$row = $result -> fetch_assoc();
print json_encode($row);
$result -> free_result();
$mysqli -> close();
?>