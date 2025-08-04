ig.module(
    'ads.heyzap'
)
.requires(
	'impact.impact',
    'impact.game'
)
.defines(function(){

	Heyzap = ig.Class.extend({
		init: function() {
			var esto=this;
			HeyzapAds.start(Ads.HeyzapId).then(function() {
				esto.listeners();
			}, function(error) {
				//console.log('error heyzap');
			});
		},
		showInterstitial: function(){
			HeyzapAds.InterstitialAd.show().then(function() {
				ig.game.pause=true;
				ig.music.pause();
				//console.log('Show heyzap interstitial');
			}, function(error) {
				//alert(error);
				Ads.instAdNet=3;
				Ads.loadInterstitial();
				Ads.showInterstitial();				
			});
		},	
		showBanner: function(){	
			HeyzapAds.BannerAd.show(
				HeyzapAds.BannerAd.POSITION_BOTTOM,
				new HeyzapAds.BannerAd.Options({
					facebookBannerSize: HeyzapAds.BannerAd.Options.FacebookBannerSize.SIZE_320_50,
					admobBannerSize: HeyzapAds.BannerAd.Options.AdMobBannerSize.STANDARD
     			})
			).then(function() {
			  //console.log('banner Heyzap loaded');

			}, function(error) {
				Ads.bannerAdNet=2;
				Ads.loadBanner();	
			});
		},	
		hideBanner: function(){
			HeyzapAds.BannerAd.hide().then(function() {
			  // Native call successful.

			}, function(error) {
			  // Handle Error

			});
		},
		listeners: function(){
			var esto=this;
			HeyzapAds.IncentivizedAd.addEventListener(HeyzapAds.IncentivizedAd.Events.COMPLETE,  // Listener video rewarded complete
				function(tag) {
					esto.showComplete(tag);
					HeyzapAds.IncentivizedAd.fetch(tag);
					if(!this.pause&&lStorage.get('music'))
						ig.music.play();
				}
			);
			HeyzapAds.IncentivizedAd.addEventListener(HeyzapAds.IncentivizedAd.Events.INCOMPLETE,
				function(tag) {
					if(!this.pause&&lStorage.get('music'))
						ig.music.play();
					//console.log("LISTENER INCOMPLETE: " + tag);
				}
			);
		},
		showComplete: function(tag){
			Ads.reward(tag);
		},
		fetchRewardedVideo: function(tag){
			HeyzapAds.IncentivizedAd.fetch(tag).then(function() {
				if(tag == 'game-over')fetchedRewardedVideoGameOver=true;
				if(tag == 'free-coins'||tag == 'free-life')fetchedRewardedVideoFreeCoins=true;
				if(tag == 'montura')fetchedRewardedVideoFreeMount=true;
			}, function(error) {
				if(tag == 'game-over')fetchedRewardedVideoGameOver=false;
				if(tag == 'free-coins'||tag == 'free-life')fetchedRewardedVideoFreeCoins=false;
				if(tag == 'montura')fetchedRewardedVideoFreeMount=false;
			});
		},
		showRewardedVideo: function(tag){
			var esto=this;
			ig.game.pause=true;
			ig.music.pause();
			if((tag == 'game-over'&&fetchedRewardedVideoGameOver)||(tag == 'free-coins'&&fetchedRewardedVideoFreeCoins)||(tag == 'montura')&&fetchedRewardedVideoFreeMount){
				HeyzapAds.IncentivizedAd.show(tag).then(function(){}, function(error){Ads.admob.showRewardedVideo(tag);});
				return true;
			}
			else
				return false;
		},
	});
});