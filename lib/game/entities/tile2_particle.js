ig.module(
    'game.entities.tile2_particle'
)
.requires(
    'impact.entity',
    'game.entities.particle'
)
.defines(function() {
 
    EntityTile2_particle = EntityParticle.extend({	
        animSheet: new ig.AnimationSheet('media/img/tile2.png',12 , 12 ),
        size: {x : 12 , y : 12 },        
    }); 
});