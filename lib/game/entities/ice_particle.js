ig.module(
    'game.entities.ice_particle'
)
.requires(
    'impact.entity',
    'game.entities.particle'
)
.defines(function() {
 
    EntityIce_particle = EntityParticle.extend({	
        animSheet: new ig.AnimationSheet('media/img/ice.png',10 , 10 ),
        size: {x : 10 , y : 10 },        
    }); 
});