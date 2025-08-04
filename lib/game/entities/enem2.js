ig.module(
    'game.entities.enem2'
)
.requires(
    'impact.entity',
	'game.entities.enemigo',
	'game.entities.piedra'
)
.defines(function() {
 
    EntityEnem2 = EntityEnemigo.extend({	
		size: {x : 63 , y : 94 }, 
		vel:{x:0, y:	0},
		rebotaEnTile:false,
		_wmIgnore:false,
		delay:0,
		delayInit:100,
		seMuereConInvul:false,
		velX:70,
		saltoY:-550,
		updateOffScreen:true,
		collides: ig.Entity.COLLIDES.ACTIVE,
		//Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/enem2.png',63 , 94 );
			this.addAnim( 'idle', 0.8, [0] );
			this.addAnim( 'run', 0.1, [1,2] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [5,6] );
			this.addAnim( 'ice', 9999, [7] );
			this.addAnim( 'fire', 0.1, [3,4] );
			this.currentAnim = this.anims.idle;
			this.timer = new ig.Timer(2);
			this.sound=new ig.Sound( 'media/sounds/enem2.*');
			this.yaDisparo=false;
			this.delay=this.delayInit;
        },
		update: function (){
			this.parent();
			var player = ig.game.player;
			if(!this.yaDisparo && this.currentAnim == this.anims.fire && this.currentAnim.frame == 1 && this.currentAnim.loopCount==0){
				this.dispara();
			}
			if(this.currentAnim == this.anims.fire&&this.currentAnim.loopCount==1)
				this.currentAnim = this.anims.idle;
			if(!this.muerto&&this.vel.x!=0&&this.currentAnim != this.anims.fire)
				this.currentAnim = this.anims.run;
			if(player && this.distanceTo( player )<800 && !this.congela){ // si esta cerca del player y no esta congelado
				this.delay-=3;
				if(player.pos.x-100  > this.pos.x){
					this.vel.x=this.velX;
				}else if(player.pos.x+100  < this.pos.x){
					this.vel.x=-this.velX;				
				}
				if(this.delay<0&&!player.muerto&&!ig.game.pause){
					this.lanza();
				}
			}else{
				this.delay=this.delayInit;
				this.currentAnim = this.anims.idle;
				this.vel.x=0;
			}
			if(this.congela){
				this.currentAnim = this.anims.ice;
				this.vel.x=0;
			}
			if(this.vel.x>0){
				this.currentAnim.flip.x= true;
			}else if(this.vel.x<0){
				this.currentAnim.flip.x= false;					
			}
		},
		handleMovementTrace: function( res ) {// colision con terreno
			if(this.muerto){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}else{
				this.parent(res); 
				if( res.collision.x ) {
					this.vel.x = 0;	
					this.currentAnim = this.anims.idle;
				}
			}
		},
		lanza: function(){
			var player = ig.game.player;
			if(this.timer.delta()>0 && !this.muerto){
				if((player.pos.y+player.size.y+100) < this.pos.y || !(player.pos.y < this.pos.y)){//condiciones de altura para que no tire la piedra justo cuando el personaje esta encima de la cabeza
					this.currentAnim = this.anims.fire.rewind();
					this.timer.set(2);
					this.yaDisparo=false;
				}
			}
		},
		dispara: function(){
			var player = ig.game.player;
			var settings = {'direc':0,'velY':5};
			var posX=0;
			if (player.pos.x > this.pos.x - 100 && player.pos.x + player.size.x < this.pos.x + this.size.x + 100 ){
				settings.direc=(Math.floor((Math.random() * 2) + 1) == 2)?100:-100;
				settings.velY=-(Math.floor((Math.random() * 600) + 100));
				posX=this.pos.x+10;
			}
			else{
				if(this.currentAnim.flip.x){
					settings.direc=500;
					posX=this.pos.x+this.size.x-10;
				}
				else{
					settings.direc=-500;
					posX=this.pos.x+10;
				}
			}
			ig.game.spawnEntity(EntityPiedra, (this.currentAnim.flip.x)?posX+this.size.x+10:posX-15, this.pos.y+(this.size.y/2)-8, settings);
			this.yaDisparo=true;
		},
		muere: function(){
			this.currentAnim = this.anims.die;
			this.parent();
		},
		colKillPlayer: function(other){
			this.velX=this.velX*-1;
			this.vel.x = this.velX;	
			this.pos.x= this.last.x;
			this.pos.y= this.last.y;
			other.animacionMuerte=2;
			other.pierdeVida();				
		},
    }); 
});