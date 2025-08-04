ig.module(
    'game.entities.carroCheck'
)
.requires(
    'impact.entity',
	'game.entities.montura5',
	'game.entities.tile'
)
.defines(function() {
 
    EntityCarroCheck = EntityTile.extend({	
    	collides: ig.Entity.COLLIDES.ACTIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,	
		animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),	
		vel:{x:0, y:0},
		gravityFactor:1,
		_wmIgnore:true,
		idCarro:0,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			
			this.addAnim( 'idle', 9999, [0] );
			this.settings=settings;		
			if(settings.position=='bottom'){				
				this.size= {x : 68 , y : 12 };
			}else{
				this.size= {x : 4 , y : 26 };
			}
			this.currentAnim = this.anims.idle;
        },
		update: function() {
			this.last.x = this.pos.x;
			this.last.y = this.pos.y;
			this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
			this.vel.x = this.getNewVelocity( this.vel.x, this.accel.x, this.friction.x, this.maxVel.x );
			this.vel.y = this.getNewVelocity( this.vel.y, this.accel.y, this.friction.y, this.maxVel.y );
			// movement & collision
			var mx = this.vel.x * ig.system.tick;
			var my = this.vel.y * ig.system.tick;
			var res = ig.game.collisionMap.trace( 
				this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y
			);
			this.handleMovementTrace( res );
			if( this.currentAnim ) {
				this.currentAnim.update();
			}
			var player = ig.game.player;
			if(this.caminaSobre){
				cMen= this.size.x/2 + player.size.x/2;
				cMay= this.size.y/2 + player.size.y/2;
				if(player && ((cMen*cMen)+(cMay*cMay)<this.distanceTo( player )*this.distanceTo( player ))){					
					player.gravityFactor=player.gravedad;
					this.caminaSobre=false;
					player.grounded=false;
					
				}				
			}
			if(this.delayStart){
				this.cae-=0.3;				
				if(this.cae<0){
					player.gravityFactor=player.gravedad;
					this.caminaSobre=false;
					player.grounded=false;
					this.maxVel.y=800;
					this.gravityFactor=3;
					this.collides= ig.Entity.COLLIDES.PASIVE;
					this.delayStart=false;
				}
			}
			if(this.invisible){
				if(player.pos.y<this.pos.y+this.size.y){
					this.collides=ig.Entity.COLLIDES.NEVER;
				}else{
					this.collides=ig.Entity.COLLIDES.ACTIVE;
				}
				this.currentAnim.alpha=0;
			}else{
				this.currentAnim.alpha=1;
			}
		},
		collideWith: function(other, axis){
			this.parent(other, axis);
			var player=ig.game.player;
			if(other==player&&axis=='y'){
				if (player instanceof EntityMontura){
					player.desmonta();
					for(i=0;i<ig.game.btn_monturas.length;i++){
						ig.game.btn_monturas[i].equiped=false;
					}
				}
				if(this.settings.position=='left'&&this.settings.checkBottom){
					this.collides= ig.Entity.COLLIDES.FIXED;
					player.pos.x+=10;
				}
				else if(this.settings.position=='right'&&this.settings.checkBottom){
					this.collides= ig.Entity.COLLIDES.FIXED;
					player.pos.x-=10;
				}
				else if(this.settings.position=='bottom'&&this.settings.checkBottom){
					player.currentAnim.flip=false;
					ig.game.spawnEntity(EntityMontura5, this.pos.x, this.pos.y-60, {modo:player.modo,item:player.item,items:player.items,arma:player.arma,barraLlena:player.barraLlena,saleDeMontura:true,dobleJump:false,scroll:player.scroll,arrastra:player.arrastra,saiyajinMode:player.saiyajinMode});
					ig.game.player=ig.game.getEntitiesByType( EntityPersonaje )[1];
					ig.game.getEntitiesByType(EntityPersonaje)[0].kill();
					var carros = ig.game.getEntitiesByType( EntityCarro );
					var carroLength = carros.length;
					for (i = 0; i < carroLength; i++) { 
						if (carros[i].id == this.idCarro){
							carros[i].kill();
						}
					}
				}
			}
			else if(other.tipo=='enemy'&&axis=='x'){
				other.cambiaDirecX();
			}
		},
		
    }); 
});