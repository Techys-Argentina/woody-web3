ig.module(
    'game.entities.arrow'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityArrow = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        
        size: {x : 42 , y : 48 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		item:null,		
		weapon:null,
		key:null,
		img:null,
		anima:false,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.animSheet= new ig.AnimationSheet('media/img/arrows2.png',42 , 48 );
			this.addAnim( 'idle', 0.1, [0,1,2,3] );
			this.currentAnim = this.anims.idle;
        },
		check: function(other){
			if(other==ig.game.player){
				this.kill();
			}
		},
	}); 
});