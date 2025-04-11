<?php
$host = "localhost";
$user = "root"; // Cambia si tienes otro usuario
$pass = ""; // Si tienes contraseña, agrégala aquí
$dbname = "galeria_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
