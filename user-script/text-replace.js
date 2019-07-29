
document.onkeyup = function (e) {
	if (e.ctrlKey && e.altKey && e.which == 82)
	{
		var src = prompt("Replace what in this page ?");
		var dest = prompt("Replace all '" + src + "' words with:");
		var replace = dest;
		
		document.body.innerHTML = document.body.innerHTML.split(src).join(replace);
	}
	document.getElementsByTagName("BODY")[0].focus();
}
