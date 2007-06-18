<?php
	echo "emptying previews...";
if ( $dh = opendir ( "preview/" ) ) {
	while ( false !== ( $dat = readdir ( $dh ) ) ) {
		if ( $dat != "." && $dat != ".." && $dat != "Thumbs.db"  && $dat != ".svn") {
			echo "'$dat' ,";
			unlink("preview/$dat");
		}
	}
	echo "done.";
	closedir ( $dh );
}
?>