<?php
include "db.php";

$sql = "SELECT * FROM imagenes ORDER BY id DESC";
$result = $conn->query($sql);

$imagenes = [];
while ($row = $result->fetch_assoc()) {
    $imagenes[] = $row;
}

echo json_encode(["imagenes" => $imagenes]);
?>
