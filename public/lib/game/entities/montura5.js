ig.module(
    'game.entities.montura5'
)
.requires(
	'game.entities.montura'
)
.defines(function() { 
    EntityMontura5 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/montura5.png',71, 72 ), 
		size: {x : 35, y : 72 },
		offset:{x:15, y:0},
		montura:5,
		accel:{ground:1000,air:400},
		maxVelYFueraAgua:{x:350,y:1500},
		friction: {x: 1000, y:0},
		jump: 650,
		alfa:0,
		nearStop:false,
		settings:{arma:null,flip:false,firePos:{x:0,y:10}},
		init: function(x, y, settings) {
			this.parent(x, y, settings);
            this.modoGuardado=this.modo; //guardo el modo para el desmonte
			this.modo='runner';
			if(ig.ua.mobile){
				btn_fire.state=(this.arma == 'pico')?'active':'deactive';
				btn_fire.posX=0;
			}
		},
		animacion: function(){
			this.addAnim( 'idle', 0.1, [0] );			
			this.addAnim( 'run', 0.1, [0,1,2] );
			this.addAnim( 'jump1', 1, [3] );
			this.addAnim( 'jump2', 1, [4] );
			this.addAnim( 'die', 0.1, [5,6,7,8,8,8,8] );
			this.addAnim( 'init', 0.1, [0] );	
			this.addAnim( 'fire', 0.3, [10] );
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [7] );
				btn_fire.addAnim( 'active', 1, [8] );
			}			
		},
		update: function(){
			this.parent();
			if(ig.ua.mobile)btn_fire.state=(this.arma == 'pico')?'active':'deactive';
			if(this.nearStop&&this.vel.x==0){
				if (this.standing)
					this.desmonta();
			}
		},
		handleMovementTrace: function( res ) {
			if(this.delayMuere <100){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}
			else{
				this.parent(res);	
				if(res.collision.slope&&res.collision.slope.ny!=-1){// player en pendiente	
					this.friction.x=0;
					var angle=Math.round(res.collision.slope.nx * 100) / 100;	
				 	this.slope=true;					 		 	
				 	this.currentAnim.angle = angle;
				 	this.accel.ground=1600;
					switch (angle) {
						case -0.71:
							//console.log('-071');
							this.offset.y=-10;
							break; 
						case -0.45:
							//console.log('-045');
							this.offset.y=-3;
							break; 
						case 0.45:
							//console.log('-045');
							this.offset.y=-5;
							break; 
						case -0.32:
							//console.log('-032');
							this.offset.y=-3;
							break;
						case 0.32:
							//console.log('-032');
							this.offset.y=-5;
							break;	
						default: 
							this.offset.y=0;
					}
		        }else{
		        	this.currentAnim.angle = 0;
		        	this.slope=false;	
		        	this.accel.ground=this.accelInit.ground;
					this.offset.y=0;
					this.friction.x=this.frictionInit.x;
		        }
				if(res.collision.x) {
					this.animacionMuerte=2; 
					this.pierdeVida();
				}
			}
		},
		pierdeVida: function(){
			this.vel.y = -this.jump;				
			this.gravityFactor=this.gravedad;
			lStorage.set('vidas',lStorage.get('vidas')-1);
			ig.game.pierdeVidasCont++;
			this.murio=true;
			ig.music.fadeOut(1);
			ig.game.scroleaX=false;	
			if(lStorage.get('arma')!=null)
				lStorage.set('arma',null);
			this.anims.die.rewind();
		},
		animMuereAlas: function(){
			this.vel.x=0;
			if ( this.delayMuere <80){
				this.finAnimMuerte=true;
				if(lStorage.get('vidas') < 1&&!this.gameOverB){
					this.gameOver();
				}
				else if(lStorage.get('vidas') >0){
					this.initPlayerPos();
					ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });
				}
			}
			this.currentAnim = this.anims.die;
		},
		animMuereFuego: function(){
			this.vel.x=0;
			this.currentAnim.alpha=1;
			this.currentAnim.angle = 0;
			this.currentAnim = this.anims.die;
			this.currentAnim.flip.x= this.flip;
			if (this.delayMuere<80){
				this.finAnimMuerte=true;				
				this.pos.x=this.posPierdeX;
				this.pos.y=this.posPierdeY;
				if(lStorage.get('vidas') < 1&&!this.gameOverB)this.gameOver();
				else if(lStorage.get('vidas') >0){
					this.initPlayerPos();
					ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });					
				}
			}
			
		},
		movimientoDer: function(){
			if(!this.nearStop){
				this.accel.x = accel;
				this.flip=false;
				this.currentAnim.flip.x= this.flip;
			}
		},
		desmonta: function(){
			//console.log(this.saiyajinMode);
			ig.game.spawnEntity(EntityPersonaje, this.pos.x, this.pos.y, {saleDeMontura:true,dobleJump:true,scroll:this.scroll,modo:this.modoGuardado,arrastra:this.arrastra,masVel:this.masVel,items:this.items,item:this.item,barraLlena:this.barraLlena,alfa:0,saiyajinMode:this.saiyajinMode});
			ig.game.player=ig.game.getEntitiesByType( EntityPersonaje )[1];
			ig.game.spawnEntity(EntityCarro, this.pos.x-15, this.pos.y+30,{'checkBottom':false});				
			this.kill();
		},
		dispara: function(){
			if (this.arma == 'pico'){
				var posIniY=10;
				var veloc=500;
				this.currentAnim = this.anims.fire.rewind();
				this.currentAnim.flip.x= this.flip;
				var settings = {'direc':0, 'arma':this.arma};
				if(this.currentAnim.flip.x)
					settings.direc=-veloc;
				else 
					settings.direc=veloc;
				ig.game.spawnEntity(EntityArmas, this.pos.x, this.pos.y+posIniY, settings);
				sounds[10].play();
			}
		},
		collideWith: function(other, axis){
			this.parent(other, axis);
			if(axis=='x'&&(other instanceof EntityTile1 || other instanceof EntityTile2))
				other.rompeTile();
		},
		kill: function(){
			this.parent();
			if(ig.ua.mobile)btn_fire.posX=ig.system.width-250;
		}
    }); 
});