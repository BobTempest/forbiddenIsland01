<?php
// echo phpinfo();

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


// FLAT FILE STUFF
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


// MySQL STUFF
$servername = "boulezrepublicdb.mysql.db";
$username = "boulezrepublicdb";
$password = "ZarmouilleDb242";
$dbname = "boulezrepublicdb";
$table = "Games";//"Games_test";

//data_prep
$elements = explode('|', $logLine);

// $longDate;
$ClientTimeStamp = $elements[0];
$GameId = $elements[1];
$Message01 = $elements[2];
$Message02 = $elements[3];
$Message03 = $elements[4];
$NumberOfPlayers = $elements[5];
$DifficultyLevel = $elements[6];
$SelectedLanguage = $elements[7];
$VersionNumber = $elements[8];
$Turn = $elements[9];
$CurrentPlayerPlay = $elements[10];
$PosessedTreasures = $elements[11];
$FloodMeterLevel = $elements[12];
$NumberOfDrawnedTiles = $elements[13];
// $UserIP = $userIP
// $UserAgent = $userAgent

// echo " and gameId is :$GameId";

// Create connection
$conn = mysql_connect($servername, $username, $password);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysql_error());
}

$sql = "INSERT INTO $table (ServerDateTime, ClientTimeStamp, GameId,
  Message01, Message02, Message03, NumberOfPlayers, DifficultyLevel,
  SelectedLanguage, VersionNumber, Turn, CurrentPlayerPlaying, PosessedTreasures,
  FloodMeterLevel, NumberOfDrawnedTiles, UserIP, UserAgent)
VALUES ('$longDate', '$ClientTimeStamp', '$GameId', '$Message01',
  '$Message02', '$Message03', '$NumberOfPlayers', '$DifficultyLevel',
  '$SelectedLanguage', '$VersionNumber', '$Turn', '$CurrentPlayerPlay',
  '$PosessedTreasures', '$FloodMeterLevel', '$NumberOfDrawnedTiles', '$userIP',
  '$userAgent')";

echo "$sql";
mysql_select_db($dbname);
$retval = mysql_query( $sql, $conn );

if(! $retval ) {
   die('Could not enter data: ' . mysql_error());
}

echo "Entered data successfully\n";
mysql_close($conn);
?>
