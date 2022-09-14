function loadIntro(title, text, image) {
    let intro;

    intro = "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1 class=\"text-center display-2\">" +
        title +
        "</h1></div></div><div class=\"row\"><div class=\"col-md-5 align-left align-self-center\">" +
        "<img src=\"" +
        image +
        "\" class=\"img-fluid \" alt=\"Luc\"></div><div class=\"col-md-2\"></div><div class=\"col-md-5 align-right align-self-start\"><p style='text-align: justify'>" +
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
    logo.innerHTML = "<img src='static/media/logo.svg' id='logo' alt='Luc' class='light-mode-logo'>";
    logo.style.position = "fixed";
    logo.style.bottom = "0";
    logo.style.right = "0";
    logo.style.zIndex = "1";
    document.body.appendChild(logo);
}

//function to add a floating nav button on the top left of page
function addNavButton() {
    let navButton = document.createElement("div");
    navButton.class = "navButton";
    navButton.innerHTML = navHTML();
    navButton.style.position = "fixed";
    navButton.style.top = "0";
    navButton.style.left = "0";
    navButton.style.zIndex = "1";
    document.body.appendChild(navButton);
}


function navHTML() {
    return "<section class=\"menu menu--circle\">\n" +
        "  <input type=\"checkbox\" id=\"menu__active\"/>\n" +
        "  <label for=\"menu__active\" class=\"menu__active\">\n" +
        "    <div class=\"menu__toggle\">\n" +
        "      <div class=\"icon\">\n" +
        "        <div class=\"hamburger\"></div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    <input type=\"radio\" name=\"arrow--up\" id=\"degree--up-0\"/>\n" +
        "    <input type=\"radio\" name=\"arrow--up\" id=\"degree--up-1\" />\n" +
        "    <input type=\"radio\" name=\"arrow--up\" id=\"degree--up-2\" />\n" +
        "    <div class=\"menu__listings\">\n" +
        "      <ul class=\"circle\">\n" +
        navItem("user", "javascript:loadIntro(\"Biographie\", lorem(), \"static/media/luc-dansereau.bb7d732cf62fa1c7fdcb.jpg\")") +
        navItem("moon-o", "javascript:toggleDarkMode()") +
        navItem("cog", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("envelope", "#") +
        navItem("file", "#") +
        navItem("picture-o", "#") +
        "      </ul>\n" +
        "    </div>\n" +
        "    <div class=\"menu__arrow menu__arrow--top\">\n" +
        "      <ul>\n" +
        "        <li>\n" +
        "          <label for=\"degree--up-0\"><div class=\"arrow\"></div></label>\n" +
        "          <label for=\"degree--up-1\"><div class=\"arrow\"></div></label>\n" +
        "          <label for=\"degree--up-2\"><div class=\"arrow\"></div></label>\n" +
        "        </li>\n" +
        "      </ul>\n" +
        "    </div>\n" +
        "  </label>\n" +
        "</section>";
}

function navItem(icon, link) {
    return "<li>\n" +
        "          <div class=\"placeholder\">\n" +
        "            <div class=\"upside\">\n" +
        "              <a href=\"" + link + "\" class=\"button\"><i class=\"fa fa-" + icon + "\"></i></a>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </li>";
}

function fadeInContent() {
    //make loading text fade away using transform
    let loading = document.getElementById("content");
    //addLogo();
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

//onclick toggle dark mode
function toggleDarkMode() {
    let body = document.body;
    let logo = document.getElementById("logo");
    body.classList.toggle("dark-mode");
    logo.classList.toggle("dark-mode-logo");
    body.classList.toggle("light-mode");
    logo.classList.toggle("light-mode-logo");
}