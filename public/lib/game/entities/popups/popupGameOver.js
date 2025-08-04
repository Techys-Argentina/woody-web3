ig.module(
    'game.entities.popups.popupGameOver'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupGameOver = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/popups/tabla-pause2.png',537,475),
		imgTop:new ig.Image('media/img/popups/text-sprite.jpg'),
		size:{x:537, y:475},
		center:true,
		animacionVertical:true,		
		btn_resume:null,
		btn_menu:null,
		keepConsole:true,
		end:true,
		enableBanner:true,
        //Constructor
        inicia: function() {
            this.parent();	
			var esto=this;
			var showButton = false;
			//mod por errores 13/07
			lStorage.set('posPierdeX',null);
			lStorage.set('posPierdeY',null);
			//mod por errores 13/07
			if(ig.ua.mobile&&this.enableBanner)
				Ads.showBanner();
			if(ig.ua.mobile&&fetchedRewardedVideo&&lStorage.get('nivel_1')==currentLevel&&navigator.onLine){ //boton skipLevel (siempre)
				var ultimoSkip= lStorage.get('nivelSkipLevel');
				if((parseInt(ultimoSkip.split("_")[0]) < parseInt(currentLevel.split("_")[0])) || (parseInt(ultimoSkip.split("_")[1])<(parseInt(currentLevel.split("_")[1])-1))){ // tiene que haber pasado de mundo o dos niveles para mostrar el skip
					showButton=true;
					var entsEnemy=ig.game.getEntitiesByType( EntityEnemigo );
					var entsFin=ig.game.getEntitiesByType( EntityFin );				
					for(i=0;i<entsEnemy.length;i++){
						if(entsEnemy[i].stageClear)
							showButton=false;
					}
					for(i=0;i<entsFin.length;i++){
						if(entsFin[i].newWorld!=null||entsFin[i].endWorld!=null||entsFin[i].endGame!=null)
							showButton=false;
					}
					if(showButton){
						this.btn_skiplevel=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/popups/skip-level.png', 265, 84 ),
						size:{x:265, y:84},	
						idParent:esto.id,
						posX:this.pos.x+257,
						posY:this.pos.y+350,
						noFix:true,
						onPopup:true,						
						pressedUp: function(){
							soundButton.play();
							Ads.showRewardedVideo('game-over');
							},				
						});
					}
				}
			}
			else if(ig.ua.mobile&&lStorage.get('nivel_1')==currentLevel&&navigator.onLine)
				Ads.fetchRewardedVideo();
			ig.game.showFbAd=true;
			
			var compensacionSkipLevel = (showButton)?-50:0
			
			btn_pause.pressedUp = function(){
				soundButton.play();
				ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });
				if(random||infinite)
					ig.system.setGame(MyGame);
				else
					ig.game.player.initPlayerPos();
				ig.game.player.health = 3;
				lStorage.set('vidas',3);
				esto.kill(true);
				if (ig.ua.mobile&&navigator.onLine)
					Ads.showInterstitial();
				btn_pause.pressedUp = function(){
					if(!ig.game.pause){
						ig.game.spawnEntity(EntityPopupInvent, ig.game.screen.x, ig.game.screen.y);
					}
					else{
						var aPopups = ig.game.getEntitiesByType(EntityPopup);
						var lengthPopups = aPopups.length;
						for(i=0; i<lengthPopups; i++){
							aPopups[i].kill();
						}
					}
				}
			}
			this.btn_resume=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/replay.png', 80, 80 ),	
				idParent:esto.id,
				posX:esto.pos.x+250,
				posY:esto.pos.y+300+compensacionSkipLevel,
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });
					if(random||infinite)
						ig.system.setGame(MyGame);
					else
						ig.game.player.initPlayerPos();
					ig.game.player.health = 3;
					lStorage.set('vidas',3);
					esto.kill(true);
					if (ig.ua.mobile&&navigator.onLine)
						Ads.showInterstitial();
					btn_pause.pressedUp = function(){
						if(!ig.game.pause){
							ig.game.spawnEntity(EntityPopupInvent, ig.game.screen.x, ig.game.screen.y);
						}
						else{
							var aPopups = ig.game.getEntitiesByType(EntityPopup);
							var lengthPopups = aPopups.length;
							for(i=0; i<lengthPopups; i++){
								aPopups[i].kill();
							}
						}
					}
				},	
			});			
			this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/menu.png', 80, 80 ),
				idParent:esto.id,
				posX:esto.pos.x+450,
				posY:esto.pos.y+300+compensacionSkipLevel,
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					if (ig.ua.mobile&&navigator.onLine)
						Ads.showInterstitial();
					esto.kill(true);
					ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
						callback: function (){
								lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
								if(currentWorld<4)
									ig.system.setGame(Levels);
								else{
									loadWorld=true;
									ig.system.setGame(Levels);
								}
								lStorage.set('vidas',3);
							}
					});
				},				
			});
		}, 
		update: function(){
			this.parent();
			if(monedasNoAcumul>0)monedasNoAcumul-=monedasNoAcumul*4/100;
		},
		draw: function(){
			this.parent();
			this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-304/2, this.pos.y-ig.game.screen.y+116,3,304,115);
		},
		kill: function(interstitial){
			if(ig.ua.mobile&&this.enableBanner)
				Ads.hideBanner();
			this.parent(interstitial);
			if(monedasNoAcumul>0)
				monedasNoAcumul=0;
		},
    }); 
});