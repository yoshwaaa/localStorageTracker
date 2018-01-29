var tracker = function(ipAddy) {
	// Scripting for detecting user's browser
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// Safari 3.0+ "[object HTMLElementConstructor]"
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	var browserArray = [isOpera, isFirefox, isSafari, isIE, isEdge, isChrome];

	switch(true) {
	  case isOpera:
	    var userBrowser = 'Opera';
	    break;
	  case isChrome:
	    var userBrowser = 'Chrome';
	    break;
	  case isEdge:
	    var userBrowser = 'Edge';
	    break;
	  case isIE:
	    var userBrowser = 'IE';
	    break;
	  case isSafari:
	    var userBrowser = 'Safari';
	    break;
	  case isFirefox:
	    var userBrowser = 'Firefox';
	    break;
	  default:
	    var userBrowser = 'unable to pull user browser info';
	}

	// End detecting user's browser

	// Scripting for detecting user's screen resolution

	var userHeight = window.screen.availHeight;
	var userWidth = window.screen.availWidth;

	var userResolution = userWidth + " x " + userHeight;

	// End detecting user resolution


	//  Scripting for user metrics tracking - Daralytics
	    var userTagTest = 'User IP: ' + ipAddy + '\nUserBrowser: ' + userBrowser + '\nUser Resolution: ' + userResolution;
	    var testLocalStorage = localStorage.getItem('userMetrics');
	    if (testLocalStorage === null) {
	        localStorage.setItem('userMetrics', userTagTest);
	    }
	//  End user metrics tracking

	//  Scripting for setting time and location for user - Daralytics
	    var userDate = new Date();
	    var userHREF = window.location.href;
	    var userLocation = userDate + " : " + userHREF;
	    var testLocalPage = localStorage.getItem('userPage');
	    if (testLocalPage === null) {
	        localStorage.setItem('userPage', userLocation);
	    } else {
	        var prevUserLocation = localStorage.getItem('userPage');
	        // localStorage.setItem('userPage', currentUserLocation);
	    }
	//  End setting time and location for user

	//  Scripting for defining user visits

	    var currentUnixTime = Math.floor(new Date());
	    var userUnixTime = (localStorage.getItem('userUnix'));
	    if (userUnixTime === null) {
	      localStorage.setItem('userUnix', currentUnixTime);
	      userLocation = "Session 1: \n" + userLocation;
	      localStorage.setItem('userPage', userLocation);
	      localStorage.setItem('userSession', '1');
	      if (userHREF.indexOf('scvn') > -1) {
	        var urlSplit = userHREF.split('?');
	        localStorage.setItem('userAdwords', 'The first visit came from an Adwords Campaign');
	      } else {
					localStorage.setItem('userAdwords', 'This is an organic visitor');
				}
	    } else {
	      var timeDifference = currentUnixTime - userUnixTime;
	      if (timeDifference > 1800000) {
	        var userSessionNumber = localStorage.getItem('userSession');
	        var userSessionNumber = parseInt(userSessionNumber) + 1;
	        localStorage.setItem('userSession', userSessionNumber);
	        localStorage.setItem('userUnix', currentUnixTime);
	        var currentUserLocation = prevUserLocation + "\n" + "Session " + userSessionNumber + ": \n" + userLocation;
	        localStorage.setItem('userPage', currentUserLocation);
	        localStorage.setItem('userPage', currentUserLocation);
	      } else {
	        localStorage.setItem('userUnix', currentUnixTime);
	        currentUserLocation = prevUserLocation + '\n' + userLocation;
	        localStorage.setItem('userPage', currentUserLocation);
	      }
	    }

			// Types of localStorage objects set: userUnix, userPage, userMetrics, userSession, userAdwords
	// End defining user visits

};
