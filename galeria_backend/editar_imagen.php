<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['titulo'], $data['descripcion'], $data['url'])) {
    $id = $data['id'];
    $titulo = $data['titulo'];
    $descripcion = $data['descripcion'];
    $url = $data['url'];

    $sql = "UPDATE imagenes SET titulo=?, descripcion=?, url=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $titulo, $descripcion, $url, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}
?>
