ig.module(
    'game.entities.coin3'
)
.requires(
	'game.entities.coin',
	'impact.entity-pool'
)
.defines(function() {
 
    EntityCoin3 = EntityCoin.extend({	
		//Pre-cargamos los sprites
		maxVel:{x:500, y:800},	
		gravityFactor:2,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.animSheet= new ig.AnimationSheet('media/img/coin1.png',33 , 33 ),
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;					
			this.vel.y=-500;
			this.timer = new ig.Timer(0.2);
			lStorage.set('monedas',lStorage.get('monedas')+1);
			sounds[0].play();
        },
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.currentAnim = this.anims.idle;			
			this.vel.y=-500;
			this.timer = new ig.Timer(0.2);
		},
		update: function() {
			this.parent();
			if(this.standing&&!this.anima){this.vel.x=0;this.currentAnim = this.anims.idle;}
			if(this.timer.delta()>0){this.kill();}
		},
    }); 
	ig.EntityPool.enableFor( EntityCoin3 );
});