<?php
	$index1 = $_POST["index1"];
	switch ($index1){
		case "0":
		$jsonStr = file_get_contents('./one.json');
		echo $jsonStr;
		break;
		case "1":
		$jsonStr1 = file_get_contents('./two.json');
		echo $jsonStr1;
		break;
		case "2":
		$jsonStr2 = file_get_contents('./three.json');
		echo $jsonStr2;
		break;
		case "3":
		$jsonStr3 = file_get_contents('./four.json');
		echo $jsonStr3;
		break;
		case "4":
		$jsonStr4 = file_get_contents('./five.json');
		echo $jsonStr4;
		break;
	}
	
	
?>