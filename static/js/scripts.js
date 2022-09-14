function loadIntro(title, text, image) {
    let intro;

    intro = "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1 class=\"text-center display-2\">" +
        title +
        "</h1></div></div><div class=\"row\"><div class=\"col-md-5 align-left align-self-center\">" +
        "<img src=\"" +
        image +
        "\" class=\"img-fluid\" alt=\"Luc\"></div><div class=\"col-md-2\"></div><div class=\"col-md-5 align-right align-self-start\"><p style='text-align: justify'>" +
        text +
        "</p></div></div></div>";
    //add intro to content
    addContent(intro);
}

//function to add some html to content
function addContent(html) {
    let content = document.getElementById("content");
    content.innerHTML = html;
}

//center text horizontally and vertically
function centerText(text) {
    text.style.textAlign = "center";
    text.style.verticalAlign = "middle";
}

//load page
window.onload = function () {
    //make loading text fade away using transform
    let loading = document.getElementById("loading");
    addLogo();
    loading.style.transition = "opacity 1s";
    setTimeout(function () {
        document.getElementById("loading").style.opacity = "0";
    }, 2000);
}

//function to add a floating logo svg on the bottom right of page
function addLogo() {
    let logo = document.createElement("div");
    logo.class = "logo";
    logo.innerHTML = "<img src='static/media/logo.svg' alt='Luc'>";
    logo.style.position = "fixed";
    logo.style.bottom = "0";
    logo.style.right = "0";
    logo.style.zIndex = "1";
    document.body.appendChild(logo);
}

//function to add a floating nav button on the bottom center of page
function addNavButton() {
    let navButton = document.createElement("div");
    navButton.class = "navButton";
    navButton.innerHTML = navHTML();
    navButton.style.position = "fixed";
    navButton.style.bottom = "0";
    navButton.style.left = "50%";
    navButton.style.zIndex = "1";
    document.body.appendChild(navButton);
}

function navHTML() {
    return "<div class=\"container-fluid, nav-holder\">\n" +
        "                <div class=\"row\">\n" +
        "                    <nav class='menu'>\n" +
        "                        <input class='menu-toggler' id='menu-toggler' type='checkbox'/>\n" +
        "                        <label htmlFor='menu-toggler'></label>\n" +
        "                        <ul>\n" +
        "                            <li class='menu-item'>\n" +
        "                                <a class='fa-regular fa-newspaper' href='Gallerie'></a>\n" +
        "                            </li>\n" +
        "                            <li class='menu-item'>\n" +
        "                                <a class='fa-regular fa-address-card' href='CV'></a>\n" +
        "                            </li>\n" +
        "                            <li class='menu-item'>\n" +
        "                                <a class='fa-regular fa-paper-plane' href='message'></a>\n" +
        "                            </li>\n" +
        "                            <li class='menu-item'>\n" +
        "                                <a class='fa-brands fa-instagram' href='https://www.instagram.com/luc_dansero/' target='_blank'></a>\n" +
        "                            </li>\n" +
        "                        </ul>\n" +
        "                    </nav>\n" +
        "                </div>\n" +
        "            </div>";
}

function fadeInContent() {
    //make loading text fade away using transform
    let loading = document.getElementById("content");
    addLogo();
    loading.style.transition = "opacity 1s";
    setTimeout(function () {
        document.getElementById("content").style.opacity = "1";
    }, 2000);
}

//delete loading div
setTimeout(function () {
    document.getElementById("loading").remove();
}, 3000);

//lorem ipsum text
function lorem() {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et " +
        "dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex " +
        "ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
        "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
        "mollit anim id est laborum.";
}