<?php
//upload image file and edit json file to add new image

//receive image file from form
if (isset($_POST['submit'])) {
    $target_dir = "../static/media/uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if ($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 50000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed!";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file and name it based on datetime
    } else {
        //rename file to upload
        $new_file_name = date('Y-m-d-H-i-s') . '.' . $imageFileType;
        $new_file = $target_dir . $new_file_name;

        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $new_file)) {
            echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded.";
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
                'depiction' => $_POST['depiction'],
                'price' => $_POST['price'],
                'size' => $_POST['size'],
                'status' => $_POST['status'],
                'order' => $uploads[count($uploads) - 1]['order'] + 1,
            );
            //encode array to json and save to file
            $uploads = json_encode($uploads);
            file_put_contents('../static/media/uploads/uploads.json', $uploads);
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
//echo go back
echo '<a href="../admin">Go back</a>';





