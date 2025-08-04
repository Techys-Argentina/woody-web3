ig.module(
    'game.entities.particle'    
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function() {
 
    EntityParticle = ig.Entity.extend({	
        offset: {x : 0, y : 0},  
		maxVel:{x:500, y:500},	
		vel:{x:0, y:500},
		gravityFactor:2,
		_wmIgnore:true,
		updateOffScreen:true,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [settings.por] );		
			this.vel.y=-400;	
			this.vel.x=Math.floor(Math.random() * -200) + 100;		
			this.currentAnim.angle = Math.floor(Math.random() * 100) + 90;
			this.timer = new ig.Timer(2);
		},
		update: function() {
			this.parent();			
			if(this.standing){
				this.vel.x=0;
				this.currentAnim.angle = 0;
			}
			if(this.timer.delta()>0){
				this.kill();
			}
		},
		reset: function(x, y, settings){
			this.parent( x, y, settings );
			this.init(x, y, settings);
		},
	});
    ig.EntityPool.enableFor( EntityParticle ); 
});