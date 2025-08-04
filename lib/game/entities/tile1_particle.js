ig.module(
    'game.entities.tile1_particle'
)
.requires(
    'impact.entity',
    'game.entities.particle'
)
.defines(function() {
 
    EntityTile1_particle = EntityParticle.extend({	
        animSheet: new ig.AnimationSheet('media/img/tile.png',12 , 12 ),
        size: {x : 12 , y : 12 },        
    }); 
});