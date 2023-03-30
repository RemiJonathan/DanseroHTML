<?php

//upload image file and edit json file to add new image

function createThumbnail($new_file, $target_dir, $new_file_name)
{
    // Create a thumbnail image
    $thumbnail_width = 100;
    $thumbnail_height = 100;

// Load the image
    $image = imagecreatefromjpeg($new_file);
    $original_width = imagesx($image);
    $original_height = imagesy($image);

// Calculate the thumbnail dimensions
    $thumbnail_ratio = $thumbnail_width / $thumbnail_height;
    $original_ratio = $original_width / $original_height;

    if ($original_ratio > $thumbnail_ratio) {
        $thumbnail_height = $thumbnail_width / $original_ratio;
    } else {
        $thumbnail_width = $thumbnail_height * $original_ratio;
    }

// Create the thumbnail image
    $thumbnail = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
    imagecopyresampled($thumbnail, $image, 0, 0, 0, 0, $thumbnail_width, $thumbnail_height, $original_width, $original_height);

// Save the thumbnail image
    $thumbnail_file = $target_dir . 'thumb-' . $new_file_name;
    imagejpeg($thumbnail, $thumbnail_file);

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $target_dir = "../static/media/uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if image file is an actual image or fake image
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check === false) {
        echo "File is not an image.";
    } // Check if file already exists
    else if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
    } // Check file size
    else if ($_FILES["fileToUpload"]["size"] > 50000000) {
        echo "Sorry, your file is too large.";
    } // Allow certain file formats
    else if ($imageFileType !== "jpg" && $imageFileType !== "png" && $imageFileType !== "jpeg" && $imageFileType !== "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed!";
    } // Check if there was an error uploading the file
    else if ($_FILES["fileToUpload"]["error"] !== UPLOAD_ERR_OK) {
        echo "Sorry, there was an error uploading your file.";
    } // if everything is ok, try to upload file and name it based on datetime
    else {
        //rename file to upload
        $new_file_name = date('Y-m-d-H-i-s') . '.' . $imageFileType;
        $new_file = $target_dir . $new_file_name;

        //createThumbnail($_FILES["fileToUpload"]["tmp_name"], $target_dir, $new_file_name);
        $thumbnail_file = $target_dir . 'thumb-' . $new_file_name;

        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_file)) {


            //edit uploads.json file to add new image
            $uploads = file_get_contents('../static/media/uploads/uploads.json');
            $uploads = json_decode($uploads, true);
            //add form data to array
            $uploads[] = array(
                'name' => $_POST['name'],
                'year' => $_POST['year'],
                'description' => $_POST['description'],
                'medium' => $_POST['medium'],
                'url' => $new_file,
                'thumbnail' => $thumbnail_file,
                'depiction' => $_POST['depiction'],
                'price' => $_POST['price'],
                'size' => $_POST['size'],
                'status' => $_POST['status'],
                'order' => $uploads[count($uploads) - 1]['order'] + 1,
            );
            //encode array to json and save to file
            $uploads = json_encode($uploads);
            file_put_contents('../static/media/uploads/uploads.json', $uploads);
            //redirect to admin page
            header('Location: ../admin/?message=The file ' . basename($_FILES["fileToUpload"]["name"]) . ' has been uploaded.');


        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
//echo go back
echo '<a href="../admin">Go back</a>';





