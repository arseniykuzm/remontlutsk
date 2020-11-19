<?php 

$phone = $_POST['user'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'arseniy.kuzmuk@gmail.com';                 // Наш логин
$mail->Password = '0507475505';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('xxxxx@gmail.com', 'Иван Иванов');   // От кого письмо 
$mail->addAddress('xxxxx@mail.ru');     // Add a recipient
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Новая заявка сайта';
$mail->Body    = '
  Пользователь оставил свои данные <br> 
  Имя: неизвестно <br>
  Телефон: ' . $phone . '';
$mail->AltBody = 'Это альтернативный текст';

if(!$mail->send()) {
  echo 'Письмо не может быть отправлено. ';
  echo 'Ошибка: ' . $mail->ErrorInfo;
} else {
  header('location: ../thankyou.html');
}                            
?>