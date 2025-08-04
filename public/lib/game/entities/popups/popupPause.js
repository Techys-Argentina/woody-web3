ig.module(
    'game.entities.popups.popupPause'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupPause = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/popups/tabla-pause.png',537,475),
		imgTop:new ig.Image('media/img/popups/text-sprite.jpg'),		
		size:{x:537, y:475},
		btn_resume: null,
		btn_menu: null,
		btn_powerUps: null,
		btn_volume:null,
		btn_sx:null,
		btn_more:null,
		center:true,
		keepConsole:true,
		animacionVertical:true,
		//Constructor
		inicia: function(){
			this.parent();
			ig.music.pause();
			if(ig.ua.mobile)Ads.showBanner();
			var esto=this;
			if(navigator.onLine&&ig.ua.mobile){
				Ads.setCrossPromotionBubble();
			}
            this.btn_resume=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/resume.png', 80, 80 ),
				idParent:esto.id,
				posX:this.pos.x+275,
				posY:this.pos.y+190,
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.kill();
				},				
			});			
			this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/menu.png', 80, 80 ),	
				idParent:esto.id,
				posX:this.pos.x+500,
				posY:this.pos.y+300,
				noFix:true,
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.kill();
					ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
						callback: function (){
							lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
							if(currentWorld<4)
								ig.system.setGame(Levels);
							else{
								loadWorld=true;
								ig.system.setGame(Levels);
							}
						}
					});
				},		
			});
			this.btn_powerUps=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/store.png', 80, 80 ),	
				idParent:esto.id,
				posX:this.pos.x+425,
				posY:this.pos.y+190,
				size:{x:80, y:80},
				noFix:true,
				onPopup:true,
				pressedUp: function(){
						soundButton.play();
						esto.kill();
						this.popUpPowerUps=ig.game.spawnEntity(EntityPopupPowerUps, ig.game.screen.x, ig.game.screen.y);
								
				},				
			});
			if(crossPromImg!=null){
				btn_crossPromotion=ig.game.spawnEntity( EntityBtn_crossPromotion, 0, 0, {animSheet: new ig.AnimationSheet( crossPromImg, 80, 80 ),	
					idParent:esto.id,
					pos:{x:this.pos.x+350,y:this.pos.y+390},
					size:{x:80, y:80},
					sound:true,	
					animateX:true,	
					onPopup:true,					
					pressedUp: function(){
						window.open(crossPromLink, '_blank', 'location=yes');
					},
				});
			}
			this.getIconMusic();
			this.getIconSx();
			
			if(ig.ua.mobile&&navigator.onLine&&fetchedRewardedVideo){
				this.returnbtn_videoRewarder();
			}
			else if(ig.ua.mobile&&navigator.onLine)
				Ads.fetchRewardedVideo();
		}, 
		draw: function(){
			this.parent();
			this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-304/2, this.pos.y-ig.game.screen.y+116,1,304,57);
		},
		playPauseMusic: function(){			
		    if(lStorage.get('music')){									
				lStorage.set('music',false);
				ig.music.pause();
			}else{				
				lStorage.set('music',true);
				ig.music.play([ig.game.music]);
			}
			this.btn_volume.kill();
			this.getIconMusic();
		},
		playPauseSx: function(){			
		    if(lStorage.get('sx')){									
				lStorage.set('sx',false);
				ig.Sound.enabled = false;
			}else{				
				lStorage.set('sx',true);
				ig.Sound.enabled = true;
			}
			this.btn_sx.kill();
			this.getIconSx();
		},
		getIconMusic: function(){
			var esto=this;
			if(!(lStorage.get('music'))){
				this.btn_volume=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/volume2.png', 80, 80 ),
					idParent:esto.id,
					posX:esto.posicionFinal.x+80,
					posY:esto.pos.y+300,
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.playPauseMusic();
					},		
				});
			}else{
				this.btn_volume=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/volume1.png', 80, 80 ),
					idParent:esto.id,
					posX:esto.posicionFinal.x+80,
					posY:esto.pos.y+300,
					noFix:true,	
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.playPauseMusic();
					},
				});
			}
		},
		getIconSx: function(){
			var esto=this;
			if(!(lStorage.get('sx'))){
				this.btn_sx=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/sx2.png', 80, 80 ),
					idParent:esto.id,
					posX:esto.posicionFinal.x+230,
					posY:esto.pos.y+300,
					noFix:true,
					onPopup:true,					
					pressedUp: function(){
						esto.playPauseSx();
					},
				});
			}else{
				this.btn_sx=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/sx.png', 80, 80 ),
					idParent:esto.id,
					posX:esto.posicionFinal.x+230,
					posY:esto.pos.y+300,
					noFix:true,	
					onPopup:true,
					pressedUp: function(){
						esto.playPauseSx();
					},
				});
			}
		},
		kill: function(){
			if(ig.ua.mobile)Ads.hideBanner();
			if(!lStorage.get('music')){				
				ig.music.pause();
			}
			else{
				ig.music.pause();
				ig.music.play([ig.game.music]);
			}
			this.parent();
		},
    }); 
});