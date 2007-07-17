<?php
if (is_uploaded_file($_FILES['uploaded']['tmp_name'])){
  $fileData = file_get_contents($_FILES['uploaded']['tmp_name']);
}
echo "$fileData";
?>