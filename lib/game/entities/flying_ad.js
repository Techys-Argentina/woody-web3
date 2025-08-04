ig.module(
    'game.entities.flying_ad'
)
.requires(
    'impact.entity',
	'plugins.button'
)
.defines(function() {
 
    EntityFlying_ad = Button.extend({	
    	animSheet: new ig.AnimationSheet('media/img/run_ad.png',150, 100 ),
        size: {x : 150 , y : 100 },    
		vel:{x:120, y:0},
		maxVel: {x: 400, y: 0},
		gravityFactor:0,
		zIndex:20,
		animated:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5,6,7,8,9] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				//if(!(navigator.onLine&&ig.ua.mobile))
					this.kill(); //mod temporal
				ig.game.sortEntitiesDeferred();	
			}
		},
		update:function (){
			this.parent();
			this.pos.x+=0.2;
			if(this.pos.x>ig.system.width){
				this.pos.x=0-this.size.x;
				this.pos.y=Math.floor((Math.random() * 50) + 0);
			}
		},
		pressedUp: function(){
			soundButton.play();
			ig.game.spawnEntity( EntityPopupConfirm, 0, 0, {
				animSheet: new ig.AnimationSheet('media/img/inst/popupalwoodyrun.png',780 , 480 ),
				imgTopTile:0,
				sizeConfirmBtn:{x:440,y:100},
				sizeCancelBtn:{x:80,y:80},
				posConfirmBtn:{x:165,y:280},
				posCancelBtn:{x:690,y:10},
				delay:0,
				confirm: function(){
					window.open(adLink, '_blank', 'location=yes');
					this.kill();
				},
				cancel: function(){
					this.kill();
				},
			});
		},
	}); 
});