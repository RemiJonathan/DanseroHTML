function loadIntro(title, text, image) {
    let intro = "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1 class=\"text-center display-2\">" +
        title +
        "</h1></div></div><div class=\"row\"><div class=\"col-md-5 align-left\">" +
        "<img src=\"" +
        image +
        "\" class=\"img-fluid\" alt=\"Luc\" id='intro-image'></div><div class=\"col-md-1\"></div><div class=\"col-md-6 align-right align-self-start\"><p style='text-align: justify'>" +
        text +
        "</p></div></div></div>";
    //add intro to content
    addContent(intro);
}

//load gallery
function loadGallery(images) {
    console.log(images);
    //for each image in images array, add a div with the image
    let imageDiv = "";
    for (const image in images) {
        console.log(images[image]);
        imageDiv += "<div class=\"col-md-4\"><img src=\"" + images[image] + "\" class=\"img-fluid py-md-3 gallery\" alt=\"Luc\"></div>";
    }
    let gallery = "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1 class=\"text-center display-2\">Galerie</h1></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"row\">" + imageDiv + "</div></div></div>";
    addContent(gallery);
}

//load demarche
function loadDemarche() {
    let demarche = "<div class=\"container\"><div class=\"row\"><div class=\"col-md-12\"><h1 class=\"text-center display-2\">D&eacute;marche</h1></div></div><div class=\"row\"><div class=\"col-md-12\"><div class=\"row\"><div class=\"col-md-12\">" + demarcheHTML() + "</div></div></div>";
    addContent(demarche);
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
        navItem("user", "javascript:loadIntro('Biographie', biographyHTML(),'static/media/luc-dansereau.bb7d732cf62fa1c7fdcb.jpg')") +
        navItem("moon-o", "javascript:toggleDarkMode()") +
        navItem("cog", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("", "#") +
        navItem("envelope", "#") +
        navItem("file", "javascript:loadDemarche()") +
        navItem("picture-o", "javascript:loadGallery(getImages())") +
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

function biographyHTML() {
    return "<p class='justify'>L&rsquo;artiste qu&eacute;b&eacute;cois Luc Dansereau na&icirc;t le 2 janvier 1991 &agrave; " +
        "Montr&eacute;al. Il grandit dans un mode de vie &laquo; nautique &raquo; dans le respect du paysage marin, " +
        "de la faune et de la flore. &laquo; <em>J&rsquo;ai toujours eu de l&rsquo;amour, de " +
        "l&rsquo;&eacute;merveillement et de l&rsquo;affection pour la beaut&eacute; et la puret&eacute; du " +
        "paysage</em>. &raquo; Ayant un certain talent et de la passion pour la pratique du dessin et de la peinture " +
        "depuis son enfance, il d&eacute;couvre sa vocation dans un cours d&rsquo;art vers la fin de ses" +
        " &eacute;tudes secondaires. Les ann&eacute;es subs&eacute;quentes seront mouvement&eacute;es au niveau" +
        " &eacute;motionnel et psychologique.</p>\n" +
        "<p>&nbsp;</p>\n" +
        "<p class='justify'>En 2012, l&rsquo;artiste suit un cour de peinture &agrave; l&rsquo;huile et participe &agrave; un" +
        " programme dans un organisme ind&eacute;pendant oeuvrant en sant&eacute; mentale. Il d&eacute;cide de" +
        " poursuivre ses &eacute;tudes artistiques au niveau coll&eacute;gial et universitaire. Il termine son" +
        " Baccalaur&eacute;at dans le programme &laquo; d&rsquo;Arts visuels et m&eacute;diatiques &raquo; de" +
        " l&rsquo;Universit&eacute; du Qu&eacute;bec &agrave; Montr&eacute;al en avril 2017. Il participe &agrave; l&rsquo;exposition <em>Apoclectique </em>des finissants(es) en Arts Plastiques du coll&egrave;ge &Eacute;douard Montpetit en 2014 et &agrave; l&rsquo;exposition <em>Passage &agrave; d&eacute;couvert </em>des finissants(es) en Arts visuels et m&eacute;diatiques de l&rsquo;UQAM en avril 2017. L&rsquo;artiste participe &agrave; l&rsquo;exposition <em>Peinture fraiche et nouvelle construction </em>&agrave; la galerie Art M&ucirc;r en 2017. C&rsquo;est la premi&egrave;re fois qu&rsquo;il a eu l&rsquo;occasion de pr&eacute;senter son travail au grand public et de le vendre sur le march&eacute; de l&rsquo;art. Cet &eacute;v&eacute;nement avait &eacute;t&eacute; cr&eacute;er pour pr&eacute;senter la rel&egrave;ve s&eacute;lectionn&eacute;e parmi plusieurs universit&eacute;s canadiennes.</p>\n" +
        "<p>&nbsp;</p>\n" +
        "<p class='justify'>Depuis 2010, Luc Dansereau produit des paysages naturels et urbains en peinture et en dessin. Plusieurs artistes influents marqueront son parcours pendant ses &eacute;tudes. Il d&eacute;couvre le travail de l&rsquo;artiste peintre qu&eacute;b&eacute;cois Joan Pujol qui r&eacute;alise des trompes l&rsquo;oeil fr&ocirc;lants la perfection ainsi que le travail de Joanne Corneau, de Peter Doig et de Kent Monkman. Il exprime son amour du paysage par la peinture de mani&egrave;re figurative, surnaturelle et le d&eacute;fend en y ajoutant une critique de sa destruction par notre soci&eacute;t&eacute; de consommation. C&rsquo;est en 2015, qu&rsquo;il s&rsquo;engage et commence &agrave; produire des paysages &eacute;cologiques na&iuml;fs, des portraits du controvers&eacute; Donald Trump et des oeuvres comportants des d&eacute;chets et des rebuts en tout genre.</p>";
}

//create an array of urls to images in directory
function generateArtArray() {
    let imageArray = [];
    imageArray.push("static/media/art/6EE9BF74-8C10-4792-80C4-C3C24EA0916A.jpeg");
    imageArray.push("static/media/art/7B13244C-3ADF-4008-9352-F391289186EE.jpeg");
    imageArray.push("static/media/art/8EAB2717-06F9-43B6-8F77-3DF7D2EC6DF5.jpeg");
    imageArray.push("static/media/art/09B0560F-1295-4047-9D13-8A0F7C101094.jpeg");

    return imageArray;
}

function demarcheHTML() {
    return "<h3>D&eacute;marche artistique</h3>\n" +
        "<p>&Eacute;tant observateur et contemplatif, j&rsquo;ai une certaine habilet&eacute; &agrave; reproduire le r&eacute;el. Je suis fascin&eacute; par les rapports que l&rsquo;homme entretient avec la nature. Mon m&eacute;dium est la peinture et c&rsquo;est ma fa&ccedil;on pr&eacute;f&eacute;r&eacute;e, ou naturelle, de repr&eacute;senter le paysage. Mes th&egrave;mes de pr&eacute;dilection sont les paysages oc&eacute;aniques, la faune, la flore, les grands espaces et les probl&egrave;mes environnementaux.&nbsp; J&rsquo;introduis toujours la notion de l&rsquo;empreinte de l&rsquo;homme, dans son aspect culturel, en contraste &agrave; la nature dans sa plus simple expression.&nbsp; Je fais de la photographie et de la r&eacute;cup&eacute;ration d&rsquo;images et les transposent en peintures et en dessins. Mes tableaux sont g&eacute;n&eacute;ralement construits &agrave; partir d&rsquo;&eacute;l&eacute;ments photographiques pr&eacute;cis. Je construis un paysage topographique, naturel ou urbain, c&rsquo;est-&agrave;-dire un lieu identifiable, une nature pr&eacute;sent&eacute;e de mani&egrave;re humble, tr&egrave;s pr&egrave;s de la r&eacute;alit&eacute; observ&eacute;e. La nature y est repr&eacute;sent&eacute;e de mani&egrave;re d&eacute;nud&eacute;e. Je recherche alors une intangibilit&eacute; dans ma repr&eacute;sentation du paysage et je le fais en transformant le r&eacute;el, en y introduisant de la nouveaut&eacute;, de l&rsquo;inconnu et des &eacute;l&eacute;ments &eacute;tranges. En modifiant l&rsquo;image par une gestuelle plus personnelle, je tente d&rsquo;am&eacute;nager un pi&egrave;ge esth&eacute;tique pour que le spectateur se questionne.&nbsp; Cette fa&ccedil;on de faire s&rsquo;inspire parfois du peintre bien connu, Peter Doig.</p>\n" +
        "<div class='row'> <div class=\"col-md-6\"><img class='img-fluid' src='" + generateArtArray()[0] + "' alt=''></div><div class=\"col-md-6\"><img src='" + generateArtArray()[1] + "' alt=''></div></div>" +
        "<p>A titre d&rsquo;exemple, je produis des paysages &eacute;cologiques suivant le th&egrave;me de la pollution des oc&eacute;ans par les mati&egrave;res plastiques tel que dans ma peinture &laquo;&nbsp;<em>le 7<sup>e</sup> continent&nbsp;&raquo; </em>(2016).&nbsp; Voil&agrave; une probl&eacute;matique environnementale qui me touche fortement car elle affecte la flore et la faune oc&eacute;aniques.&nbsp; D&rsquo;autres sujets me passionnent tels que l&rsquo;erreur humaine, les maux de la soci&eacute;t&eacute; occidentale et les cons&eacute;quences de son d&eacute;veloppement au d&eacute;triment du reste du monde.&nbsp; J&rsquo;ai exprim&eacute; ces pr&eacute;occupations dans mes peintures dont &laquo;&nbsp;<em>Times Square Mcdonald&rsquo;s\"</em> (2016) et dans la caricature de Donald Trump &laquo;&nbsp;<em>Trash Trump&nbsp;&raquo; </em>(2016).&nbsp; Ces 2 peintures sont des exemples de ce que je veux exprimer par mon travail. Ainsi, le genre du paysage et le portrait se pr&ecirc;tent &agrave; la critique tels que le font les peintres Kent Monkman et Mathieu St-Onge dans leurs &oelig;uvres.</p>\n" +
        "" +
        "<p>Mon travail bi-dimensionnel est dirig&eacute; par l&rsquo;amour que je ressens face &agrave; la nature et &agrave; sa puret&eacute; visuelle.&nbsp; Il se forme, se transforme par mon imaginaire et mon inconscient en une vision personnelle, laquelle en prenant vie, s&rsquo;engage dans une critique du monde actuel et &agrave; venir.</p>";
}