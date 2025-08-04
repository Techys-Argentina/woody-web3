ig.module(
    'game.entities.popups.popupPowerUps'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupPowerUps = EntityPopup.extend({	
    	center:true,
    	animSheet: new ig.AnimationSheet('media/img/popups/tabla-pause2.png',537,475),	
		imgTop:new ig.Image('media/img/popups/text-sprite.jpg'),
		size:{x:537, y:475},
		zIndex:1,
		mouseLast: {x: 0, y: 0},
		pause:true,
		keepConsole:true,
		withClose:false,
		animacionVertical:true,
		sizeGiftBtn:{x:132,y:132},
		posGiftBtn:{x:50,y:60},
		btnGiftImg:'media/img/popups/botones/btn_secret.png',
		btn_invent:null,
		aBB:[
			['axe.png',50, 'pu_axe'],
			['pico.png',50, 'pu_pico'],// img, precio, storage name
			['ice.png',100, 'pu_iceBall'],
			['fire.png',200, 'pu_fireBall'],	
			['iman.png',50, 'pu_iman'],
			['snorkel.png',200, 'pu_snorkel'],
			['invul.png',300, 'pu_invul'],
			['fly.png',500, 'pu_fly']
		],
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			var esto=this;
			var aBB=this.aBB;
			var lengthABB = aBB.length;
			for(i=0; i<lengthABB; i++){
				this['pu_'+i]=ig.game.spawnEntity( EntityBtn_inventario, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/popups/inventario_botones/'+aBB[i][0]+'', 105, 105),
					idParent:esto.id,
					price:aBB[i][1],
					action:aBB[i][2],
					time:aBB[i][3],
					cant:lStorage.get(aBB[i][2]),
					posX:this.pos.x,
					posY:this.pos.y,
					size:{x:105 ,y:105},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.buy(this.price, this.action, this);					
					},	
				});	
			}
			if (!this.withClose){
				this.btn_invent=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/inventario.png', 80, 80 ),
					idParent:esto.id,
					posX:this.pos.x+this.size.x/2-40,
					posY:this.pos.y+this.size.y/2-40,
					size:{x:80, y:80},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						esto.kill();
						ig.game.spawnEntity(EntityPopupInvent, ig.game.screen.x, ig.game.screen.y);	
					},				
				});
			}
			else{
				this.btn_gift=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( this.btnGiftImg,this.sizeGiftBtn.x,this.sizeGiftBtn.y),	
					idParent:esto.id,
					posX:this.pos.x+this.posGiftBtn.x,
					posY:this.pos.y+this.posGiftBtn.y,
					size:{x:this.sizeGiftBtn.x, y:this.sizeGiftBtn.y},
					noFix:true,
					onPopup:true,				
					pressedUp: function(){
						soundButton.play();
						esto.gift();
						esto.kill();				
					},	
				});
			}
			if(ig.ua.mobile&&navigator.onLine&&fetchedRewardedVideo){
				this.returnbtn_videoRewarder();
			}
			else if(ig.ua.mobile&&navigator.onLine)
				Ads.fetchRewardedVideo();
		}, 
		gift:function(){
			navigator.notification.prompt(
				"Type your gift code",  // message
				function(results){
					if(lStorage.get('giftCodes')!=null){
						lStorage.get('giftCodes').forEach(function(item, index) {
							if(item.code==results.input1&&item.enable&&results.buttonIndex==1){
								navigator.notification.confirm(
									"Accept?",  // message
									function(buttonIndex){
										if(buttonIndex==1){
											lStorage.set(item.id,true);
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
		},
		update: function(){
			this.parent();
			var esto = this;
			if (this.withClose){
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
					idParent:esto.id,
					posX:this.pos.x+this.size.x-50,
					posY:this.pos.y+90,
					size:{x:60 ,y:60},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
			var pX=35;
			var pY=170;	
			var padbottom=130;	
			var padRight=120;
			var lengthABB = this.aBB.length;	
			for(i=0;i<lengthABB;i++){
				this['pu_'+i].state=(lStorage.get('monedas')<this['pu_'+i].price)?'deactive':'active';
				this['pu_'+i].posX=this.pos.x+pX;	
				this['pu_'+i].posY=this.pos.y+pY;	
				pX+=padRight;
				var ite= i+1;
				if(ite%4==0&&i>2){
					pX=35;
					pY+=padbottom;
				}
			}
			if (!this.withClose){
				this.btn_invent.posX=this.pos.x+this.size.x-this.btn_invent.size.x+30;
				this.btn_invent.posY=this.pos.y+80;
			}
		},
		draw: function(){
			var img = new ig.Image( 'media/img/console/items-consola.png' );	
			var fontPrice = new ig.Font('media/fonts/font26_grey.png');
			var fontMonedasAcumul = new ig.Font('media/fonts/font26_grey.png');
			var imgChapita = new ig.Image('media/img/popups/inventario_botones/boton-cantidad.png');
			var fontCant = new ig.Font('media/fonts/font15_fff_hobo_0-9.png');
			fontCant.firstChar = 48;
			fontCant.letterSpacing = -1;
			this.parent();
			var lengthABB = this.aBB.length;
			for(i=0;i<lengthABB;i++){
				img.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+15, this['pu_'+i].pos.y-ig.game.screen.y+95, (this['pu_'+i].state=='deactive')?12:11, 32.5 );
				if (this['pu_'+i].cant>0)
					imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,1,34);
				else
					imgChapita.drawTile(this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-35,this['pu_'+i].pos.y-ig.game.screen.y+5,0,34);
				fontCant.draw(this['pu_'+i].cant,this['pu_'+i].pos.x-ig.game.screen.x+this['pu_'+i].size.x-19, this['pu_'+i].pos.y-ig.game.screen.y+15,ig.Font.ALIGN.CENTER);
				fontPrice.draw(this['pu_'+i].price,this['pu_'+i].pos.x-ig.game.screen.x+68, this['pu_'+i].pos.y-ig.game.screen.y+97,ig.Font.ALIGN.CENTER);
			}
			//cabecera Store
			this.imgTop.drawTile(this.pos.x-ig.game.screen.x+this.size.x/2-304/2, this.pos.y-ig.game.screen.y+116,0,304,57);
			//Monedas acumuladas
			fontMonedasAcumul.draw(Math.round(lStorage.get('monedas')),this.pos.x-ig.game.screen.x+this.size.x-154,this.pos.y-ig.game.screen.y+140,ig.Font.ALIGN.CENTER);
		},
		buy: function(p, a, o){
			lStorage.set('monedas', lStorage.get('monedas')-p);
			lStorage.set(a,lStorage.get(a)+1);
			o.cant++;
		},
		kill: function(){
			this.parent();
		},
    }); 
});