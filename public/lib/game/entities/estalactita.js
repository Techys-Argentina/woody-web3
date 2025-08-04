ig.module(
    'game.entities.estalactita'
)
.requires(
    'impact.entity',
	'game.entities.personaje',
	'game.entities.estalac_particle'
)
.defines(function() {
 
    EntityEstalactita = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/enemy/estalac.png',45 , 57 ),
        size: {x : 45, y : 57 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel:{x:0, y:1000},
		gravityFactor:0,
		zIndex:-10,
		delay:0.3,
		act:false,
		aId:0,
		updateOffScreen:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',0.1, [0,0,0,1,2,3,4] );
			this.currentAnim = this.anims.idle;
			this.timerCheck = new ig.Timer();
			this.colisiona=false;
			this.delay=this.delay*ig.system.fps;
        },
        update: function() {
			this.parent();			
			if(this.colisiona){ // si la colision esta en true la cambio a false despues de x segs (fix - colision multiple)
				if (this.timerCheck.delta() >= 0.1){
					this.colisiona=false;
				}
			}
			if(this.act)this.delay--;
			if(this.delay<=0)this.cae();	
		},
		handleMovementTrace: function( res ) {
			if( res.collision.y ||res.collision.x) {
				this.rompe();
			}
			this.parent(res);
		},
        check: function(other){
			this.parent();
			if(!this.colisiona){ // fix multiple colision, si colisiona esta en false, lo pongo en true y seteo el timer para volverlo a false				
				if(other==ig.game.player&&!other.murio&&other.items.invul==null){
					other.animacionMuerte=2;
					other.pierdeVida();		
				}else if(other.tipo=='tile'){
					this.rompe();
				}					
				this.colisiona=true; 
				this.timerCheck.set(); // arranca el timer para poner la colision en false
			}			
		},
		cae: function(){
			this.gravityFactor=5;
		},
		rompe: function(){
			var sound = new ig.Sound( 'media/sounds/breakblock.*' );
			sound.play();
			var x=0;
			var y=0;
			for(i=0;i<=16;i++){
				var settings = {'por':i};
				var x = x+12;
				if((i+1)%4==0){x=0;y+=12;}
				ig.game.spawnEntity(EntityEstalac_particle, this.pos.x+x, this.pos.y+y, settings);
			}			
			this.kill();
		},
    }); 
});