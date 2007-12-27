Welcome to the Restore Backup Utility version 0.4
<?php
if($_GET["passw"] == "adminbackup"){
$backupdata = file_get_contents("backup.txt");
echo "$backupdata<hr>";
$up = explode("/ ",$backupdata);
foreach($up as $pu){
$udata = explode("-",$pu);
$user = $udata[0];
$pass = $udata[1];
echo "<iframe src='register.php?user=$user&pass=$pass&valid=true'></iframe>";
echo "removing backup.txt";
unlink("backup.txt");
}
}
?>