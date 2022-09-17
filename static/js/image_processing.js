function getImages() {
    let images;
    //pure javascript ajax call
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../../photolist.php', false);
    xhr.onload = function () {
        images = JSON.parse(this.response);
        console.log(images);
    }
    xhr.send();
    return images;
}