//version 1.0
ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'plugins.impact-storage',
	'plugins.multitouch',
	'plugins.button',
	'plugins.screen-fader',
	'plugins.impact-infinite',
	'plugins.camera_vibration',
	'plugins.game-custom',
	'plugins.custom-random-level',
	'plugins.font2',
	'ads.ads',
	'game.entities.personaje',
	'game.entities.personajeWorlds',
	'game.entities.popups.popupPause',
	'game.entities.popups.popupPowerUps',
	'game.entities.popups.popupInvent',
	'game.entities.popups.popupGift',
	'game.entities.popups.popupConfirm',
	'game.entities.popups.popupBuy',
	'game.entities.popups.popupShare',
	'game.entities.popups.popupComic',
	'game.entities.popups.popupEndLevel',
	'game.entities.popups.popupVideoMount',
	'game.entities.popups.popupEndLevel_key',
	'game.entities.popups.popupExit',
	'game.entities.popups.popupDownloadReward',
	'game.entities.btn_crossPromotion',
	'game.entities.btn_gift',
	'game.entities.btn_montura',
	'game.entities.btn_inventario',
	'game.entities.montura1',
	'game.entities.montura2',
	'game.entities.montura3',
	'game.entities.montura4',
	'game.entities.montura6',
	'game.entities.destello',
	'game.levels.worlds',
	'game.levels.levels_map_1',
	'game.levels.world_1.level_1_1',
	'game.levels.world_1.level_1_2',
	'game.levels.world_1.level_1_3',
	'game.levels.world_1.level_1_4',
	'game.levels.world_1.level_1_5',
	'game.levels.world_1.level_1_6',
	'game.levels.world_1.level_1_7',
	'game.levels.world_1.level_1_8',
	'game.levels.world_1.level_1_9',
	'game.levels.world_1.level_1_10',
	'game.levels.world_1.level_1_s1',
	'game.levels.levels_map_2',
	'game.levels.world_2.level_2_1',
	'game.levels.world_2.level_2_2',
	'game.levels.world_2.level_2_3',
	'game.levels.world_2.level_2_4',
	'game.levels.world_2.level_2_5',
	'game.levels.world_2.level_2_6',
	'game.levels.world_2.level_2_7',
	'game.levels.world_2.level_2_8',
	'game.levels.world_2.level_2_9',
	'game.levels.world_2.level_2_10',
	'game.levels.world_2.level_2_s1',
	'game.levels.levels_map_3',
	'game.levels.world_3.level_3_1',
	'game.levels.world_3.level_3_2',
	'game.levels.world_3.level_3_3',
	'game.levels.world_3.level_3_4',
	'game.levels.world_3.level_3_5',
	'game.levels.world_3.level_3_6',
	'game.levels.world_3.level_3_7',
	'game.levels.world_3.level_3_8',
	'game.levels.world_3.level_3_9',
	'game.levels.world_3.level_3_10',
	'game.levels.world_3.level_3_s1',
	'game.levels.world_4.level_4_1',
	'game.levels.world_4.level_4_2',
	'game.levels.world_4.level_4_3',
	'game.levels.world_4.level_4_4',
	//lost world
	'game.levels.levels_map_lw',
	'game.levels.world_lw.level_lw_1',
	'game.levels.world_lw.level_lw_2',
	'game.levels.world_lw.level_lw_3',
	'game.levels.world_lw.level_lw_4',
	'game.levels.world_lw.level_lw_5',
	'game.levels.world_lw.level_lw_6',
	'game.levels.world_lw.level_lw_7',
	'game.levels.world_lw.level_lw_8',
	'game.levels.world_lw.level_lw_9',
	'game.levels.world_lw.level_lw_10',
	'game.levels.world_lw.level_lw_11',
	'game.levels.world_lw.level_lw_12',
	'game.levels.world_lw.level_lw_13',
	'game.levels.world_lw.level_lw_14',
	'game.levels.world_lw.level_lw_15',
	'game.levels.world_lw.level_lw_16',
	'game.levels.world_lw.level_lw_17',
	'game.levels.world_lw.level_lw_18',
	'game.levels.world_lw.level_lw_19',
	'game.levels.world_lw.level_lw_20',
	//run
	'game.levels.world_bw.infin_start',
	'game.levels.world_bw.infin_start_mount',
	'game.levels.world_bw.infin_start_boss',
	'game.levels.world_bw.infin_end',
	'game.levels.world_bw.infin_end_world_bw',
	'game.levels.world_bw.part1',
	'game.levels.world_bw.part2',
	'game.levels.world_bw.part3',
	'game.levels.world_bw.part4',
	'game.levels.world_bw.part5',
	'game.levels.world_bw.part6',
	'game.levels.world_bw.part7',
	'game.levels.world_bw.part8',
	'game.levels.world_bw.part9',
	'game.levels.world_bw.part10',
	'game.levels.world_bw.part11',
	'game.levels.world_bw.part12',
	'game.levels.world_bw.part13',
	'game.levels.world_bw.part14',
	'game.levels.world_bw.part15',
	'game.levels.world_bw.part16',
	'game.levels.world_bw.part17',
	'game.levels.world_bw.part18',
	'game.levels.world_bw.part19',
	'game.levels.world_bw.part20',
	'game.levels.world_bw.part21',
	'game.levels.world_bw.part22',
	'game.levels.world_bw.part23',
	'game.levels.world_bw.part24',
	'game.levels.world_bw.part25',
	'game.levels.world_bw.part26',
	'game.levels.world_bw.part27',
	'game.levels.world_bw.part28',
	'game.levels.world_bw.part29',
	'game.levels.world_bw.part30',
	'game.levels.world_bw.part31',
	'game.levels.world_bw.part32',
	'game.levels.world_bw.part33',
	'game.levels.world_bw.part34',
	'game.levels.world_bw.part35',
	'game.levels.world_bw.part36',
	'game.levels.world_bw.part37',
	'game.levels.world_bw.part38',
	'game.levels.world_bw.part39',
	'game.levels.world_bw.part40',
	'game.levels.world_bw.levelStatic1',
	'game.levels.world_bw.levelStatic2',
	'game.levels.world_bw.levelStatic3',
	'game.levels.world_bw.levelStatic4',
	'game.levels.world_bw.levelStatic5',
	'game.levels.world_bw.levelStatic6',
	'game.levels.world_bw.levelStatic7',
	'game.levels.world_bw.levelStatic8',
	'game.levels.world_bw.levelStatic9',
	'game.levels.world_bw.levelStatic10'
	//'impact.debug.debug'
	
)
.defines(function(){
	lStorage =new ig.Storage();
	currentLevel=0;
	currentWorld=0;
	monedasNoAcumul=0;
	worldEnd = false;
	rateClose=null;
	loadWorld=true;
	button=null;
	infinite=false;
	soundButton= new ig.Sound( 'media/sounds/boton_menu.*');
	crossPromImg=null;
	crossPromImgLarge=null;
	crossPromotionAds=null;
	crossPromLink=null;
	rateLink='market://details?id=com.woody.world.adventure';
	nextGameLnk='market://details?id=com.woody.world.adventure.run';
	crossPromLink='market://details?id=com.alfie.world.run.adventure';
	adLink='market://details?id=com.alfie.world.run.adventure';
	//rateLink='market://details?id=com.woody.world.adventure';
	//rateLinkIOS='https://itunes.apple.com/us/app/superwoodyrun/id1147767874?mt=8';
	btnRewardedVideoShow=true;
	fetchedRewardedVideo=false;
	showedComic=false;
	showedComicEnd=false;
	comic=null;
	onLevel=false;
	iniciado=false;
	onInterstitial=false;
	cheatCode=null;
	sounds=[new ig.Sound( 'media/sounds/coin.*'),
			new ig.Sound( 'media/sounds/breakblock.*'),
			new ig.Sound( 'media/sounds/vida_extra.*' ),
			new ig.Sound( 'media/sounds/level_win.*' ),
			new ig.Sound( 'media/sounds/continue.*' ),
			new ig.Sound( 'media/sounds/dead.*' ),//5
			new ig.Sound( 'media/sounds/gameover.*' ),
			new ig.Sound( 'media/sounds/step_on_enemy.*' ),
			new ig.Sound( 'media/sounds/jump.*' ),
			new ig.Sound( 'media/sounds/romper_fallido.*' ),
			new ig.Sound( 'media/sounds/disparo.*' ),//10
			new ig.Sound( 'media/sounds/paso.*',false ),
			new ig.Sound( 'media/sounds/invul.*',false ),
			new ig.Sound( 'media/sounds/vestidura.*' ),
			new ig.Sound( 'media/sounds/montura.*' ),
			new ig.Sound( 'media/sounds/cae_agua.*',false ),//15
			new ig.Sound( 'media/sounds/flame_shoot.*' )];
	Inicio = ig.Game.extend({
		clearColor: null,
		popupOn:false,
		background: new ig.Image( 'media/img/bg2.jpg' ),
		showFbAd:true,
		init: function() {
			/*for(var i=0, len=localStorage.length; i<len; i++) {
				var key = localStorage.key(i);
				var value = localStorage[key];
				console.log(key + " => " + value);
			}*/
			if(ig.ua.mobile){
				Ads.fetchRewardedVideo('game-over');
				Ads.fetchRewardedVideo('free-coins');
				Ads.fetchRewardedVideo('montura');
			}
			
			ig.music.add( 'media/sounds/menu.*' , 'menu');
			ig.music.add( 'media/sounds/music1.*' , 'bg');	
			ig.music.add( 'media/sounds/music0.*' , 'bg2');
			ig.music.loop=true;
			ig.input.bind( ig.KEY.MOUSE1, 'click' );	
			loadWorld=true;
			onLevel=false;
			btn_crossPromotion=null,
			
			this.initLocalStaorages();	//seteo de variables en el localstorage	
			
			btn_play=ig.game.spawnEntity( Button, 125, 260, {animSheet: new ig.AnimationSheet( 'media/img/play.png', 100, 100 ),
				size: { x: 100, y: 100 },		
				sound:true,	
				animated:true,
				pressedUp: function(){ig.system.setGame(Levels);soundButton.play();},						
			});
			if(ig.ua.mobile&&!ig.ua.iOS){
				btn_exit=ig.game.spawnEntity( Button, 25, 375, {animSheet: new ig.AnimationSheet( 'media/img/exit-main.png', 50, 50),
					size:{x:100, y:100},
					offset:{x:-25, y:-25},	
					sound:true,	
					animated:true,
					pressedUp: function(){
						ig.game.spawnEntity( EntityPopupExit, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/popups/pop-up-exit.png',780,480),
							imgTopTile:0,
							posConfirmBtn:{x:210,y:290},
							posCancelBtn:{x:450,y:290},
							confirm: function(){
								navigator.app.exitApp();
							},
							cancel: function(){
								this.kill();
							},
						});
					},				
				});
			}
			btn_play.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3] );
			btn_play.currentAnim = btn_play.anims.idle;
			
			btn_gift=ig.game.spawnEntity( EntityBtn_gift, 660, 370);
			
			if(ig.ua.mobile&&lStorage.get('initNum')>2&&!lStorage.get('rated')){ // no se muestra el boton de rate las 3 primeras veces
				btn_rate=ig.game.spawnEntity( Button, 245, 270, {animSheet: new ig.AnimationSheet( 'media/img/rate.png', 100, 100 ),
					size: { x: 76, y: 76 },
					offset: {x:15,y:15},
					pressedUp: function(){
						soundButton.play();
						ig.game.spawnEntity( EntityPopupConfirm, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/rate.jpg',780 , 480 ),
							imgTopTile:0,
							confirm: function(){
								window.open(rateLink, '_blank', 'location=yes');
								lStorage.set('rated',true);
								btn_rate.kill();
							},
							cancel: function(){
								lStorage.set('rated',true);
								btn_rate.kill();
							},
						});
					},
				});	
				lStorage.set('initNum',3);				
			}
			
			this.playPauseMusic();
			this.playPauseSx();
			if(navigator.onLine){
				if (ig.ua.mobile&&!iniciado){
					Ads.showInterstitial();
					this.initFirebase();
					iniciado=true;
				}
			}
			cheatCode=null;//cheats
		},
		initLocalStaorages: function(){
			//localStorage.clear();	
			
			//storage mon, vidas
			//lStorage.set('nivel_1',"4_4");
			//lStorage.set('nivel_lw',"lw_20");
			//lStorage.set('nivel_bw',"bw_10");
			//lStorage.set('world',4);
			//lStorage.set('monedas',20000);
			
			//mod por errores 13/07
			lStorage.set('posPierdeX',null);
			lStorage.set('posPierdeY',null);
			lStorage.set('enable_cheat_1',false);
			lStorage.set('ChartboostTestInit',0);//no iniciar Chartboost
			//mod por errores 13/07
			
			if(lStorage.get('cheat_1')==null)lStorage.set('cheat_1',[1,3,3,4,4,4,2,2,2,2]);
			if(lStorage.get('enable_cheat_1')==null)lStorage.set('enable_cheat_1',false);
			
			if(lStorage.get('showComic')==null)lStorage.set('showComic',true);
			if(lStorage.get('monedas')==null)lStorage.set('monedas',0);
			if(lStorage.get('vidas')==null)lStorage.set('vidas',3);
			
			//storage powerups
			aSPU=['pu_iceBall','pu_fireBall','pu_nv','pu_iman','pu_axe','pu_snorkel','pu_fly','pu_invul','pu_pico'];
			/*for(i=0; i<aSPU.length; i++){ //default todos en 0
				if(lStorage.get(aSPU[i])==null)lStorage.set(aSPU[i],0);
			}*/
			if(lStorage.get(aSPU[0])==null)lStorage.set(aSPU[0],2); //cantidad de powerUps por default
			if(lStorage.get(aSPU[1])==null)lStorage.set(aSPU[1],2);
			if(lStorage.get(aSPU[4])==null)lStorage.set(aSPU[4],5);
			if(lStorage.get(aSPU[3])==null)lStorage.set(aSPU[3],1);
			if(lStorage.get(aSPU[5])==null)lStorage.set(aSPU[5],1);
			if(lStorage.get(aSPU[6])==null)lStorage.set(aSPU[6],1);
			if(lStorage.get(aSPU[7])==null)lStorage.set(aSPU[7],1);
			if(lStorage.get(aSPU[8])==null)lStorage.set(aSPU[8],2);
			
			//seteo de variable para rate: boton en la pagina principal y confirm cada 6 niveles en MyGame
			if(lStorage.get('ConfirmRate')==null)lStorage.set('ConfirmRate',false);
			if(lStorage.get('rated')==null)lStorage.set('rated',false);	
			if(lStorage.get('initNum')==null)lStorage.set('initNum',0);	
			
			if(lStorage.get('crossPromDownOK')==null)lStorage.set('crossPromDownOK',true);
			if(lStorage.get('crossPromDown')==null)lStorage.set('crossPromDown','');
			//si, ya se como suena
			if(lStorage.get('crossPromotionAds')==null)lStorage.set('crossPromotionAds',null);
			if(lStorage.get('giftCodes')==null)lStorage.set('giftCodes',null);
			if(lStorage.get('setupAds')==null)lStorage.set('setupAds',null);
			
			if(lStorage.get('world')==null)lStorage.set('world',"1");
			if(lStorage.get('nivel_1')==null)lStorage.set('nivel_1',"1_1");
			if(lStorage.get('nivel_lw')==null)lStorage.set('nivel_lw',"lw_1");
			if(lStorage.get('nivel_bw')==null)lStorage.set('nivel_bw',"bw_1");
			
			if(lStorage.get('enable_bw')==null)lStorage.set('enable_bw',false);
			if(lStorage.get('enable_lw')==null)lStorage.set('enable_lw',false);
			
			if(lStorage.get('nivelSkipLevel')==null)lStorage.set('nivelSkipLevel',"0_0");
			if(lStorage.get('nivelesSkipeados')==null)lStorage.set('nivelesSkipeados',"");
			
			if(lStorage.get('music')==null)lStorage.set('music',true);
			if(lStorage.get('sx')==null)lStorage.set('sx',true);
			
			//Regalos diarios
			if(lStorage.get('giftDay')==null)lStorage.set('giftDay',0);
			if(lStorage.get('giftlastConex')==null)lStorage.set('giftlastConex', new Date().valueOf());
			if(lStorage.get('giftAcumul')==null)lStorage.set('giftAcumul', '');
			
			//llaves
			if(lStorage.get('keys')==null)lStorage.set('keys','');
			
			//niveles secretos completados
			if(lStorage.get('secretLevelComplet')==null)lStorage.set('secretLevelComplet','');
			
			//Monturas
			if(lStorage.get('montura1')==null)lStorage.set('montura1','off');
			if(lStorage.get('montura2')==null)lStorage.set('montura2','off');
			if(lStorage.get('montura3')==null)lStorage.set('montura3','off');
			if(lStorage.get('montura4')==null)lStorage.set('montura4','off');
			if(lStorage.get('montura6')==null)lStorage.set('montura6','off');
			
			lStorage.set('initNum',lStorage.get('initNum')+1);
			
			/*lStorage.set('enable_bw',true);
			lStorage.set('enable_lw',true);*/
			
			//lStorage.set('keys','1_14_14_,2_14_14_,3_14_14');
			/*lStorage.set('montura1','on');
			lStorage.set('montura2','on');
			lStorage.set('montura3','on');
			lStorage.set('montura4','on');
			lStorage.set('montura6','on');*/
		},
		draw: function(){
			this.background.draw( 0, 0 );
			this.parent();	
			if(this.getEntitiesByType( EntityPopup )[0])
				this.getEntitiesByType( EntityPopup )[0].draw(true);
		},
		playPauseMusic: function(){			
		    if(lStorage.get('music')){
				ig.music.play();}
			else{
				ig.music.pause();}			
		},
		playPauseSx: function(){			
		    if(lStorage.get('sx')){ig.Sound.enabled = true;}
			else{ig.Sound.enabled = false;}			
		},
		initFirebase: function(){
			//Firebase Initialization
			// Cocoon.App.WebView.on("load", {
				// success : function(){
					// Cocoon.App.showTheWebView();
					// Cocoon.App.hideTheWebView();
				// },
				// error : function(){
					// console.log("Cannot show the Webview for some reason :/");
					// console.log(JSON.stringify(arguments));
				// }
			// });
			// Cocoon.App.loadInTheWebView("firebase.html");
			//Firebase Initialization
		},
	});
	Levels = ig.Game.extend({
		popupOn:false,
		zocalo : new ig.Image('media/img/console/zocalo_world.png'),
		fontMonedas: new ig.Font( 'media/fonts/font34_grey.png' ),
		fontVidas: new ig.Font( 'media/fonts/font34_grey.png'  ),
		imgLlaves: new ig.Image( 'media/img/console/llaves-consola-worlds.png' ),
		init: function() {	
			this.imgItems= new ig.Image( 'media/img/items.png' );
			ig.music.play(['menu']);
			this.playPauseMusic();
			this.playPauseSx();
			monedasNoAcumul=0;//modificacion por bug
			
			//mod por errores 13/07
			lStorage.set('posPierdeX',null);
			lStorage.set('posPierdeY',null);
			//mod por errores 13/07
			
			onLevel=false;
			if(loadWorld){
				//delay de la animacion de cambio de mundo
				//this.delay = new ig.Timer();
				//this.delay.set(1);
				//delay de la animacion de cambio de mundo
				this.loadLevel(LevelWorlds);
				//creo a Woody en los mundos
				ig.game.spawnEntity(EntityPersonajeWorlds,-10, -10);
				//comic
				if (lStorage.get('showComic')){
					comic = ig.game.spawnEntity( EntityPopupComic, 0, 0);
					showedComic=false;
				}
				else
					showedComic=true;
				btn_comic=ig.game.spawnEntity( Button, ig.system.width-225, -10, {animSheet: new ig.AnimationSheet( 'media/img/comic/comic.png', 265, 84 ),size:{x:265,y:84},
					pressedUp: function(){
						comic = ig.game.spawnEntity( EntityPopupComic, 0, 0);
						showedComic=false;
						soundButton.play();		
					},
				});
			}
			else{
				this.loadLevel( ig.global['LevelLevels_map_'+currentWorld] ); //mapa
				lStorage.set('posPierdeX',null);
				lStorage.set('posPierdeY',null);
				//destello de las llaves
				var settings={autoKill:6};
				switch(currentWorld){
					case 1:
						this.imgLlave1Destello = ig.game.spawnEntity(EntityDestello, ig.system.width-275,ig.system.height-45,settings);
						this.imgLlave1Destello.currentAnim.alpha = 0;
					break;
					case 2:
						this.imgLlave2Destello = ig.game.spawnEntity(EntityDestello, ig.system.width-245,ig.system.height-45,settings);
						this.imgLlave2Destello.currentAnim.alpha = 0;
					break;
					case 3:
						this.imgLlave3Destello = ig.game.spawnEntity(EntityDestello, ig.system.width-205,ig.system.height-45,settings);
						this.imgLlave3Destello.currentAnim.alpha = 0;
					break;
					default:
				}
			}
			btn_powerUps=ig.game.spawnEntity( Button, 10, 390, {animSheet: new ig.AnimationSheet( 'media/img/store.png', 80, 80 ),		
				pressedUp: function(){
					var settings = {posicionFinal:{x:10,y:-70},withClose:true};
					this.popUpPowerUps=ig.game.spawnEntity(EntityPopupPowerUps, ig.game.screen.x, ig.game.screen.y,settings);
					soundButton.play();		
				},
			});
			btn_back=ig.game.spawnEntity( Button, 690, 390, {animSheet: new ig.AnimationSheet( 'media/img/home.png', 80, 80 ),
				pressedUp: function(){
					if(loadWorld){ig.system.setGame(Inicio);}
					else { loadWorld=true;ig.system.setGame(Levels)}
					soundButton.play();
				},
			});
			/*if(lStorage.get('nivel')=="2_1"&&!lStorage.get('rated')&&lStorage.get('ConfirmRate')&&!loadWorld){
				ig.game.spawnEntity( EntityPopupConfirm, ig.game.screen.x, ig.game.screen.y, {
					animSheet: new ig.AnimationSheet('media/img/inst/rate.jpg',780 , 480 ),
					confirm: function(){
						Cocoon.App.openURL(rateLink);
						lStorage.set('rated',true);
					},
					cancel: function(){
						lStorage.set('rated',true);
					},
				});
			}*/
			cheatCode=null;//cheats
		},
		update: function(){
			this.parent();
			//Termino un nivel - Animacion de paso de mundo
			if (worldEnd){
				//Muevo a Woody desde el mundo que termino al proximo
				var btn_level=ig.game.getEntitiesByType(EntityBtn_world);
				var lengthBtn_level = btn_level.length;
				for(i=0;i<lengthBtn_level;i++){
					if(btn_level[i].world == currentWorld){
						btn_level[i].nubesImage = new ig.Image('media/img/bg4-nubes.png');
						btn_level[i].state = 'deactive';
						btn_level[i].nubesImage.draw(btn_level[i].pos.x+btn_level[i].posNubeX, btn_level[i].pos.y+btn_level[i].posNubeY);
					}
					if(btn_level[i].world == currentWorld){
						btn_level[i].animandoNube = true;
						btn_level[i].state = 'active';
						btn_level[i].pressedUp();
						worldEnd = false;
						lStorage.set('nivel_1', (currentWorld).toString() + "_1");
					}
					else if(btn_level[i].world > currentWorld)
						btn_level[i].state = 'deactive';
				}
			}
			if( ig.ua.mobile ){	
				ig.input.checkTouches();
			}
		},
		draw: function(){
			this.parent();
			this.drawConsole();	
			if (!showedComic)
				comic.draw();
			else{
				lStorage.set('showComic',false);
				if (comic!=null)
					comic.kill();
			}
			if (this.screenFader) {
				this.screenFader.draw();
			}
			if(btn_crossPromotion!=null)
				btn_crossPromotion.kill();
		},
		loadLevel: function( data ) {
			this.parent( data );
			this.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1.5 });
		},
		playPauseMusic: function(){			
		    if(lStorage.get('music')){ig.music.play();}
			else{ig.music.pause();}			
		},
		playPauseSx: function(){			
		    if(lStorage.get('sx')){ig.Sound.enabled = true;}
			else{ig.Sound.enabled = false;}			
		},
		drawConsole :function(){
			this.zocalo.draw(ig.system.width/2-235,ig.system.height-38);
			//fonts
			var vidas=lStorage.get('vidas');
			vidas=(vidas<=0)?0:vidas-1;
			this.fontVidas.draw((vidas<10)?'0'+vidas:vidas,ig.system.width/2-145,ig.system.height-32);
			this.fontMonedas.draw(Math.round(lStorage.get('monedas')),ig.system.width/2,ig.system.height-32);
			var aKeys=lStorage.get('keys').split(',');
			var lengthKeys = aKeys.length;
			for (k=0; k<lengthKeys;k++){	
				switch(aKeys[k].split('_')[0]){
					case "1":
						this.imgLlaves.drawTile(ig.system.width-267,ig.system.height-36,parseInt(aKeys[k].split('_')[0])-1,37,37);
					break;
					case "2":
						this.imgLlaves.drawTile(ig.system.width-239,ig.system.height-36,parseInt(aKeys[k].split('_')[0])-1,37,37);
					break;
					case "3":
						this.imgLlaves.drawTile(ig.system.width-212,ig.system.height-36,parseInt(aKeys[k].split('_')[0])-1,37,37);
					break;
					default:
				}
			}
			var settings={autoKill:6};
			for (k=0; k<lengthKeys;k++){
				switch(aKeys[k].split('_')[0]) {
					case "1":
						if(aKeys[k].split('_')[3]!='used'&&this.imgLlave1Destello!=null&&currentWorld==1){
							this.imgLlave1Destello.draw();
							this.imgLlave1Destello.currentAnim.alpha = 1;
						}
					break;
					case "2":
						if(aKeys[k].split('_')[3]!='used'&&this.imgLlave2Destello!=null&&currentWorld==2){
							this.imgLlave2Destello.draw();
							this.imgLlave2Destello.currentAnim.alpha = 1;
						}
					break;
					case "3":
						if(aKeys[k].split('_')[3]!='used'&&this.imgLlave3Destello!=null&&currentWorld==3){
							this.imgLlave3Destello.draw();
							this.imgLlave3Destello.currentAnim.alpha = 1;
						}
					break;
					default:
				}
			}					
		},
	});
	MyGame = ig.Game_custom.extend({
		pastillas : new ig.Image('media/img/console/pastillas.png'),
		consola : new ig.Image('media/img/console/consola_fondo.png'),
		imgItemsConsola : new ig.Image('media/img/console/items-consola.png'),
		bars : new ig.Image('media/img/console/bars.jpg'),
		barIman : new ig.Image('media/img/console/barIman.jpg'),
		barInvul : new ig.Image('media/img/console/barInvul.jpg'),
		btn_monturas:[],
		gravity :500,
		scroleaX:true, // pasa a false con la entidad fin
		// Load a font
		fontMonedas: new ig.Font( 'media/fonts/font34_grey.png' ),
		fontVidas: new ig.Font( 'media/fonts/font20_green_console.png',{ borderColor: '#000' }),
		fontLevel: new ig.Font( 'media/fonts/font34_grey.png'  ),
		fontWorld: new ig.Font( 'media/fonts/font34_grey.png'  ),
		fontLevelSecret: new ig.Font('media/fonts/font26_grey.png'),
		
		pause:false,
		passageEnabled:false,
		cameraPassage:{scroleaX:false,drawBG:true},
		music:'bg',
		infiniteLevel: null,
		
		videoReward:false,
		forceDraw: true,
		touch:{x:null},
		cameraVibration:null,
		
		camaraRunForPopUps:null,
		
		popupOn:false,
		destelloOn:false,
		
		pierdeVidasCont:0,
		
		showFbAd:false,
		
		init: function() {
			for(var path in ig.Image.cache) {//optimizacion
				delete ig.Image.cache[path];
			}
			this.waterBar = new ig.Image('media/img/console/water.png');
			if(currentWorld!="3")
				ig.music.add( 'media/sounds/music1.*' , 'bg');
			else if(currentWorld=="3")
				ig.music.add( 'media/sounds/music2.*' , 'bg');
			this.imgItems=new ig.Image( 'media/img/items.png' );
			ig.music.play(['bg']);		
			this.playPauseMusic();	
			this.playPauseSx();
			//Teclas de movimiento
			ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
			ig.input.bind( ig.KEY.UP_ARROW , 'jump' );
			ig.input.bind( ig.KEY.DOWN_ARROW , 'down' );
			ig.input.bind( ig.KEY.A , 'left' );
			ig.input.bind( ig.KEY.D , 'right' );
			ig.input.bind( ig.KEY.W , 'jump' );
			ig.input.bind( ig.KEY.S , 'down' );
			ig.input.bind( ig.KEY.SPACE , 'fire' );
			this.btnUp1time=true;
			this.btnFire1time=true;
			this.animFire=false;
			this.level=currentLevel.split('_')[1];
			random=(this.getLevelSettings()=='random');
			infinite=(this.getLevelSettings()=='infinite');
			onLevel=true;
			if(random){
				this.onRandom=true;
				this.randomLevel = this.getNewLevel();
			}
			else if(infinite){
				this.onInfinite=true;
				this.infiniteLevel = this.getNewLevel(); 
				this.clearColor= null;
				this.background= new ig.Image( 'media/img/bg.jpg' );
			}
			else{
				this.loadLevelParts( ig.global['LevelLevel_'+(currentLevel)],this.getBackground() );
			}
			ig.input.initMouse();	
			////////
			if (ig.ua.mobile){
				document.addEventListener("pause", function(){
					if(!(typeof ig.game.touch === 'undefined') && ig.game.touch.x!=null){
						for ( var t in ig.input.touches ) {
							ig.input.multitouchend(ig.input.touches[t].x, ig.input.touches[t].y, ig.input.touches[t].id )
						}			
					}
				});
				Ads.fetchRewardedVideo('game-over');
				Ads.fetchRewardedVideo('free-coins');
				Ads.fetchRewardedVideo('montura');
				Ads.loadInterstitial();
			}
			this.intBtnMontura();
			cheatCode=null;//cheats
		},
		getLevelSettings: function(){
			switch(currentWorld) {
				case "bw":
					if(parseInt(currentLevel.split("_")[1])>10){
						lStorage.set('nivel_bw',"bw_10");
						currentLevel=currentLevel.split("_")[0]+"_10";//ultimo nivel de bonus
					}
					switch(currentLevel) {
						case "bw_10":
							return 'infinite';
							break;
						default:
							return 'random';
					}
					break;
				default:
					return 'none';
			}
		},
		getNewLevel: function(){
			this.clearColor = null;
			switch(currentWorld) {
				case "bw":
					switch(currentLevel) {
						case "bw_1":
							return new ig.CustomRandomLevel([LevelPart1], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic1,orden:0}], blocks: 2, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_2":
							return new ig.CustomRandomLevel([LevelPart2, LevelPart17], {start: LevelInfin_start_mount, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic2,orden:1}], blocks: 3, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_3":
							return new ig.CustomRandomLevel([LevelPart3, LevelPart16, LevelPart20], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic3,orden:1}], blocks: 4, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_4":
							return new ig.CustomRandomLevel([LevelPart4, LevelPart14, LevelPart18], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic4,orden:2}], blocks: 4, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_5":
							return new ig.CustomRandomLevel([LevelPart5, LevelPart13, LevelPart20], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic5,orden:2}], blocks: 4, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_6":
							return new ig.CustomRandomLevel([LevelPart9, LevelPart14, LevelPart19], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic6,orden:2}], blocks: 4, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_7":
							return new ig.CustomRandomLevel([LevelPart6, LevelPart10, LevelPart21, LevelPart25], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic7,orden: 3}], blocks: 5, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_8":
							return new ig.CustomRandomLevel([LevelPart7, LevelPart12, LevelPart22, LevelPart26], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic8,orden: 3}], blocks: 5, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_9":
							return new ig.CustomRandomLevel([LevelPart8, LevelPart15, LevelPart23, LevelPart14], {start: LevelInfin_start, end: LevelInfin_end, forceLevels:[{level:LevelLevelStatic9,orden: 2}], blocks: 5, checkY:false, checkX:false, background: this.getBackground()});
							break;
						case "bw_10":
							return new ig.InfiniteLevel([LevelPart1], {start: LevelInfin_start_boss, checkY:false, checkX:false});
							break;
					}
					break;
			}
		},
		getBackground: function(){
			switch(currentWorld) {
				case "bw":
					return {repeat:false, img: 'media/img/bg.jpg', distance: "80", tilesize:1000};
					break;
				case "lw":
					switch(true) {
						case (currentLevel=="lw_5"||currentLevel=="lw_10"||currentLevel=="lw_15"||currentLevel=="lw_20")://caverna
							return [{repeat:true, img: 'media/img/backgrounds/fondo_3/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						default:
							return [{repeat:true, img: 'media/img/backgrounds/fondo_8/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_8/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_8/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_8/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_8/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
					}
					break;
				default:
					switch(true) {
						case (currentLevel=="1_1"||currentLevel=="1_2"||currentLevel=="1_7"||currentLevel=="1_8")://bosque
							return [{repeat:true, img: 'media/img/backgrounds/fondo_2/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_2/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_2/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_2/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_2/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="1_3"||currentLevel=="1_5"||currentLevel=="1_9"||currentLevel=="2_6")://cielo
							return [{repeat:true, img: 'media/img/backgrounds/fondo_1/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_1/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_1/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_1/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_1/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="1_10"||currentLevel=="1_s1"||currentLevel=="2_9"||currentLevel=="2_s1"||currentLevel=="2_10")://caverna
							return [{repeat:true, img: 'media/img/backgrounds/fondo_3/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_3/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="1_6"||currentLevel=="2_5")://agua
							return [{repeat:true, img: 'media/img/backgrounds/fondo_4/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_4/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_4/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_4/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_4/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="2_1"||currentLevel=="2_2"||currentLevel=="2_3"||currentLevel=="2_7")://montania
							return [{repeat:true, img: 'media/img/backgrounds/fondo_5/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_5/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_5/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_5/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_5/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="3_1"||currentLevel=="3_5"||currentLevel=="3_6"||currentLevel=="3_7"||currentLevel=="3_9"||currentLevel=="3_10")://desierto piso
							return [{repeat:true, img: 'media/img/backgrounds/fondo_6/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						case (currentLevel=="3_2"||currentLevel=="3_3"||currentLevel=="3_4"||currentLevel=="3_8"||currentLevel=="3_s1")://desierto cielo
							return [{repeat:true, img: 'media/img/backgrounds/fondo_6/5.jpg', distance: "30", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/4.png', distance: "5", speedScroll:2, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/3.png', distance: "4", speedScroll:2.5, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/2.png', distance: "3.5", speedScroll:3, tilesize:1000}, {repeat:true, img: 'media/img/backgrounds/fondo_6/1.png', distance: "3", speedScroll:3, tilesize:1000}];
							break;
						default:
							return [{repeat:true, img: 'media/img/trans.png', distance: "50", speedScroll:3, tilesize:1000}];
					}
					break;
			}
		},
		intBtnMontura: function(){
			var esto=this;
			if(lStorage.get('montura1')!==null){
				var btn_montura = ig.game.spawnEntity( EntityBtn_montura, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/console/btns_monturas/montura1.png', 60, 60 ),			
					posX:ig.system.width-317,
					posY:1,	
					fixed:true,
					size:{x:60 ,y:60},
					cant:1,
					slot:'montura',
					onPopup:false,
					equiped:false,//(1===ig.game.player.montura),
					montura:1,	
					noWater:true,
					settings:{delay:0,bgImg:'media/img/inst/terrestre1.png',sizeX:780,sizeY:480,closeOnTap:true},
					pressedUp: function(){
						this.equipar();
						esto.montura_action(this.storageName, this, this.slot, this.armaItem);	
					},	
					habilitar: function(){
						ig.game.spawnEntity(EntityPopupAlert, ig.game.screen.x, ig.game.screen.y,this.settings);
					},
					monturaxVideo: function() {
						ig.game.spawnEntity( EntityPopupVideoMount, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/popup-mount-time-dino.png',780 , 480 ),
							imgTopTile:0,
							posConfirmBtn:{x:145,y:350},
							withClose:true,
							confirm: function(){
								soundButton.play();
								Ads.showRewardedVideo('montura_1');
							},
						});
					},
				});
				this.btn_monturas.push(btn_montura);
			}
			if(lStorage.get('montura2')!==null){
				var btn_montura = ig.game.spawnEntity( EntityBtn_montura, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/console/btns_monturas/montura4.png', 60, 60 ),	
					posX:ig.system.width-132,
					posY:1,
					slot:'montura',
					fixed:true,
					cant:1,
					size:{x:60 ,y:60},
					equiped:false,//(2===ig.game.player.montura),
					montura:2,
					noWater:true,
					settings:{delay:0,
						animSheet:new ig.AnimationSheet('media/img/inst/complete_hidenlevel_2.png',780,480),
						sizeX:780,
						sizeY:480,
						closeOnTap:true,
						confirm:function(){
							//inapps
							var productId = "montura2";
							Ads.inApps.purchaseTest(productId,1);
							//inapps
						},
					},
					pressedUp: function(){
						this.equipar();
						esto.montura_action(this.storageName, this, this.slot, this.armaItem);	
					},	
					habilitar: function(){
						ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,this.settings);
					},
					monturaxVideo: function() {
						ig.game.spawnEntity( EntityPopupVideoMount, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/popup-mount-time-flying.png',780 , 480 ),
							imgTopTile:0,
							withClose:true,
							posConfirmBtn:{x:145,y:350},
							confirm: function(){
								soundButton.play();
								Ads.showRewardedVideo('montura_2');
							},
						});
					}
				});
				this.btn_monturas.push(btn_montura);
			}
			if(lStorage.get('montura3')!==null){
				var btn_montura = ig.game.spawnEntity( EntityBtn_montura, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/console/btns_monturas/montura2.png', 60, 60 ),	
					posX:ig.system.width-255,
					posY:1,
					fixed:true,
					size:{x:60 ,y:60},
					cant:1,
					slot:'montura',
					equiped:false,//(3===ig.game.player.montura),
					montura:3,	
					settings:{delay:0,
						animSheet:new ig.AnimationSheet('media/img/inst/complete_hidenlevel_1.png',780,480),
						sizeX:780,
						sizeY:480,
						closeOnTap:true,
						confirm:function(){
							//inapps
							var productId = "montura3";
							Ads.inApps.purchaseTest(productId,1);
							//inapps
						},
					},
					pressedUp: function(){
						this.equipar();
						esto.montura_action(this.storageName, this, this.slot, this.armaItem);	
					},	
					habilitar: function(){
						ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,this.settings);
					},
					monturaxVideo: function() {
						ig.game.spawnEntity( EntityPopupVideoMount, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/popup-mount-time-aqua.png',780 , 480 ),
							imgTopTile:0,
							withClose:true,
							posConfirmBtn:{x:145,y:350},
							confirm: function(){
								soundButton.play();
								Ads.showRewardedVideo('montura_3montura_3montura_3montura_3');
							},
						});
					}
				});
				this.btn_monturas.push(btn_montura);
			}
			if(lStorage.get('montura4')!==null){
				var btn_montura = ig.game.spawnEntity( EntityBtn_montura, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/console/btns_monturas/montura3.png', 60, 60 ),	
					posX:ig.system.width-193,
					posY:1,
					slot:'montura',
					fixed:true,
					cant:1,
					size:{x:60 ,y:60},
					equiped:false,//(4===ig.game.player.montura),
					montura:4,
					noWater:true,
					settings:{delay:0,
						animSheet:new ig.AnimationSheet('media/img/inst/complete_hidenlevel_3.png',780,480),
						sizeX:780,
						sizeY:480,
						closeOnTap:true,
						confirm:function(){
							//inapps
							var productId = "montura4";
							Ads.inApps.purchaseTest(productId,1);
							//inapps
						},
					},
					pressedUp: function(){
						this.equipar();
						esto.montura_action(this.storageName, this, this.slot, this.armaItem);	
					},	
					habilitar: function(){
						ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,this.settings);
					},
					monturaxVideo: function() {
						ig.game.spawnEntity( EntityPopupVideoMount, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/popup-mount-time-subt.png',780 , 480 ),
							imgTopTile:0,
							withClose:true,
							posConfirmBtn:{x:145,y:350},
							confirm: function(){
								soundButton.play();
								Ads.showRewardedVideo('montura_4');
							},
						});
					}
				});
				this.btn_monturas.push(btn_montura);
			}
			if(lStorage.get('montura6')!==null){
				var btn_montura = ig.game.spawnEntity( EntityBtn_montura, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/console/btns_monturas/montura6.png', 60, 60 ),	
					posX:ig.system.width-69,
					posY:1,
					slot:'montura',
					fixed:true,
					cant:1,
					size:{x:60 ,y:60},
					equiped:false,//(4===ig.game.player.montura),
					montura:6,
					noWater:true,
					settings:{delay:0,
						animSheet:new ig.AnimationSheet('media/img/inst/mount_5_buy.png',780,480),
						sizeX:780,
						sizeY:480,
						posConfirmBtn:{x:140,y:330},
						closeOnTap:true,
						btnConfirmImg:'media/img/popups/botones/btn_buy.png',
						confirm:function(){
							//inapps
							var productId = "montura6";
							Ads.inApps.purchaseTest(productId,1);
							//inapps
						},
					},
					pressedUp: function(){
						this.equipar();
						esto.montura_action(this.storageName, this, this.slot, this.armaItem);	
					},	
					habilitar: function(){
						ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,this.settings);
					},
					monturaxVideo: function() {
						ig.game.spawnEntity( EntityPopupVideoMount, 0, 0, {
							animSheet: new ig.AnimationSheet('media/img/inst/popup-mount-time-dragon.png',780 , 480 ),
							imgTopTile:0,
							withClose:true,
							posConfirmBtn:{x:145,y:350},
							confirm: function(){
								soundButton.play();
								Ads.showRewardedVideo('montura_6');
							},
						});
					}
				});
				this.btn_monturas.push(btn_montura);
			}
		},
		montura_action: function(a, o, s, ai){
			if(s=='montura'){
				if (o.equiped){
					for(i=0;i<this.btn_monturas.length;i++){
						if (this.btn_monturas[i].montura != o.montura)
							this.btn_monturas[i].equiped=false;
					}
				}
			}
		},
		onLoadLevelInit: function(){
			this.parent();
			this.cameraVibration= new Camera_vibration({duration:0});
			this.difAlto=ig.game.getMapByName( 'main' ).height*ig.game.getMapByName( 'main' ).tilesize-ig.system.height; //diferencia entre el alto de la capa main y ig.system.height 
			this.screen.y = ig.system.height-this.difAlto;
			
			this.player=this.getEntitiesByType( EntityPersonaje )[0];
			//im=this.player.animSheet.image.path;
			
			this.btns_control();
			
		},
		initPopUpsAtLevels: function(){
			this.camaraRunForPopUps=false;
			if(currentLevel=="1_6"&&!lStorage.get('rated')&&!lStorage.get('ConfirmRate')){
				ig.game.spawnEntity( EntityPopupConfirm, ig.game.screen.x, ig.game.screen.y, {
					animSheet: new ig.AnimationSheet('media/img/inst/pre_rate.jpg',780 , 480 ),
					confirm: function(){
						//lStorage.set('ConfirmRate',true);
						window.open(rateLink, '_blank', 'location=yes');
						lStorage.set('rated',true);
					},
					cancel: function(){
						lStorage.set('rated',true);
					},
				});
			}
			else if(currentLevel=="1_3"&&lStorage.get("montura1")=='off'){
				ig.game.spawnEntity(EntityPopupAlert, ig.game.screen.x, ig.game.screen.y,{delay:0,enableCloseOnTap:true,bgImg:'media/img/inst/terrestre2.png',sizeX:780,sizeY:480,
					callBackKill:function(){
						lStorage.set('montura1','on');		
						ig.game.player.monta(1);
					}
				});
			}
		},
		playPauseMusic: function(){			
		    if(lStorage.get('music')){ig.music.play();}
			else{ig.music.pause();}			
		},
		playPauseSx: function(){			
		    if(lStorage.get('sx')){ig.Sound.enabled = true;}
			else{ig.Sound.enabled = false;}			
		},
		btns_control: function(){
			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			//if (ig.ua.mobile){
				btn_left=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/left_button.png', 80, 80 ),
					posX:0,
					posY:ig.system.height-180,
					size:{x:120, y:180},
					offset:{x:-20, y:-80},
					fixed:true
				});
				btn_right=ig.game.spawnEntity( Button, 90, 0, {animSheet: new ig.AnimationSheet( 'media/img/right_button.png', 80, 80 ),
					posX:130,
					posY:ig.system.height-180,
					size:{x:120, y:180},
					offset:{x:-20, y:-80},
					fixed:true					
				});
				btn_up=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/up_button.png', 80, 80 ),				
					posX:ig.system.width-120,
					posY:ig.system.height-180,
					size:{x:120, y:180},
					offset:{x:-20, y:-80},
					fixed:true,				
				});
							
				btn_fire=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/fire_button.png', 80, 80 ),				
					posX:(this.player.modo!='runner')?ig.system.width-250:0, //pos en el eje x del boton dependiendo si esta en modo runner o no
					posY:ig.system.height-180,
					size:{x:120, y:180},
					offset:{x:-20, y:-80},
					fixed:true,
					state:'deactive',	
				});
			//}
			btn_down=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/down_button.png', 80, 80 ),				
				posX:ig.system.width-120,
				posY:ig.system.height-180,
				size:{x:120, y:180},
				offset:{x:-20, y:-80},
				fixed:true,	
				state:'deactive',	
			});
			btn_pause=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/pause_button.png', 60, 60 ),				
				posX:0,
				posY:6,
				offset:{x:-10, y:7},
				size:{x:120, y:120},
				fixed:true,	
				alwaysEnable:true,
				idParent:999,
				pressedUp: function(){
					//ig.game.shareFB();
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
				},				
			});
			//if(ig.ua.mobile){
				btn_fire.addAnim( 'fire', 9999, [6] );
				btn_fire.addAnim( 'axe', 9999, [3] );
			//}
		},
		update: function() {	
			if(infinite)
				this.infiniteLevel.update();
			this.parent();	
			if(!this.pause){
				if(this.camaraRunForPopUps){
					this.initPopUpsAtLevels();
				}
				this.camara();	
				if(this.cameraVibration!=null)
					this.cameraVibration.update();
				cheatCode=null;//cheats
			}
			if( ig.ua.mobile ){	
				ig.input.checkTouches();
			}
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			if(random)
				this.randomLevel.drawBackground();
			if(infinite)
				this.background.draw(0,0);
			this.parent();	
			if (this.screenFader) {
				this.screenFader.draw();
			}
			if(this.onLoadLevel){
				//if (ig.ua.mobile){
					this.multitouchControls();
					if(this.player.modo!='runner'){//oculto botones der e izq si esta en modo runner
						btn_left.draw( true );
						btn_right.draw( true );
						btn_left.state='active';
						btn_right.state='active';
					}
					else{
						btn_left.state='deactive';
						btn_right.state='deactive';
					}
					btn_up.draw( true );
				//}
				btn_down.draw( true );
				//if(ig.ua.mobile&&btn_fire.state!='deactive')
					btn_fire.draw( true );
				var popups = this.getEntitiesByType( EntityPopup );
				if(this.popupOn && popups.length > 0){
					if(popups[0].keepConsole){
						popups[0].draw(true);
						this.drawConsole();
					}
					else{
						this.drawConsole();
						popups[0].draw(true);
					}
				}
				else
					this.drawConsole();
			}
		},
		multitouchControls: function(){//fix multi-touch android browser (botones de control)
			var player=this.player;
			for(var t in ig.input.touches){
				this.touch = ig.input.touches[t]; 
				if((this.player.modo!='runner'&&this.player.currentAnim!=this.player.anims.transfSiyajin&&this.touch.x >= btn_left.posX && this.touch.x <= btn_left.posX+btn_left.size.x && this.touch.y >= btn_left.posY && this.touch.y <= btn_left.posY+btn_left.size.y)&&(btn_left.habilitado && ((!ig.game.popupOn && !btn_left.onPopup)||(ig.game.popupOn && btn_left.onPopup)||btn_left.alwaysEnable))){
					player.movimientoIzq();
				}
				else if((this.player.modo!='runner'&&this.player.currentAnim!=this.player.anims.transfSiyajin&&this.touch.x >= btn_right.posX && this.touch.x <= btn_right.posX+btn_right.size.x && this.touch.y >= btn_right.posY && this.touch.y <= btn_right.posY+btn_right.size.y)&&(btn_right.habilitado && ((!ig.game.popupOn && !btn_right.onPopup)||(ig.game.popupOn && btn_right.onPopup)||btn_right.alwaysEnable))){
					player.movimientoDer();
				}
				else if((btn_up.state!='deactive'&&this.player.currentAnim!=this.player.anims.transfSiyajin&&this.touch.x >= btn_up.posX && this.touch.x <= btn_up.posX+btn_up.size.x && this.touch.y >= btn_up.posY && this.touch.y <= btn_up.posY+btn_up.size.y)&&(btn_up.habilitado && ((!ig.game.popupOn && !btn_up.onPopup)||(ig.game.popupOn && btn_up.onPopup)||btn_up.alwaysEnable))){
					if(this.btnUp1time){
						player.movimientoUp();
					}
					this.btnUp1time=false;
					if(this.touch.state=='up')
						this.btnUp1time=true;
				}
				else if((btn_down.state!='deactive'&&this.touch.x >= btn_down.posX && this.touch.x <= btn_down.posX+btn_down.size.x && this.touch.y >= btn_down.posY && this.touch.y <= btn_down.posY+btn_down.size.y)&&(btn_down.habilitado && ((!ig.game.popupOn && !btn_down.onPopup)||(ig.game.popupOn && btn_down.onPopup)||btn_down.alwaysEnable))){
					if(this.btnUp1time)
						player.movimientoDown();
					this.btnUp1time=false;
					if(this.touch.state=='up')
						this.btnUp1time=true;
				}
				else if((this.touch.x >= btn_fire.posX &&this.player.currentAnim!=this.player.anims.transfSiyajin&& this.touch.x <= btn_fire.posX+btn_fire.size.x && this.touch.y >= btn_fire.posY && this.touch.y <= btn_fire.posY+btn_fire.size.y&&btn_fire.state!='deactive')&&(btn_fire.habilitado && ((!ig.game.popupOn && !btn_fire.onPopup)||(ig.game.popupOn && btn_fire.onPopup)||btn_fire.alwaysEnable))){						
					if(this.btnFire1time){
						player.dispara();
						this.animFire=true;
					}
					this.btnFire1time=false;
					if(this.touch.state=='up')
						this.btnFire1time=true;
				}
			}
		},
		camara: function(){
			if(this.camaraRunForPopUps==null)this.camaraRunForPopUps=true;
			var player = this.player;
			//scroll x
			if(this.cameraPassage.b){  // camara dentro de intranivel (camaraPasaje se actualiza en la entidad passage)
				if(!this.cameraPassage.scroleaX){
					this.screen.x =this.screen.x;
				}else{
					if(player.pos.x-this.cameraPassage.iniX > ig.system.width/2-player.size.x&&this.cameraPassage.scroleaX){
						
						this.screen.x = player.pos.x - ig.system.width/2+player.size.x;
					}else{
						this.screen.x = this.cameraPassage.iniX;
					}
				}
			}else{ //camara en juego, fuera de intranivel
				
				if(!this.scroleaX){ 
					this.screen.x =this.screen.x;
				}else if(player && player.scroll==null){					
					if(player.pos.x > ig.system.width/2-player.size.x/2) {
						this.screen.x = player.pos.x - ig.system.width/2+player.size.x/2;
					}else if(player.pos.x < ig.system.width/2-player.size.x/2){
						this.screen.x =0;
					}
				}else if(player && player.scroll!=null&& !player.murio){ //modo autoscroll
					if(player.pos.x-this.screen.x > ig.system.width/2-player.size.x){this.screen.x = player.pos.x - ig.system.width/2+player.size.x;}
					else this.screen.x+=player.scroll;
				} 
			}
			
			//scroll y
			if(player && player.pos.y < ig.system.height/2) {
				this.screen.y = 0;
			}
			else if(player && player.pos.y < ig.system.height/2+this.difAlto) {
				this.screen.y = player.pos.y - ig.system.height/2;
			}
			else if( player && player.pos.y > ig.system.height/2-player.size.y){
				this.screen.y =this.difAlto;
			}
		},
		loadLevel: function( data ) {
			if(!infinite){
				this.currentLevel = data;
				this.parent( data );
				var lengthBackgroundMap = this.backgroundMaps.length;
				for( var i = 0; i < lengthBackgroundMap; i++ ) {
					this.backgroundMaps[i].preRender = true;
				}
				this.screenFader = new ig.ScreenFader({ fade: 'out', speed: 5 });
			}else{
				this.parent( data );
			}
		},
		drawConsole :function(){
			var tileArma, tilePastilla;
			//pastillas
			if(this.player.tipo=='player')
				if(this.player.getTileAgua(this.player.pos.x+this.player.size.x/2, this.player.pos.y+this.player.size.y-2))tilePastilla=1;
				else tilePastilla=0;
			else{
				if(this.player.montura == 1)tilePastilla=2;
				if(this.player.montura == 2)tilePastilla=4;
				if(this.player.montura == 3)tilePastilla=5;
				if(this.player.montura == 4)tilePastilla=3;
				if(this.player.montura == 5)tilePastilla=0;
				if(this.player.montura == 6)tilePastilla=6;
			}
			this.pastillas.drawTile(ig.system.width/2-31.5,-12,tilePastilla,64);
			
			//barra agua burbuja
			if(this.player.getTileAgua(this.player.pos.x+this.player.size.x/2, this.player.pos.y+this.player.size.y-2)){
				this.waterBar.height= this.player.oxigeno*70/100;
				this.waterBar.draw(ig.system.width/2-29.5,45-this.player.oxigeno/2);
			}
			
			//barras
			this.bars.draw(ig.system.width/2-60,0);
			this.bars.draw(ig.system.width/2+48,0);
			if(this.player.items.iman){
				this.barIman.height= this.player.barraLlena.iman*45/100;
				this.barIman.draw(ig.system.width/2+48,-1+(45-this.barIman.height));
			}
			if(this.player.items.invul){
				this.barInvul.height= this.player.barraLlena.invul*45/100;
				this.barInvul.draw(ig.system.width/2-60,-1+(45-this.barInvul.height));
			}
			
			//consola
			this.consola.draw(0,0);
			
			//armas
			if(this.player.arma==null){
				tileArma=8;
				this.imgItemsConsola.drawTile(ig.system.width/2-15,45,tileArma,32.5);
			}else{
				if(this.player.arma=='ice')tileArma=7;
				else if(this.player.arma=='fire')tileArma=6;
				else if(this.player.arma=='axe')tileArma=5;
				this.imgItemsConsola.drawTile(ig.system.width/2-15,47,tileArma,32.5);
			}	
			
			//items
			if(this.player.item){//activa items
				if(this.player.items.iman)this.imgItemsConsola.drawTile(ig.system.width/2+27,1,3,32.5);
				if(this.player.items.invul)this.imgItemsConsola.drawTile(ig.system.width/2-58,1,0,32.5);	
				if(this.player.items.fly)this.imgItemsConsola.drawTile(ig.system.width/2+17,33,2,32.5);	
				if(this.player.items.snorkel)this.imgItemsConsola.drawTile(ig.system.width/2-48,30,1,32.5);	
			}
			
			//monedas y vidas 
			this.imgItemsConsola.drawTile(70,0,11,32.5);
			//this.imgItemsConsola.drawTile(80,0,9,32.5);
			
			
			if(ig.game.pause){//por bug en celulares
				btn_pause.addAnim( 'idle', 1, [2] );
				btn_pause.addAnim( 'active', 1, [3] );
				btn_pause.currentAnim = btn_pause.anims.idle;
			}
			else{
				btn_pause.addAnim( 'idle', 1, [0] );
				btn_pause.addAnim( 'active', 1, [1] );
				btn_pause.currentAnim = btn_pause.anims.idle;
			}
			
			btn_pause.draw( true );
			
			//monturas in game
			this.drawMonturas();
			
			//fonts
			var vidas=lStorage.get('vidas');
			vidas=(vidas<=0)?0:vidas-1;
			this.imgItemsConsola.drawTile(ig.system.width/2-26,25,10,32.5);
			this.fontVidas.draw((vidas<10)?'0'+vidas:vidas,ig.system.width/2-1,30);
			
			this.fontMonedas.draw(Math.round(monedasNoAcumul),110,-1);
			
			this.imgItemsConsola.drawTile(ig.system.width/2-200,-1,14,32.5);
			if(this.level.indexOf('s') != -1){
				this.fontWorld.draw(currentWorld+' - ',ig.system.width/2-160,-1);
				this.fontWorld.letterSpacing = -2;
				this.fontWorld.draw(' S',ig.system.width/2-130,0);
			}
			else
				this.fontWorld.draw(currentWorld+'-'+this.level.toString(),ig.system.width/2-155,-1);
		},
		drawMonturas: function(){
			var lengthMonturas = this.btn_monturas.length;
			for( var i = 0; i < lengthMonturas; i++ ) {
				this.btn_monturas[i].update_ex();
				this.btn_monturas[i].draw();
			}
		},
		shareFB: function(){
			var esto=this;
			fbSocialAPI.login(function(loggedIn, error){
				if (loggedIn) {
					esto.showShareDialog();
				}
			});
		},
		showShareDialog: function(){
			var message = new Cocoon.Social.Message(
				"Super Woody",
				"https://dl.dropboxusercontent.com/s/xml4qnlrxpt58id/img_JH.jpg?dl=0",
				"https://play.google.com/store/apps/details?id=com.woody.world.adventure",
				"Let´s play together in this awesome adventure!",
				"");
			 
			fbSocialAPI.publishMessageWithDialog(message, function(error) {
				if (error) {
					console.log("error");
				}else{
					lStorage.set('montura1','on');								
					if(this.popupOn)
						this.getEntitiesByType( EntityPopup )[0].kill();
					ig.game.player.monta(1);
					/*if(navigator.onLine&&ig.ua.mobile)
						Parse.Cloud.run('levelEstadistics', {level:'share_fb'});*/
				}
			});
		},
	    te: function(c,p,i,f){
			var x = c.length;
	        var cadenaInvertida = "";	
	        while (x>=0) {
	                cadenaInvertida = cadenaInvertida + c.charAt(x);
	                x--;
	        }	
			if(cadenaInvertida.substring(i,f)==p)return true;
	    },
	});


    var c = document.createElement('canvas');
	compVers=2;
	if(compVers==2){
		var ancho100=780;
		var alto100=480;
		posTop=0;
		posLeft=0;
		pR=0;
		if(window.innerWidth/window.innerHeight<1.64){
			
			c.style.width=window.innerWidth+'px';
			pR=window.innerWidth*100/ancho100;//porcentaje resize
			posTop=(window.innerHeight-(pR*alto100/100))/2;
			c.style.top=posTop+'px';
		}else{
			
			c.style.height=window.innerHeight+'px';
			pR=window.innerHeight*100/alto100;//porcentaje resize
			posLeft=(window.innerWidth-(pR*ancho100/100))/2;
			c.style.left=posLeft+'px';
		}
		
		//console.log('Resize al: '+pR+'%');
	}
	ig.touchLocation = {x: 0, y: 0};
	c.addEventListener(
		"touchstart",
		function(touchEvent) {
			var e = touchEvent.targetTouches[0];
			var touch = Object();
			
			if(compVers==2){
				touch['x'] = e.pageX/pR*100-posLeft/2;
				touch['y'] = e.pageY/pR*100-posTop/2;
			}else{
				touch['x'] = e.pageX;
				touch['y'] = e.pageY;
			}
			ig.touchLocation = touch;
			ig.touchactive = true;
			
		}
	);

	c.addEventListener(
		"touchmove",
		function(touchEvent) {
			var e = touchEvent.targetTouches[0];
			var touch = Object();
			if(compVers==2){
				touch['x'] = e.pageX/pR*100-posLeft/2;
				touch['y'] = e.pageY/pR*100-posTop/2;
			}
			else{
				touch['x'] = e.pageX;
				touch['y'] = e.pageY;
			}
			ig.touchLocation = touch;
			ig.touchactive = true;
			
		}
	);
	c.id = 'canvas';
	document.body.appendChild(c);
	
	//sound hack
	document.addEventListener('pause', function() {
		if(lStorage.get('music')){									
			ig.music.pause();
		}
		if(lStorage.get('sx')){									
			ig.Sound.enabled = false;
		}
		
	});
	document.addEventListener('resume', function() {
		if(lStorage.get('music')){
			ig.music.play([ig.game.music]);
		}
		if(lStorage.get('sx')){									
			ig.Sound.enabled = true;
		}
	});
	
	if(ig.ua.mobile){
		document.addEventListener('deviceready', function() {
			ads = new Ads();	
			Ads.loadBanner();
			document.addEventListener("backbutton", function(){ // backbutton	
				if( ig.game instanceof Inicio ){
					navigator.notification.confirm(
						'Do you really want to exit?',  
						function(e){
							if(e==2)navigator.app.exitApp();							
						},              
						'Exit',            
						['No','Yes']          
					);	
				}else{	
					if(ig.game.popupOn){
						ig.game.getEntitiesByType( EntityPopup )[0].kill();
					}else{
						if(loadWorld){
							ig.system.setGame(Inicio);
						}
						else{ 
							loadWorld=true;
							ig.system.setGame(Levels);
						}
					} 
				}
			}, false);
			//Cocoon.Utils.textureReduction(70);
			//Cocoon.Utils.setTextCacheSize(0);
			
			ig.System.drawMode = ig.System.DRAW.AUTHENTIC;
			ig.main( '#canvas', Inicio, 60, 780, 480, 1 );
			//Cocoon.Utils.setMaxMemory(100);
			
			if(ig.ua.iOS){
                rateLink=rateLinkIOS;
            }
			/*Cocoon.App.on("memorywarning", function() {
				navigator.notification.alert(
					'Memory warning',  // message
					function(){},         // callback
					'MEMORY WARNING',            // title
					'Ok'                  // buttonName
				);
				console.log('¡¡¡¡¡¡¡¡¡¡¡¡¡MEMORY WARNING!!!!!!!!!!!!!');
			});*/
			
			//var autoHideNavigationBar = true;
			//window.navigationbar.setUp(autoHideNavigationBar);	

			// fbService = Cocoon.Social.Facebook;
			// fbService.init({
			   // appId      : "1558977927688601",
			   // xfbml      : true,
			   // version    : 'v2.5'			 
			// }, function () {
				// fbSocialAPI = fbService.getSocialInterface(); //high level abstraction API
				// fbSocialAPI.on("loginStatusChanged", function(loggedIn){
					// /*alert("Login status: " + JSON.stringify(response));
					// if (response.status === 'connected') {
						// // the user is logged in and has authenticated your
						// // app, and response.authResponse supplies
						// // the user's ID, a valid access token, a signed
						// // request, and the time the access token 
						// // and signed request each expire
			 
					  // } else if (response.status === 'not_authorized') {
						// // the user is logged in to Facebook, 
						// // but has not authenticated your app
			 
					  // } else {
			 
					  // }*/
				// });
			// });
		}, false);		
	}
	if(!ig.ua.mobile)
		ig.main( '#canvas', Inicio, 60, 780, 480, 1 );
	
	//ig.main( '#canvas', Inicio, 60, 1280, 800, 1 );
	// actualización AGW wallet init
});

