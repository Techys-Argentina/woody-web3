ig.module(
    'game.entities.spring'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntitySpring = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet( 'media/img/spring.png',48 , 88 ),
        size: {x : 48 , y :32 },
        offset: {x : 0, y :57},    
		vel:{x:0, y:0},
		gravityFactor:1,
		zIndex:-10,
		jump:1000,
		settings:{},
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'open', 9999, [1] );
			this.currentAnim = this.anims.idle;
        },
		update: function() {
			this.parent();
			
			var player=ig.game.player;
			if(this.distanceTo( player )>200){
				this.currentAnim = this.anims.idle;
			}
		},
		check: function(other){
			var player=	ig.game.player;
			if(other.pos.y+6<this.pos.y&&other.vel.y>0 && other == player&&!other.muerto){				
				other.vel.y=-this.jump;
				this.currentAnim = this.anims.open;
				sounds[8].play();
			}
		},
    }); 
});