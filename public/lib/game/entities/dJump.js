ig.module(
    'game.entities.dJump'    
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function() {
 
    EntityDJump = ig.Entity.extend({	
        offset: {x : 0, y : 0},  
		maxVel:{x:500, y:500},	
		vel:{x:0, y:500},
		gravityFactor:2,
		zIndex:-10,
		animSheet: new ig.AnimationSheet('media/img/djump.png',40 , 40 ),
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 0.05, [0, 1, 2, 2] );		
			this.pos={x:ig.game.player.pos.x+ig.game.player.size.x/2, y:ig.game.player.pos.y+ig.game.player.size.y-30};
        },
		update: function() {
			this.parent();			
			this.pos={x:ig.game.player.pos.x, y:ig.game.player.pos.y+ig.game.player.size.y-30};
			if(this.currentAnim.loopCount==1)this.kill();
		},
		reset: function(x, y, settings){
			//this.init(x, y, settings);
			this.currentAnim = this.anims.idle.rewind();
			this.parent( x, y, settings );
		},
    });
    ig.EntityPool.enableFor( EntityDJump ); 
});