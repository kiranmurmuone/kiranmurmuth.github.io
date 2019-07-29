// ==UserScript==
// @name         Text Replace
// @namespace    io.github.kiranmurmuth.user-script.text-replace
// @version      1.0
// @description  A basic text replacer for webpages.
// @author       KiranMurmuTH
// @match        *://*.*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
	document.onkeyup = function (e) {
		if (e.ctrlKey && e.altKey && e.which == 82) //ctrl + alt + R
		{
			var find_what = prompt("Replace what in this page ?");
			var replace_with = prompt("Replace all '" + find_what + "' words with:");
			document.body.innerHTML = document.body.innerHTML.split(find_what).join(replace_with);
		}
		document.getElementsByTagName("BODY")[0].focus();
	}
})();
