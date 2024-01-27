<?php

$sql = "SELECT *
FROM weather
WHERE City = '{$_GET['City']}'
AND weather_time >= DATE_SUB(NOW(), INTERVAL 1800 SECOND)
ORDER BY weather_time DESC limit 1";
$result = $mysqli -> query($sql);

if ($result->num_rows == 0) {
    $url = 'https://api.openweathermap.org/data/2.5/weather?q='. $_GET['City'].'&appid=d637caa37f9ddf9d9423efcd1ed494c1&units=metric';

    $data = file_get_contents($url);
    $json = json_decode($data, true);
    date_default_timezone_set('Asia/Kathmandu');

    $weather_description = $json['weather'][0]['description'];
    $weather_condition = $json['weather'][0]['main'];
    $icon = $json['weather'][0]['icon'];
    $weather_wind = $json['wind']['speed'];
    $direction_of_wind = $json['wind']['deg'];
    $weather_time = date("Y-m-d H:i:s");
    $humidity = $json['main']['humidity'];
    $pressure = $json['main']['pressure'];
    $weather_temperature = $json['main']['temp'];
    $city = $json['name'];
    $ID= $json['weather'][0]['id'];
    // CREATE TABLE weather ( Weather_condition varchar(100) NOT NULL, Weather_description varchar(100) NOT NULL, Weather_temperature float NOT NULL, Weather_wind float NOT NULL, weather_time datetime NOT NULL, City varchar(100) NOT NULL, Humidity float NOT NULL, Direction_of_wind float NOT NULL, Pressure float NOT NULL, Icon varchar(11) NOT NULL);

    $sql = "INSERT INTO weather (Weather_condition, Weather_description, Weather_temperature, Weather_wind, weather_time, City, Humidity, Direction_of_wind, Pressure, Icon, ID)
    VALUES('{$weather_condition}','{$weather_description}', {$weather_temperature}, {$weather_wind}, '{$weather_time}', '{$city}', '{$humidity}', '{$direction_of_wind}', '{$pressure}', '{$icon}', '{$ID}')";

    if (!$mysqli -> query($sql)) {
        echo("<h4>SQL error description: " . $mysqli -> error . "</h4>");
    }
}
?>