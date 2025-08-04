ig.module(
    'ads.fbAdsNet'
)
.requires(
	'impact.impact',
    'impact.game'
)
.defines(function(){

	FbAdsNet = ig.Class.extend({
		init: function() {
			this.loadInterstitial();
			this.listeners();
		},
		loadInterstitial: function(){
			if(FacebookAds){
				FacebookAds.prepareInterstitial({adId:Ads.idInterstitialFbAds, autoShow:true});
			}
		},
		showInterstitial: function(){
			if(FacebookAds)
				FacebookAds.showInterstitial();
		},
		
		loadBanner: function(){
			if(FacebookAds) FacebookAds.createBanner( {
				adId: Ads.idBannerFbAds, 
				position:FacebookAds.AD_POSITION.BOTTOM_CENTER, 
				autoShow:false} );
		},
		showBanner: function(){
			if(FacebookAds) FacebookAds.showBanner(FacebookAds.AD_POSITION.BOTTOM_CENTER);
		},
		hideBanner: function(){
			if(FacebookAds) FacebookAds.hideBanner();
		},
		
		
		listeners: function(){
			document.addEventListener('onAdFailLoad', function(data) {					
				if(data.adType == 'interstitial'&&Ads.instAdNet==Ads.ordenAds[0]){
					//alert('FbAds inster Data type: ' + data.adType + ' error: ' + data.error + ', reason: ' + data.reason);
					Ads.instAdNet=2;
					Ads.loadInterstitial(false);
				}
				else if(data.adType == 'interstitial'&&Ads.instAdNet==Ads.ordenAds[1]){ // esto es heyzap
					//alert('Heyzap inster Data type: ' + data.adType + ' error: ' + data.error + ', reason: ' + data.reason);
					Ads.instAdNet=3;
					Ads.loadInterstitial(false);
				}
				else if(data.adType == 'banner'&&Ads.bannerAdNet==Ads.ordenAdsBanner[0]){
					//console.log('FbAds banner Data type: ' + data.adType + ' error: ' + data.error + ', reason: ' + data.reason);
					Ads.bannerAdNet=2;
					Ads.bannerLoaded=false;
					Ads.loadBanner(false);
				}
			});
			document.addEventListener('onAdLoaded',function(data) {
				if (data.adType == 'banner'&&Ads.bannerAdNet==Ads.ordenAdsBanner[0]) {
					//console.log('cargo fb banner');
					Ads.bannerLoaded=true;
				}
			});
		},
		
	});

});