ig.module(
    'game.entities.popups.popupBuy'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupBuy = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: null,
		size: {x : 780 , y : 480 },		
		center:true,	
		imgTop:null,
		btn_confirm:null,
		imgTopTile:null,
		sizeConfirmBtn:{x:293,y:90},
		posConfirmBtn:{x:140,y:325},
		btnConfirmImg:'media/img/popups/botones/btn_buy.png',
		sizeGiftBtn:{x:132,y:132},
		posGiftBtn:{x:50,y:20},
		btnGiftImg:'media/img/popups/botones/btn_secret.png',
		pause:true,
		delay:5,
		enableCloseOnTap:true,
		enableBtnGift:false,
		inicia: function(){
			this.parent();
			var esto=this;
			this.btn_confirm=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( this.btnConfirmImg,this.sizeConfirmBtn.x,this.sizeConfirmBtn.y),	
				idParent:esto.id,
				posX:this.pos.x+this.posConfirmBtn.x,
				posY:this.pos.y+this.posConfirmBtn.y,
				size:{x:this.sizeConfirmBtn.x, y:this.sizeConfirmBtn.y},
				noFix:true,
				onPopup:true,				
				pressedUp: function(){
					soundButton.play();
					esto.confirm();
					esto.kill();				
				},	
			});
			this.btn_confirm.setState( 'idle' );
			if (this.enableCloseOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/close.png',48,48),
					idParent:esto.id,
					posX:670,
					posY:30,
					size:{x:780,y:480},
					offset:{x:0 ,y:0},
					fixed:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
			if(this.enableBtnGift){
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
				//this.btn_gift.setState( 'idle' );
			}
		},
		draw: function(){
			this.parent();			
			if(this.imgTop!=null)
				this.imgTop.drawTile( this.pos.x-ig.game.screen.x+55, this.pos.y-ig.game.screen.y+55, this.imgTopTile, 324, 256);
		},
		confirm: function(){},
		cancel: function(){},
		gift: function(){},
		
    }); 
});