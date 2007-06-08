
function html_header() { 
print "<html>" 
print "<head>" 
print "<title>Auxiliary FreeMovie Documentation</title>" 
print "</head>" 
print "<body>" 
print "<a name=\"top\"></a>" 
} 
 
function html_footer() { 
print "</body>" 
print "</html>" 
} 
 
{ 
if($0 ~ /^[\t ]*\/\//) { 
if(state == 1) { 
comment = comment "\n" 
} 
else { 
state = 1 
comment = "" 
} 
commentline = $0 
gsub(/^[\t ]*\/\/[\t ]*/, "", commentline) 
gsub(/^[\t ]*$/, "", commentline) 
gsub(/^\-*$/, "", commentline) 
if(length(commentline)) 
comment = comment commentline "<br>" 
} 
else { 
if($0 ~ /^[\t ]*function /) { 
fnctline = $0 
gsub(/^[\t ]*function /, "", fnctline) 
c[count] = comment 
f[count] = fnctline 
count++ 
state = 0 
} 
else { 
if($0 !~ /^[\t ]*$/) { 
state = 0 
} 
} 
} 
} 
 
END { 
html_header() 
 
for(i = 0; i < count; i++) { 
toc = toc sprintf("<a href=\"#c%d\">%s</a><br>\n", i, f[i]) 
body = body sprintf("<hr>\n<p><a name=\"c%d\"></a><a href=\"#top\">%s</a></p>\n<p>%s</p>\n", i, f[i], c[i]) 
} 
print toc 
print body 
 
html_footer() 
} 