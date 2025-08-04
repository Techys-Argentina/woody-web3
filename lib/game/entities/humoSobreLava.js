ig.module(
    'game.entities.humoSobreLava'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityHumoSobreLava = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.NEVER,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/humo-mount4.png',38),
        size: {x : 38 , y : 38 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel:{x:500, y:500},
		valor:1,
		gravityFactor:0,
		_wmIgnore:true,
		checkedVida:false,
		anima:false,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 0.1, [0, 1, 2] );
			this.addAnim( 'off', 9999, [0] );
			this.currentAnim = this.anims.off;			
			this.currentAnim.alpha=0;
			this.settings = settings;	
		},
	}); 
});