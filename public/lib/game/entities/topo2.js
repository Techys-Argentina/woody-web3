ig.module(
    'game.entities.topo2'
)
.requires(
    'impact.entity',
	'game.entities.enem2',
	'game.entities.piedra2',
	'game.entities.estalactita'
)
.defines(function() {
	EntityTopo2 = EntityEnem2.extend({	
		size: {x : 65 , y : 95 }, 
		offset:{x:10,y:20},
		delayInit:500,
		seEntierra:true,
		delayEntierro:0,
		delayEntierroInit:2000,
		delayDesentierro:0,
		delayDesentierroInit:600,
		cantEstalac:1,
		enterrado:false,
		posXDesetierro:0,
		velX:90,
		zIndex:100,
		gravityFactor:8,
		//Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/topo2.png',75 , 115 );
			this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'run', 0.1, [1,2] );
			this.addAnim( 'die', 1, [0] );
			this.addAnim( 'dieFuego', 0.1, [5,6] );
			this.addAnim( 'ice', 9999, [7] );
			this.addAnim( 'fire', 0.1, [3,4] );
			this.addAnim( 'entierro', 0.1, [8,9,10,11,12,13,14] );
			this.addAnim( 'desentierro', 0.1, [13,14,13,14,13,14,15,16,17,18,19,20,21,22] );
			this.addAnim( 'underGround', 1, [23] );
			this.currentAnim = this.anims.idle;
			this.delayEntierro=this.delayEntierroInit;
			this.delayDesentierro=this.delayDesentierroInit;
			this.maxSizeY=this.size.y;
		},
		update: function (){
			if(!ig.game.pause){
				var player = ig.game.player;
				if(this.health==4){
					this.delayInit=300;
					this.delayEntierroInit=1000;
					this.delayDesentierroInit=500;
					this.cantEstalac=2;
				}else if(this.health==3){
					this.delayInit=200;
					this.delayEntierroInit=500;
					this.delayDesentierroInit=400;
					this.cantEstalac=3;
				}else if(this.health==2){
					this.delayInit=100;
					this.delayEntierroInit=300;
					this.delayDesentierroInit=200;
					this.cantEstalac=4;
				}
				if(this.currentAnim != this.anims.underGround){
					this.parent();		
				}
				
				if(this.seEntierra){
					if(player && this.distanceTo( player )<1000 && !this.congela&&!this.enterrado){
						this.delayEntierro-=3;
					}
					if(this.delayEntierro<=0&&!this.enterrado){
						this.entierra();
						this.alpha=0;
					}
					if(this.delayDesentierro>0&&this.enterrado)
						this.delayDesentierro-=3;
					if(this.delayDesentierro<=0&&this.enterrado){
						this.desentierra();
						this.alpha=100;
					}
					this.seMuereConSalto=!(this.currentAnim == this.anims.desentierro);
				}
			}
		},
		dispara: function(){
			var player = ig.game.player;
			var settings = {'direc':0,'velY':5};
			var posX=0;
			if (!(player.pos.x > this.pos.x - 100 && player.pos.x + player.size.x < this.pos.x + this.size.x + 100 )){
				if(this.currentAnim.flip.x){
					settings.direc=600;
					posX=this.pos.x+this.size.x-10;
				}else{
					settings.direc=-600;
					posX=this.pos.x-10;
				}
				ig.game.spawnEntity(EntityPiedra2, posX, this.pos.y+(this.size.y/2)-15, settings);				
			}
			this.yaDisparo=true;
		},
		entierra: function(){
			this.yaDisparo=true;
			if(this.currentAnim != this.anims.entierro){
				this.currentAnim = this.anims.entierro.rewind();
			}
			this.vel.x=0;
			if(this.currentAnim.frame == 6&&this.currentAnim == this.anims.entierro){
				this.enterrado=true;
				this.currentAnim = this.anims.underGround;
				this.pos.x=ig.game.player.pos.x;
				this.delayDesentierro=this.delayDesentierroInit;
				this.collides= ig.Entity.COLLIDES.NEVER;	
			}
		},
		desentierra: function(){
			//this.yaDisparo=true;
			this.delay=this.delayInit;
			this.vel.x=0;
			this.currentAnim.flip.x=(ig.game.player.pos.x>this.pos.x);
			if(this.currentAnim == this.anims.underGround){
				this.currentAnim = this.anims.desentierro.rewind(); 		
			}
			if((this.currentAnim == this.anims.desentierro&&this.currentAnim.frame >= 11)||this.currentAnim == this.anims.idle){
				this.vel.y=-500;		
				this.enterrado=false;
				this.delayEntierro=this.delayEntierroInit;
				this.caenEstalac();		
				this.collides=ig.Entity.COLLIDES.ACTIVE;
			}
		},
		caenEstalac:function(){
			ig.game.cameraVibration.init({duration:2, dispVibration:1, intensidad:2});
			var posX=10,
			settings={act:true, delay:1};
			for(i=1;i<=this.cantEstalac;i++){
				settings.delay=Math.random() * 2.5 + 0.5; 
				posX=Math.floor(Math.random() * (ig.game.screen.x+780/2))+ ig.game.screen.x;
				ig.game.spawnEntity( EntityEstalactita, posX, ig.game.screen.y-200, settings);
				posX+=50;
			}
		},
		receiveDamage: function( amount, from ){
			this.parent(amount, from );
			this.delayEntierro=100;
		},
		drawBarHealth:function(){	
			if(this.currentAnim != this.anims.underGround&&this.currentAnim != this.anims.entierro&&this.currentAnim != this.anims.desentierro){
				this.parent();
			}	
		},
		muere: function(){
			if(this.alpha>=100){
				if(this.health>1){
					this.receiveDamage(1);
					this.alpha=0;
					this.alphaCounter = this.alphaDuration;
				}else if(!this.muerto&&this.health<=1){				
					this.maxVel.y=300;
					this.congela=false;	
					if(this.animacionMuerte==1){			
						this.currentAnim.angle = 90;	
						this.muerto=true;
						this.collides=ig.Entity.COLLIDES.PASIVE;					
						this.sueltaPowerUps();
					}else if(this.animacionMuerte==2){ //muere con fuego					
						this.currentAnim = this.anims.dieFuego;
						this.currentAnim.flip.x= !this.currentAnim.flip.x;
						this.vel.y=-400;
						this.muerto=true;
						this.collides=ig.Entity.COLLIDES.PASIVE;
						this.sueltaPowerUps();
					}	
				}
			}
			else{
				this.alpha=0;
				this.alphaCounter = this.alphaDuration;
			}			
		},
	}); 
});