(function() {
    function applyNightcore(rate) {
        const video = document.querySelector('video');
        if (!video) return;

        video.playbackRate = rate;

        if (rate !== 1.0) {
            video.preservesPitch = false;
            video.mozPreservesPitch = false;
            video.webkitPreservesPitch = false;
        } else {
            video.preservesPitch = true;
            video.mozPreservesPitch = true;
            video.webkitPreservesPitch = true;
        }
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "setNightcore") {
            applyNightcore(request.value);
        }
        if (request.action === "getNightcore") {
            const video = document.querySelector('video');
            const currentRate = video ? video.playbackRate : 1.0;
            sendResponse({ value: currentRate });
        }
    });

    setInterval(() => {
        const video = document.querySelector('video');
        if (video && video.playbackRate !== 1.0 && video.preservesPitch !== false) {
             video.preservesPitch = false;
             video.mozPreservesPitch = false;
             video.webkitPreservesPitch = false;
        }
    }, 1000);
})();