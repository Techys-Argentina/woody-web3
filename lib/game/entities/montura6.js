ig.module(
    'game.entities.montura6'
)
.requires(
	'game.entities.montura'
)
.defines(function() { 
    EntityMontura6 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/montura6.png',120 , 100 ), 
		dobleJump:false,
		dJump:false,
		size: {x:60,y:72},
		offset:{x:30,y:28},
		offsetY:28,
		montura:6,
		jump:300,
		maxVelYFueraAgua:{x:300,y:1500},
		accel:{ground:700,air:900},
		gravedad:1,
		settings:{arma:'static_ball',flip:false,firePos:{x:-20,y:30}},
		animacion: function(){
			this.addAnim( 'idle', 5, [0] );			
			this.addAnim( 'run', 0.1, [1,2,3,4] );
			this.addAnim( 'jump1', 0.1, [5,7,8,9,10] );
			this.addAnim( 'jump2', 1.5, [6] );
			this.addAnim( 'die', 0.1, [13,14,15] );
			this.addAnim( 'init', 0.1, [15,14,13] );
			this.addAnim( 'fire', 0.3, [11] );
			this.addAnim( 'fire_flying', 0.3, [12] );
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [18] );
				btn_fire.addAnim( 'active', 1, [19] );	
			}
			this.dobleJump=false;	
		},
		selectSprite: function(){
			if(!this.inicio){			
				if(ig.game.animFire){// disparo
					this.currentAnim = (this.vel.y==0||this.grounded)?this.anims.fire:this.anims.fire_flying;
					if(this.currentAnim.loopCount>=1){
						ig.game.animFire=false;
					}
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
		movimiento:function(){
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))	//abajo del agua					
				this.desmonta();
			else
				this.parent();
		},
		handleMovementTrace: function( res ) {
			if(this.delayMuere <100){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}
			else{
				//var oldPosY = this.pos.y;
				this.parent(res);
				if( res.collision.slope&&res.collision.slope.ny!=-1){// player en pendiente	
					this.friction.x=0;
					var angle=Math.round(res.collision.slope.nx * 100) / 100;	
				 	this.slope=true;					 		 	
				 	this.currentAnim.angle = angle;
				 	this.accel.ground=1600;
					switch (angle) {
						case -0.71:
							//console.log('-071');
							this.offset.y=this.offsetY-10;
							break; 
						case -0.45:
							//console.log('-045');
							this.offset.y=this.offsetY-10;
							break; 
						case -0.32:
							//console.log('-032');
							this.offset.y=this.offsetY-10;
							break;
						default: 
							this.offset.y=this.offsetY;
					}
		        }else{
		        	this.currentAnim.angle = 0;
		        	this.slope=false;
					this.offset.y=this.offsetY;
		        	this.accel.ground=this.accelInit.ground;
					this.friction.x=this.frictionInit.x;
		        }
				if(this.arrastra=='true'&&this.scroll!=null&&this.pos.x<ig.game.screen.x&&res.collision.x){
					this.animacionMuerte=2; 
					this.pierdeVida();
				}		
			}					
		},
		dispara: function(){
			if(ig.game.getEntitiesByType(EntityArmas_monturas).length<1){
				this.currentAnim = (this.vel.y==0||this.grounded)?this.anims.fire.rewind():this.anims.fire_flying.rewind();
				this.settings.flip=this.flip;
				if(this.grounded||this.standing)
					this.vel.x=0;
				ig.game.spawnEntity(EntityArmas_monturas, this.pos.x, this.pos.y+this.settings.firePos.y, this.settings);
				ig.game.sortEntitiesDeferred();	
			}
		},
		movimientoUp: function(){
			this.vel.y = -this.jump;				
			this.gravityFactor=this.gravedad;							
		},
    }); 
});