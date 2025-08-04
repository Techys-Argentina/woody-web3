ig.module(
    'game.entities.fuego'
)
.requires(
    'impact.entity',
	'game.entities.personaje'
)
.defines(function() {
 
    EntityFuego = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/enemy/fuego.png',46 , 57 ),
        size: {x : 46, y : 57 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:1,
		zIndex:-10,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',0.1, [0,0,0,1] );
			this.currentAnim = this.anims.idle;
			this.timerCheck = new ig.Timer();
			this.colisiona=false;
        },
        update: function() {
			this.parent();			
			if(this.colisiona){ // si la colision esta en true la cambio a false despues de x segs (fix - colision multiple)
				if (this.timerCheck.delta() >= 0.1){
					this.colisiona=false;
				}
			}		
		},
        check: function(other){
			this.parent();
			if(!this.colisiona){ // fix multiple colision, si colisiona esta en false, lo pongo en true y seteo el timer para volverlo a false				
				if(other==ig.game.player&&!other.murio&&other.items.invul==null){
					other.animacionMuerte=2;
					other.pierdeVida();		
				}				
				this.colisiona=true; 
				this.timerCheck.set(); // arranca el timer para poner la colision en false
			}			
		},
    }); 
});