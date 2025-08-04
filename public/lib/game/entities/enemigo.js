ig.module(
    'game.entities.enemigo'
)
.requires(
    'impact.entity',
	'game.entities.ice_particle',
	'game.entities.coin2',
	'game.entities.vidaTile',
	'game.entities.popups.popupComicFinal'
)
.defines(function() {
 
    EntityEnemigo = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.LITE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        offset: {x : 0, y : 0},         
		maxVel: {x: 800, y: 300},
		vel:{x:-100, y:	200},
		velX:-100,
		saltoY:-200,
		tipo:'enemy',
		health:1,
		healthBarColor:"#F00",
		gravityFactor:2,
		muerto:false,
		rebotaEnTile:true,
		_wmIgnore:true,
		animacionMuerte:1,
		congela:false,
		seCongela:true,
		seQuema:true,
		seMuereConObjeto:true,
		seMuereConSalto:true,
		seMuereConInvul:true,
		seQuemaMontura:true,
		seCongelaMontura:true,
		seMuereConGas:true,
		distance:null,
		posX:null,
		health100:null,
		stageClear:false,
		newWorld:null,
		endWorld:null,
		endGame:null,
		bg:null,
		imgTop:'default',
		noButtons:false,
		unblock:null,
		alpha:100,
		alphaResta:-0.01,
		inmune:{color:null, pos:{x:0,y:0},opacity:1},
		spawnBy:null,
		stageClearShowed:false,
		showComic:true,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.alphaDuration=this.compensadorTick(this.alphaDuration);
			this.timerCheck = new ig.Timer();
			this.colisiona=false;
			this.posX=this.pos.x;
			if(this.health > 1){
				this.health100=this.health;
			}
			this.vel.x=this.velX;
			if(this.seCongela=='false')this.seCongela=false;
			if(this.seQuema=='false')this.seQuema=false;
			if(this.seMuereConObjeto=='false')this.seMuereConObjeto=false;
			if(this.seMuereConSalto=='false')this.seMuereConSalto=false;
			if(this.seMuereConInvul=='false')this.seMuereConInvul=false;
			if(this.seQuemaMontura=='false')this.seQuemaMontura=false;
			if(this.seCongelaMontura=='false')this.seCongelaMontura=false;
			if(this.seMuereConGas=='false')this.seMuereConGas=false;
			if(ig.global.wm)infinite=false;
			if(infinite){
				this.distanceDin=this.distance*ig.system.fps;
			}
        },
        draw: function(){
        	this.parent();
        	if(!ig.global.wm) { // no sale en weltmeister
	        	if(this.health100 != null)this.drawBarHealth();
        	}
			if(this.inmune.color!=null){
				var ctx = ig.system.context;
				ctx.save();
				ctx.font = "16px hoboStd";
				ctx.fillStyle = this.inmune.color;	
				ctx.globalAlpha=this.inmune.opacity;
				ctx.fillText('INMUNE', this.pos.x-ig.game.screen.x, this.inmune.pos.y-ig.game.screen.y-25);
				ctx.restore();
				this.inmune.pos.y-=1;
				this.inmune.opacity-=0.01;
				if(this.inmune.opacity<=0){this.inmune.color=null;this.inmune.opacity=1;}
			}
        },
		drawBarHealth:function(){	
			var w=this.health*100/this.health100;
			ig.game.drawRectangle(this.healthBarColor, this.pos.x-ig.game.screen.x-25, this.pos.y-ig.game.screen.y-16, w, 10,'fill');
			ig.game.drawRectangle("rgb(0,0,0,0.1)", this.pos.x-ig.game.screen.x-28, this.pos.y-ig.game.screen.y-18, 106, 14,'stroke');	        
		},
		update: function() {
			if(!ig.game.pause)
				this.parent();	
			//this.currentAnim.flip.x=(this.velX>0);
			if(this.colisiona){ // si la colision esta en true la cambio a false despues de x segs (fix - colision multiple)
				if (this.timerCheck.delta() >= 0.1){
					this.colisiona=false;
				}
			}
			if(this.alpha<100){
				this.alpha+=this.compensadorTick(0.5);
				if(this.currentAnim.alpha<0.3)
					this.alphaResta=this.compensadorTick(0.02);
				else if(this.currentAnim.alpha>0.8)
					this.alphaResta=-this.compensadorTick(0.04);
				this.currentAnim.alpha=this.currentAnim.alpha+this.alphaResta;
			}
			else{
				this.currentAnim.alpha=1;
			}
			if(this.congela){ // si esta congelado
				if ( this.timerIce.delta() > 3){
					this.congela=false;
					this.animacionMuerte=1;
					delete this.timerIce;
				}
			}
			// distancia de recorrido
			//if(!infinite){
				if(this.distance!=null){ 
					if(this.pos.x-this.posX>this.distance){
						if(this.vel.x>0)
							this.velX=this.velX*-1;
						this.vel.x = this.velX;	
						if(this.currentAnim != this.anims.idle)
							this.currentAnim.flip.x= false;
					}
					else if(this.pos.x-this.posX<-this.distance){
						if(this.vel.x<0)
							this.velX=this.velX*-1;
						this.vel.x = this.velX;	
						if(this.currentAnim != this.anims.idle)
							this.currentAnim.flip.x= true;
					}
				}
			//}
			/*else{
				if(this.distanceDin<=0){
					this.velX*=-1;
					this.vel.x = this.velX;	
					if(this.currentAnim != this.anims.idle)this.currentAnim.flip.x= !this.currentAnim.flip.x;
					this.distanceDin=this.distance*ig.system.fps;
				}
				this.distanceDin--;
			}*/
			this.currentAnim.flip.x=(this.vel.x>=0);
			if(this.pos.y > ig.system.height+ig.game.difAlto || this.pos.x < 0){
				this.stageClearTrue();
				this.kill();
			} // si se va de la pantalla, muere!			
		},
		handleMovementTrace: function( res ) {// colision con terreno
			if(ig.game.getMapByName('water').getTile(this.pos.x+this.size.x/2, this.pos.y+this.size.y)==2)//lava
				this.muerto=true;
			if(this.muerto){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}
			else{
				this.parent(res); 
				if( res.collision.x ) {
					this.cambiaDirecX();
				}
			}					
		},
		cambiaDirecX:function(){
			this.velX=this.velX*-1;
			this.vel.x = this.velX;	
			if(this.currentAnim != this.anims.idle)this.currentAnim.flip.x= !this.currentAnim.flip.x;
		},
		/**********/
		collideWith: function(other, axis){
			if(other == ig.game.player&&other.items.invul!=null){ //si el player esta invulnerable, choca y lo mata
				this.colPlayerInvul(other);
			}			
			else if(other == ig.game.player&&axis=='x'&&!this.muerto&&!this.congela&&other.items.invul==null){ //colision eje x - muere player
				this.colKillPlayer(other);
			}
			else if(other == ig.game.player&&axis=='y'&&other.pos.y < this.pos.y&&!this.congela){ //si el player salta sobre el enemigo
				this.colPlayerTop(other);				
			}
			else if(other == ig.game.player&&axis=='y'&&other.pos.y < this.pos.y&&this.congela){//si salta sobre el enemigo congelado
				this.colPlayerTopCong(other);				
			}
			else if(other == ig.game.player&&axis=='y'&&other.pos.y > this.pos.y&&!this.muerto&&!this.congela&&other.items.invul==null){//colision eje y por debajo- muere player
				this.colKillPlayerBottom(other);
			}
		},
		colPlayerInvul: function(other,axis){
			if(this.seMuereConInvul){
				this.collides=ig.Entity.COLLIDES.NEVER;
				if(this.congela){						
					this.rompeHielo();					
				}
				else{
					if(this.health>1)
						this.health=1;
					this.animacionMuerte=1;
					this.muere();
				}
				if (axis=='y'){
					if (other.items.fly)		
						other.vel.y = this.saltoY/2;//salto sobre el enemigo cuando tiene alas
					else{
						ig.game.btnUp1time=false;
						other.vel.y = this.saltoY;//salto normal
					}
				}
			}
			else{
				if(axis=='x')
					other.vel.x*=-2;
				else{
					if(!this.seMuereConSalto){
						if (other.items.fly)		
							other.vel.y = this.saltoY/2;//salto sobre el enemigo cuando tiene alas
						else{
							ig.game.btnUp1time=false;
							other.vel.y = this.saltoY;//salto normal
						}
					}
					else{
						this.animacionMuerte=1;
						this.muere();
						if (other.items.fly)		
							other.vel.y = this.saltoY/2;//salto sobre el enemigo cuando tiene alas
						else{
							ig.game.btnUp1time=false;
							other.vel.y = this.saltoY;//salto normal
						}
					}
				}
					
			}
		},
		colKillPlayer: function(other){
			this.velX=this.velX*-1;
			this.vel.x = this.velX;	
			this.pos.x= this.last.x;
			this.pos.y= this.last.y;
			this.currentAnim.flip.x= !this.currentAnim.flip.x;
			other.animacionMuerte=2;
			other.pierdeVida();				
		},
		colPlayerTop: function(other){
			if(this.seMuereConSalto){
				sounds[7].play();
				this.muere();
				this.animacionMuerte=1;
				if (other.items.fly)		
					other.vel.y = this.saltoY/2;//salto sobre el enemigo cuando tiene alas
				else{
					ig.game.btnUp1time=false;
					other.vel.y = this.saltoY;//salto normal
				}
			}
			else{
				other.animacionMuerte=2;
				other.pierdeVida();	
			}
		},
		colPlayerTopCong: function(other){
			other.vel.y = -300;
			if(this.health>1){
				this.receiveDamage(1);
				this.timerIce.set(-3);
			}
			this.rompeHielo();
		},
		colKillPlayerBottom: function(other){
			other.animacionMuerte=2;
			other.pierdeVida();	
		},
		/*********************/
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
		sueltaPowerUps: function(){
			if(this.mon)this.sueltaMonedas();	
			if(this.vida)this.sueltaVida();	
			if(this.item)this.sueltaItem();
			if(this.weapon)this.sueltaWeapon();
			if(this.key)this.sueltaKey();
		},
		sueltaMonedas: function(){
			var cant = this.mon;
			for(i=1;i<=cant;i++){
				ig.game.spawnEntity(EntityCoin2, this.pos.x, this.pos.y+this.size.y-30);
			}
		},
		sueltaVida: function(){
			var settings = {'direc':this.vida};
			ig.game.spawnEntity(EntityVidaTile, this.pos.x, this.pos.y+this.size.y/2, settings);
		},
		sueltaItem: function(){
			var settings = {'item':this.item};
			ig.game.spawnEntity(EntityArmas_item, this.pos.x, this.pos.y+this.size.y/2, settings);
		},
		sueltaWeapon: function(){
			var settings = {'weapon':this.weapon};
			ig.game.spawnEntity(EntityArmas_item, this.pos.x, this.pos.y+this.size.y/2, settings);
		},
		sueltaKey: function(){
			var settings = {'key':this.key};
			ig.game.spawnEntity(EntityArmas_item, this.pos.x, this.pos.y+this.size.y/2, settings);
		},
		rompeHielo: function(){
			sounds[1].play();
			
			this.congela=false;
			if(this.health==1){
				this.stageClearTrue();
				this.sueltaPowerUps();
				this.kill();
			}
			var x=0;
			var y=0;
			var cant=17;
			if(this.health>1)cant=5;
			for(i=0;i<=cant;i++){
				var settings = {'por':i};
				var x = x+10;
				if((i+1)%5==0){x=0;y+=10;}
				ig.game.spawnEntity(EntityIce_particle, this.pos.x+x, this.pos.y+y, settings);
				if(this.health>1)this.currentAnim = this.anims.idle;
			}
			ig.game.sortEntitiesDeferred();	
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
				var settings={'endWorld':this.endWorld, 'newWorld':this.newWorld, 'endGame':this.endGame,'bg':this.bg,'imgTop':this.imgTop, 'noButtons':this.noButtons, 'unblock':this.unblock, 'center':(!this.unblock)};
				if(this.endGame=='true'&&this.showComic=='true'&&!showedComicEnd){
					comic = ig.game.spawnEntity(EntityPopupComicFinal,0,0,settings);
					showedComicEnd=true;
				}
				else{
					ig.game.spawnEntity(EntityPopupEndLevel,ig.game.screen.x,ig.game.screen.y+100,settings);
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
	}); 
});