ig.module(
    'ads.admob'
)
.requires(
	'impact.impact',
    'impact.game'
)
.defines(function(){

Admob = ig.Class.extend({
    init: function() {
		this.bannerAutoShow=false;
		this.serviceAdmob = admob;
		this.serviceAdmob.banner.config({
			id: Ads.idBannerAdmob,
			isTesting: false,
			autoShow: true,
			size:'BANNER'
		});
		this.serviceAdmob.banner.prepare();
		this.serviceAdmob.interstitial.config({
			id: Ads.idInterstitialAdmob,
			isTesting: false,
			autoShow: true,
		});
		this.serviceAdmob.interstitial.prepare();
		this.serviceAdmob.rewardvideo.config({
			id: Ads.idVideoRewardAdmob,
		});
		this.serviceAdmob.rewardvideo.prepare();
			// ios: {
				 // banner:"ca-app-pub-8611511050738820/4620134396",
				 // bannerIpad:"", //optional
				 // interstitial:"ca-app-pub-8611511050738820/6096867598",
				 // interstitialIpad:"", //optional
			// },
			// android: {
				 // banner:Ads.idBannerAdmob,
				 // interstitial:Ads.idInterstitialAdmob,
				 // videoReward:Ads.idVideoRewardAdmob
			// }
		// });	
		// this.bannerAdmob = this.serviceAdmob.createBanner(Ads.idBannerAdmob,Cocoon.Ad.BannerSize.BANNER);
		// this.interstitialAdmob = this.serviceAdmob.createInterstitial(Ads.idInterstitialAdmob);
		// this.videoRewardAdmob = this.serviceAdmob.createRewardedVideo(Ads.idVideoRewardAdmob);
		this.fetchedRewardedVideo = false;
		this.listenersAdmob();
		//this.bannerAdmob.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
		this.fetchRewardedVideo();
		this.currentTag = "";
	},	
	loadBanner: function(){
		this.serviceAdmob.banner.prepare();
	},
	showBannerInGame: function(){
		// this.bannerAdmob.setLayout(Cocoon.Ad.BannerLayout.TOP_CENTER);
		this.serviceAdmob.banner.show();
	},
	showBanner: function(){
		// this.bannerAdmob.setLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
		this.serviceAdmob.banner.show();
	},
	fetchRewardedVideo: function(){
		this.serviceAdmob.rewardvideo.prepare();
	},
	showRewardedVideo: function(tag){
		this.currentTag=tag;
		if(this.fetchedRewardedVideo){
			ig.music.stop();
			this.serviceAdmob.rewardvideo.show();
			 
		}
		this.fetchRewardedVideo();
	},
	showComplete: function(tag){
		Ads.reward(tag);
	},
	hideBanner: function(){
		this.serviceAdmob.banner.hide();
	},
	loadInterstitial: function(){
		this.serviceAdmob.interstitial.prepare();
	},
	showInterstitial: function(){
		this.serviceAdmob.interstitial.show();
		
	},
	listenersAdmob: function(){
		//Configure banner listeners
		var esto=this;
		document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
			console.log(event);
		});
		document.addEventListener('admob.banner.events.LOAD', function(event) {
			if(esto.bannerAutoShow){
				esto.showBanner();
				esto.bannerAutoShow=false;
			}
		});

		document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
			console.log(event)
		});

		document.addEventListener('admob.interstitial.events.LOAD', function(event) {
			console.log(event);
		})

		document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
			console.log(event);
			admob.interstitial.prepare();
		});
		
		// this.bannerAdmob.on("load", function(){
		  // //console.log("Banner admob loaded " + esto.bannerAdmob.width, esto.bannerAdmob.height);
		   // if(esto.bannerAutoShow){
				// esto.showBanner();
				// esto.bannerAutoShow=false;
			// }
		// });
		// this.bannerAdmob.on("fail", function(){
			// //console.log("Banner admob failed to load");
		// });
		// this.bannerAdmob.on("show", function(){
		  // //console.log("Banner admob shown a modal content");
		// });
		// this.bannerAdmob.on("dismiss", function(){
		  // //console.log("Banner admob dismissed the modal content");
		// });
		// this.bannerAdmob.on("click", function(){
		   // //console.log("Banner admob clicked");
		// });
		
		// //Configure interstitial listeners
		// this.interstitialAdmob.on("load", function(tag){
			// //console.log("Interstitial admob loaded");
			// //show interstitial
		// });
		// this.interstitialAdmob.on("fail", function(){
			// //console.log("Interstitial admob failed");
		// });
		// this.interstitialAdmob.on("show", function(){
			// //console.log("Interstitial admob shown");
		// });
		// this.interstitialAdmob.on("dismiss", function(){
			// //console.log("Interstitial admob dismissed");
		// });
		// this.interstitialAdmob.on("click", function(){
			// //console.log("Interstitial admob clicked");
		// });
		
		//Configure video Reward listeners
		document.addEventListener('admob.rewardvideo.events.LOAD', function(event) {
			Ads.admob.fetchedRewardedVideo=true;
			fetchedRewardedVideo = true;
		});
		document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function(event) {
			Ads.admob.fetchedRewardedVideo=false;
			fetchedRewardedVideo = false;
		});
		document.addEventListener('admob.rewardvideo.events.REWARD', function(event) {
			Ads.admob.showComplete(Ads.admob.currentTag);
			Ads.admob.fetchedRewardedVideo=false;
			fetchedRewardedVideo = false;
		});
		// this.videoRewardAdmob.on("show", function(){
			// //alert("Interstitial admob showed");
			// //this.showComplete(tag);
		// });
		// this.videoRewardAdmob.on("dismiss", function(){
		// });
		// this.videoRewardAdmob.on("click", function(){
		// });
		// this.videoRewardAdmob.on("reward", function(reward, error){
			// if(error==null){
				// esto.showComplete(esto.currentTag);
			// }
			// esto.fetchedRewardedVideo=false;
		// });
	},
});
});