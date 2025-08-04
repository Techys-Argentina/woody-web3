ig.module(
    'game.entities.vidaTile'
)
.requires(
    'impact.entity',
	'game.entities.vida'
)
.defines(function() {
 
    EntityVidaTile = EntityVida.extend({	
		maxVel:{x:500, y:600},	
		gravityFactor:2,
		velX:-100,
		rebotaEnTile:true,
		_wmIgnore:true,
		updateOffScreen:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			if(settings.direc == 'i'){	
				this.vel.x=-100;
			}else if(settings.direc == 'd'){
				this.vel.x=100;
			}
			this.vel.y=Math.floor(Math.random() * (-400 - (-600) + 1)) + -600;
        },
		handleMovementTrace: function( res ) {// colision con terreno
			this.parent(res); 
			if( res.collision.x ) {
				this.velX=this.velX*-1;
				this.vel.x = this.velX;				
			}					
		},
    }); 
});