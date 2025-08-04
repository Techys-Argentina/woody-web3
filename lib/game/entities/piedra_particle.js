ig.module(
    'game.entities.piedra_particle'
)
.requires(
    'impact.entity',
    'game.entities.particle'
)
.defines(function() {
 
    EntityPiedra_particle = EntityParticle.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/piedra.png',6 , 6 ),
        size: {x : 6 , y : 6 },
    }); 
});