// ==UserScript==
// @name         Escape char replacer for Read Aloud
// @namespace    io.github.kiranmurmutone.user-script.novelplanet-text-replacer
// @version      1.0.4
// @description  Replaces text or strings on novelplanet.com
// @author       kiranmurmutone
// @match        *://novelplanet.com/Novel/*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var replacements, regex, key, textnodes, node, s;
    replacements = {
        "<": "【",
        ">": "】",
        "=": "-",
		"Find authorized novels in Webnovel，faster updates, better experience，Please click www.webnovel.com for visiting.": ""
    };
    regex = {};
    for (key in replacements) {
        regex[key] = new RegExp(key, 'g');
    }
    textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < textnodes.snapshotLength; i++) {
        node = textnodes.snapshotItem(i);
        s = node.data;
        for (key in replacements) {
            s = s.replace(regex[key], replacements[key]);
        }
        node.data = s;
    }
})();