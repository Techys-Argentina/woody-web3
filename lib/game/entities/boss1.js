ig.module(
    'game.entities.boss1'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityBoss1 = EntityEnemigo.extend({	
		size: {x:60,y:105},
		offset: {x:25,y:20},
		vel:{x:0,y:0},
		velX:100,
		rebotaEnTile:false,
		_wmIgnore:false,
		delay:200,
		delayInit:200,
		seMuereConInvul:false,
		loopPower:12,
		loopPowerInit:12,
		spawnEnemies:true,
		maxEnemiesSpawned:2,
		maxRandomEnemies:3,
		maxEnemiesTotal:2,
		seCongelaInit:true,
		seQuemaInit:true,
		seMuereConObjetoInit:true,
		seQuemaMonturaInit:true,
		seCongelaMonturaInit:true,
		seMuereConGasInt:true,
		endWorld:null,
		collides: ig.Entity.COLLIDES.ACTIVE,
		//Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/boss1.png',120,124 );
			this.addAnim( 'idle', 0.1, [1,0,0,0,0] );
			this.addAnim( 'run', 0.1, [2,3,4,5] );
			this.addAnim( 'startTwister', 0.1, [6,7,8,9] );
			this.addAnim( 'endTwister', 0.1, [9,8,7,6] );
			this.addAnim( 'twister', 0.1, [10,11] );
			this.addAnim( 'ice', 9999, [14] );
			this.addAnim( 'die', 0.1, [3,4] );
			this.addAnim( 'dieFuego', 0.1, [12,13] );
			this.currentAnim = this.anims.idle;
			this.timer = new ig.Timer(2);
			this.sound=new ig.Sound( 'media/sounds/boss1.*');
			this.loopPower = this.loopPowerInit;
			this.seCongelaInit=this.seCongela;
			this.seQuemaInit=this.seQuema;
			this.seMuereConObjetoInit=this.seMuereConObjeto;
			this.seQuemaMonturaInit=this.seQuemaMontura;
			this.seCongelaMonturaInit=this.seCongelaMontura;
			this.seMuereConGasInit=this.seMuereConGas;
		},
		update: function (){
			if(this.health==3){
				this.delayInit=this.delayInit-10;
				this.maxEnemiesTotal=2;
				this.maxEnemiesSpawned = 2;
				this.loopPower = this.loopPowerInit + 1;
			}
			else if(this.health==2){
				this.delayInit=this.delayInit-20;
				this.maxEnemiesTotal=3;
				this.maxEnemiesSpawned = 3;
				this.loopPower = this.loopPowerInit + 2;
			}
			else if(this.health==1){
				this.delayInit=this.delayInit-40;
				this.maxEnemiesTotal=4;
				this.maxEnemiesSpawned = 4;
				this.loopPower = this.loopPowerInit + 3;
			}
			if(ig.game.pause)
				this.currentAnim = this.anims.idle.rewind();
			this.parent();
			var player = ig.game.player;
			if(!this.congela){
				if(this.vel.x>0)this.currentAnim.flip.x= true;
				else this.currentAnim.flip.x= false;
			}
			if(this.currentAnim == this.anims.twister)this.velX=300;
			else this.velX=100;
			if(!this.muerto&&this.vel.x!=0&&this.currentAnim != this.anims.startTwister&&this.currentAnim != this.anims.twister&&this.currentAnim != this.anims.endTwister&&!this.congela)this.currentAnim = this.anims.run;
			if(player && this.distanceTo( player )<700 && !this.congela&&player.alfa<1){ // si esta cerca del player y no esta congelado				
				if(player.pos.x  > this.pos.x+this.size.x+150){
					this.vel.x=this.velX;
				}
				else if(player.pos.x  < this.pos.x-150 ){
					this.vel.x=-this.velX;					
				}
				if(this.delay<=0&&!this.muerto){
					this.twisterAction();
				}else{
					this.delay-=1;
				}
			}else{
				this.delay=this.delayInit;
				if(!this.congela)this.currentAnim = this.anims.idle;
				this.vel.x=0;
			}
			if(this.currentAnim == this.anims.startTwister||this.currentAnim == this.anims.twister){
				this.seCongela=false;
				this.seQuema=false;
				this.seMuereConObjeto=false;
				this.seQuemaMontura=false;
				this.seCongelaMontura=false;
				this.seMuereConGas=false;
			}else{
				this.seCongela=this.seCongelaInit;
				this.seQuema=this.seQuemaInit;
				this.seMuereConObjeto=this.seMuereConObjetoInit;
				this.seQuemaMontura=this.seQuemaMonturaInit;
				this.seCongelaMontura=this.seCongelaMonturaInit;
				this.seMuereConGas=this.seMuereConGasInit;
			}
		},
		twisterAction: function(){
			var player = ig.game.player;
			if(this.currentAnim == this.anims.run||this.currentAnim == this.anims.idle){
				//this.vel.y=-800;
				this.sound.play();
				this.currentAnim = this.anims.startTwister.rewind();
				ig.game.cameraVibration.init({duration:2.5, dispVibration:2, intensidad:3});
				if (this.spawnEnemies){
					//spawn enemies
					var randCant=Math.floor(Math.random() * this.maxEnemiesSpawned);
					for(j=0;j<randCant;j++){
						var arrEnemigos = ig.game.getEntitiesByType(EntityEnemigo);
						var cantSpawned = 0;
						for(i=0;i<arrEnemigos.length;i++){
							if(arrEnemigos[i].spawnBy == this.id)
								cantSpawned = cantSpawned + 1;
						}
						if (cantSpawned < this.maxEnemiesTotal){
							var randVel=((!this.currentAnim.flip.x)?(-1):(1))*(Math.floor(Math.random() * 100) + 50);
							var randAltura=Math.floor(Math.random() * 100) + 50;
							var randRecorrido=Math.floor(Math.random() * 500) + 100;
							var settings={velX:randVel,distance:randRecorrido,spawnBy:this.id};
							switch(Math.floor(Math.random() * this.maxRandomEnemies)){
								case 0:
									var enemy = ig.game.spawnEntity( EntityTortuga3, this.pos.x, this.pos.y,settings);
									enemy.currentAnim.flip.x=(randVel>=0);
									break;
								case 1:
									var enemy = ig.game.spawnEntity( EntityPajaro2, this.pos.x + ((!this.currentAnim.flip.x)?50:(-50)), this.pos.y-randAltura,settings);
									enemy.currentAnim.flip.x=(randVel>=0);
									break;
								case 2:
									var enemy = ig.game.spawnEntity( EntityTortuga4, this.pos.x, this.pos.y,settings);
									enemy.currentAnim.flip.x=(randVel>=0);
									break;
							}
						}
					}
				}
			}
			//spawnEnemies
			if(this.currentAnim.loopCount==2&&this.currentAnim == this.anims.startTwister){
				this.currentAnim = this.anims.twister.rewind();
			}
			if(this.currentAnim.loopCount==this.loopPower&&this.currentAnim == this.anims.twister){
				this.currentAnim = this.anims.endTwister.rewind();
			}
			if(this.currentAnim.loopCount==1&&this.currentAnim == this.anims.endTwister){
				if(player.pos.x  > this.pos.x+this.size.x){
					this.vel.x=this.velX;
				}
				else if(player.pos.x  < this.pos.x ){
					this.vel.x=-this.velX;					
				}
				if(!this.congela)
					this.currentAnim = this.anims.idle;
				this.delay=200;
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
				}
			}
					
		},
		colPlayerTop: function(other){
			this.parent(other);
			if(this.currentAnim == this.anims.startTwister||this.currentAnim == this.anims.twister||this.currentAnim == this.anims.endTwister){
				other.animacionMuerte=2;
				other.pierdeVida();	
			}
			else{
				other.vel.y = -550;	
			}			
		},
		colPlayerTopCong: function(other){
			this.parent(other);
			other.vel.y = -550;
			if(this.health>1){
				this.receiveDamage(1);
				this.timerIce.set(-3);
			}
			this.rompeHielo();
		},
		rompeHielo: function(){
			this.parent();
			if(this.health>1)this.delay=0;
		},
		muere: function(){
			this.delay=0;
			this.parent();
		},
		
    }); 
});