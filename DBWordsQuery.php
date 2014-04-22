<?php
	header('Content-Type:text/html; charset=UTF-8');
	//header('Content-Type:text/html; charset=utf8_general_ci');
	//$i=0;
    // Five steps to PHP database connections:  
    // 1. Create a database connection
    //  $connection allows us to keep refering to this connection after it is established

	include("../pw.php");
	$connection = mysql_connect($dbhost,$dbuser,$dbpass);//use quotes if use strings instead of variables
	unset ($db_user, $db_pass);
    if (!$connection) {
        die("Database connection failed: " . mysql_error());
    }
    //echo "connection ok";
    // 2. Select a database to use 
    //$db_select = mysql_select_db("pairs",$connection);
	$db_select = mysql_select_db($dbname,$connection);
    unset ($dbname);
    if (!$db_select) {
        die("Database selection failed: " . mysql_error());
    }
	    //$practice = "Physics";
        $Grp = $_GET["Grp"]; //this gets the argument that was passed to the php script from javascript  - Grp was the name assigned to the argument in the javascript code
        
		mysql_query("SET CHARACTER SET UTF8", $connection);
		mysql_query("SET NAMES UTF8", $connection);
		
		$result = mysql_query("SELECT English, French FROM engfrchpairs WHERE Grp = '" . $Grp . "' ORDER BY English", $connection); //notice the single quotes are needed around $Grp
    if (!$result) {
        die("Database query failed: " . mysql_error());
    }
    
    while ($row = mysql_fetch_array($result)) {
        //$wordE[] = $row['English'];   //this defines an array and adds to it, also the 'English' tells php what item to use from $result to give to $word 
		$wordsE[] = $row['English'];
        $wordsF[] = $row['French'];
        $words = array_merge($wordsE, $wordsF);
   }
    //var_dump($word);
	//echo json_encode($wordE);   //use array
	echo json_encode($words);   //use array
	//echo json_encode($wordsF);   //use array
    //print_r($word);
    //print_r ($word[0]);
	mysql_close($connection);

?>