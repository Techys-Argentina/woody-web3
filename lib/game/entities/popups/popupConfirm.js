ig.module(
    'game.entities.popups.popupConfirm'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupConfirm = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: null,
		size: {x : 780 , y : 480 },		
		center:true,	
		imgTop:null,
		btn_confirm:null,
		btn_cancel:null,
		imgTopTile:null,
		sizeConfirmBtn:{x:125,y:75},
		sizeCancelBtn:{x:125,y:75},
		posConfirmBtn:{x:425,y:260},
		posCancelBtn:{x:600,y:260},
		pause:true,
		delay:5,
		enableCloseOnTap:false,
		inicia: function(){
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
			this.btn_confirm.setState( 'idle' );
			this.btn_cancel=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png', 1, 1 ),	
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
			if (this.enableCloseOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png',1,1),
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
		},
		draw: function(){
			this.parent();			
			if(this.imgTop!=null)
				this.imgTop.drawTile( this.pos.x-ig.game.screen.x+55, this.pos.y-ig.game.screen.y+55, this.imgTopTile, 324, 256);
		},
		confirm: function(){},
		cancel: function(){},
    }); 
});