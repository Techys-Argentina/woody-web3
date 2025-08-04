ig.module(
    'game.entities.popups.popupInvent'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupInvent = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/popups/tablas-invent.png',713,493),	
		size:{x:713, y:493},
		zIndex:1,
		pause:false,
		btn_resume: null,
		btn_menu: null,
		btn_volume:null,
		btn_sx:null,
		btn_more:null,
		center:true,
		keepConsole:true,
		killPopupInvet:false,
		animacionVertical:true,
		posicionFinal:{x : 0, y : 0},
		aBB:[//img, storage name, slot, arma/item
			['ice.png', 'pu_iceBall', 'arma', 'ice'],
			['fire.png', 'pu_fireBall', 'arma', 'fire'],			
			['axe.png', 'pu_axe', 'arma', 'axe'],
			['pico.png', 'pu_pico', 'arma', 'pico'],
			['iman.png', 'pu_iman', 'item', 'iman'],
			['snorkel.png', 'pu_snorkel', 'item', 'snorkel'],
			['fly.png', 'pu_fly', 'item', 'fly'],
			['invul.png', 'pu_invul', 'item', 'invul']//,
			//['montura1.png', 'pu_mont1', 'montura', '1'],
			//['montura2.png', 'pu_mont3', 'montura', '3'],
			//['montura4.png', 'pu_mont4', 'montura', '4'],
			//['montura3.png', 'pu_mont2', 'montura', '2']
		],
		close: null,
		btn_powerUps:null,
        //Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.posicionFinal.x=ig.game.screen.x+ig.system.width/2-this.size.x/2;
			this.posicionFinal.y=ig.game.screen.y+ig.system.height/2-this.size.y/2-25;
			var esto=this;
			var aBB=this.aBB;
			var lengthABB = aBB.length;
			for(i=0; i<lengthABB; i++){
				this['pu_'+i]=ig.game.spawnEntity( EntityBtn_inventario	, 0, 0, {
					animSheet: new ig.AnimationSheet( 'media/img/popups/inventario_botones/'+aBB[i][0]+'',105,105),
					idParent:esto.id,
					storageName:aBB[i][1],
					slot:aBB[i][2],
					armaItem:aBB[i][3],
					equiped:false,
					cant:lStorage.get(aBB[i][1]),
					posX:this.pos.x,
					posY:this.pos.y,
					size:{x:105 ,y:105},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						if(!this.equiped)
							esto.action(this.storageName, this, this.slot, this.armaItem);	
					},	
				});	
			}
			this.btn_powerUps=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/store.png', 80, 80 ),
				idParent:esto.id,
				posX:this.pos.x+300,
				posY:this.pos.y+180,
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					esto.kill();
					ig.game.spawnEntity(EntityPopupPowerUps, ig.game.screen.x, ig.game.screen.y);	
				},				
			});
		}, 
		inicia: function(){
			this.parent();
			ig.music.pause();
			if(ig.ua.mobile)
				Ads.showBanner();
			var esto=this;
			if(navigator.onLine&&ig.ua.mobile){
				Ads.setCrossPromotionBubble();
			}
            this.btn_menu=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/menu.png', 80, 80 ),	
				idParent:esto.id,
				posX:this.pos.x+405,
				posY:this.pos.y+180,
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
			if(crossPromImg!=null){
				btn_crossPromotion=ig.game.spawnEntity( EntityBtn_crossPromotion, 0, 0, {animSheet: new ig.AnimationSheet( crossPromImg, 80, 80 ),	
					idParent:esto.id,
					pos:{x:this.pos.x+20,y:this.pos.y+400},
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
		update: function(){
			this.parent();
			if (!this.animacionVertical){
				this.pos.y=ig.game.screen.y+ig.system.height-this.size.y-50;
			}
			var esto=this;	
			
			var pXArma=15;
			var pYArma=180;	
			var pXItem=505;
			var pYItem=180;
			
			var padbottomArma=100;	
			var padRightArma=100;
			var padbottomItem=100;
			var padRightItem=100;
			
			var iteArma=0;
			var iteItem=0;
			
			var allDeactive=true;
			var slot='arma';
			var lengthABB = this.aBB.length;
			for(i=0;i<lengthABB;i++){
				if (this['pu_'+i].slot == 'arma'){
					if(iteArma==0&&slot!=this['pu_'+i].slot)
						slot=this['pu_'+i].slot;
					if(iteArma!=0&&this['pu_'+i].slot!=slot){
						pXArma=15;
						pYArma+=padbottomArma;
						iteArma=0;
						slot=this['pu_'+i].slot;
					}				
					this['pu_'+i].posX=this.pos.x+pXArma;
					this['pu_'+i].posY=this.pos.y+pYArma;
					this.activeDeactive(this['pu_'+i],  this['pu_'+i].armaItem,  this['pu_'+i].slot);
					if(this['pu_'+i].cant<1&&!this['pu_'+i].equiped){
						this['pu_'+i].state='deactive';
					}
					allDeactive=false;
					pXArma+=padRightArma;
					iteArma++;
					if(iteArma%2==0&&iteArma>1){
						pXArma=15;
						pYArma+=padbottomArma;
						iteArma=0;
					}
				}
				else if (this['pu_'+i].slot == 'item'){
					if(iteItem==0&&slot!=this['pu_'+i].slot)
						slot=this['pu_'+i].slot;
					if(iteItem!=0&&this['pu_'+i].slot!=slot){
						pXItem=505;
						pYItem+=padbottomItem;
						iteItem=0;
						slot=this['pu_'+i].slot;
					}				
					this['pu_'+i].posX=this.pos.x+pXItem;
					this['pu_'+i].posY=this.pos.y+pYItem;
					this.activeDeactive(this['pu_'+i],this['pu_'+i].armaItem,this['pu_'+i].slot);
					if(this['pu_'+i].cant<1&&!this['pu_'+i].equiped){
						this['pu_'+i].state='deactive';
					}
					allDeactive=false;
					pXItem+=padRightItem;
					iteItem++;
					if(iteItem%2==0&&iteItem>1){
						pXItem=505;
						pYItem+=padbottomItem;
						iteItem=0;
					}
				}
			}
			/*this.btn_powerUps.posX=this.pos.x+this.size.x-this.btn_powerUps.size.x-5;
			this.btn_powerUps.posY=this.pos.y+this.size.y-this.btn_powerUps.size.y-10;*/
		},
		draw: function(){
			var img = new ig.Image('media/img/items.png');	
			var imgChapita = new ig.Image('media/img/popups/inventario_botones/boton-cantidad.png');
			var fontCant = new ig.Font('media/fonts/font15_fff_hobo_0-9.png');
			fontCant.firstChar = 48;
			fontCant.letterSpacing = -1;
			var fontMonedasAcumul = new ig.Font('media/fonts/font26_grey.png');
			var imgLlaves = new ig.Image( 'media/img/popups/llaves-activas-llavero.png' );
			this.parent();
			//Llaves
			var aKeys=lStorage.get('keys').split(',');
			var lengthKeys = aKeys.length;
			for (k=0; k<lengthKeys;k++){	
				switch(aKeys[k].split('_')[0]) {
					case "1":
						imgLlaves.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2+16,this.pos.y-ig.game.screen.y+this.size.y-99,parseInt(aKeys[k].split('_')[0])-1,33,44);//la posicion fue a ojo
					break;
					case "2":
						imgLlaves.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2+31,this.pos.y-ig.game.screen.y+this.size.y-99,parseInt(aKeys[k].split('_')[0])-1,33,44);//la posicion fue a ojo
					break;
					case "3":
						imgLlaves.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2+49,this.pos.y-ig.game.screen.y+this.size.y-99,parseInt(aKeys[k].split('_')[0])-1,33,44);//la posicion fue a ojo
					break;
					default:
				}
			}	
			//Monedas acumuladas
			fontMonedasAcumul.draw(Math.round(lStorage.get('monedas')),this.pos.x-ig.game.screen.x+this.size.x/2-40, this.pos.y-ig.game.screen.y+this.size.y-78,ig.Font.ALIGN.CENTER);
			
			var lengthABB = this.aBB.length;
			for(i=0;i<lengthABB;i++){
				if(this['pu_'+i].armaItem === 'pico'){
					if (ig.game.player.tipo=='montura' && parseInt(ig.game.player.montura) == 5){
						if(this['pu_'+i].equiped||this['pu_'+i].cant>0){
							if(this['pu_'+i].equiped)
								this['pu_'+i].currentAnim = this['pu_'+i].anims.equiped;
							else
								this['pu_'+i].currentAnim = this['pu_'+i].anims.idle;
							this['pu_'+i].draw();
							imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
							fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-18, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
						}
						if (this['pu_'+i].cant>0){
							imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
							fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
						}
					}
					else{
						this['pu_'+i].setState( 'deactive' );
						this['pu_'+i].currentAnim = this['pu_'+i].anims.deactive;
						this['pu_'+i].draw(true);
						if(this['pu_'+i].cant>0)
							imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
						else
							imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,0,34);
						fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
					}
				}
				else if (this['pu_'+i].slot == 'arma' && ig.game.player.tipo=='montura'){
					this['pu_'+i].setState( 'deactive' );
					this['pu_'+i].currentAnim = this['pu_'+i].anims.deactive;
					this['pu_'+i].draw(true);
					imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
					fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
				}
				else if (this['pu_'+i].slot == 'montura' && parseInt(ig.game.player.montura) == 5){
					this['pu_'+i].setState( 'deactive' );
					this['pu_'+i].currentAnim = this['pu_'+i].anims.noUse;
					this['pu_'+i].draw(true);
				}
				else{
					if(this['pu_'+i].equiped||this['pu_'+i].cant>0){
						if(this['pu_'+i].slot != 'montura'){
							if(this['pu_'+i].equiped)
								this['pu_'+i].currentAnim = this['pu_'+i].anims.equiped;
							else
								this['pu_'+i].currentAnim = this['pu_'+i].anims.idle;
							this['pu_'+i].draw();	
							imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
							fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
						}
						else{
							if(this['pu_'+i].equiped)
								this['pu_'+i].currentAnim = this['pu_'+i].anims.equiped;
							else
								this['pu_'+i].currentAnim = this['pu_'+i].anims.idle;
							if(typeof lStorage.get('montura'+this['pu_'+i].montura) == 'number'){
								this['pu_'+i].currentAnim = this['pu_'+i].anims.deactive;
								this['pu_'+i].state='deactive';
							}
							this['pu_'+i].draw();
						}
					}
					else{
						imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,0,34);
						fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
					}
				}
			}
		},
		action: function(a, o, s, ai){
			o.cant--;
			lStorage.set(a,lStorage.get(a)-1);	
			sounds[13].play();
			if(s=='arma'){
				if(ig.game.player.tipo=='player'){
					o.equiped = true;
					ig.game.player.arma=ai;
					lStorage.set('arma',ai);
					var lengthABB = this.aBB.length;
					for(i=0;i<lengthABB;i++){
						if (this['pu_'+i].slot == 'arma' && this['pu_'+i].storageName != o.storageName)
							this['pu_'+i].equiped=false;
					}
				}
				else if(ig.game.player.tipo=='montura' && parseInt(ig.game.player.montura) == 5 && o.armaItem === 'pico'){
					o.equiped = true;
					ig.game.player.arma=ai;
					lStorage.set('arma',ai);
					var lengthABB = this.aBB.length;
					for(i=0;i<lengthABB;i++){
						if (this['pu_'+i].slot == 'arma' && this['pu_'+i].storageName != o.storageName){
							this['pu_'+i].equiped=false;
						}
					}
				}
			}
			if(s=='item'){			
				ig.game.player.items[ai]=true;
				if(ig.game.player.barraLlena<100){
					ig.game.player.barraLlena=100;
				}
			}
		},
		activeDeactive: function(o, ai, s){
			if(s=='item'){
				if(ig.game.player.items[ai]!=null)
					o.equiped=true;
				else 
					o.equiped=false;
			}
			else if(s=='arma'){
				if(ig.game.player.arma!=null&&ai==ig.game.player.arma)
					o.equiped=true;
				else 
					o.equiped=false;
			}
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
					posX:esto.posicionFinal.x+267,
					posY:esto.pos.y+270,
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
					posX:esto.posicionFinal.x+267,
					posY:esto.pos.y+270,
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
					posX:esto.posicionFinal.x+371,
					posY:esto.pos.y+270,
					noFix:true,
					onPopup:true,					
					pressedUp: function(){
						esto.playPauseSx();
					},
				});
			}
			else{
				this.btn_sx=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/sx.png', 80, 80 ),
					idParent:esto.id,
					posX:esto.posicionFinal.x+371,
					posY:esto.pos.y+270,
					noFix:true,	
					onPopup:true,
					pressedUp: function(){
						esto.playPauseSx();
					},
				});
			}
		},
		kill: function(){
			if(ig.ua.mobile)
				Ads.hideBanner();
			if(!lStorage.get('music')){				
				ig.music.pause();
			}
			else{
				ig.music.pause();
				ig.music.play([ig.game.music]);
			}
			var aBtnCross=ig.game.getEntitiesByType(EntityBtn_crossPromotion);
			var aBtnCrossLength = aBtnCross.length;
			for(i=0;i<aBtnCrossLength;i++){
				aBtnCross[i].kill();
			}
			this.parent();
			var lengthABB = this.aBB.length;
			for(i=0;i<lengthABB;i++){
				this['pu_'+i].kill();
			}
		},
	}); 
});