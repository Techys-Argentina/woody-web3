ig.module(
    'game.entities.boss_lost'
)
.requires(
    'impact.entity',
	'game.entities.boss1'
)
.defines(function() {
	EntityBoss_lost = EntityBoss1.extend({
		size: {x:90,y:128},
		offset: {x:19,y:0},
		vel:{x:0,y:0},
		loopPowerInit:6,
		spawnEnemies:false,
		health:3,
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
		init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/boss_lost.png',128 , 128 );
			this.addAnim( 'idle', 0.1, [0,0,0,0] );
			this.addAnim( 'run', 0.1, [1,2,3,4,5,6] );
			this.addAnim( 'startTwister', 0.1, [22,8,9,10,11,12,13,14,15] );
			this.addAnim( 'endTwister', 0.1, [15,14,13,12,11,10,9,8,22] );
			this.addAnim( 'twister', 0.1, [16,17,18,19,20,21] );
			this.addAnim( 'ice', 9999, [7] );
			this.addAnim( 'die', 0.1, [7] );
			this.addAnim( 'dieFuego', 0.1, [7] );
			this.currentAnim = this.anims.idle;
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
				if(this.vel.x>0)
					this.currentAnim.flip.x= true;
				else 
					this.currentAnim.flip.x= false;
			}
			if(this.currentAnim == this.anims.twister)
				this.velX=500;
			else if(this.currentAnim == this.anims.startTwister||this.currentAnim == this.anims.endTwister){
				this.velX=1;
				this.vel.x=0;
			}
			else	
				this.velX=200;
			if(!this.muerto&&this.vel.x!=0&&this.currentAnim != this.anims.startTwister&&this.currentAnim != this.anims.twister&&this.currentAnim != this.anims.endTwister&&!this.congela)
				this.currentAnim = this.anims.run;
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
			}
			else{
				this.delay=this.delayInit;
				if(!this.congela)
					this.currentAnim = this.anims.idle;
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
			}
			if(this.currentAnim.loopCount==2&&this.currentAnim == this.anims.startTwister){
				this.currentAnim = this.anims.twister.rewind();
			}
			if(this.currentAnim.loopCount==this.loopPower&&this.currentAnim == this.anims.twister){
				this.currentAnim = this.anims.endTwister.rewind();
			}
			if(this.currentAnim.loopCount==1&&this.currentAnim == this.anims.endTwister){
				if(player.pos.x  > this.pos.x+this.size.x){
					this.vel.x=this.velX;
				}else if(player.pos.x  < this.pos.x ){
					this.vel.x=-this.velX;					
				}
				if(!this.congela)
					this.currentAnim = this.anims.idle;
				this.delay=200;
			}
		},
		muere: function(){
			if(this.alpha>=100){
				if(this.health>1){
					this.receiveDamage(1);
					this.alpha=0;
					this.alphaCounter = this.alphaDuration;
				}
				else if(!this.muerto&&this.health<=1){				
					this.maxVel.y=300;
					this.congela=false;
					this.updateOffScreen = true;//para que se vaya de la pantalla haciendo todos los updates necesarios	
					this.currentAnim.flip.y = true;	
					this.muerto=true;
					this.collides=ig.Entity.COLLIDES.PASIVE;					
					this.sueltaPowerUps();
				}
			}
			else{
				this.alpha=0;
				this.alphaCounter = this.alphaDuration;
			}			
		},
    }); 
});