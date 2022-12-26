<?php
$dir = "static/media/uploads";
//create a javascript array of the images in uploads.json ordered by order field number
$uploads = json_decode(file_get_contents('static/media/uploads/uploads.json'), true);
$images = array();
foreach ($uploads as $upload) {
    $images[] = $upload['url'];
}
echo json_encode($images);
