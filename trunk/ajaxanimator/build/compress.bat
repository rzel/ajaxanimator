copy index.htm deployindex.htm
pause
java -jar ../server/dev/compile/yuicompressor.jar --type js -v -o ajaxanimator-cmp.js ajaxanimator-all.js
java -jar ../server/dev/compile/yuicompressor.jar --type css -v -o ajaxanimator-cmp.css ajaxanimator-all.css
pause