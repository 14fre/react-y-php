<?php
include("db.php");

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $sql = "DELETE FROM imagenes WHERE id = $id";
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["mensaje" => "Imagen eliminada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar imagen"]);
    }
}
?>
