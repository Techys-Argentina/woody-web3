ig.module(
    'game.entities.armas'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityArmas = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet('media/img/arma.png',50 , 30 ),
        size: {x : 50 , y : 30 },
        offset: {x : 0, y : 0},    
		vel:{x:800, y:0},
		maxVel: {x: 800, y: 500},
		gravityFactor:0,
		item:null,
		updateOffScreen:true,		
		axeDuration:0.2,
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.addAnim( 'fire', 0.1, [0,1] );
			this.addAnim( 'ice', 9999, [2] );
			this.addAnim( 'axe', 0.1, [3,4,5,6] );
			this.addAnim( 'pico', 0.1, [7,8,9,10] );
			switch(settings.arma){
				case 'fire':
					this.currentAnim = this.anims.fire;
					this.item='fire';
					break;
				case 'ice':
					this.currentAnim = this.anims.ice;
					this.item='ice';
					break;
				case 'axe':
					this.currentAnim = this.anims.axe;
					this.item='axe';
					break;
				case 'pico':
					this.currentAnim = this.anims.pico;
					this.item='pico';
					break;
			}
			//this.item='fuego';
			this.vel.x = settings.direc;
			if(ig.game.player.arma=='axe'){
				this.vel.y=-100;
			}
			if(ig.game.player.arma=='pico'){
				this.vel.y=-100;
				this.vel.x=(this.vel.x>=0)?this.vel.x+100:this.vel.x-100;
			}
			if(this.vel.x<0)
				this.currentAnim.flip.x=true;
		},
		check: function(other){
			if(other.muere&&!other.muerto&&other.tipo=='enemy'){
				if(this.item=='fire'&&other.seQuema){
					other.animacionMuerte=2;
					if(!other.congela)other.muere();
				}
				else if(this.item=='ice'&&other.seCongela){
					other.timerIce = new ig.Timer();	
					other.currentAnim = other.anims.ice;
					other.currentAnim.flip.x=(other.vel.x>0)?true:false;
					other.congela=true;	
					//other.collides=ig.Entity.COLLIDES.ACTIVE;
				}
				else if((this.item=='axe'||this.item=='pico')&&other.seMuereConObjeto){
					other.animacionMuerte=1;
					if(!other.congela)other.muere();
				}
				if(this.item=='fire'&&!other.seQuema){
					other.inmune.color='#c00';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				else if(this.item=='ice'&&!other.seCongela){
					other.inmune.color='#9ff';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				else if((this.item=='axe'||this.item=='pico')&&!other.seMuereConObjeto){
					other.inmune.color='#963';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				this.kill();
			}
			if(this.item=='pico'&&(other instanceof EntityTile1 || other instanceof EntityTile2))
				other.rompeTile();
		},
		update:function (){
			this.parent();
			var player = ig.game.player;
			if(player.arma=='axe')
				this.vel.y+=this.compensadorTick(10);
			if(player.arma=='pico')
				this.vel.y+=this.compensadorTick(10);
			if(player && this.distanceTo( player )>400||this.standing)
				this.kill();
			if((ig.game.player.arma=='fire')&&this.distanceTo( player )>200)
				this.kill();
			if((ig.game.player.arma=='ice')&&this.distanceTo( player )>300)
				this.kill();
		},
		handleMovementTrace: function( res ) {// colision con terreno			
			this.parent(res); 
			if( res.collision.x ) {
				this.kill();			
			}		
		},
	}); 
});