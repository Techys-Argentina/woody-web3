ig.module(
    'game.entities.enemigo_jump'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityEnemigo_jump= EntityEnemigo.extend({	
		collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('media/img/enemy/fishjump.png',50 , 45 ),
		size: {x : 40, y : 35 },
        offset: {x : 5, y : 5},
		vel:{x:0, y:0},
		maxVel:{x:0, y:3000},
		gravityFactor:0,
		distance:800,
		interval:5,
		zIndex:10,
		seMuereConSalto:false,
		_wmIgnore:false,
		init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',0.1, [0,1] );
			this.addAnim( 'move',0.1, [2,3] );
			this.addAnim( 'ice',9999, [6] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [4,5] );
			this.vel.y=0;
			this.posYIni=this.pos.y;
        },
		update: function() {
			this.parent();	
			
			if(!this.muerto){
				if(this.vel.y==0&&!this.congela){
					this.currentAnim = this.anims.idle;
				}else{
					if(this.vel.y>0){
						this.currentAnim.flip.y=true;
					}
					if(this.vel.y<0){
						this.currentAnim.flip.y=false;
					}
					if(!this.congela){
						this.currentAnim = this.anims.idle.rewind();
						this.currentAnim = this.anims.move;
					}
				}
				if(this.vel.y==0)this.gravityFactor=0;
				else this.gravityFactor=2;
				if(this.pos.y<=this.posYIni&&this.currentAnim.loopCount>=this.interval&&this.currentAnim == this.anims.idle){	
					this.vel.y=-this.distance;
				}else if(this.pos.y>=this.posYIni){
					this.gravityFactor=0;
					this.vel.y=0;
					this.pos.y-=20;
				}
			}else{
				if(this.congela)this.currentAnim = this.anims.ice;
				else if(this.animacionMuerte==2){
					this.currentAnim = this.anims.dieFuego;
					this.gravityFactor=2;
				}else{
					this.gravityFactor=2;
				}
			}
		},
		handleMovementTrace: function( res ) {// colision con terreno				
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;								
		},
		colPlayerTop: function(other){
			if(other.items.invul==null){
				other.vel.y = -200;	
				this.pos.y= this.last.y;
				other.animacionMuerte=2;
				other.pierdeVida();	
			}
		},
    }); 
});