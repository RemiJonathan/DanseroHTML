<?php
//edit json file to modify image data
//receive image data from form

if (isset($_POST['submit'])) {
    //get json file
    $uploads = file_get_contents('../static/media/uploads/uploads.json');
    $uploads = json_decode($uploads, true);
    //get image data from form
    $name = $_POST['name'];
    $year = $_POST['year'];
    $description = $_POST['description'];
    $medium = $_POST['medium'];
    $depiction = $_POST['depiction'];
    $price = $_POST['price'];
    $size = $_POST['size'];
    $status = $_POST['status'];
    //get image url from form
    $url = $_POST['url'];
    //find image in json file
    foreach ($uploads as $key => $value) {
        //match the key value
        if ($value['url'] == $url) {
            //modify image data
            $uploads[$key]['name'] = $name;
            $uploads[$key]['year'] = $year;
            $uploads[$key]['description'] = $description;
            $uploads[$key]['medium'] = $medium;
            $uploads[$key]['depiction'] = $depiction;
            $uploads[$key]['price'] = $price;
            $uploads[$key]['size'] = $size;
            $uploads[$key]['status'] = $status;
        }
    }
    //save json file
    $uploads = json_encode($uploads);
    file_put_contents('../static/media/uploads/uploads.json', $uploads);
    //redirect to admin page
    header('Location: ../admin');
}
