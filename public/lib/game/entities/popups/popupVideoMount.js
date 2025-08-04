ig.module(
    'game.entities.popups.popupVideoMount'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupVideoMount = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: null,
		size: {x : 780 , y : 480 },		
		center:true,	
		imgTop:null,
		btn_confirm:null,
		btn_cancel:null,
		imgTopTile:null,
		sizeConfirmBtn:{x:220,y:75},
		sizeCancelBtn:{x:125,y:75},
		posConfirmBtn:{x:425,y:260},
		posCancelBtn:{x:600,y:260},
		pause:true,
		delay:0,
		closeOnTap:true,
		close:null,
		inicia: function(){
			if(ig.ua.mobile&&navigator.onLine&&fetchedRewardedVideo){
				this.parent();
				var esto=this;
				this.btn_confirm=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png', 1, 1 ),	
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
				if (this.closeOnTap){
					var esto=this;		
					this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
						idParent:esto.id,
						posX:this.pos.x+this.size.x-150,
						posY:this.pos.y-10,
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
				this.btn_confirm.setState( 'idle' );
			}
			else if(ig.ua.mobile&&navigator.onLine){
				Ads.fetchRewardedVideo();
				this.kill();
			}
			else
				this.kill();
		},
		draw: function(){
			this.parent();			
			if(this.imgTop!=null)this.imgTop.drawTile( this.pos.x-ig.game.screen.x+55, this.pos.y-ig.game.screen.y+55, this.imgTopTile, 324, 256);
		},
		confirm: function(){},
		cancel: function(){},
    }); 
});