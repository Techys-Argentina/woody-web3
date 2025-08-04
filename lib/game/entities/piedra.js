ig.module(
    'game.entities.piedra'
)
.requires(
    'impact.entity',
	'game.entities.piedra_particle',
	'impact.entity-pool'
)
.defines(function() {
 
    EntityPiedra = ig.Entity.extend({	
		collides: ig.Entity.COLLIDES.LITE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/piedra.png',12 , 12 ),
        size: {x : 12 , y : 12 },
        offset: {x : 0, y : 0},  
		maxVel:{x:500, y:500},	
		vel:{x:0, y:0},
		gravityFactor:1,
		updateOffScreen:true,
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
			this.timer = new ig.Timer(0.5);
			this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [0] );	
			this.vel.x = settings.direc;
			this.vel.y = settings.velY;
		},		
		reset: function(x, y, settings){
			this.parent( x, y, settings );
			this.vel.x = settings.direc;
			this.vel.y = settings.velY;
		},
		check: function(other){
			if(other == ig.game.player&&other.items.invul==null){
				this.rompe();
				other.animacionMuerte=2;
				other.pierdeVida();
			}else if(other.tipo=='tile'){
				this.rompe();
			}
		},
		handleMovementTrace: function( res ) {
			if( res.collision.y ||res.collision.x)
				this.rompe();
			this.parent(res);
		},
		rompe: function(){
			var sound = new ig.Sound( 'media/sounds/breakblock.*' );
			sound.play();
			var x=0;
			var y=0;
			for(i=0;i<=17;i++){
				var settings = {'por':i};
				var x = x+3;
				if((i+1)%4==0){x=0;y+=3;}
				ig.game.spawnEntity(EntityPiedra_particle, this.pos.x+x, this.pos.y+y, settings);
			}			
			this.kill();
		},
    }); 
    ig.EntityPool.enableFor( EntityPiedra );
});