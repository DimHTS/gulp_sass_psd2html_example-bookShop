<?php
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$REMOTE_ADDR = $_POST['REMOTE_ADDR'];

	$to = "deqeq@yandex.ru";  /* email На который приходят заявки */
	$subject = "Обратный звонок";  /* название писем, которые будут приходить на почту  */
	$message = "Имя: $name\nТелефон: $phone\nIP-адрес: $_SERVER[REMOTE_ADDR]";
	mail ($to,$subject,$message,"Content-type:text/plain; charset = utf-8") or print "Can't send email !!!";
	echo 'Cпасибо! Мы получили ваше сообщение. Наш менеджер свяжется с вами в ближайшее время.';
	//exit;
?> 