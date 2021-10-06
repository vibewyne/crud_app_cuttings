<?php

$captcha = "";
if (isset($_POST["g-recaptcha-response"])) {
    $captcha = $_POST["g-recaptcha-response"];
}
if (!$captcha) {
    echo "Merci de réaliser la vérification";
}

$secret = "6LehXBIcAAAAAIKIFmzCmw9Uskh19uMVj5wiPdLO";
$response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captcha . "&remoteip=" . $_SERVER["REMOTE_ADDR"]), true);

$to = "bassouletmarion@gmail.com";
$from = $_POST["email"];
$subject = $_POST["subject"];
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$message = "Message :\r\n\r\n" . $_POST["message"];
$headers = "Message de : " . $firstName . " " . $lastName . "\r\nEmail : " . $from;

if ($response["success"] == true){

    if (mail($to, $subject, $message, $headers)) {
        print "<p class='success'>Mail envoyé avec succès !</p>";
    } else {
        print "<p class='error'>Une erreur est apparue. Merci de réessayer.</p>";
    }
}