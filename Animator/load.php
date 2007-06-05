<?php
if ( $dh = opendir ( "images/" ) ) {
	while ( false !== ( $dat = readdir ( $dh ) ) ) {
		if ( $dat != "." && $dat != ".." && $dat != "Thumbs.db" ) {
			echo "'$dat' ,";
		}
	}
	closedir ( $dh );
}
?>