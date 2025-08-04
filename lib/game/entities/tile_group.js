ig.module(
    'game.entities.tile_group'
)
.requires(
    'impact.entity',
	'game.entities.tile1',
	'game.entities.tile2'
)
.defines(function() {
 
    EntityTile_group = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.NEVER,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
        size: {x : 48 , y : 48 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel:{x:0, y:0},
		gravityFactor:0,
		checkedVida:false,
		anima:false,
		cant:1,
		m:1,
		imgCoin:null,
		show:100,
		cae:null,
		_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			
			if( !ig.global.wm ) {
				if(this.tileEnt==1)ent=EntityTile1;
				else if(this.tileEnt==2)ent=EntityTile2;
				else if(this.tileEnt==3)ent=EntityTile3;
				var random=Math.floor(Math.random() * 100) + 1;
				if(random>this.show)this.kill();
				else{
					var posX=this.pos.x;
					var posY=this.pos.y;
					for(i=0;i<this.cant;i++){
						settings
						ig.game.spawnEntity(ent, posX, posY, settings);
						switch(this.m) {
							case 1:
								posX+=48;
								break;
							case 2:
								posY+=48;
								break;
							case 3:
								posX+=48;
								posY+=48;
								break;
							case 4:
								posX+=48;
								posY-=48;
								break;
						} 
					}
				}	
			}
        },
		draw: function(){
			this.parent();			 
			if( ig.global.wm ) {
				var posX=ig.system.getDrawPos(this.pos.x - ig.game.screen.x)/ig.system.scale;
				var posY=ig.system.getDrawPos(this.pos.y - ig.game.screen.y)/ig.system.scale;
				for(i=0;i<this.cant;i++){
					this.imgTile.draw(posX,posY);
					switch(this.m) {
						case 1:
							posX+=48;
							break;
						case 2:
							posY+=48;
							break;
						case 3:
							posX+=48;
							posY+=48;
							break;
						case 4:
							posX+=48;
							posY-=48;
							break;
					} 
				}	
			}
		},
    }); 
});