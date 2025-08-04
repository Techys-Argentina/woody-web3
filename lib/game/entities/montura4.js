ig.module(
    'game.entities.montura4'
)
.requires(
	'game.entities.montura',
	'game.entities.humoSobreLava'
)
.defines(function() { 
    EntityMontura4 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet('media/img/montura4.png',71,72), 
		size: {x : 71, y : 72 },
		offset:{x:0, y:0},
		montura:4,
		accel:{ground:1000,air:400},
		maxVelYFueraAgua:{x:350,y:1500},
		friction: {x: 1000, y:0},
		jump: 650,
		invulFire:true,
		animSobreLava:null,
		settings:{arma:'fire',flip:false,firePos:{x:0,y:-10}},
		animacion: function(){
			this.addAnim( 'idle', 5, [0] );			
			this.addAnim( 'run', 0.1, [1,2,3,4] );
			this.addAnim( 'jump1', 1, [5] );
			this.addAnim( 'jump2', 1, [6] );
			this.addAnim( 'die', 0.1, [7,8,9] );
			this.addAnim( 'init', 0.1, [9,8,7] );	
			this.addAnim( 'fire', 0.3, [13] );	
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [15] );
				btn_fire.addAnim( 'active', 1, [16] );
			}
			this.dobleJump=true;			
		},
		init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.animSobreLava = ig.game.spawnEntity(EntityHumoSobreLava,this.pos.x+this.size.x/2,this.pos.y+this.size.y-10);
			var capaWater=ig.game.getMapByName('water');
			var capaCollision=ig.game.getMapByName('collision');
			var tileY= 0;
			var tileX= 0;
			for(i=0; i<capaWater.data.length;i++){			
				for(j=0; j<capaWater.data[0].length;j++){					
					if(capaWater.getTile(tileX, tileY)==2){
						capaCollision.setTile(tileX, tileY, 2);
					}
					tileX+=capaWater.tilesize;					
				}
				tileY+=capaWater.tilesize;
				tileX= 0;
			}
		},
		handleMovementTrace: function( res ) {
			this.parent(res);
			var capaCollision=ig.game.getMapByName('collision');
			if(ig.game.getMapByName('water').getTile(this.pos.x+this.size.x/2, this.pos.y+this.size.y)==2){
				this.animSobreLava.pos.x=this.pos.x+(this.animSobreLava.size.x/2);
				this.animSobreLava.pos.y=this.pos.y+(this.size.y-this.animSobreLava.size.y+10);
				this.animSobreLava.currentAnim = this.animSobreLava.anims.idle;
				this.animSobreLava.currentAnim.alpha=1;
				this.accel.ground = 200;
				this.offset.y = -5;
			}
			else{
				this.animSobreLava.currentAnim = this.animSobreLava.anims.off;
				this.animSobreLava.currentAnim.alpha=0;
				this.accel.ground = 1000;
			}
		},
		movimiento:function(){
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)){	//abajo del agua					
				this.desmonta();
			}
			else{
				this.parent();
			}
		},
		desmonta: function(){			
			this.parent();
			var capaCollision=ig.game.getMapByName('collision');
			var tileY= 0;
			var tileX= 0;
			for(i=0; i<capaCollision.data.length;i++){			
				for(j=0; j<capaCollision.data[0].length;j++){					
					if(capaCollision.getTile(tileX, tileY)==2)
						capaCollision.setTile(tileX, tileY,0);
					tileX+=capaCollision.tilesize;					
				}
				tileY+=capaCollision.tilesize;
				tileX= 0;
			}
		},
		draw: function(){
			this.parent();
			this.animSobreLava.draw(true);
		},
	}); 
});