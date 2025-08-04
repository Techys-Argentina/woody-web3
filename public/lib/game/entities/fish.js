ig.module(
    'game.entities.fish'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityFish = EntityEnemigo.extend({	
		//Pre-cargamos los sprites
		collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet( 'media/img/enemy/fish.png',50 , 45 ),
        size: {x : 40 , y : 35 },  
		offset: {x : 5, y : 5},
		vel:{x:-100, y:	0},
		maxVel: {x: 150, y: 0},
		gravityFactor:0,
		flip:false,
		_wmIgnore:false,
		//updateOffScreen:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'run', 0.1, [0,0,0, 0,0,1,0,1,0,1,0] );
			this.addAnim( 'muerde', 0.1, [0,2,3] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [4,5] );
			this.addAnim( 'ice', 9999, [6] );
			this.currentAnim = this.anims.run;
		},
        update:function(){
			this.parent();
			var player = ig.game.player;
        	this.flip=this.currentAnim.flip.x;
			if(player && this.distanceTo( player )<200 && !this.congela&&player.getTileAgua(player.pos.x+2, player.pos.y+player.size.y/2+2)){
				this.currentAnim = this.anims.muerde;
				this.currentAnim.flip.x= this.flip;			
				if(this.pos.x>player.pos.x+75&&this.flip||this.pos.x<player.pos.x-75&&!this.flip){
					this.currentAnim.flip.x= !this.flip;
					this.velX*=-1;
				}
			}else{
				this.currentAnim = this.anims.run;	
				this.currentAnim.flip.x=this.flip;	
			}
			if(this.congela){
				this.currentAnim = this.anims.ice;				
				this.vel.x=0;
			}else{
				this.vel.x=this.velX;
				this.currentAnim.flip.x=(this.vel.x>=0);
			}
			if(this.animacionMuerte==2)
				this.currentAnim = this.anims.dieFuego;
			
        },
		colPlayerTop: function(other){
			this.pos.y= this.last.y;
			other.animacionMuerte=2;
			other.pierdeVida();	
		},
		muere: function(){
			this.currentAnim = this.anims.die;
			this.gravityFactor=3;
			this.parent();
		},
    }); 
});