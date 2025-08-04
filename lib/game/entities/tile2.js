ig.module(
    'game.entities.tile2'
)
.requires(
    'impact.entity',
	'game.entities.tile2_particle',
	'game.entities.coin2',
	'game.entities.tile1'
)
.defines(function() {
 
    EntityTile2 = EntityTile1.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/tile2.png',48 , 48 ),
		
		
		rompeTile: function(){
			sounds[1].play();
			var x=0;
			var y=0;
			for(i=0;i<=3;i++){
				var settings = {'por':i};
				var x = x+24;
				if((i+1)%2==0){
					x=0;
					y+=24;
				}
				ig.game.spawnEntity(EntityTile2_particle, this.pos.x+x, this.pos.y+y, settings);
			}		
			if(this.settings.mon){
				this.sueltaMonedas();
			}
			if(this.settings.vida){
				this.sueltaVida();
			}	
			ig.game.sortEntitiesDeferred();			
			this.kill();
		},
    }); 
});