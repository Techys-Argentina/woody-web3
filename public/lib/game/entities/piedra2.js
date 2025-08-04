ig.module(
    'game.entities.piedra2'
)
.requires(
    'impact.entity',
	'game.entities.piedra',
	'game.entities.piedra_particle2'
)
.defines(function() {
	EntityPiedra2 = EntityPiedra.extend({
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/piedra2.png',17 , 18 ),
		size: {x : 17 , y : 18 },
        offset: {x : 0, y : 0},  
		maxVel:{x:700, y:700},	
		vel:{x:0, y:0},
		rompe: function(){
			var sound = new ig.Sound( 'media/sounds/breakblock.*' );
			sound.play();
			var x=0;
			var y=0;
			var settings;
			for(i=0;i<=3;i++){
				settings = {'por':i};
				x = x+9;
				if((i+1)%9==0){
					x=0;
					y+=9;
				}
				ig.game.spawnEntity(EntityPiedra_particle2, this.pos.x+x, this.pos.y+y, settings);
			}			
			this.kill();
		},
    });
});