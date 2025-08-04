ig.module(
    'game.entities.armas_monturas'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityArmas_monturas = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
        size: {x : 48 , y : 72 },
		totalSizeX:144,
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel: {x: 0, y: 0},
		gravityFactor:0,
		item:null,		
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			switch(settings.arma){
				case 'fire':
					this.animSheet= new ig.AnimationSheet('media/img/arma_monturas_f.png',48 , 72);
					this.item='fire';
					break;
				case 'ice':
					this.animSheet= new ig.AnimationSheet('media/img/arma_monturas_g.png',48 , 72);
					this.item='ice';
					break;
				case 'gas':
					this.animSheet= new ig.AnimationSheet('media/img/arma_monturas_i.png',48 , 72);
					this.item='gas';
					break;
				case 'ray':
					this.animSheet= new ig.AnimationSheet('media/img/arma_monturas_e.png',48 , 72);
					this.item='fire';
					break;
				case 'static_ball':
					var player = ig.game.player;
					this.animSheet= new ig.AnimationSheet('media/img/arma_monturas_chi.png',25,25),
					this.item='static_ball';
					this.vel.x = (settings.flip)?-750:750;
					this.maxVel.x=750;
					this.size={x:25,y:25};
					this.addAnim( 'fire', 0.05, [0,1,2,3] );
					this.currentAnim.flip.x = settings.flip;
					this.pos.y=player.pos.y+player.settings.firePos.y;
					if(!player.currentAnim.flip.x){
						this.currentAnim.flip.x=false;
						this.pos.x=player.pos.x+player.size.x;
					}
					else{
						this.currentAnim.flip.x=true;
						this.pos.x=player.pos.x-this.size.x;
					}
					break;
			}
			if(settings.arma!='static_ball'){
				this.addAnim( 'arma', 0.05, [0] );
				this.currentAnim = this.anims.arma;
				this.currentAnim.flip.x = settings.flip;
			}
			sounds[16].play();
		},
		check: function(other){
			if(other.muere&&!other.muerto&&other.tipo=='enemy'){
				if(this.item=='fire'&&other.seQuemaMontura){
					other.animacionMuerte=2;
					if(!other.congela)
						other.muere();
				}
				else if(this.item=='ice'&&other.seCongelaMontura){
					other.timerIce = new ig.Timer();	
					other.currentAnim = other.anims.ice;
					other.currentAnim.flip.x=(this.vel.x>0)?true:false;
					other.congela=true;
					//other.collides=ig.Entity.COLLIDES.ACTIVE;
				}
				else if(this.item=='gas'&&other.seMuereConGas){
					other.animacionMuerte=1;
					if(!other.congela)other.muere();
				}				
				if(this.item=='fire'&&!other.seQuemaMontura){
					other.inmune.color='#c00';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				else if(this.item=='ice'&&!other.seCongelaMontura){
					other.inmune.color='#9ff';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				else if(this.item=='gas'&&!other.seMuereConGas){
					other.inmune.color='#963';
					other.inmune.pos.y=other.pos.y;
					other.inmune.opacity=1;
				}
				else if(this.item=='static_ball'&&other.seQuemaMontura){
					other.animacionMuerte=2;
					if(!other.congela)
						other.muere();
					this.kill();
				}
			}
		},
		update:function (){
			this.parent();
			var player = ig.game.player;
			if(this.item!='static_ball'){
				if(this.currentAnim.loopCount==1&&this.size.x==this.totalSizeX/3)
					this.size.x*=2;
				else if(this.currentAnim.loopCount==2&&this.size.x==this.totalSizeX/1.5)
					this.size.x*=1.5;
				else if(this.currentAnim.loopCount==6)
					this.kill();
				this.animSheet.width=this.size.x;
				this.pos.y=player.pos.y+player.settings.firePos.y;
				if(!player.currentAnim.flip.x){
					this.currentAnim.flip.x=false;
					this.pos.x=player.pos.x+player.size.x;
				}
				else{
					this.currentAnim.flip.x=true;
					this.pos.x=player.pos.x-this.size.x;
				}
			}
			else{
				if(this.distanceTo(player)>400||this.standing)
					this.kill();
			}
		},
		handleMovementTrace: function( res ) {// colision con terreno			
			this.parent(res); 
			if( res.collision.x ) {
				this.kill();			
			}		
		},
		
    }); 
});