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

    // Games per months
    $sql_gamesPerMonths = 'SELECT DATE_FORMAT(ServerDateTime, "%M %Y") AS MyDATE, COUNT(*) FROM Games WHERE Message01 = "START" GROUP BY YEAR (ServerDateTime), MONTH (ServerDateTime) ORDER BY ServerDateTime DESC';

    // Last game played
    $sql_lastGamePlayed = 'SELECT DATE_FORMAT(ServerDateTime, "%d %M %Y %T") FROM `Games` WHERE 1 ORDER BY `ServerDateTime` DESC LIMIT 1';

    // ******* executions
    $req_globalCountStarted = mysql_query($sql_globalCountStarted) or die('Erreur SQL sur sql_globalCountStarted !<br />'.$sql_globalCountStarted.'<br />'.mysql_error());
    $req_globalCountFail = mysql_query($sql_globalCountFail) or die('Erreur SQL sur sql_globalCountFail !<br />'.$sql_globalCountFail.'<br />'.mysql_error());
    $req_globalCountWin = mysql_query($sql_globalCountWin) or die('Erreur SQL sur sql_globalCountWin !<br />'.$sql_globalCountWin.'<br />'.mysql_error());
    $req_globalUnfinishedGames = mysql_query($sql_globalUnfinishedGames) or die('Erreur SQL sur sql_globalUnfinishedGames !<br />'.$sql_globalUnfinishedGames.'<br />'.mysql_error());
    $req_globalFinishedGames = mysql_query($sql_globalFinishedGames) or die('Erreur SQL sur sql_globalFinishedGames !<br />'.$sql_globalFinishedGames.'<br />'.mysql_error());
    $req_repartitionOfFails = mysql_query($sql_repartitionOfFails) or die('Erreur SQL sur sql_repartitionOfFails !<br />'.$sql_repartitionOfFails.'<br />'.mysql_error());
    $req_repartitionOfFails02 = mysql_query($sql_repartitionOfFails) or die('Erreur SQL sur sql_repartitionOfFails !<br />'.$sql_repartitionOfFails.'<br />'.mysql_error());
    $req_gamesPerMonths = mysql_query($sql_gamesPerMonths) or die('Erreur SQL sur sql_gamesPerMonths !<br />'.$sql_gamesPerMonths.'<br />'.mysql_error());
    $req_gamesPerMonths02 = mysql_query($sql_gamesPerMonths) or die('Erreur SQL sur sql_gamesPerMonths !<br />'.$sql_gamesPerMonths.'<br />'.mysql_error());
    $req_lastGamePlayed = mysql_query($sql_lastGamePlayed) or die('Erreur SQL sur sql_lastGamePlayed !<br />'.$sql_lastGamePlayed.'<br />'.mysql_error());

    // ******** display


    $data_lastGamePlayed = mysql_fetch_row($req_lastGamePlayed);
    echo 'Last game played : '.$data_lastGamePlayed[0].'<br />';

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
    echo '<div>';
    echo '<b>Repartition of failures:</b><br />';
    echo '<table>';
    while ($data_repartitionOfFails = mysql_fetch_array($req_repartitionOfFails)) {
        echo '<tr><td>'.$data_repartitionOfFails[0].'</td>';
        echo '<td>'.$data_repartitionOfFails[1].'</td></tr>';
    }
    echo '<tr><td>unfinished games</td><td>'.$data_globalUnfinishedGames[0].'</td></tr>';
    echo '</table>';
    echo '</div>';
    echo '<div>';
    echo '<b>Games per Months:</b><br />';
    echo '<table>';
    while ($data_gamesPerMonths = mysql_fetch_array($req_gamesPerMonths)) {
        echo '<tr><td>'.$data_gamesPerMonths[0].'</td>';
        echo '<td>'.$data_gamesPerMonths[1].'</td></tr>';
    }
    echo '</table>';
    echo '</div>';

    //

    ?>


    <canvas id="myChart" width="400" height="400"></canvas>

    <script src="./libs/Chart.min.js"></script>
    <script type="text/javascript">
        
        // Data gathering
        var data_lastGamePlayed = "<?php echo $data_lastGamePlayed[0]; ?>";
        var globalCountStarted = <?php echo $data_globalCountStarted[0]; ?>;
        var data_globalCountFail = <?php echo $data_globalCountFail[0]; ?>;
        var data_globalCountWin = <?php echo $data_globalCountWin[0]; ?>;
        var data_globalUnfinishedGames = <?php echo $data_globalUnfinishedGames[0]; ?>;
        var data_globalFinishedGames = <?php echo $data_globalFinishedGames[0]; ?>;

        var failureTypeArray = [
        <?php 
            while ($data_repartitionOfFails02 = mysql_fetch_array($req_repartitionOfFails02)) {
                echo '{ failCause: "'.$data_repartitionOfFails02[0].'", howMuch: '.$data_repartitionOfFails02[1].' },';
            }
        ?>
        ];

        var gamesPerMonthArray = [
        <?php
            while ($data_gamesPerMonths02 = mysql_fetch_array($req_gamesPerMonths02)) {
                echo '{ when: "'.$data_gamesPerMonths02[0].'", howMuch: '.$data_gamesPerMonths02[1].' },';
            }
        ?>
        ];

        // Data transformation
        var sumOfFailures = 0;
        failureTypeArray.map((val, i) => {
             sumOfFailures += val.howMuch;
        });

        var datasetForTypesOfDeaths = failureTypeArray.map((val, i) => {
            return ((val.howMuch*100)/sumOfFailures).toFixed(2);
        });

        var myLabels = failureTypeArray.map((val, i) => {
            return val.failCause;
        });

        // charts building
        // chart Types of Deaths
        dataTypesOfDeaths = {
            datasets: [{
                label: "% repartition of Game over Type",
                data: datasetForTypesOfDeaths,
                backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                ]

            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: myLabels
        };

        var ctx = document.getElementById('myChart');
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: dataTypesOfDeaths,
            options: {}
        });

    </script>

    </body>
    </html>
    <?php
        mysql_free_result ($req_globalCountFail);
        mysql_free_result ($req_globalCountWin);
        mysql_free_result ($req_globalUnfinishedGames);
        mysql_free_result ($req_globalFinishedGames);
        mysql_free_result ($req_repartitionOfFails);
        mysql_free_result ($req_repartitionOfFails02);
        mysql_free_result ($req_gamesPerMonths);
        mysql_free_result ($req_gamesPerMonths02);
        mysql_free_result ($req_lastGamePlayed);
        mysql_close ();
    ?>
