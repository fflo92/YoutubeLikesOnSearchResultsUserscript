// ==UserScript==
// @name         Youtube video likes next to posted date on search results
// @namespace    http://tampermonkey.net/
// @description  nothing
// @version      0.1
// @author       fflo92
// @match        https://www.youtube.com/results*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var getVideos = function() {
        var contents = document.querySelectorAll('div#contents[class="style-scope ytd-item-section-renderer"]');
        return contents[0].children;
    }

    var getPostedDate = function(video) {
        var metadata = video.querySelector('div#metadata[class="style-scope ytd-video-meta-block"]');
        return metadata ? metadata.children[1] : null;
    }

    var getVideoLink = function(video) {
        var title = video.querySelector('a#video-title');
        var href = title.getAttribute('href');
        return 'https://www.youtube.com' + href;
    }
    
    var getPage = function(url, callback) {
        GM_xmlhttpRequest({
            method:     'GET',
            url:        url,
            onload:     callback
        });
    }

    var getLikes = function(response) {
        var pageSource = response.responseText;
        var rightAnchor = ' likes"}';
        var leftAnchor = '"label":"';
        var rightIdx = pageSource.indexOf(rightAnchor);
        var chunk = pageSource.substring(rightIdx-30, rightIdx);
        var leftIdx = chunk.indexOf('"label":"');
        return chunk.substring(leftIdx + leftAnchor.length)
    }

    var processVideo = function(video) {
        var date = getPostedDate(video);
        if (date) {
            var videoLink = getVideoLink(video);
            getPage(videoLink, function(response) {
                date.append(' '+ getLikes(response) + ' likes');
            });
        }
    }

    var run = function() {
        var videos = getVideos();
        for (var i=0; i<videos.length; i++) {
            var video = videos[i];
            processVideo(video);
        }
    }

    setTimeout(run, 3000);
})();