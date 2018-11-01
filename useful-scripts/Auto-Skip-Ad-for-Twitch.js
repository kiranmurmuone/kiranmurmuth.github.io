var script_name = 'Auto-Skip-Ad-for-Twitch';
var inStreamAd_wait = 5;
var vid_presen = null;
var ads_player = null;
function _check_in_stream_ads() {
	vid_presen = document.querySelector('div.persistent-player.tw-border-radius-none');
	if (typeof vid_presen !== 'undefined' && vid_presen) {
		ads_player = document.querySelector('div.js-ima-ads-container.ima-ads-container video');
		if (typeof ads_player !== 'undefined' && ads_player) {
			if (ads_player.duration && ads_player.src) {
				if (ads_player.currentTime >= (inStreamAd_wait ? inStreamAd_wait + 1 : 0)) {
					ads_player.currentTime = ads_player.duration;
					console.log(script_name + ': in-stream ad skipped.');
				}
			}
		}
	}
}
setInterval(_check_in_stream_ads, 250);
