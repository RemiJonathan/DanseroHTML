function getImages() {
    let images;
    //pure javascript ajax call
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../../static/media/uploads/uploads.json', false);
    xhr.onload = function () {
        images = JSON.parse(this.response);
        console.log(images);
        // filter out images with status "hidden"
        images = images.filter(function (image) {
            return image.status !== "hidden";
        });
    }
    xhr.send();
    return images;
}