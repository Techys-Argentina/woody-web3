ig.module(
    'ads.chartboost'
)
.requires(
	'impact.impact',
    'impact.game'
)
.defines(function(){

	Chartboost = ig.Class.extend({
		init: function() {
			this.bannerAutoShow=false;
			this.serviceChartboost =  window.chartboost;
			this.serviceChartboost.setUp(Ads.idInterstitialChartboost, Ads.signatureInterstitialChartboost);
			// this.serviceChartboost.configure({
				// ios: {
					// appId:"4ed254a3cb5015e47c000000",
					// appSignature:"91858cc162b56414ca47e63ce7a1b20105c70e65"
				// },
				// android: {
					// appId:Ads.idInterstitialChartboost,
					// appSignature:Ads.signatureInterstitialChartboost
				// }
			// });	
			//this.interstitialChartboost = this.serviceChartboost.preloadInterstitialAd('Default');
			this.listenersChartboost();
		},	
		loadInterstitial: function(){
			this.serviceChartboost.preloadInterstitialAd('Default');
		},
		showInterstitial: function(){
			this.serviceChartboost.showInterstitialAd('Default');
		},
		listenersChartboost: function(){
			//Configure banner listeners
			var esto=this;
			esto.serviceChartboost.onInterstitialAdPreloaded = function(location) {
				alert('onInterstitialAdPreloaded: ' + location);
			};
			esto.serviceChartboost.onInterstitialAdLoaded = function(location) {
				alert('onInterstitialAdLoaded: ' + location);
			};
			esto.serviceChartboost.onInterstitialAdShown = function(location) {
				alert('onInterstitialAdShown: ' + location);
			};
			esto.serviceChartboost.onInterstitialAdHidden = function(location) {
				alert('onInterstitialAdHidden: ' + location);
			};
			//
			esto.serviceChartboost.onMoreAppsAdPreloaded = function(location) {
				alert('onMoreAppsAdPreloaded: ' + location);
			};
			esto.serviceChartboost.onMoreAppsAdLoaded = function(location) {
				alert('onMoreAppsAdLoaded: ' + location);
			};
			esto.serviceChartboost.onMoreAppsAdShown = function(location) {
				alert('onMoreAppsAdShown: ' + location);
			};
			esto.serviceChartboost.onMoreAppsAdHidden = function(location) {
				alert('onMoreAppsAdHidden: ' + location);
			};
			//
			esto.serviceChartboost.onRewardedVideoAdPreloaded = function(location) {
				alert('onRewardedVideoAdPreloaded: ' + location);
			};
			esto.serviceChartboost.onRewardedVideoAdLoaded = function(location) {
				alert('onRewardedVideoAdLoaded: ' + location);
			};
			esto.serviceChartboost.onRewardedVideoAdShown = function(location) {
				alert('onRewardedVideoAdShown: ' + location);
			};
			esto.serviceChartboost.onRewardedVideoAdHidden = function(location) {
				alert('onRewardedVideoAdHidden: ' + location);
			};	
			esto.serviceChartboost.onRewardedVideoAdCompleted = function(location) {
				alert('onRewardedVideoAdCompleted: ' + location);
			};
		},
	});
});