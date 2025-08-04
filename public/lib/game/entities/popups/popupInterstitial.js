ig.module(
    'game.entities.popups.popupInterstitial'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupInterstitial = EntityPopup.extend({	
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
		pause:true,
		delay:0,
		enableCloseOnTap:true,
		inicia: function(){
			this.parent();
			var esto=this;
			this.btn_confirm=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png',1,1),
				idParent:esto.id,
				posX:0,
				posY:0,
				size:{x:660,y:480},
				offset:{x:0 ,y:0},
				fixed:true,
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.confirm();
					esto.kill();
				},	
			});
			this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png',1,1),
				idParent:esto.id,
				posX:670,
				posY:30,
				size:{x:80,y:80},
				offset:{x:0 ,y:0},
				fixed:true,
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.cancel();
					esto.kill();
				},	
			});
			var popups = ig.game.getEntitiesByType( EntityPopup );
			popups.forEach(function(item, index) {
				if(item.id!=esto.id){
					item.kill();
				}
			});
			var aButtons=ig.game.getEntitiesByType(Button);
			var aButtonsLength = aButtons.length;
			for(i=0;i<aButtonsLength;i++){
				if(aButtons[i].idParent!=this.id)
					aButtons[i].setState('deactive');
			}
		},
		draw: function(){
			this.parent();			
		},
		confirm: function(){},
		cancel: function(){},
    }); 
});