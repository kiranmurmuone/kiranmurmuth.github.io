// ==UserScript==
// @name         Text Replace
// @namespace    io.github.kiranmurmuth.user-script.text-replace
// @version      1.0.4
// @description  A basic text replacer for webpages.
// @author       KiranMurmuTH
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
	document.onkeyup = function (e) {
		if (e.ctrlKey && e.altKey && e.which == 82) //ctrl + alt + R
		{
			var find_what, replace_with;
			find_what = prompt("Replace what ?");
			if (find_what) {
				replace_with = prompt("Replace with:");
				if (replace_with) {
					document.body.innerHTML = document.body.innerHTML.split(find_what).join(replace_with);
				}
			}
		}
		document.getElementsByTagName("BODY")[0].focus();
	}
})();
