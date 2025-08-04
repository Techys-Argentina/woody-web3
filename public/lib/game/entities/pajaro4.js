ig.module(
    'game.entities.pajaro4'
)
.requires(
    'impact.entity',
	'game.entities.pajaro'
)
.defines(function() { 
    EntityPajaro4 = EntityPajaro.extend({	
        animSheet: new ig.AnimationSheet( 'media/img/enemy/pajaro4.png',55 , 33 ),
    }); 
});