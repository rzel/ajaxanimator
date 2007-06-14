<?php
if ( $dh = opendir ( "preview/" ) ) {
	while ( false !== ( $dat = readdir ( $dh ) ) ) {
		if ( $dat != "." && $dat != ".." && $dat != "Thumbs.db" ) {
			echo "'$dat' ,";
			unlink("preview/$dat");
		}
	}
	closedir ( $dh );
}
?>