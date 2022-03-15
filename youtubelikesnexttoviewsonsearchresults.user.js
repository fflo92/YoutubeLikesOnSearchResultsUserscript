// ==UserScript==
// @name         Youtube video likes next to views on search results
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       fflo92
// @match        https://www.youtube.com/results*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var getVideos = function() {
        var contents = document.querySelectorAll('div#contents[class="style-scope ytd-item-section-renderer"]');
        return contents[0].children;
    }

    var run = function() {
        var videos = getVideos();
        for (var i=0; i<videos.length; i++) {
            var video = videos[i];
            console.log(video);
        }
    }

    setTimeout(run, 3000);
})();