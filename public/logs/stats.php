<?php
// THANK YOU : http://www.lephpfacile.com/cours/13-afficher-les-donnees-de-votre-base
// MySQL STUFF
    $servername = "boulezrepublicdb.mysql.db";
    $username = "boulezrepublicdb";
    $password = "ZarmouilleDb242";
    $dbname = "boulezrepublicdb";
    $table = "Games";//"Games_test";

    // on se connecte à notre base
    $base = mysql_connect ($servername, $username, $password);
    mysql_select_db ($dbname, $base) ;
    ?>
    <html>
    <head>
    <title>La Isla Prohibida Stats</title>
    </head>
    <body>
    <?php
    // ******* requêtes
    // Global Count started :
    $sql_globalCountStarted = 'SELECT COUNT(*) FROM Games WHERE Message01 = "START"';

    // Global Count fail :
    $sql_globalCountFail = 'SELECT COUNT(*) FROM Games WHERE Message01 = "GAME_LOST"';

    // Global Count win :
    $sql_globalCountWin = 'SELECT COUNT(*) FROM Games WHERE Message01 = "GAME_WON"';

    // Global Unfinished games
    $sql_globalUnfinishedGames = 'SELECT COUNT(*) FROM ( SELECT GameId FROM `Games` GROUP BY GameId HAVING COUNT(GameId) = 1 ) AS sub';

    // Global Finished Games
    $sql_globalFinishedGames = 'SELECT COUNT(*) FROM ( SELECT GameId FROM `Games` GROUP BY GameId HAVING COUNT(GameId) = 2 ) AS sub';

    // Global Repartition of fails
    $sql_repartitionOfFails = 'SELECT Message02, COUNT(*) FROM Games WHERE Message01 = "GAME_LOST" GROUP BY Message02';


    // ******* executions
    $req_globalCountStarted = mysql_query($sql_globalCountStarted) or die('Erreur SQL sur sql_globalCountStarted !<br />'.$sql_globalCountStarted.'<br />'.mysql_error());
    $req_globalCountFail = mysql_query($sql_globalCountFail) or die('Erreur SQL sur sql_globalCountFail !<br />'.$sql_globalCountFail.'<br />'.mysql_error());
    $req_globalCountWin = mysql_query($sql_globalCountWin) or die('Erreur SQL sur sql_globalCountWin !<br />'.$sql_globalCountWin.'<br />'.mysql_error());
    $req_globalUnfinishedGames = mysql_query($sql_globalUnfinishedGames) or die('Erreur SQL sur sql_globalUnfinishedGames !<br />'.$sql_globalUnfinishedGames.'<br />'.mysql_error());
    $req_globalFinishedGames = mysql_query($sql_globalFinishedGames) or die('Erreur SQL sur sql_globalFinishedGames !<br />'.$sql_globalFinishedGames.'<br />'.mysql_error());
    $req_repartitionOfFails = mysql_query($sql_repartitionOfFails) or die('Erreur SQL sur sql_repartitionOfFails !<br />'.$sql_repartitionOfFails.'<br />'.mysql_error());

    // ******** display
    $data_globalCountStarted = mysql_fetch_row($req_globalCountStarted);
    echo 'globalCountStarted : '.$data_globalCountStarted[0].'<br />';
    //
    $data_globalCountFail = mysql_fetch_row($req_globalCountFail);
    echo 'globalCountFail : '.$data_globalCountFail[0].'<br />';
    //
    $data_globalCountWin = mysql_fetch_row($req_globalCountWin);
    echo 'globalCountWin : '.$data_globalCountWin[0].'<br />';
    //
    $data_globalUnfinishedGames = mysql_fetch_row($req_globalUnfinishedGames);
    echo 'globalUnfinishedGames : '.$data_globalUnfinishedGames[0].'<br />';
    //
    $data_globalFinishedGames = mysql_fetch_row($req_globalFinishedGames) ;
    echo 'globalFinishedGames : '.$data_globalFinishedGames[0].'<br />';
    //
    echo 'Repartition of failures:<br />';
    echo '<table>';
    while ($data_repartitionOfFails = mysql_fetch_array($req_repartitionOfFails)) {
        echo '<tr><td>'.$data_repartitionOfFails[0].'</td>';
        echo '<td>'.$data_repartitionOfFails[1].'</td></tr>';
    }
    echo '<tr><td>unfinished games</td><td>'.$data_globalUnfinishedGames[0].'</td></tr>';
    echo '</table>';


    mysql_free_result ($req_globalCountFail);
    mysql_free_result ($req_globalCountWin);
    mysql_free_result ($req_globalUnfinishedGames);
    mysql_free_result ($req_globalFinishedGames);
    mysql_free_result ($req_repartitionOfFails);
    mysql_close ();
    ?>
    </body>
    </html>
