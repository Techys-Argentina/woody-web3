ig.module(
    'game.entities.btn_world'
)
.requires(
    'impact.entity',
	'plugins.button'
)
.defines(function() {
 
    EntityBtn_world = Button.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/botones-worlds.png',330,111),
        size: {x : 75 , y : 75},
        offset: {x : 0, y : 0},  
		vel:{x:0, y:0},
		gravityFactor:0,
		img:'media/img/botones-worlds.png',
		posX:0,
		posY:0,
		fixed:false,
		_wmScalable:true,
		nubesImage:null,
		animandoNube:false,
		nubeCont:0,
		lnkDir:'market://details?id=com.woody.world.adventure.run',
		lnkType:null,
		//Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			switch(this.world){
				case 1:
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [0] );
					this.addAnim( 'active', 1, [1]);
					this.addAnim( 'deactive', 1, [2] );	
				break;
				case 2:
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [3] );
					this.addAnim( 'active', 1, [4]);
					this.addAnim( 'deactive', 1, [5] );	
				break;
				case 3:
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [6] );
					this.addAnim( 'active', 1, [7]);
					this.addAnim( 'deactive', 1, [8] );	
				break;
				case 4:
					this.animSheet= new ig.AnimationSheet(this.img, 284, 190);
					this.addAnim( 'idle', 1, [0] );
					this.addAnim( 'active', 1, [1]);
					this.addAnim( 'deactive', 1, [2] );
				break;
				case "lw":
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [12] );
					this.addAnim( 'active', 1, [13]);
					this.addAnim( 'deactive', 0.1, [12,12,12,12,12,12,12,12,13] );
					this.animated=true;
				break;
				case "bw":
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [15] );
					this.addAnim( 'active', 1, [16]);
					this.addAnim( 'deactive', 0.1, [15,15,15,15,15,15,15,15,16] );
					this.animated=true;
				break;
				default:
					this.animSheet= new ig.AnimationSheet(this.img, this.size.x , this.size.y );
					this.addAnim( 'idle', 1, [0] );
					this.addAnim( 'active', 1, [1]);
					this.addAnim( 'deactive', 1, [2] );	
			}
			this.currentAnim = this.anims[ this.state ];
			if(!ig.global.wm) {
				if(parseInt(this.world)>0){
					if(lStorage.get('world')<this.world){
						this.nubesImage = new ig.Image('media/img/bg4-nubes.png');
						this.state = 'deactive';
					}
				}
				else{
					if(this.world=='bw')
						this.state=lStorage.get('enable_bw')?'idle':'deactive';
					if(this.world=='lw')
						this.state=lStorage.get('enable_lw')?'idle':'deactive';
				}
			}
		},
		update: function(){
			this.parent();
			if(this.world=='bw')
				this.state=lStorage.get('enable_bw')?'idle':'deactive';
			if(this.world=='lw')
				this.state=lStorage.get('enable_lw')?'idle':'deactive';
		},
		pressedUp: function(){
			if(this.state != 'deactive'){
				soundButton.play();
				loadWorld=false;
				var player=ig.game.getEntitiesByType(EntityPersonajeWorlds);
				if(player.length > 0){
					player[0].btnFinal=this;
				}
				else{
					currentWorld=this.world;
					lStorage.set('posBtnLevelWorld',currentWorld);
					if(currentWorld!="4" && currentWorld!="bw")//mundo final
						ig.system.setGame(Levels);
					else if(currentWorld=="4"){
						currentLevel='4_1';
						ig.system.setGame(MyGame);
					}
					else if(currentWorld=="bw"){
						currentLevel=lStorage.get('nivel_bw');
						ig.system.setGame(MyGame);
					}
				}
			}
		},
		pressedUpDeactive: function(){
			var esto=this;
			if(this.lnkType==1){//store
				soundButton.play();
				var settings={	delay:0,
								animSheet:new ig.AnimationSheet(esto.lnkBg,780,480),
								sizeX:780,
								sizeY:480,
								posConfirmBtn:{x:250,y:325},
								closeOnTap:true,
								btnConfirmImg:'media/img/popups/botones/btn_download.png',
								confirm:function(){
									window.open(esto.lnkUrl, '_blank', 'location=yes');
								},
							};
				ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,settings);
			}
			else if(this.lnkType==2){
				soundButton.play();
				var settings={	delay:0,
								animSheet:new ig.AnimationSheet(esto.lnkBg,780,480),
								sizeX:780,
								sizeY:480,
								posConfirmBtn:{x:250,y:325},
								closeOnTap:true,
								enableBtnGift:true,
								confirm:function(){
									var productId = esto.productId;
									Ads.inApps.purchaseTest(productId,1);
								},
								gift:function(){
									navigator.notification.prompt(
										"Type your gift code",  // message
										function(results){
											var productId=esto.productId;
											if(lStorage.get('giftCodes')!=null){
												lStorage.get('giftCodes').forEach(function(item, index) {
													if(item.id==productId&&item.code==results.input1&&item.enable&&results.buttonIndex==1){
														navigator.notification.confirm(
															"Accept?",  // message
															function(buttonIndex){
																if(buttonIndex==1){
																	lStorage.set(productId,true);
																}
																else{
																	alert("You denied yout secret gift");
																}
															},  // callback to invoke with index of button pressed
															"You unlock a secret",           // title
															['Ok','Exit']      // buttonLabels
														);
													}
												});
											}
										},                  // callback to invoke
										"Code",            // title
										['Ok','Exit']              // buttonLabels
									);
								}
				};
				ig.game.spawnEntity(EntityPopupBuy, ig.game.screen.x, ig.game.screen.y,settings);
			}
		},
		draw: function(){
			this.parent();
			if(!ig.global.wm) {
				if (this.animandoNube){
					if (this.nubeCont <= 100){
						ig.system.context.save();
						ig.system.context.globalAlpha=ig.system.context.globalAlpha - (0.01*this.nubeCont);
						this.nubesImage.draw(this.pos.x+this.posNubeX, this.pos.y+this.posNubeY);
						ig.system.context.restore();
						this.currentAnim = 'active';
						this.state = 'active';
						this.nubeCont = this.nubeCont + 1;
					}
					else{
						lStorage.set('world', this.world);
						this.animandoNube = false;
					}
				}
				else{
					if(parseInt(this.world)>0){
						if(lStorage.get('world')<this.world)
							this.nubesImage.draw(this.pos.x+this.posNubeX, this.pos.y+this.posNubeY);
					}
				}
			}
		},
	}); 
});