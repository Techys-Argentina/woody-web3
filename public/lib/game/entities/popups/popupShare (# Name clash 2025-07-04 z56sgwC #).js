ig.module(
    'game.entities.popups.popupShare'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupShare = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/inst/instartillals_share.jpg',780 , 480 ),	
		size: {x : 780 , y : 480 },
		center:true,
		delay:5,
        posShareBtn:{x:0,y:0}, 
        posCloseBtn:{x:580,y:10}, 
		img_btn_close:new ig.AnimationSheet( 'media/img/close.png', 48, 48 ),
		inicia: function(){
			this.parent();
			var esto=this;		
			this.btn_share=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png', 1, 1 ),	
				idParent:esto.id,
				posX:this.pos.x+this.posShareBtn.x,
				posY:this.pos.y+this.posShareBtn.y,
				size: { x: 320, y: 100 },
				noFix:true,
				onPopup:true,				
				pressedUp: function(){
					soundButton.play();	
					ig.game.shareFB();		
				},		
			});
			this.btn_cancel=ig.game.spawnEntity( Button, 0, 0, {animSheet:this.img_btn_close ,		
				idParent:esto.id,
				posX:this.pos.x+this.posCloseBtn.x+60,
				posY:this.pos.y+this.posCloseBtn.y,
				size:{x:48, y:48},
				noFix:true,	
				onPopup:true,
				pressedUp: function(){
					soundButton.play();						
					esto.kill();
				},				
			});
		},
    }); 
});