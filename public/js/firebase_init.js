	var crossPromotionBaseStorage='img/ads/cross_promotion/';
	  // Initialize Firebase
	var config = {
		apiKey: "AIzaSyAdWPuVXJCKHC5jLfyEQECU468kmEtoyqg",
		authDomain: "super-woody-54f99.firebaseapp.com",
		databaseURL: "https://super-woody-54f99.firebaseio.com",
		projectId: "super-woody-54f99",
		storageBucket: "super-woody-54f99.appspot.com",
		messagingSenderId: "131755305669"
		};
		if (!firebase.apps.length) {
			console.log("firebase init");
			firebase.initializeApp(config);
		}
	
	//stats, promotions and inapps
	var arrLinks = firebase.database().ref().once('value').then(function(snapshot) {
		var showAd=false;
		var crossPromotionAds=[];
		var giftCodes=[];
		var setup=[];
		var keysGifts=Object.keys(snapshot.val()["gifts"]);
		var objectsGifts=snapshot.val()["gifts"];
		var keys=Object.keys(snapshot.val()["ad_links"]);
		var objects=snapshot.val()["ad_links"];
		var keysSetup=Object.keys(snapshot.val()["setup_ads"]);
		var objectsSetup=snapshot.val()["setup_ads"];
		keys.forEach(function(key){
			var storage = firebase.storage();
			var storageRef = storage.ref();
			var imgRef = storageRef.child(crossPromotionBaseStorage+objects[key].img);
			imgRef.getDownloadURL().then(function(url_b) {
				if(url_b!=null)
					objects[key].img_url=url_b;
				var imgRef2 = storageRef.child(crossPromotionBaseStorage+objects[key].img_large);
				imgRef2.getDownloadURL().then(function(url_i) {
					if(url_i!=null)
						objects[key].img_large_url=url_i;
					crossPromotionAds.push(objects[key]);
					if(crossPromotionAds.length==keys.length){
						//initial settings for Bubble
						localStorage.setItem('crossPromotionAds',JSON.stringify(crossPromotionAds));
						Ads.setCrossPromotionBubble();
					}
				}).catch(function(error) {
					console.log("The get URL image failed: " + error.code);
				});
			}).catch(function(error) {
					console.log("The get URL image failed: " + error.code);
			});
		});
		keysGifts.forEach(function(key){
			giftCodes.push(objectsGifts[key]);
			if(giftCodes.length==keysGifts.length){
				localStorage.setItem('giftCodes',JSON.stringify(giftCodes));
			}
		});
		keysSetup.forEach(function(key){
			setup.push(objectsSetup[key]);
			if(setup.length==keysSetup.length){
				localStorage.setItem('setupAds',JSON.stringify(setup));
				//Ads.initChartBoost();
			}
		});
	}, function (error) {
		alert("The remote data is not available: " + error.code);
	});