<?php

// Start a session
session_start();

// Check if the user is already logged in, if yes then redirect him to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    header("location: ../admin");
    exit;
}

// Include config file
//require_once "config.php";

// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

// Check if username is empty
    if (empty(trim($_POST["username"]))) {
        $username_err = "Veuillez entrer un nom d'utilisateur.";
    } else {
        $username = trim($_POST["username"]);
    }

// Check if password is empty
    if (empty(trim($_POST["password"]))) {
        $password_err = "Veuillez entrer votre mot de passe.";
    } else {
        $password = trim($_POST["password"]);
    }

// Validate credentials
    if (empty($username_err) && empty($password_err)) {
        $hashed_password = password_hash("3D8AKxtYaA", PASSWORD_DEFAULT);
        if ($username == "admin") {
            if (password_verify($password, $hashed_password)) {
                // Password is correct, so start a new session
                session_start();

                // Store data in session variables
                $_SESSION["loggedin"] = true;
                $_SESSION["id"] = 1;
                $_SESSION["username"] = $username;

                // Redirect user to welcome page
                header("location: ../admin");
            } else {
                // Display an error message if password is not valid
                $password_err = "Le mot de passe que vous avez entré n'est pas valide.";
            }
        } else {
            // Display an error message if username doesn't exist
            $username_err = "Aucun compte trouvé avec ce nom d'utilisateur.";
        }
    } else {
        echo "Oops! Quelque chose s'est mal passé. Veuillez réessayer plus tard.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body {
            font: 14px sans-serif;
        }

        .wrapper {
            width: 350px;
            padding: 20px;
        }
    </style>
</head>
<body>
<div class="wrapper">
    <h2>Connexion</h2>
    <p>Veuillez remplir les champs ci-dessous pour vous connecter.</p>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
            <label>Nom d'utilisateur</label>
            <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
            <span class="help-block"><?php echo $username_err; ?></span>
        </div>
        <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
            <label>Mot de passe</label>
            <input type="password" name="password" class="form-control">
            <span class="help-block"><?php echo $password_err; ?></span>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Connexion">
        </div>
    </form>
</div>
</body>
</html>
