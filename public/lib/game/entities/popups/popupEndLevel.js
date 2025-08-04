ig.module(
    'game.entities.popups.popupEndLevel'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupEndLevel = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/popups/tabla-pause2.png',537,475),
		imgTop:new ig.Image('media/img/popups/text-sprite.jpg'),		
		size:{x:537, y:475},
    	fontMonedas: new ig.Font( 'media/fonts/font34.png' ),
    	score:0,
		endGame:null,
		newWorld:null,
		bg:null,
		animacionVertical:true,
		noButtons:false,
		center:true,
		unblock:null,
		btn_next:null, 
		btn_menu:null,
		keepConsole:true,
		btnMenuImg:'media/img/menu.png',
		btnMenuImgSize:{x:80, y:80},
		btnNextWorldImg:'media/img/botones-worlds.png',
		end:true,
		interstilialShowed:false,
		enableBanner:true,
		premio:null,
		endWorld:null,
        //Constructor
		init: function(x, y, settings){			
			this.parent(x, y, settings);	
			//if(ig.ua.mobile&&this.enableBanner)
				//Ads.showBanner();
			if(this.bg!=null){
				this.animSheet= new ig.AnimationSheet(this.bg,780 , 480 );
				this.addAnim( 'idle', 9999, [0] );
				this.posicionFinal.y = ig.game.screen.y + 20; //por la consola.
				this.currentAnim = this.anims.idle;	
			}
			if(this.unblock!=null){ //desbloqueo de monturas
				if(this.unblock==2){
					if(lStorage.get('montura3')!='off')
						this.bg=null;
					else
						lStorage.set('montura3','on');
				}
				else if(this.unblock==3){
					if(lStorage.get('montura4')!='off')
						this.bg=null;
					else
						lStorage.set('montura4','on');
				}
				else if(this.unblock==4){
					if(lStorage.get('montura2')!='off')
						this.bg=null;
					else
						lStorage.set('montura2','on');
				}
				else if(this.unblock==5){
					if(lStorage.get('montura6')!='off')
						this.bg=null;
					else
						lStorage.set('montura6','on');
				}
				if(this.bg==null){
					this.animSheet=new ig.AnimationSheet('media/img/inst/popup_treasure.png',780 , 480 );
					this.addAnim( 'idle', 9999, [0] );
					this.posicionFinal.y = ig.game.screen.y + 20; //por la consola.
					this.currentAnim = this.anims.idle;	
					if(this.premio!=null)
						lStorage.set('monedas',lStorage.get('monedas')+this.premio)	;
				}
			}
			if(this.imgTop=='null')
				this.imgTop=null;
			else if(this.imgTop=='default')
				this.imgTop=new ig.Image('media/img/popups/text-sprite.jpg');
			if(this.noButtons=='true')
				this.noButtons=true;
			
			this.score=lStorage.get('monedas');
			lStorage.set('monedas',lStorage.get('monedas')+monedasNoAcumul)	;
			ig.game.showFbAd=true;
		},
        inicia: function() {			
			this.parent();	
			var esto=this;
			if(this.newWorld!=null){			
				this.btnMenuImg='media/img/botones-worlds.png';
				this.btnMenuImgSize={x:230,y:111};
			}
			if(!this.noButtons){
				btn_pause.pressedUp = function(){				
					soundButton.play();
					if(this.currentAnim.alpha!=0){
						esto.goToNextLevel();
					}
				}
				this.btn_next=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/next.png', 80, 80 ),		
					idParent:esto.id,
					posX:(currentWorld!="4")?esto.pos.x+240:esto.pos.x+350,
					posY:esto.pos.y+300,
					noFix:true,	
					onPopup:true,					
					pressedUp: function(){
						soundButton.play();
						esto.goToNextLevel();
					},	
				});
				if(this.endGame){//popup de final de juego (se uso un png porque no habìa jpg)
					this.btnMenuImg='media/img/home.png';
					this.btnMenuImgSize={x:80, y:80};
					this.imgTop = new ig.Image('media/img/popups/stageclearSprite.png');
					this.size={x:780, y:480};
					if(this.endWorld!="4"){
						//btn_menu
						if(this.endWorld!='lw'&&this.endWorld!='bw'){
							this.btn_go_new_game=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet('media/img/popups/botones/btn_download.png',293,90),	
								idParent:esto.id,
								posX:this.pos.x+150,
								posY:this.pos.y+310,
								size:{x:293, y:90},
								noFix:true,
								onPopup:true,				
								pressedUp: function(){
									soundButton.play();
									loadWorld=true;
									esto.setCurrentLevel();
									window.open(nextGameLnk, '_blank', 'location=yes');
									esto.kill();
									//go to link
									ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
										callback: function (){
											if (ig.ua.mobile&&navigator.onLine)
												esto.showInterstitial(function(){ig.system.setGame(Inicio);});
											else
												ig.system.setGame(Inicio);
										}
									});				
								},	
							});
						}
					}
					
					this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet(this.btnMenuImg, this.btnMenuImgSize.x, this.btnMenuImgSize.y),		
						idParent:esto.id,	
						posX: (this.endWorld=="4")?esto.pos.x+350:esto.pos.x+500,
						posY: (this.endWorld=="4")?esto.pos.y+350:esto.pos.y+320,
						onPopup:true,
						size:{x:this.btnMenuImgSize.x,y:this.btnMenuImgSize.y},
						noFix:true,	
						pressedUp: function(){
							soundButton.play();
							loadWorld=true;
							esto.setCurrentLevel();
							esto.kill();
							ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
								callback: function (){
									if (ig.ua.mobile&&navigator.onLine)
										esto.showInterstitial(function(){
												esto.setCurrentLevel();
												loadWorld=true;
												ig.system.setGame(Levels);
											});
									else{
										esto.setCurrentLevel();
										loadWorld=true;
										ig.system.setGame(Levels);
									}
								}
							});
						},				
					});
					btn_pause.pressedUp =function(){
						soundButton.play();
						if(this.currentAnim.alpha!=0){
							loadWorld=true;
							esto.kill();
							ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
								callback: function (){
									if (ig.ua.mobile&&navigator.onLine)
										esto.showInterstitial(function(){
											esto.setCurrentLevel();
											loadWorld=true;
											ig.system.setGame(Levels);
										});
									else{
										esto.setCurrentLevel();
										loadWorld=true;
										ig.system.setGame(Levels);
									}
								}
							});
						}
					}
				}
				else{
					//btn_menu
					if(currentWorld!="4"){
						this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet(this.btnMenuImg, this.btnMenuImgSize.x, this.btnMenuImgSize.y),		
							idParent:esto.id,	
							posX:(this.newWorld==null)?esto.pos.x+450:esto.pos.x+270,
							posY:(this.newWorld==null)?esto.pos.y+300:esto.pos.y+270,
							size:{x:this.btnMenuImgSize.x,y:this.btnMenuImgSize.y},
							noFix:true,	
							onPopup:true,
							pressedUp: function(){
								soundButton.play();
								if(currentLevel.toString().split("_")[1].indexOf('s') === -1){	
									if(esto.newWorld!=null){
										if(parseInt(lStorage.get('world'))<esto.newWorld){
											loadWorld=true;
											worldEnd = true;
											currentWorld=esto.newWorld;
											lStorage.set('world',currentWorld);
											currentLevel = currentWorld + "_" + 1;
											//lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
											lStorage.set('posBtnLevelMap_'+currentWorld,0);
											lStorage.set('nivel', currentLevel);
										}
									}
									else{
										lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
										esto.setCurrentLevel();
									} 
								}
								esto.kill();
								ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
									callback: function (){
										if (ig.ua.mobile&&navigator.onLine)
											esto.showInterstitial(function(){
												if(currentWorld<4){
													ig.system.setGame(Levels);
												}
												else{
													loadWorld=true;
													ig.system.setGame(Levels);
												}
											});
										else{
											if(currentWorld<4){
												ig.system.setGame(Levels);
											}
											else{
												loadWorld=true;
												ig.system.setGame(Levels);
											}
										}
									}
								});
							},				
						});
					}
				}
				if (this.newWorld != null){
					switch(this.newWorld){
						case 1:
							this.btn_menu.addAnim( 'idle', 1, [0] );
							this.btn_menu.addAnim( 'active', 1, [1]);
							this.btn_menu.addAnim( 'deactive', 1, [2] );	
						break;
						case 2:
							this.btn_menu.addAnim( 'idle', 1, [3] );
							this.btn_menu.addAnim( 'active', 1, [4]);
							this.btn_menu.addAnim( 'deactive', 1, [5] );	
						break;
						case 3:
							this.btn_menu.addAnim( 'idle', 1, [6] );
							this.btn_menu.addAnim( 'active', 1, [7]);
							this.btn_menu.addAnim( 'deactive', 1, [8] );	
						break;
						case 4:
							this.btn_menu.addAnim( 'idle', 1, [9] );
							this.btn_menu.addAnim( 'active', 1, [10]);
							this.btn_menu.addAnim( 'deactive', 1, [11] );	
						break;
						default:
							this.btn_menu.addAnim( 'idle', 1, [0] );
							this.btn_menu.addAnim( 'active', 1, [1]);
							this.btn_menu.addAnim( 'deactive', 1, [2] );	
					}
					this.btn_menu.currentAnim = this.btn_menu.anims[ this.btn_menu.state ];
					btn_pause.pressedUp =function(){
						if(parseInt(lStorage.get('world'))<esto.newWorld){
							loadWorld=true;
							worldEnd = true;
							currentWorld=esto.newWorld;
							lStorage.set('world',currentWorld);
							currentLevel = currentWorld + "_" + 1;
							//lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
							lStorage.set('posBtnLevelMap_'+currentWorld,0);
							lStorage.set('nivel', currentLevel);
						}
						ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
							callback: function (){
								if (ig.ua.mobile&&navigator.onLine)
									esto.showInterstitial(function(){loadWorld=true;ig.system.setGame(Levels);});
								else{
									loadWorld=true;
									ig.system.setGame(Levels);
								}
							}
						});
						esto.kill();
					}
				}
				//btn_menu
				if(this.newWorld!=null || this.endGame || currentLevel.split("_")[1].indexOf('s') >= 0){
					this.btn_next.habilitado = false;
					this.btn_next.kill();
				}
				if(this.endGame||this.newWorld!=null){
					if(crossPromImg!=null&&this.newWorld==null){
						this.btn_more=ig.game.spawnEntity( Button, 30, 370, {animSheet: new ig.AnimationSheet( crossPromImg, 80, 80 ),
							idParent:esto.id,
							posX:this.pos.x+200,
							posY:this.pos.y+350,
							noFix:true,
							sound:true,
							onPopup:true,							
							pressedUp: function(){
								window.open(crossPromLink, '_blank', 'location=yes');
							},
						});
					}
				}
			}
			else{
				btn_pause.pressedUp = function(){				
					soundButton.play();
					ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
						callback: function (){
							if(currentWorld<4)
								ig.system.setGame(Levels);
							else{
								loadWorld=true;
								ig.system.setGame(Levels);
							}
							lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
							esto.setCurrentLevel();
						}
					});
					esto.kill();
				}
				//boton invisible ocupa todo el popup redirecciona al menu
				this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet('media/img/trans.png', 1, 1  ),		
					idParent:esto.id,	
					posX:this.pos.x,
					posY:this.pos.y,
					size:{x:this.size.x,y:this.size.y},
					noFix:true,	
					onPopup:true,
					pressedUp: function(){				
						soundButton.play();
						esto.kill();
						ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
							callback: function (){
								if(currentWorld!="4")
									ig.system.setGame(Levels);
								else{
									loadWorld=true;
									ig.system.setGame(Levels);
								}
								lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
								esto.setCurrentLevel();
							}
						});
					},				
				});
			}	
			if(ig.ua.mobile&&navigator.onLine&&fetchedRewardedVideo){
				this.returnbtn_videoRewarder();
			}
			else if(ig.ua.mobile&&navigator.onLine)
				Ads.fetchRewardedVideo();
				
		}, 
		returnbtn_videoRewarder: function(){
			var esto=this;
			var rand = Math.floor(Math.random() * 2) + 1;
			var img, video;
			if(rand == 1){
				img= 'media/img/btn_freecoins.png';
				video= 'free-coins';
			}
			else if(rand == 2){
				img= 'media/img/boton-freelife.png';
				video= 'free-life';
			}
			this.btn_freeCoins=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( img, 80, 80 ),	
				idParent:esto.id,
				posX:this.pos.x+680,
				posY:this.pos.y+250,
				noFix:true,
				onPopup:true,
				animated:true,
				pressedUp: function(){
					soundButton.play();
					Ads.showRewardedVideo(video);
				},		
			});
			this.btn_freeCoins.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,2,3,4] );
			this.btn_freeCoins.currentAnim = this.btn_freeCoins.anims.idle;
		},
        update: function(){
			this.parent();
	        if(monedasNoAcumul>0){
				this.score+=monedasNoAcumul*4/100;
				monedasNoAcumul-=monedasNoAcumul*4/100;
			}
        },
		draw: function(){
			this.parent();
			if(this.imgTop!=null){
				if(this.newWorld!=null)
					this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-304/2, this.pos.y-ig.game.screen.y+116,2,304,115);
				else if(this.endWorld=='4')
					this.showGiftCode();
					//this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-368/2, this.pos.y-ig.game.screen.y+100,2,368,308);//end game
				else if(this.endGame==null){
					this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-304/2, this.pos.y-ig.game.screen.y+116,1,304,115);
					this.drawScore();
				}
			}
		},
		showGiftCode: function(){
			var productId="enable_lw";
			if(lStorage.get('giftCodes')!=null){
				lStorage.get('giftCodes').forEach(function(item, index) {
					if(item.id==productId&&item.enable){
						this.fontMonedas.draw(item.code,this.pos.x-ig.game.screen.x+550,this.pos.y-ig.game.screen.y+420,ig.Font.ALIGN.CENTER);
					}
				});
			}
		},
		drawScore: function(){
			var imgBolsaMonedas = new ig.Image('media/img/console/saco-monedas.png');
			imgBolsaMonedas.draw(this.pos.x-ig.game.screen.x+190,this.pos.y-ig.game.screen.y+250);
			this.fontMonedas.draw(Math.round(this.score),this.pos.x-ig.game.screen.x+290,this.pos.y-ig.game.screen.y+270,ig.Font.ALIGN.CENTER);
		},
		setCurrentLevel: function(){
			if(lStorage.get('nivelesSkipeados')!=''){ // lo borro de la variable nivelesSkipeados si antes lo skipeó 
				var aNivelesSkipeados =  lStorage.get('nivelesSkipeados').split(',');
				var aNivelesSkipeadosLength= aNivelesSkipeados.length;
				var nuevoVarSkiped ='';
				for(i=1;i<aNivelesSkipeadosLength;i++){
					if(aNivelesSkipeados[i]!=currentLevel)nuevoVarSkiped=nuevoVarSkiped+','+aNivelesSkipeados[i];						
				}
				lStorage.set('nivelesSkipeados',nuevoVarSkiped);
			}
			if(currentWorld=="1"||currentWorld=="2"||currentWorld=="3"||currentWorld=="4"){
				if(lStorage.get('nivel_1')==currentLevel){
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
					lStorage.set('nivel_1',currentLevel);
				}
				else{
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
				}
			}
			else if(currentWorld=="lw"){
				if(lStorage.get('nivel_lw')==currentLevel){
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
					lStorage.set('nivel_lw',currentLevel);
				}
				else{
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
				}
			}
			else if(currentWorld=="bw"){
				if(lStorage.get('nivel_bw')==currentLevel){
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
					lStorage.set('nivel_bw',currentLevel);
				}
				else{
					currentLevel = currentLevel.split("_")[0] + "_" + parseInt(parseInt(currentLevel.split("_")[1]) + 1);
				}
			}
		},
		kill: function(interstitial){
			if(ig.ua.mobile)Ads.hideBanner();
			this.parent(interstitial);
			if(monedasNoAcumul>0){
				this.score+=monedasNoAcumul;
				monedasNoAcumul=0;				
			}
		},
		showInterstitial: function(callBack){
			var internalInsterstitialShowed=false;
			if(!(typeof btn_pause === 'undefined')){
				btn_pause.pressedUp=function(){this.kill(true)};
			}
			if(Ads.getInterstitialType()==0){
				if(Ads.showInterstitialInternal(callBack)){
					internalInsterstitialShowed=true;
				}
			}
			if(!this.interstilialShowed&&!internalInsterstitialShowed){
				Ads.showInterstitial();
				this.interstilialShowed=true;
				callBack();
			}
		},
		goToNextLevel: function(){
			var esto=this;
			if (ig.ua.mobile&&navigator.onLine && currentLevel != '1_5' && currentLevel != '1_2')
				esto.showInterstitial(function(){esto.setCurrentLevel();
				esto.kill(true);				
				ig.game.screenFader = new ig.ScreenFader({ 
					fade: 'in', 
					speed: 2, 
					callback: function (){
						ig.system.setGame(MyGame);
					}
				});});
			else{
				esto.setCurrentLevel();
				esto.kill();				
				ig.game.screenFader = new ig.ScreenFader({ 
					fade: 'in', 
					speed: 2, 
					callback: function (){
						ig.system.setGame(MyGame);
					}
				});
			}
		},
	}); 
});