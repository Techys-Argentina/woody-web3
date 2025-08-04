ig.module(
    'game.entities.popups.popup'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityPopup = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        size: {x : 780 , y : 480 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		_wmIgnore:true,
		fadeIn:false,
		keepConsole:false,
		center:false,
		pause:false,
		killPopupInvet:true,
		delay:0,
		inicio:false,
		animacionVertical:false,
		onDownAnimacionVertical:false,
		onUpAnimacionVertical:false,
		withFadeBackground:true,
		withClose:false,
		fadeState:0,
		end:false,
		updateOffScreen:true,
		posicionFinal:{x : 0, y : 0},
		enableRewardAfterClose:false,
		rewardAfterClose:100,
        //Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			if(this.animacionVertical && this.posicionFinal.y == 0 && this.posicionFinal.x == 0)//si esta animado (y no tiene seteada una posicion final) )le setea la posicion donde se tiene que parar la animacion
				this.posicionFinal.y = ig.game.screen.y+ig.system.height/2-this.size.y/2-25;
				this.posicionFinal.x = ig.game.screen.x+ig.system.width/2-this.size.x/2;
			ig.game.popupOn=true;	
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;	
			if(this.delay<=0){
				this.pos.y=ig.game.screen.y-this.size.y;
				this.inicia();
			}
			else{
				this.pos.y= -this.size.y;			
			}
			if(!(typeof btn_pause === 'undefined')){//cambiar skin de boton de pausa
				btn_pause.addAnim( 'idle', 1, [2] );
				btn_pause.addAnim( 'active', 1, [3] );
				btn_pause.state = 'active';
			}
		},
		inicia: function(){
			this.inicio = true;
			this.onDownAnimacionVertical = true;
			if(this.killPopupInvet&&ig.game.getEntitiesByType( EntityPopupInvent ).length>0)
				ig.game.getEntitiesByType( EntityPopupInvent )[0].kill();	//cierro inventaario si esta abierto
			if(this.pause&&this.dalay==0)
				ig.game.pause=true;
			if (!this.animacionVertical){//si esta animado no tiene que hacer estos seteos porque si no, se queda estatico
				if(this.center){
					this.pos.x= ig.game.screen.x+ig.system.width/2-this.size.x/2;
					this.pos.y= ig.game.screen.y+ig.system.height/2-this.size.y/2;
				}else{
					this.pos={x:this.pos.x,y:this.pos.y};
				}
			}
		},	
        update: function(){
			if(this.delay>0){
				this.delay-=0.1;
			}
			if(this.delay<=0){
				if(!this.inicio)
					this.inicia();
				else{
					this.parent();
					ig.game.pause=true;
					if(this.center){
						this.pos.x= ig.game.screen.x+ig.system.width/2-this.size.x/2;
						if (!this.animacionVertical)
							this.pos.y= ig.game.screen.y+ig.system.height/2-this.size.y/2;
					}
					else{
						this.pos={x:this.pos.x,y:this.pos.y};
					}
					if(this.animacionVertical){
						this.down();
						this.up();
					}
				}
			}
			else{
				this.pos.y = -this.size.y;
			}
		},
		draw: function(){
			if(this.withFadeBackground && !this.onUpAnimacionVertical)
				this.fadeBackground("in");
			if(this.withFadeBackground && this.onUpAnimacionVertical)
				this.fadeBackground("out");
			this.parent();
			var i = 0;
			var aButtons=ig.game.getEntitiesByType(Button);
			var aButtonsLength = aButtons.length;
			for(i=0;i<aButtonsLength;i++){
				if(aButtons[i].idParent==this.id)
					aButtons[i].draw( true );
			}
		},
		kill: function(interstitial){
			if(this.enableRewardAfterClose){
				lStorage.set(parseInt(lStorage.get('monedas'))+this.rewardAfterClose);
				soundButton.play();
				lStorage.set('crossPromDownOK',true);
			}
			if(this.animacionVertical){
				this.onUpAnimacionVertical = true;
			}
			else{
				this.animacionVertical = true;
				//mato todo cuando ya no esta a la vista
				ig.game.pause=false;
				if(lStorage.get('music')&&!interstitial){
					ig.music.play();
				}
				var aBtns = ig.game.getEntitiesByType( Button );
				var aButtonsLength = aBtns.length;
				for(i=0;i<aButtonsLength;i++){
					aBtns[i].habilitado=true;
					if(aBtns[i].idParent==this.id)
						aBtns[i].kill();
				}
				var aPopUps = ig.game.getEntitiesByType(EntityPopup);
				if (aPopUps.length == 1)
					ig.game.popupOn=false;
				if(!(typeof btn_pause === 'undefined')){//cambiar skin de boton de pausa
					btn_pause.addAnim( 'idle', 1, [0] );
					btn_pause.addAnim( 'active', 1, [1] );
					btn_pause.state = 'active';
				}
				this.callBackKill();
				this.parent();
			}
		},
		callBackKill:function(){},
		down: function(){
			if (this.onDownAnimacionVertical){
				var modif = 1 + Math.floor(((this.posicionFinal.y - this.pos.y)*10)/100);//desaceleracion al descender
				if (this.pos.y <= this.posicionFinal.y + modif){
					this.pos.y = this.pos.y + modif;
					var i = 0;
					var aButtons=ig.game.getEntitiesByType(Button);
					var aButtonsLength = aButtons.length;
					for(i=0;i<aButtonsLength;i++){
						aButtons[i].habilitado = false;
						if(aButtons[i].idParent==this.id){
							aButtons[i].posY = aButtons[i].posY + modif;//botones normales
							aButtons[i].pos.y = aButtons[i].pos.y + modif;//boton de promocion
							aButtons[i].posYIni = aButtons[i].pos.y + modif;//boton de promocion
						}
					}
				}
				else{
					var i = 0;
					var aButtons=ig.game.getEntitiesByType(Button);
					var aButtonsLength = aButtons.length;
					for(i=0;i<aButtonsLength;i++){
						if(aButtons[i].idParent==this.id || (aButtons[i].alwaysEnable))//dejo habilitado el de pausa siempre
							aButtons[i].habilitado = true;
						if(aButtons[i].idParent==999 && !aButtons[i].alwaysEnable)//boton de inventario
							aButtons[i].state='deactive';
					}
					this.onDownAnimacionVertical = false;
					if(!(typeof btn_pause === 'undefined')){//cambiar skin de boton de pausa
						btn_pause.addAnim( 'idle', 1, [2] );
						btn_pause.addAnim( 'active', 1, [3] );
						btn_pause.state = 'active';
					}
				}
			}
		},
		up: function(){
			if (this.onUpAnimacionVertical){
				var modif = 50;
				if (this.pos.y >= ig.game.screen.y - this.size.y){
					this.pos.y = this.pos.y - modif;
					var i = 0;
					var aButtons=ig.game.getEntitiesByType(Button);
					var aButtonsLength = aButtons.length;
					for(i=0;i<aButtonsLength;i++){
						aButtons[i].habilitado = false;
						if(aButtons[i].idParent==this.id){
							aButtons[i].posY = aButtons[i].posY - modif;//botones normales
							aButtons[i].pos.y = aButtons[i].pos.y - modif;//boton de promocion
							aButtons[i].posYIni = aButtons[i].pos.y - modif;//boton de promocion
						}
					}
				}
				else{
					this.animacionVertical = false;
					this.onUpAnimacionVertical = false;
					this.kill();
					var i = 0;
					var aButtons=ig.game.getEntitiesByType(Button);
					var aButtonsLength = aButtons.length;
					for(i=0;i<aButtonsLength;i++){
						aButtons[i].habilitado = true;
					}
					if(!(typeof btn_pause === 'undefined')){//cambiar skin de boton de pausa
						btn_pause.addAnim( 'idle', 1, [0] );
						btn_pause.addAnim( 'active', 1, [1] );
						btn_pause.state = 'active';
					}
				}
			}
        },
		returnbtn_videoRewarder: function(){
			var esto=this;
			var options=lStorage.get('crossPromDownOK')?2:3;
			var rand = Math.floor(Math.random() * options) + 1;
			var img, video;
			if(rand < 3){
				if(rand == 1){
					img= 'media/img/popups/botones/btn_freecoins.png';
					video= 'free-coins';
				}
				else if(rand == 2){
					img= 'media/img/popups/botones/boton-freelife.png';
					video= 'free-life';
				}
				this.btn_freeCoins=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( img, 80, 80 ),	
					idParent:esto.id,
					posX:this.pos.x+670,
					posY:this.pos.y+410,
					noFix:true,
					onPopup:true,
					animated:true,
					pressedUp: function(){
						soundButton.play();
						Ads.showRewardedVideo(video);
					},		
				});
			}
			else if(rand == 3){
				img= 'media/img/popups/botones/Botones-monedas-por-descarga.png';
				this.btn_freeCoins=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( img, 100, 100 ),	
					idParent:esto.id,
					posX:this.pos.x+670,
					posY:this.pos.y+410,
					noFix:true,
					onPopup:true,
					animated:true,
					pressedUp: function(){
						var popups = ig.game.getEntitiesByType(EntityPopup);
						for (i = 0; i < popups.length; i++) {
							popups[i].kill();
						}	
						ig.game.spawnEntity( EntityPopupDownloadReward, ig.game.screen.x, ig.game.screen.y+100, {
							animSheet: new ig.AnimationSheet('media/img/popups/popup-monedas-por-descargas.png',780,480),
							sizeConfirmBtn:{x:106,y:106},
							sizeCancelBtn:{x:106,y:106},
							posConfirmBtn:{x:230,y:300},
							posCancelBtn:{x:450,y:300},
							delay:0,
							withFadeBackground:true,
							confirm: function(){
								window.open(crossPromLink, '_blank', 'location=yes');
								this.enableRewardAfterClose=true;
							},
							cancel: function(){
								this.kill();
							},
						});
					},		
				});
			}
			this.btn_freeCoins.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,1,2,3,4,5] );
			this.btn_freeCoins.currentAnim = this.btn_freeCoins.anims.idle;
		},
		fadeBackground: function(accion) {
			var ctx = ig.system.context;
			var sizeX = ig.system.width;
			var sizeY = ig.system.height;
			ctx.save();
			if (accion == "in"){
				if(this.fadeState <= 0.5)
					this.fadeState = this.fadeState + 0.05;
			}
			else{
				if(this.fadeState >= 0)
					this.fadeState = this.fadeState - 0.1;
			}
			ctx.fillStyle = 'rgba(0,0,0,' + this.fadeState + ')';
			ctx.fillRect(0,0,sizeX,sizeY);
			this.parent();
			ctx.restore();
		},
	}); 
});