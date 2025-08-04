ig.module(
    'ads.ads'
)
.requires(
	'impact.impact',
    'impact.game',
	'ads.admob',
	'ads.chartboost',
	'ads.fbAdsNet',
	'ads.heyzap',
	'ads.inapps',
	'game.entities.popups.popupInterstitial'
)
.defines(function(){

Ads = ig.Class.extend({
	staticInstantiate: function() {
		Ads = this;
		return null;
	},
    init: function() {
		this.instAdNet=1;
		this.bannerAdNet=1;
		this.isAppForeground = false;
		this.ordenAds=[1,2,3];
		this.ordenAdsBanner=[1,2];
		this.bannerLoaded=false;
		// this.idInterstitialFbAds="1795987064011679_1795987300678322";
		// this.idBannerFbAds="1558977927688601_1665100007076392";
		// this.HeyzapId="71b4855ed7a221c186dba3d157fc6ad0";
		this.idBannerAdmob="ca-app-pub-9774593576325626/1046218791";
		this.idInterstitialAdmob="ca-app-pub-9774593576325626/2522951997";
		this.idVideoRewardAdmob="ca-app-pub-9774593576325626/8867924057";
		
		this.idInterstitialChartboost="5a034917248e170ec325c945";
		this.signatureInterstitialChartboost="ccaaa7d5a1d5aeeabe8363040245af2279bae9cc";
		
		// this.fbAdsNet=new FbAdsNet();
		// this.heyzap=new Heyzap();
		//alert("startads");
		//admob
		if (admob) {
			var adPublisherIds = {
				ios : {
					banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
					rewarded: "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII",
					interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
				},
				android : {
					banner : "ca-app-pub-9774593576325626/1046218791",
					rewarded: "ca-app-pub-9774593576325626/8867924057",
					interstitial : "ca-app-pub-9774593576325626/2522951997"
				}
			};

			var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

			admob.setOptions({
				publisherId:      admobid.banner,
				rewardedId:       admobid.rewarded,
				interstitialAdId: admobid.interstitial,
				autoShowRewarded: false,
				autoShowInterstitial: false
			});

			document.addEventListener(admob.events.onAdLoaded, this.onAdLoaded);
			document.addEventListener(admob.events.onRewardedAd, this.onRewardedAd);
			document.addEventListener(admob.events.onRewardedAdVideoStarted, this.onRewardedAdVideoStarted);
			document.addEventListener(admob.events.onRewardedAdVideoCompleted, this.onRewardedAdVideoCompleted);
			document.addEventListener(admob.events.onAdClosed, this.onAdClosed);

			document.addEventListener("pause", this.onPause, false);
			document.addEventListener("resume", this.onResume, false);
			
			// Start showing banners (will show atomatically as autoShowBanner is set to true by default)
			//admob.createBannerView();
      
			// Request interstitial (will present automatically as autoShowInterstitial is set to true by default)
			//admob.requestInterstitialAd();
			
			//admob.requestRewardedAd();
		} 
		else {
			alert('AdMobAds plugin not ready');
		}
		//alert("startadsend");
		//admob
		
		this.chartboost=null;//se incializa por separado
		
		this.inApps=new InApps();
		this.crossPromotionBaseLnk='market://details?id=';
		this.crossPromotionBaseStorage='img/ads/cross_promotion/';
		this.porcInterstitialShow=40;
		this.initChartBoostFlag=false;
    },
	onPause: function() {
		if (this.isAppForeground) {
			admob.destroyBannerView();
			this.isAppForeground = false;
		}
	},
	onResume:function() {
		if (!this.isAppForeground) {
			setTimeout(admob.requestRewardedAd, 1);
			this.isAppForeground = true;
		}
	},
	onAdLoaded: function(e) {
		if (this.isAppForeground) {
			if (e.adType === admob.AD_TYPE.REWARDED) {
				admob.showRewardedAd();
			}
			if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
				admob.showInterstitialAd();
			}
		}
	},
	onRewardedAd: function(e) {
		if (this.isAppForeground) {
			if (e.adType === admob.AD_TYPE.REWARDED) {
				setTimeout(admob.requestRewardedAd, 1000 * 60 * 2);
				console.log('The user has been rewarded! Please unlock feature in your app, give present, live, coins, whatever you promised him/her');
			}
		}
	},
	onRewardedAdVideoStarted: function(e) {
		if (this.isAppForeground) {
			if (e.adType === admob.AD_TYPE.REWARDED) {
				console.log('Rewarded video just started now');
			}
		}
	},
	onRewardedAdVideoCompleted: function(e) {
		if (this.isAppForeground) {
			if (e.adType === admob.AD_TYPE.REWARDED) {
				console.log('Rewarded video just finished now');
			}
		}
	},
	onAdClosed: function(e) {
		if (this.isAppForeground) {
			if (e.adType === admob.AD_TYPE.REWARDED) {
				setTimeout(admob.requestRewardedAd, 1000 * 60 * 2);
			}
			if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
				setTimeout(admob.requestInterstitialAd, 1000 * 60 * 2);
			}
		}
	},	
	initChartBoost: function(){
		var esto = this;
		if(lStorage.get('setupAds')!=null&&lStorage.get('ChartboostTestInit')==null){
			lStorage.get('setupAds').forEach(function(item, index) {
				if(item.charboost_camp_perc!=null){
					var nr = Math.floor(Math.random() * 100) + 1;  
					if(nr<=parseInt(item.charboost_camp_perc)){
						esto.chartboost=new Chartboost();
						esto.initChartBoostFlag=true;
					}
					lStorage.set('ChartboostTestInit',(esto.initChartBoostFlag)?1:0);
				}
			});
		}
		else if(lStorage.get('ChartboostTestInit')==1){
			esto.chartboost=new Chartboost();
			esto.initChartBoostFlag=true;
		}
	},
	showInterstitialChartboost: function(){
		this.chartboost.showInterstitial();
	},
	loadBanner: function(reload){
		if(reload === undefined)
			this.bannerAdNet=1;
		//admob.loadBanner(); //la precarga de Heyzap de los interstitals es automática, pre-cargo el sigiente por si falla el show
	},
	showBanner: function(){		
		admob.createBannerView();
	},
	hideBanner: function(){
		admob.destroyBannerView();
	},
	loadInterstitial: function(reload){
		// if(reload === undefined&&this.instAdNet<2)
			// this.instAdNet++;
		// switch(this.instAdNet) {
			// case this.ordenAds[0]:
				// this.fbAdsNet.loadInterstitial();
				// break;
			// case this.ordenAds[1]:
				admob.requestInterstitialAd();
				// break;
			// case this.ordenAds[2]:
				// this.admob.loadInterstitial();
				// break;
		// }			
	},
	showInterstitial: function(){
		if(this.initChartBoostFlag){
			this.showInterstitialChartboost();
			this.initChartBoostFlag=false;
		}
		else{
			// switch(this.instAdNet) {
				// case this.ordenAds[0]:
					// this.fbAdsNet.showInterstitial();
					// break;
				// case this.ordenAds[1]:
					// this.heyzap.showInterstitial();
					// break;
				// case this.ordenAds[2]:
					admob.showInterstitialAd();
					// break;			
			// }
		}
	},
	showInterstitialInternal: function(callBack){
		var showedInterstitialInternal=false;
		ig.game.pause=true;
		if(this.getCrossPromotionInterstitial(callBack)){
			showedInterstitialInternal=true;
		}
		return showedInterstitialInternal;
	},
	fetchRewardedVideo: function(tag){
		// this.heyzap.fetchRewardedVideo(tag);
		admob.requestRewardedAd(tag);
	},
	showRewardedVideo: function(tag){
		// if(!this.heyzap.showRewardedVideo(tag)){
			admob.showRewardedVideo(tag);
		// }
	},
	getInterstitialType: function(){
		var esto=this;
		if(lStorage.get('setupAds')!=null){
			lStorage.get('setupAds').forEach(function(item, index) {
				if(item.cross_prom_perc!=null){
					esto.porcInterstitialShow=item.cross_prom_perc;
				}
			});
		}
		var rndResult=Math.floor(Math.random() * 100);
		return(rndResult<this.porcInterstitialShow)?0:1;
	},
	setCrossPromotionBubble: function(){
		var esto=this;
		var showAd=false;
		if(lStorage.get('crossPromotionAds')!=null){
			lStorage.get('crossPromotionAds').forEach(function(item, index) {//check if priority exists
				if(item.priority&&(lStorage.get('crossPromDown').split(',')).indexOf(item.id)<0&&item.enable&&item.type=='link'){
					showAd=true;
					esto.buildCrossPromotionBubble(item);
				}
			});
			if(!showAd){
				var ad = lStorage.get('crossPromotionAds')[Math.floor(Math.random()*lStorage.get('crossPromotionAds').length)];//RANDOM
				if((lStorage.get('crossPromDown').split(',')).indexOf(ad.id)<0&&!showAd&&ad.enable&&ad.type=='link'){
					showAd=true;
					esto.buildCrossPromotionBubble(ad);
				}
			}
		}
		return showAd;
	},
	buildCrossPromotionBubble: function(obj){
		crossPromLink=this.crossPromotionBaseLnk+obj.id;
		//crossPromImg=obj.img_url; //mod temporal
		if(crossPromImg!=null){
			btn_crossPromotion=ig.game.spawnEntity( EntityBtn_crossPromotion, 20, 280, {animSheet: new ig.AnimationSheet( crossPromImg, 80, 80 ),		
				sound:true,								
				pressedUp: function(){
					if (obj.type=='link'){
						window.open(crossPromLink, '_blank', 'location=yes');
					}
					else{
						Ads.inApps.purchaseTest(obj.id,1);
					}
				},
			});
		}
	},
	getCrossPromotionInterstitial: function(callBack){
		var esto=this;
		var showAd=false;
		if(lStorage.get('crossPromotionAds')!=null){
			lStorage.get('crossPromotionAds').forEach(function(item, index){
				if(item.priority&&(lStorage.get('crossPromDown').split(',')).indexOf(item.id)<0&&item.enable){
					showAd=true;
					esto.showCrossPromotionInterstitial(item,callBack);
				}
			});
			if(!showAd){
				var ad=lStorage.get('crossPromotionAds')[Math.floor(Math.random()*lStorage.get('crossPromotionAds').length)];//RANDOM
				if((lStorage.get('crossPromDown').split(',')).indexOf(ad.id)<0&&!showAd&&ad.enable){
					showAd=true;
					esto.showCrossPromotionInterstitial(ad,callBack);
				}
			}
		}
		return showAd;
	},
	showCrossPromotionInterstitial: function(obj,callBack){
		var esto=this;
		var crossPromInstLink=this.crossPromotionBaseLnk+obj.id;
		crossPromImgLarge=obj.img_large_url;
		var inters = ig.game.spawnEntity( EntityPopupInterstitial, 0, 0, {
			animSheet: new ig.AnimationSheet(crossPromImgLarge,780 , 480 ),
			confirm: function(){
				if (obj.type=='link'){
					window.open(crossPromInstLink, '_blank', 'location=yes');
					if(lStorage.get('crossPromDown').length>0)
						lStorage.set('crossPromDown',lStorage.get('crossPromDown')+','+obj.id);
					else
						lStorage.set('crossPromDown',obj.id);
				}
				else{
					Ads.inApps.purchaseTest(obj.id,1);
				}
				callBack();
			},
			cancel: function(){
				callBack();
			},
		});
		return true;
	},
	reward: function(tag){
		//alert("LISTENER COMPLETE: " + tag);
		if (tag == "game-over") {
			this.gameOverReward();
		}
		else if(tag == 'free-coins'){
			this.freeCoinsReward();
		}
		else if(tag == 'free-life'){
			this.freeLifeReward();
		}
		else if(tag.split('_')[0] == 'montura'){
			this.monturaReward(tag);
		}
		ig.game.videoReward = true;
	},
	freeCoinsReward: function(){
		lStorage.set('monedas', lStorage.get('monedas')+100);
		sounds[0].play();
	},
	gameOverReward:function(){
		ig.game.screenFader = new ig.ScreenFader({ 
			fade: 'in', 
			speed: 1, 
			callback: function (){
					lStorage.set('nivelesSkipeados', lStorage.get('nivelesSkipeados')+','+currentLevel);
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
					lStorage.set('nivel'+currentWorld,currentLevel);
					lStorage.set('vidas',3);
					ig.system.setGame(MyGame);
					lStorage.set('nivelSkipLevel', currentLevel);
				}							
		});
	},
	freeLifeReward:function(){
		lStorage.set('vidas', lStorage.get('vidas')+1);
		sounds[2].play();
	},
	monturaReward: function(tag){
		lStorage.set('montura'+tag.split('_')[1],new Date().valueOf()-1);
		sounds[2].play();
	},
});
});