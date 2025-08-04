ig.module(
    'game.entities.tortuga'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityTortuga = EntityEnemigo.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga.png',45 , 50 ),
        size: {x : 40 , y : 40 },    
		offset: {x : 5 , y : 10 }, 		
		maxVel: {x: 800, y: 300},
		velX:-60,
		gravityFactor:4,
		_wmIgnore:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'idle', 9999, [2] );
			this.addAnim( 'run', 0.1, [0,1] );
			this.addAnim( 'dieFuego', 0.1, [3,4] );
			this.addAnim( 'ice', 9999, [5] );
			this.currentAnim = this.anims.run;
			this.timer = new ig.Timer();
			
			
        },
		update: function() {
			this.parent();
			/*if(this.currentAnim == this.anims.idle){ // si esta dentro del caparazón
				if ( this.timer.delta() >= 5){ // si pasaron x seg, sale del caparazón
					this.collides= ig.Entity.COLLIDES.LITE;
					this.type= ig.Entity.TYPE.B;
					this.checkAgainst= ig.Entity.TYPE.A;	
					this.currentAnim = this.anims.run;
					this.vel.x = this.velX; 
					if(this.vel.x >0)this.currentAnim.flip.x=true;
					else this.currentAnim.flip.x=false;	
				}else if(this.vel.x != 0){ // dentro del caparazón y en movimiento
					this.type= ig.Entity.TYPE.A;
					this.checkAgainst= ig.Entity.TYPE.B;
				}
			}*/	
			if(this.congela){
				this.currentAnim = this.anims.ice;
				this.vel.x=0;
			}else if(!this.congela&&!this.muerto){
				this.currentAnim = this.anims.run;
				this.vel.x=this.velX;
			}	
			
		},
	/*	check: function(other){
			var player=	ig.game.player;
			if(!this.colisiona){ // fix multiple colision, si colisiona esta en false, lo pongo en true y seteo el timer para volverlo a false
				if(Math.round(other.pos.y+other.size.y-5) <= Math.round(this.pos.y)&& other.vel.y > 0){ //si salta sobre la tortuga
					if(this.currentAnim == this.anims.idle){ // si salta cuando esta dentro del caparazon
						this.muere();
					}else{	//seteo de timer para que salga del caparazón			
						this.timer.set();	
						//this.collides= ig.Entity.COLLIDES.LITE;	//lo pongo para que mate
					}				
					other.vel.y = -other.jump;
					this.currentAnim = this.anims.idle;
					if(this.vel.x >0)this.currentAnim.flip.x=true;
					else this.currentAnim.flip.x=false;
					this.vel.x = 0;		
				}else if(other!=player&& this.vel.x != 0 && this.currentAnim != this.anims.idle){//si la tortuga colisiona con otro en no sea el personaje y si esta en movimiento (solo el caparazón)
					//this.receiveDamage(1);
					this.muere();	
				}else if(other==player&&!other.settings.alfa && this.currentAnim != this.anims.idle&&!this.muerto){
					other.pierdeVida();		
				}
				this.colisiona=true; 
				this.timerCheck.set(); // arranca el timer para poner la colision en false
			}			
		},*/
		/*muere: function(){
			this.currentAnim = this.anims.idle;
			this.currentAnim.angle = 90;
			this.parent();
		},*/
    }); 
});