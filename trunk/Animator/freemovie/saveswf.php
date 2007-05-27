<?php
function saveswf(){
srand((double)microtime()*1000000);
$zrandom = strval(rand(0,100000));
$ourFileName = "files/file-$zrandom.swf";
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fclose($ourFileHandle);
$filename = "files/file-$zrandom.swf";
$somecontent = $swf->GetMovie();
if (is_writable($filename)) {
    if (!$handle = fopen($filename, 'a')) {
         echo "Cannot open file ($filename)";
         exit;
    }
    if (fwrite($handle, $somecontent) === FALSE) {
        echo "Cannot write to file ($filename)";
        exit;
    }
    echo "Success, wrote SWF to file ($filename) <a href='$filename'>Download</a>";
    fclose($handle);
} else {
    echo "The file $filename is not writable";
}
}
?>