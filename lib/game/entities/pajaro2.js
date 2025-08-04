ig.module(
    'game.entities.pajaro2'
)
.requires(
    'impact.entity',
	'game.entities.pajaro'
)
.defines(function() { 
    EntityPajaro2 = EntityPajaro.extend({	
        animSheet: new ig.AnimationSheet( 'media/img/enemy/pajaro2.png',63 , 60  ),	
    }); 
});