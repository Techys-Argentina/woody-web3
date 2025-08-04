ig.module(
    'game.entities.huevo_reward'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityHuevo_reward = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/huevo.png',60,60),
        size: {x : 60 , y : 60 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel:{x:500, y:500},
		valor:1,
		gravityFactor:0,
		_wmIgnore:false,
		anima:false,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.settings = settings;	
			this.posTextY=0;
            this.alphaText=1.0;
			this.addAnim( 'move', 0.08, [0,1,2,3,4,5,6]);
			this.checked=false;		
            this.currentAnim = this.anims.move;
			if(!ig.global.wm){
				//if(!(navigator.onLine&&ig.ua.mobile)) //mod temporal
					this.kill();
			}
        },
		check: function(other){
			if(!this.anima&&other==ig.game.player){
				sounds[0].play();
				ig.game.spawnEntity( EntityPopupConfirm, 0, 0, {
					animSheet: new ig.AnimationSheet('media/img/inst/popupalwoodyrun.png',780 , 480 ),
					imgTopTile:0,
					sizeConfirmBtn:{x:440,y:100},
					sizeCancelBtn:{x:80,y:80},
					posConfirmBtn:{x:165,y:280},
					posCancelBtn:{x:600,y:50},
					enableCloseOnTap:true,
					delay:0,
					confirm: function(){
						window.open(adLink, '_blank', 'location=yes');
						this.kill();
					},
					cancel: function(){
						this.kill();
					},
				});
				this.kill();
			}
		},
	}); 
});