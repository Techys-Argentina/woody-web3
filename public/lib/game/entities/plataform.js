ig.module(
    'game.entities.plataform'
)
.requires(
    'impact.entity',
    'game.entities.tile'
)
.defines(function() {
 
    EntityPlataform= EntityTile.extend({	
    	collides: ig.Entity.COLLIDES.FIXED,
		type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        size: {x : 144 , y : 48 },   
		//vel:{x:100, y:100},
		maxVel: {x: 500, y: 500},
		posX:null,
		posY:null,
		direc:null,
		posPlayer:null,
		_wmIgnore:false,	
		distance:100,
		velocity:100,
		direc: 'lr',
		collide:null,
		updateOffScreen:true,
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [0] );	
			this.posX=this.pos.x;	
			this.posY=this.pos.y;				
			if(this.direc=='upDown')this.vel.y=this.velocity;
			else this.vel.x=this.velocity;
        },
		update: function() {
			this.parent();
			var player=ig.game.player;
			if(this.cae!=null&&this.cae<0){
				this.vel.y=800;
				this.vel.x=0;
			}else if(this.direc=='upDown'){
				this.vel.x=0;
				if(this.pos.y-this.posY>this.distance){
					this.vel.y=-this.velocity;
				}else if(this.pos.y-this.posY<-this.distance){
					this.vel.y=this.velocity;
					if(this.caminaSobre)player.vel.y=this.velocity;
				}
			}else{
				this.vel.y=0;
				if(this.pos.x-this.posX>this.distance){
					this.vel.x=-this.velocity;
				}else if(this.pos.x-this.posX<-this.distance){
					this.vel.x=this.velocity;
				}
			}
			
			if(this.vel.x!=0&& player.grounded&&this.direc!='upDown'&&this.caminaSobre){
				if(player.vel.x==0){
					player.pos.x=this.posPlayer+this.pos.x;
				}else{
					this.posPlayer=player.pos.x-this.pos.x;
				}
				if(this.vel.x>0){
					player.pos.x+=this.velocity/100;
				}else if(this.vel.x<0){
					player.pos.x-=this.velocity/100;
				}
			}
			if(this.collide != 'true'){ // colision por debajo
				if(player&&player.pos.y+player.size.y>this.pos.y&&!this.caminaSobre){
					this.collides= ig.Entity.COLLIDES.NEVER;
				}else if(player&&player.pos.y+player.size.y+5<this.pos.y){
					this.collides= ig.Entity.COLLIDES.FIXED;
				}
			}
			if(this.pos.y > ig.system.height+ig.game.difAlto || this.pos.x < 0)this.kill();// si se va de la pantalla, muere
		},
		collideWith: function(other, axis){
			
			this.parent(other, axis);
			
			
			if(this.vel.y!=0&& other.grounded){
				other.pos.y=this.pos.y-other.size.y;				
			}
			if(axis== 'y'&&other.pos.y<this.pos.y && other == ig.game.player){
				other.grounded=true;
				
				if(this.direc!='upDown'){
					this.posPlayer=other.pos.x-this.pos.x;
				}
			}	
					
			if(axis== 'x'&&this.direc=='lr'&&other.pos.x<this.pos.x){
				this.vel.x=this.velocity;								
				
			}
			else if(axis== 'x'&&this.direc=='lr'&&other.pos.x>this.pos.x){
				this.vel.x=-this.velocity;	
						
			}
			else if(axis== 'y'&&this.direc=='upDown'&&other.pos.y<this.pos.y&&other!=ig.game.player){
				this.vel.y=this.velocity;	
				if(this.caminaSobre)ig.game.player.vel.y=this.velocity;	
				
			}
			else if(axis== 'y'&&this.direc=='upDown'&&other.pos.y>this.pos.y){
				this.vel.y=-this.velocity;									
			}
			if(axis== 'x'&& other != ig.player && other.rebotaEnTile){				
				other.velX=other.velX*-1;
				other.vel.x = other.velX;
				other.currentAnim.flip.x= !other.currentAnim.flip.x;		
			}	
			if(axis== 'y'&&this.direc=='upDown'&&other.pos.y>this.pos.y+this.size.y-3){
				other.vel.y=100;	
			}		
		},
		handleMovementTrace: function( res ) {// colision con terreno
			if(this.cae!=null&&this.cae<0){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}else{
				this.parent(res); 
				if( res.collision.x ) {
					//this.vel.y=this.vel.y*-1;
				}
			}					
		},
    }); 
});