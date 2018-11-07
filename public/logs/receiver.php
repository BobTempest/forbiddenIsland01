<?php
   $longDate = date("Y-m-d H:i:s");
   $logLine = $_GET['stf'];
   $userAgent = $_SERVER['HTTP_USER_AGENT'];
   $userIP = $_SERVER['REMOTE_ADDR'];

   $error = false;

   // count pipes in the string, 13 expected and
   // length < 200
   $inputLength = strlen($logLine);
   $numberOfPipes = substr_count($logLine , "|");

   if ($inputLength < 30
      || $inputLength > 200
      || $numberOfPipes != 13 ){
        $logLine = substr($logLine, 0, 200);
        $logLine = "ERROR:::$logLine";
        $error = true;
   }

   // echo "Length = $inputLength and nbOfPipes : $numberOfPipes";

   $logString = "|$longDate|$userIP|$logLine|$userAgent|\r\n";
   //echo "String is : $logString\n";
   // $log_path = "../";
   $cur_year = date("Y");
   $cur_month = date("m");
   $cur_log_file_name = "$cur_year-$cur_month.txt";
   // echo "FileName is : $cur_log_file_name\n";
   if ($error){
      $cur_log_file_name = "ERROR_$cur_year-$cur_month.txt";
   }

   if (file_exists($cur_log_file_name)){
        $handle = fopen($cur_log_file_name, "a"); } else {
        $handle = fopen($cur_log_file_name, "w");
        $bool = chmod($cur_log_file_name, 0777); }

   if (is_writable($cur_log_file_name)) {
      $fwrite = fwrite($handle, $logString); } else {
      echo "Was not writable";
   }

   fclose($handle);
?>
