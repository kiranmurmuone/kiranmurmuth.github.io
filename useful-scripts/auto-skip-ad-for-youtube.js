var SCRIPT_NAME = 'Auto-Skip-Ad-for-YouTube';
var SEC_WAIT = 5;
var videoUrl;
function waitForElems(sel, action, stopLooking) {
	var tick;
	var id = 'fke' + Math.floor(Math.random() * 12345);
	var type = window.MutationObserver ? 'M' : 'S';
	var lastMutation = Date.now();
	var lastCall = Date.now();
	var queuedCall;
	function throttle(func) {
		var now = Date.now();
		clearTimeout(queuedCall);
		if (now - lastMutation < 100) {
			if (now - lastCall >= 500) {
				func();
			} else {
				queuedCall = setTimeout(func, 100);
			}
		} else {
			func();
		}
		lastMutation = now;
	}
	function findElem(sel) {
		lastCall = Date.now();
		var found = [].filter.call(document.querySelectorAll(sel), function (elem) {
			return elem.dataset[id] !== 'y';
		});
		if (found.length > 0) {
			if (stopLooking) {
				type === 'M' ? tick.disconnect() : clearInterval(tick);
			}
			found.forEach(function (elem) {
				elem.dataset[id] = 'y';
				action(elem);
			});
		}
	}
	if (type === 'M') {
		tick = new MutationObserver(throttle.bind(null, findElem.bind(null, sel)));
		tick.observe(document.body, {
			subtree: true,
			childList: true
		});
	} else {
		tick = setInterval(findElem.bind(null, sel), 300);
	}
	findElem(sel);
	return {
		type: type,
		stop: function () {
			if (type === 'M') {
				tick.disconnect();
			} else {
				clearInterval(tick);
			}
		}
	};
}
function waitForUrl(regex, action, stopLooking) {
	function checkUrl(urlTest) {
		var url = window.location.href;
		if (url !== lastUrl && urlTest(url)) {
			if (stopLooking) {
				clearInterval(tick);
			}
			lastUrl = url;
			action();
		}
		lastUrl = url;
	}
	var urlTest = (typeof regex === 'function' ? regex : regex.test.bind(regex)),
		tick = setInterval(checkUrl.bind(null, urlTest), 300),
		lastUrl;
	checkUrl(urlTest);
	return tick;
}
var Util = {
	log: function () {
		var args = [].slice.call(arguments);
		args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: purple;');
		console.log.apply(console, args);
	},
	clearTicks: function (ticks) {
		ticks.forEach(function (tick) {
			if (typeof tick === 'number') {
				clearInterval(tick);
			} else {
				tick.stop();
			}
		});
		ticks.length = 0;
	},
	keepTrying: function (wait, action) {
		var tick = setInterval(function () {
			if (action()) {
				clearInterval(tick);
			}
		}, wait);
	},
	q: function (query, context) {
		return (context || document).querySelector(query);
	}
};
var ticks = [];
function waitForAds() {
	ticks.push(
		waitAndClick('.videoAdUiSkipButton', function (btn) {
			Util.keepTrying(1000, function () {
				btn.click();
				if (!Util.q('.videoAdUiSkipButton')) {
					return true;
				}
			});
		}),
		waitAndClick('.close-padding.contains-svg,a.close-button')
	);
}
function waitAndClick(sel, cb, extraWait) {
	return waitForElems(sel, function (btn) {
		Util.log('Found ad, closing in', SEC_WAIT, 'seconds');
		setTimeout(function () {
			btn.click();
			if (cb) {
				cb(btn);
			}
		}, SEC_WAIT * 1000 + (extraWait || 0));
	});
}
Util.log('Started');
if (window.self === window.top) {
	waitForUrl(/^https:\/\/www\.youtube\.com\/watch\?.*v=.+/, function () {
		if (videoUrl && location.href !== videoUrl) {
			Util.log('Changed video, removing old wait');
			Util.clearTicks(ticks);
		}
		videoUrl = location.href;
		Util.log('Entered video, waiting for ads');
		waitForAds();
		ticks.push(
			waitForUrl(function (url) {
				return url !== videoUrl;
			}, function () {
				videoUrl = null;
				Util.clearTicks(ticks);
				Util.log('Left video, stopped waiting for ads');
			}, true)
		);
	});
} else {
	if (/https:\/\/www\.youtube\.com\/embed\//.test(location.href)) {
		Util.log('Found embedded video, waiting for ads');
		waitForAds();
	}
}
