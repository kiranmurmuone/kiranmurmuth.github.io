// ==UserScript==
// @name         Text Replace
// @namespace    io.github.kiranmurmuth.user-script.text-replace
// @version      1.0.7
// @description  A basic text replacer for webpages.
// @author       KiranMurmuTH
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
	document.onkeydown = function (e) {
		//ctrl + shift + H
		if (e.ctrlKey && e.shiftKey && e.which == 72)
		{
			var find_what, replace_with, text_node, snap_shot, snap_data;
			find_what = prompt("Replace what in this page?");
			if (find_what != null && find_what.length != 0) {
				replace_with = prompt("Replace all \" " + find_what + " \" with:");
				if (replace_with != null) {
					text_node = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var snap_index = 0; snap_index < text_node.snapshotLength; snap_index++) {
						snap_shot = text_node.snapshotItem(snap_index);
						snap_data = snap_shot.data;
						snap_data = snap_data.replace(find_what, replace_with);
						snap_shot.data = snap_data;
					}
				}
			}
		}
		document.getElementsByTagName("BODY")[0].focus();
	}
})();
