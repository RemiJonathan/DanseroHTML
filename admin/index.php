<?php
session_start();
//if user is not logged in, redirect to login page
if (!isset($_SESSION['username'])) {
    //echo "Please log in: <a href='login.php'>login</a>";
    header('Location: ../admin/login.php');
} //validate session user
else if ($_SESSION['username'] !== 'admin') {
    //echo "not admin Please log in: <a href='login.php'>login</a>";
    header('Location: ../admin/login.php');
} //if user is logged in, show admin page
else {
    //assign message variable from GET
    if (!empty($_GET)) {
        $message = $_GET['message'];
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=0.8">
        <title>Admin</title>
        <style>
            body {
                background-color: #f0f0f0;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                color: #333;
            }

            pre {
                width: 100%;

                white-space: pre-wrap; /* Since CSS 2.1 */
                font-family: "Roboto Condensed", sans-serif;
                text-align: justify;
            }

            @media (min-width: 768px) {
                #paintingsList {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 16px;
                    grid-auto-rows: minmax(100px, auto);
                }

                .grid-item {
                    margin: 0;
                }
            }

            #paintingsList .grid-item {

                background-color: lightgray;
                margin: 16px;
                padding: 16px;
            }

            .grid-item {
                max-width: calc(100% - 16px);
                background-color: lightgray;
                padding: 16px;
            }

            .full-width {
                width: 100%;
            }

            input, select, textarea, input[type="file"] {
                width: 100%;
            }

            @media only screen and (max-width: 768px) {
                table tr td {
                    display: block;
                    width: 100%;
                }
            }

        </style>
    </head>
    <body>
    <h1>Admin</h1>
    <p>Page admin</p>
    <?php if (isset($message)) {
        echo $message;
    } ?>
    <br/>
    <!--Upload image form-->

    <form action="upload.php" method="post" enctype="multipart/form-data" name="imageUpload" id="imageUpload">
        <table class="full-width">
            <tr>
                <td>Select image to upload:</td>
                <td><input type="file" accept="image/jpeg,image/jpg,image/png" name="fileToUpload" id="fileToUpload"
                           required>
            </tr>
            <tr>
                <!--name of image-->
                <td><label for="name">Nom</label></td>
                <td><input type="text" name="name" id="name" required></td>
                <!--Description of painting--></tr>
            <tr>
                <td><label for="description">Description</label></td>
                <td><textarea name="description" id="description"></textarea></td>
                <!--Medium of image--></tr>
            <tr>
                <td><label for="medium">M&eacute;dium</label></td>
                <td><input type="text" name="medium" id="medium" required></td>
                <!--Year of image--></tr>
            <tr>
                <td><label for="year">Ann&eacute;e</label></td>
                <td><input type="text" name="year" id="year" required></td>
                <!--Image depiction--></tr>
            <tr>
                <td><label for="depiction">D&eacute;piction</label></td>
                <td><input type="text" name="depiction" id="depiction" required></td>
                <!--price--></tr>
            <tr>
                <td><label for="price">Prix</label></td>
                <td><input type="number" name="price" id="price" min="0" step="any" required></td>
                <!--size--></tr>
            <tr>
                <td><label for="size">Grandeur</label></td>
                <td><input type="text" name="size" id="size" required></td>
                <!--status--></tr>
            <tr>
                <td><label for="status">Status</label></td>
                <td><select name="status" id="status" required>
                        <option value="available">Disponible</option>
                        <option value="sold">Vendu</option>
                        <option value="reserved">R&eacute;serv&eacute;</option>
                        <option value="unavailable">Indisponible</option>
                        <option value="on hold">En attente</option>
                        <option value="on loan">En pr&ecirc;t</option>
                        <option value="on exhibition">En exposition</option>
                        <option value="on display">En affichage</option>
                        <option value="private sale">Vente priv&eacute;e - Me contacter</option>
                        <option value="hidden">Cach&eacute;</option>
                    </select></td>
            </tr>
            <tr>
                <td></td>

                <td><input type="submit" value="T&eacute;l&eacute;verser" name="submit"></td>
            </tr>
        </table>
    </form>
    <br/>
    <!--List of paintings, read json file-->
    <div id="paintings">
        <h2>Liste des peintures</h2>
        <div id="paintingsList">
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $.getJSON("../static/media/uploads/uploads.json", function (data) {
                let paintingsList = $("#paintingsList");

                for (const [key, value] of Object.entries(data)) {
                    paintingsList.append(`
          <div class='grid-item'>
            <div id='${key}'>
              ${value.name}
              <br />
              <img src='../${value.url}' alt='${value.depiction}' width='100%' />
              <p><pre>${value.description}</pre></p>
              <p>${value.medium}</p>
              <p>${value.price}</p>
              <p>${value.size}</p>
              <p>${convertStatus(value.status)}</p>
              <button onclick='modifyImage(${key})'>Modifier</button>
            </div>
          </div>
        `);
                }
            });
        });
    </script>
    <script>
        // Select all menu items
        const menuItems = document.querySelectorAll('.menu__listings a');

        // Add a click event listener to each menu item
        menuItems.forEach(function (menuItem) {
            menuItem.addEventListener('click', function () {
                // Toggle the menu's visibility
                document.querySelector('#menu__active').checked = false;
            });
        });

    </script>
    <script>
        function convertStatus(status) {
            switch (status) {
                case "available":
                    return "Disponible";
                case "sold":
                    return "Vendu";
                case "reserved":
                    return "R&eacute;serv&eacute;";
                case "unavailable":
                    return "Indisponible";
                case "on hold":
                    return "En attente";
                case "on loan":
                    return "En pr&ecirc;t";
                case "on exhibition":
                    return "En exposition";
                case "on display":
                    return "En affichage";
                case "private sale":
                    return "Vente priv&eacute;e - Me contacter";
                default:
                    return `D&eacute;tail indisponible- Me contacter`;
            }
        }
    </script>
    <script>
        //Modify image, send the page back up to the top and fill the form with the current image being modified, add a cancel button to the form and edit the form destination to edit.php
        function modifyImage(id) {
            window.scrollTo(0, 0);
            $.getJSON("../static/media/uploads/uploads.json", function (data) {
                $.each(data, function (key, value) {
                    if (key == id) {
                        $("#name").val(value.name);
                        $("#description").val(value.description);
                        $("#medium").val(value.medium);
                        $("#year").val(value.year);
                        $("#depiction").val(value.depiction);
                        $("#price").val(value.price);
                        $("#size").val(value.size);
                        $("#status").val(value.status);

                        //disable and hide the image upload button
                        //remove required attribute from image upload
                        $("#fileToUpload").prop('required', false);
                        $("#fileToUpload").prop('disabled', true);
                        $("#fileToUpload").hide();

                        //add hidden input containing the image url
                        $("#imageUpload").append("<input type='hidden' name='url' value='" + value.url + "'/>");

                        $("#imageUpload").attr("action", "edit.php");
                        $("#imageUpload").append("<input type='hidden' name='id' value='" + id + "'><button id='cancelButton' onclick='cancelEdit()'>Annuler</button>");
                    }
                });
            });
        }

        //Cancel modify, clear the form and reset the form destination to upload.php
        function cancelModify() {
            console.log("cancel");
            document.getElementById("imageUpload").reset();
            document.getElementById("cancelButton").remove();
        }
    </script>

    <script>
        //function to replace \r\n with <br> in the description field
        function replaceNewLine() {
            var description = document.getElementById("description").value;
            description = description.replace(/\r\n/g, "<br>");
            document.getElementById("description").value = description;
        }

        replaceNewLine();
    </script>
    </body>
    </html>
<?php } ?>