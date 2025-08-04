ig.module(
    'game.entities.estalac_particle'
)
.requires(
    'impact.entity',
    'game.entities.particle'
)
.defines(function() {
 
    EntityEstalac_particle= EntityParticle.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/enemy/estalac.png',12 , 12 ),
        size: {x : 12 , y : 12 },
    }); 
});