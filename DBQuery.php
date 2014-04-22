<?php
	header('Content-Type:text/html; charset=UTF-8');
	//$i=0;
    // Five steps to PHP database connections:  
    // 1. Create a database connection
    //      (Use your own servername, username and password if they are different.)
    //      $connection allows us to keep refering to this connection after it is established
	//include("/outside-webroot/db_settings.php");  
	include("../pw.php");
	//$dbname not used in the next line - need new version mySQLi in order to use it in next line and eliminate the $DB_select statement below
	$connection = mysql_connect($dbhost,$dbuser,$dbpass);//use quotes if use strings instead of variables
	unset ($dbhost, $dbuser, $dbpass);
    if (!$connection) {
        die("Database connection failed: " . mysql_error());
    }
    //echo "connection ok";
    // 2. Select a database to use 
    $db_select = mysql_select_db($dbname,$connection);
    unset ($dbname);
	//$db_select = mysql_select_db("pairs",$connection);
    if (!$db_select) {
        die("Database selection failed: " . mysql_error());
    }
	    $result = mysql_query("SELECT DISTINCT Grp FROM engfrchpairs", $connection);
    if (!$result) {
        die("Database query failed: " . mysql_error());
    }
    
    // 4. Use returned data
    while ($row = mysql_fetch_array($result)) {
		//echo $row["Grp"]." ".$row["position"]."<br />";
        //echo $row["Grp"]."<br />";   //this one works with 1st version
		//echo $row["Grp"];
        $group[] = $row["Grp"];   //this defines an array and adds to it // make array
		//echo $group[$i]."<br />";
		//echo $group[$i];
		//$i=$i+1; // used with array
    }
	echo json_encode($group);   //use array
    //print_r($group);
	mysql_close($connection);

?>