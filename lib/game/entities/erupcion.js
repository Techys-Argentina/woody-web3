ig.module(
    'game.entities.erupcion'
)
.requires(
    'impact.entity',
	'game.entities.personaje'
)
.defines(function() {
 
    EntityErupcion = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/enemy/erupcion.png',30 , 60 ),
        size: {x : 30, y : 20 },
        offset: {x : 0, y : 35},    
		vel:{x:0, y:0},
		maxVel:{x:0, y:3000},
		gravityFactor:0,
		colisiona:false,
		distance:800,
		interval:5,
		zIndex:10,
		updateOffScreen:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',0.1, [0,1,2,3,4] );
			this.addAnim( 'move',0.1, [5,6] );
			this.addAnim( 'collision',0.1, [7,8,9] );
			this.currentAnim = this.anims.idle;
			this.timerCheck = new ig.Timer();
			this.posYIni=this.pos.y;
        },
        update: function() {
			this.parent();	
			if(this.vel.y<200&&this.vel.y>-200&&!this.colisiona){
				this.currentAnim = this.anims.idle;
			}
			else{
				if(this.vel.y>0){
					this.currentAnim.flip.y=true;
					this.offset.y=35;
				}
				if(this.vel.y<0){
					this.currentAnim.flip.y=false;
					this.offset.y=5;
				}
				if (!this.colisiona){
					this.currentAnim = this.anims.idle.rewind();
					this.currentAnim = this.anims.move;
				}
			}
			if(this.vel.y==0)
				this.gravityFactor=0;
			else 
				this.gravityFactor=2;
			if(this.pos.y<=this.posYIni&&this.currentAnim.loopCount>=this.interval&&this.currentAnim == this.anims.idle){	
				this.vel.y=-this.distance;
			}
			else if(this.pos.y>=this.posYIni){
				this.gravityFactor=0;
				this.vel.y=0;
				this.pos.y-=20;
			}
			
			if(this.colisiona){ // si la colision esta en true la cambio a false despues de x segs (fix - colision multiple)
				if (this.timerCheck.delta() >= 0.1){
					this.colisiona=false;
				}
			}		
		},
		handleMovementTrace: function( res ) {// colision con terreno				
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;								
		},
        check: function(other){
			this.parent();
			if(!this.colisiona){// fix multiple colision, si colisiona esta en false, lo pongo en true y seteo el timer para volverlo a false				
				if(other==ig.game.player&&!other.murio&&other.items.invul==null&&!other.invulFire){
					other.animacionMuerte=1;
					other.pierdeVida();		
				}
				this.currentAnim = this.anims.collision;
				this.colisiona=true; 
				this.timerCheck.set(); // arranca el timer para poner la colision en false
			}			
		},
    }); 
});