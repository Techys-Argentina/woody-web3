ig.module(
    'game.entities.enem_nave'
)
.requires(
    'impact.entity'
	//'game.entities.bala_enemigo',
	//'game.entities.dron'
)
.defines(function() {
 
    EntityEnem_nave = ig.Entity.extend({	
		collides: ig.Entity.COLLIDES.LITE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.B,        
        size: {x : 120 , y : 120 }, 
		offset: {x : 0, y : 0},
		vel:{x:-350, y:	0},
		velX:350,
		velXder:200,
		velXizq:300,
		maxVel: {x: 850, y: 0},
		gravityFactor:0,
		flip:false,
		_wmIgnore:false,
		bounciness:1,
		cantDisparoRafaga:2,
		disparoRafaga:0,
		delayDisparoInit:120,
		delayDisparo:0,
		delayDisparoRafagaInit:30,
		delayDisparoRafaga:0,
		tipo:'enemy',
		health:4,
		maxHealth:4,
		distPlayer:350,
		alfaEnabled:true,
		alfa:100,
		alfaInit:100,
		muerto:false,
		escondido:false,
		cantExplosiones:10,
		explota:true,
		distPlayer2:150,
		updateOffScreen:true,
		puntos:600,
		delayInfo:0,
		delayInfoInit:50,
		spawnDelay:0,
		spawnDelayInit:500,
		maxEnemiesSpawned:4,
		enemiesSpawned:0,
		seEsconde:true,
		timerShowInit:500,
		timerShow:null,
		ataqueTotal:3,
		ataqueCont:0,
		atacando:false,
		escondido:true,
		enemyName:'enem_nave',
		healthBarColor:"#F00",
		seMuereConSalto:true,
		seMuereConInvul:true,
		targetBoss:true,
		stageClear:false,
		stageClearShowed:false,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.animSheet= new ig.AnimationSheet( 'media/img/enemy/avioneta.png',120,120);
			this.addAnim( 'run', 0.1, [0,1,2,3] );
			this.addAnim( 'runDer', 0.1, [0,1,2,3] );
			this.addAnim( 'runIzq', 0.1, [0,1,2,3] );
			this.addAnim( 'dispara', 0.1, [4,5,6,7])
			this.addAnim( 'die', 0.1, [8,9,10] );
			this.addAnim( 'show',2,[0]);
			this.addAnim( 'hide',2,[0]);
			this.currentAnim = this.anims.runIzq;
			this.accel.x=10;
			this.vel.x=this.velXder;
			this.delayDisparo=this.delayDisparoInit;
			this.delayDisparoRafaga=this.delayDisparoRafagaInit;
			this.maxHealth=this.health;
			if(this.targetBoss)
				ig.game.targetBoss=this;
		},
		muere: function(cant){
			if(cant==null)
				cant=1;
			if(!this.escondido&&(this.alfa<1.5||!this.alfaEnabled)){//si no esta en alfa
				if(this.health>cant){
					this.receiveDamage(cant);
					this.currentAnim = this.anims.die;
					this.currentAnim.rewind();
					if (this.alfaEnabled)
						this.alfa=this.alfaInit;
				}
				else if(!this.muerto&&this.health<=cant){
					this.health=0;
					this.updateOffScreen = true;//para que se vaya de la pantalla haciendo todos los updates necesarios
					this.delayInfo=this.delayInfoInit;
					this.currentAnim = this.anims.die.rewind();
					this.collides=ig.Entity.COLLIDES.NEVER;
					this.currentAnim.rewind();
					this.currentAnim.flip.x=this.flip;
					this.muerto=true;
					this.vel.x=0;
					this.delayInfo=this.delayInfoInit;
					ig.game.cameraVibration.init({duration:0.5, dispVibration:0, intensidad:1});
					this.alfa=this.alfaInit;
				}
			}
		},
		update:function(){
			if (!ig.game.pause){
				this.parent();
				if(!this.muerto){
					this.movimiento();
				}
				else if(this.muerto&&this.currentAnim.loopCount>=1){
					this.stageClearTrue();
					this.kill();
				}
				if(this.alfaEnabled&&!this.escondido){
					if(this.alfa>0){
						this.currentAnim.alpha=0.5;
						this.alfa-=this.compensadorTick(1);
					}
					else
						this.currentAnim.alpha=1;
				}
				if(ig.game.player!=null){
					this.velXder=(ig.game.player.saiyajinMode)?750:350;
				}
			}
		},
		spawnAction: function(){
			var player = ig.game.player;
			//spawn enemies
			var arrEnemigos = ig.game.getEntitiesByType(EntityTortuga);
			var cantSpawned = 0;
			for(i=0;i<arrEnemigos.length;i++){
				if(arrEnemigos[i].spawnBy == this.id)
					cantSpawned = cantSpawned + 1;
			}
			if (cantSpawned < this.maxEnemiesSpawned){
				var settings={spawnBy:this.id};
				var enemy = ig.game.spawnEntity( EntityTortuga,this.pos.x+this.size.x/2, this.pos.y+this.size.y+10,settings);
				this.enemiesSpawned++;
				this.ataqueCont++;
			}
		},
		movimiento: function(){
			var player = ig.game.player;
			if(this.timerShow>0){
				this.escondido=true;
			}
			if (this.timerShow<0&&this.escondido){
				this.show();
				this.escondido=false;
				this.currentAnim=this.anims.show;
				this.currentAnim.rewind();
			}
			if(this.currentAnim==this.anims.die&&this.anims.die.loopCount==2)
				this.currentAnim = this.anims.runIzq;
			if (this.escondido){
				this.currentAnim.alpha=0;
				this.alfa=2;
				this.checkAgainst=ig.Entity.TYPE.NONE;
				this.vel.x=0;
			}
			else{
				/*if(this.delayDisparo<0&&this.delayDisparoRafaga<0){
					this.dispara();
				}*/
				if(this.spawnDelay<=0){
					this.spawnAction();
					this.spawnDelay=this.spawnDelayInit;
				}
				else
					this.spawnDelay-=this.compensadorTick(1);
				if(player && this.distanceToX( player )<this.distPlayer){
					this.delayDisparo-=this.compensadorTick(1);
					if (this.delayDisparo<0)
						this.delayDisparoRafaga-=this.compensadorTick(1);
				}
				else{
					if(player.pos.x>=this.pos.x){
						this.vel.x=-this.velXizq*(this.distanceToX( player )/100);
					}
					else{
						this.vel.x=this.velXder;
					}
					this.delayDisparo=this.delayDisparoInit;
					this.delayDisparoRafaga=this.delayDisparoRafagaInit;
					this.disparoRafaga=this.cantDisparoRafaga;
				}
				if(this.vel.x>0&&this.currentAnim.angle<0.2)
					this.currentAnim.angle += 0.02; 
				else if(this.vel.x<0&&this.currentAnim.angle>0)
					this.currentAnim.angle -= 0.01;
				if(this.pos.x>player.pos.x+this.distPlayer2*2&&this.vel.x>0){
					this.vel.x=-this.velXder;
				}
				else if(this.pos.x<player.pos.x-this.distPlayer2-player.size.x&&this.vel.x<0){
					this.vel.x=this.velXizq;
				}
			}
			if(this.timerShow>0){
				this.escondido=true;
			}
			if(this.currentAnim==this.anims.show){
				if(this.currentAnim.loopCount>=1){
					this.atacando=true;
					this.checkAgainst=ig.Entity.TYPE.B;
					this.currentAnim=this.anims.run;
					this.currentAnim.rewind();
					this.type=ig.Entity.TYPE.B;
				}
				else{
					if(this.offset.y>0){
						this.offset.y-=this.compensadorTick(1);
					}
				}
			}
			if(this.ataqueCont>=this.ataqueTotal){
				if((this.currentAnim!=this.anims.knife&&this.currentAnim!=this.anims.hide)||(this.currentAnim==this.anims.knife&&this.currentAnim.loopCount>=1)&&(this.slope||this.standing||this.grounded)){
					this.currentAnim=this.anims.hide;
					this.currentAnim.rewind();
					this.atacando=false;
					this.checkAgainst=ig.Entity.TYPE.NONE;
					this.ataque=false;
					this.type=ig.Entity.TYPE.NONE;
				}
			}
			if(this.currentAnim==this.anims.hide){
				if(this.currentAnim.loopCount>=1){
					this.escondido=true;
					this.ataqueCont=0;
					this.timerShow=this.timerShowInit;
					this.currentAnim=this.anims.run;
					this.currentAnim.rewind();
					this.currentAnim.alpha=0;
				}
				else{
					this.offset.y+=this.compensadorTick(1);
				}
			}
			if(!this.atacando){
				this.timerShow-=this.compensadorTick(1);
			}
		},
		collideWith: function(other, axis){
			if(other == ig.game.player&&other.items.invul!=null){ //si el player esta invulnerable, choca y lo mata
				this.colPlayerInvul(other);
			}			
			if(other == ig.game.player&&axis=='y'&&!this.congela){ //si el player salta sobre el enemigo
				this.colPlayerTop(other);				
			}
		},
		colPlayerInvul: function(other){
			this.pos.x=this.last.x;
			this.pos.y=this.last.y;
			if(this.seMuereConInvul){
				this.animacionMuerte=1;
				this.muere();					
			}
		},
		colPlayerTop: function(other){
			this.pos.x= this.last.x;
			this.pos.y= this.last.y;
			if(this.seMuereConSalto){
				this.muere();
				this.animacionMuerte=1;
			}
			else{
				other.animacionMuerte=2;
				other.pierdeVida();	
			}
		},
		stageClearTrue: function(){
			if(this.stageClear&&!this.stageClearShowed){ // fin del nivel, igual que en el metodo check de la entidad fin
				this.stageClearShowed=true;
				ig.game.player.accelGround=0;
				sounds[3].play();
				ig.music.fadeOut(2);
				ig.game.pause=true;
				lStorage.set('posPierdeX',null); //reseteo posicion del jugador al default
            	lStorage.set('posPierdeY',null);
				if(this.endGame=='true'&&this.showComic=='true'&&!showedComicEnd){
					comic = ig.game.spawnEntity( EntityPopupComicFinal, 0, 0);
					showedComicEnd=true;
				}
				else{
					var settings={'endWorld':this.endWorld, 'newWorld':this.newWorld, 'endGame':this.endGame,'bg':this.bg,'imgTop':this.imgTop, 'noButtons':this.noButtons, 'unblock':this.unblock, 'center':(!this.unblock)};
					ig.game.spawnEntity(EntityPopupEndLevel, ig.game.screen.x, ig.game.screen.y+100, settings);
				}
				if(currentLevel.split("_")[1].indexOf('s') >= 0){ //nivel secreto completado
					var yaCompletado=false;
					var aLSC=lStorage.get('secretLevelComplet').split(',');
					var lengthLSC = aLSC.length;
					for (i=0; i<lengthLSC;i++) {	
						if(i>0){
							if(aLSC[i]==currentLevel)
								yaCompletado=true;
						}
					}
					if(!yaCompletado)lStorage.set('secretLevelComplet',lStorage.get('secretLevelComplet')+','+currentLevel);
				}
			}
		},
		dispara: function(){
			/*var posX=0;
			var posY=0;
			var posXexplosion=0;
			var posYexplosion=0;
			var settings = {'velY':200};
			settings.distRecorrido=500;
			settings.arma='triple';
			settings.tipo='bolag';
			if(this.disparoRafaga>1){
				posX=(this.pos.x+this.size.x/2)-100;
				posY=this.pos.y+this.size.y;
				settings.direc = -150+this.vel.x;
				ig.game.spawnEntity(EntityBala_enemigo, posX, posY, settings);
				
				posX=(this.pos.x+this.size.x/2)+100;
				posY=this.pos.y+this.size.y;
				settings.direc = 150+this.vel.x;
				ig.game.spawnEntity(EntityBala_enemigo, posX, posY, settings);
			}
			else{
				posX=(this.pos.x+this.size.x/2)-150;
				posY=this.pos.y+this.size.y-10;
				settings.direc = -150+this.vel.x;
				ig.game.spawnEntity(EntityBala_enemigo, posX, posY, settings);
				
				posX=(this.pos.x+this.size.x/2)+150;
				posY=this.pos.y+this.size.y-10;
				settings.direc = 150+this.vel.x;
				ig.game.spawnEntity(EntityBala_enemigo, posX, posY, settings);
			}
			this.delayDisparoRafaga = this.delayDisparoRafagaInit;
			this.disparoRafaga = this.disparoRafaga + 1;
			if (this.disparoRafaga >= this.cantDisparoRafaga){
				this.disparoRafaga = 0;
				this.delayDisparo = this.delayDisparoInit;
				this.delayDisparoRafaga = this.delayDisparoRafagaInit;
			}*/
		},
		handleMovementTrace: function( res ) {// colision con terreno
			if(this.muerto){				
				this.pos.x += this.vel.x * ig.system.tick;
				//this.pos.y += this.vel.y * ig.system.tick;
			}else{
				this.parent(res); 
				if( res.collision.x ) {
					this.cambiaDirecX();
				}
			}					
		},
		cambiaDirecX:function(){
			this.vel.x=(this.vel.x>0)?this.velXder:-this.velXizq;
		},
		show: function(){
			var player=ig.game.player;
			var compens = 0;
			this.pos.x=(player.flip)?player.pos.x-(Math.floor(Math.random()*100)+100)-compens:player.pos.x+player.size.x+(Math.floor(Math.random()*100)+100)+compens;
			this.vel.x=this.velX;
			this.currentAnim.alpha=1;
		},
		draw: function(){
        	this.parent();
			if(this.inmuneShow){
				this.drawInmune();
			}
		},
		
		drawInmune:function(){	
			this.fontInmune.draw("INMUNE", this.pos.x-ig.game.screen.x, this.pos.y-ig.game.screen.y-25,ig.Font.ALIGN.CENTER);
		},
	}); 
});