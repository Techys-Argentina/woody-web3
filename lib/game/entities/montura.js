ig.module(
    'game.entities.montura'
)
.requires(
	'game.entities.personaje',
	'game.entities.armas_monturas'
)
.defines(function() { 
    EntityMontura = EntityPersonaje.extend({	
		friction: {x: 800, y:0},
		dobleJump:true,
		inicio:true,
		_wmIgnore:true,
		tipo:'montura',
		montura:null,
		settings:{},
		finAnimMuerte:false,
		init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.currentAnim = this.anims.init;
			if(ig.ua.mobile)
				btn_fire.state='active';
			if(this.saiyajinMode)
				this.deactiveSaiyajinMode();
        },
		deactiveSaiyajinMode: function(){
			this.items.iman=null;
			this.barraLlena.iman=100;
			this.items.invul=null;
			this.barraLlena.invul=100;
		},
		update: function(){
			//if(this.item!='iman'&&this.item!='invul')this.item=null;
			this.parent();
			if(this.currentAnim == this.anims.init&&this.currentAnim.loopCount>=1)
				this.inicio=false;
			else if(this.currentAnim == this.anims.die&&this.currentAnim.loopCount==1&&ig.game.player.tipo == "player"){
				this.kill();
			}
			if(this.murio){
				this.maxVel={x:0,y:0};
				this.gravityFactor=0;
				this.gravedad=0;
				if(this.finAnimMuerte)//if(ig.game.getEntitiesByType(EntityPopup).length>0)
					this.kill();//modifique esto porque cuando ejecutaba el desmonte desde el inventario, la montura no se moria y quedaba la animacion del humo.
			}
		},
		selectSprite: function(){
			if(!this.inicio){			
				if(ig.game.animFire){// disparo
					this.currentAnim = this.anims.fire;
					if(this.currentAnim.loopCount>=1){ig.game.animFire=false;}
				}
				else if( this.vel.y < 0&&!this.grounded&&!this.slope) { // jump1
					this.currentAnim = this.anims.jump1;
				}
				else if( this.vel.y > 0 &&!this.grounded&&!this.slope) { // jump2
					this.currentAnim = this.anims.jump2;
				}
				else if( this.vel.x != 0 ) { //run
					this.currentAnim = this.anims.run;
				}
				else if(this.vel.y==0||this.grounded){ //idle				
					this.currentAnim = this.anims.idle;
				}
				this.currentAnim.flip.x= this.flip;
			}
		},
		pierdeVida: function(){
			if(this.currentAnim.alpha==1){
				this.desmonta();
				lStorage.set('montura'+this.montura,new Date().valueOf()+60000*1); //si se cambia el valor del tiempo de regeneración, cambiarlo tambien en la variable "porcentaje" de la entidad btn_montura en el metodo draw
			}
		},
		dispara: function(){
			this.inicio=false;
			if(ig.game.getEntitiesByType(EntityArmas_monturas).length==0){
				this.currentAnim = this.anims.fire.rewind();
				this.settings.flip=this.flip;
				ig.game.spawnEntity(EntityArmas_monturas, this.pos.x, this.pos.y+this.settings.firePos.y, this.settings);
				ig.game.sortEntitiesDeferred();	
			}
		},
		movimientoUp: function(){
			if(this.dJump){ //doble salto o volar
				this.vel.y = -this.jump;				
				this.gravityFactor=this.gravedad;				
			}
			if(this.dJump){
				this.dJump=false;
				sounds[8].play();
				ig.game.spawnEntity(EntityDJump, ig.game.player.pos.x+ig.game.player.size.x/2, ig.game.player.pos.y);
				ig.game.sortEntitiesDeferred();
			}
			if(this.getTileAgua(this.pos.x+2, this.pos.y)){ //nada
				this.vel.y = this.velYNado;		
			}
			else if(this.getTileAgua(this.pos.x+2, this.pos.y+(this.size.y-5))){ //sale del agua
				this.vel.y = -this.jump;	
				this.gravityFactor=this.gravedad;	
			}
			if(this.standing || this.grounded && !this.fin.fin) {//si no esta saltando y si no llego al fin de nivel
				this.vel.y = -this.jump;				
				this.gravityFactor=this.gravedad;
				if(this.dobleJump)
					this.dJump=true;
				sounds[8].play();
			}	
			if(this.grounded)this.grounded=false;				
		},
		activeItems: function(){
			if(this.items.iman!=null){
				this.barraLlena.iman-=this.compensadorTick(this.imanTime/60);					
			}
			if(this.items.invul!=null){
				this.barraLlena.invul-=this.compensadorTick(this.invulTime/60);
				accel = this.standing ? 800 : this.accel.air;
				this.maxVel.x=400+this.masVel;
			}
			if(this.barraLlena.iman<0){this.items.iman=null;this.barraLlena.iman=100;}
			if(this.barraLlena.invul<0){this.items.invul=null;this.barraLlena.invul=100;}
		},
		animMuereFuego: function(){
			this.finAnimMuerte=true;
		},
		animMuereAlas: function(){
			this.finAnimMuerte=true;
		},
		desmonta: function(){
			if(!this.murio){
				sounds[14].play();
				this.currentAnim = this.anims.die.rewind();
				this.collides= ig.Entity.COLLIDES.NEVER;
				if(this.animInvul!=null)
					this.animInvul.kill();
				ig.game.spawnEntity(EntityPersonaje, this.pos.x, this.pos.y-30, {saleDeMontura:true,dobleJump:true,scroll:this.scroll,modo:this.modo,arrastra:this.arrastra,masVel:this.masVel,item:this.item,items:this.items,barraLlena:this.barraLlena,animIvul:this.animInvul,saiyajinMode:this.saiyajinMode});
				ig.game.player=ig.game.getEntitiesByType( EntityPersonaje )[1];
				if (!ig.game.player.items.fly)//si cuando se desmonta no vuela, no tengo que hacer el salto para arriba
					ig.game.player.movimientoUp();
			}
			this.murio=true;
			for(i=0;i<ig.game.btn_monturas.length;i++){
				if (ig.game.btn_monturas[i].montura == this.montura)
					ig.game.btn_monturas[i].equiped=false;
			}
		},
	}); 
});