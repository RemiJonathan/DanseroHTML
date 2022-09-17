<?php
//create a javascript array of the images contained in directory
$dir = "static/media/art/";
$jpeg_images = glob($dir . "*.jpeg");
$jpg_images = glob($dir . "*.jpg");
$JPG_images = glob($dir . "*.JPG");
$png_images = glob($dir . "*.png");
$heic_images = glob($dir . "*.HEIC");

$images = array_merge($jpeg_images, $jpg_images, $JPG_images, $png_images, $heic_images);

echo json_encode($images);
