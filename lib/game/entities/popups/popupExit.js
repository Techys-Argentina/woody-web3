ig.module(
    'game.entities.popups.popupExit'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupExit = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: null,
		size: {x:780,y:480},		
		center:true,	
		imgTop:null,
		btn_confirm:null,
		btn_cancel:null,
		imgTopTile:null,
		pause:true,
		sizeConfirmBtn:{x:146,y:145},
		sizeCancelBtn:{x:146,y:145},
		posConfirmBtn:{x:80,y:240},
		posCancelBtn:{x:250,y:240},
		delay:0,
		closeOnTap:false,
		close:null,
		interstilialShowed:false,
		inicia: function(){
			this.parent();
			//if (ig.ua.mobile&&navigator.onLine)
			//	this.showInterstitial();
			var esto=this;
			if (this.closeOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
					idParent:esto.id,
					posX:this.pos.x+375,
					posY:this.pos.y+135,
					size:{x:120 ,y:120},
					offset:{x:-30 ,y:-30},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
			if (this.enableCloseOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
					idParent:esto.id,
					posX:0,
					posY:0,
					size:{x:480,y:780},
					offset:{x:0 ,y:0},
					fixed:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
			this.btn_confirm=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/popups/exit-yes.png', 146, 145 ),	
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
			this.btn_cancel=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/popups/exit-no.png', 146, 145 ),	
				idParent:esto.id,
				posX:this.pos.x+this.posCancelBtn.x,
				posY:this.pos.y+this.posCancelBtn.y,
				size:{x:this.sizeCancelBtn.x, y:this.sizeCancelBtn.y},
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.cancel();
					esto.kill();
				},				
			});
		},
		draw: function(){
			this.parent();			
			if(this.imgTop!=null)this.imgTop.drawTile( this.pos.x-ig.game.screen.x+55, this.pos.y-ig.game.screen.y+55, this.imgTopTile, 324, 256);
		},
		confirm: function(){},
		cancel: function(){},
		showInterstitial: function(){
			if(!this.interstilialShowed){
				Ads.showInterstitial();
				this.interstilialShowed=true;
			}
		},
    }); 
});