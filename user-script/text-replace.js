// ==UserScript==
// @name         Text Replace
// @namespace    io.github.kiranmurmuth.user-script.text-replace
// @version      1.0.5
// @description  A basic text replacer for webpages.
// @author       KiranMurmuTH
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
	document.onkeydown = function (e) {
		//ctrl + alt + R
		if (e.ctrlKey && e.altKey && e.which == 82)
		{
			var find_what, replace_with;
			find_what = prompt("Replace what in this page?");
			if (find_what && find_what.length > 0) {
				replace_with = prompt("Replace all [ " + find_what + " ] with:");
				document.body.innerHTML = document.body.innerHTML.split(find_what).join(replace_with);
			}
		}
		document.getElementsByTagName("BODY")[0].focus();
	}
})();
