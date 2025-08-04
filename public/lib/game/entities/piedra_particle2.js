ig.module(
    'game.entities.piedra_particle2'
)
.requires(
    'impact.entity',
    'game.entities.piedra_particle'
)
.defines(function() {
 
    EntityPiedra_particle2 = EntityPiedra_particle.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/piedra2.png',9 , 9 ),
        size: {x : 9 , y : 9 },
    }); 
});