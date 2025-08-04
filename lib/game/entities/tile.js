ig.module(
    'game.entities.tile'
)
.requires(
    'impact.entity',
	'game.entities.tile1_particle',
	'game.entities.coin2',
	'game.entities.vidaTile'
)
.defines(function() {
 
    EntityTile = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.ACTIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		tipo:'tile',   
		vel:{x:0, y:0},
		maxVel: {x: 0, y: 400},
		gravityFactor:0,
		settings:{},
		caminaSobre:false,	
		cae:null,		
		invisible:false,
		delayStart:false,
		_wmIgnore:true,	
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'tile', 1, [0] );	
			this.settings = settings;	
			this.posX=this.pos.x;
			this.posY=this.pos.y;
			if(this.invisible=='true')this.invisible=true;
        },
		update: function() {
			this.parent();
			//console.log(this.settings.m);
			var player = ig.game.player;
			var sobre=false;
			var esto=this;
			if(this.caminaSobre){
				cMen= this.size.x/2 + player.size.x/2;
				cMay= this.size.y/2 + player.size.y/2;
				if(player && ((cMen*cMen)+(cMay*cMay)<this.distanceTo( player )*this.distanceTo( player ))){
					var tileSobre = ig.game.getEntitiesByType(EntityTile).forEach(function(element, index, array){
						if(player.distanceToX(element)<player.size.x&&player.distanceToY(element)<=player.size.y)
							sobre=true;
					});
					if(!sobre){
						this.caminaSobre=false;
						player.grounded=false;
						player.gravityFactor=player.gravedad;
					}
					
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
			}
			else{
				this.currentAnim.alpha=1;
			}
		},
		collideWith: function(other, axis){
			var player=	ig.game.player;
			this.pos.y=this.last.y;
			this.pos.x=this.last.x;
			if(other.muerto && other!=player){
				other.collides= ig.Entity.COLLIDES.PASIVE;
			}
			if(axis== 'y'&&other.pos.y<this.pos.y && other == player){
				other.gravityFactor=0;
				this.caminaSobre=true;
				player.grounded=true;
				if(this.cae!=null){
					this.delayStart=true;
				}
			}
			if(axis== 'x'&& other == player){				
				other.vel.x=0;
				other.pos.x=other.last.x;
				if(other.vel.x != 0){	
					other.pos.y=other.last.y;	
				}
			}
			if(axis== 'x'&& other != player && other.rebotaEnTile){			
				other.velX=other.velX*-1;
				other.vel.x = other.velX;
				other.currentAnim.flip.x= !other.currentAnim.flip.x;
				this.pos.x=this.posX;
				this.pos.y=this.posY;			
			}
			if(axis== 'y'&&other.pos.y+6>this.pos.y+this.size.y&&other.vel.y>0&& other == player&&this.invisible){				
				this.invisible=false;
				sounds[9].play();
			}
			
		},
    }); 
});