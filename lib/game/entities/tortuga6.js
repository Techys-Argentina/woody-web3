ig.module(
    'game.entities.tortuga6'
)
.requires(
    'impact.entity',
	'game.entities.tortuga2'
)
.defines(function() { 
    EntityTortuga6 = EntityTortuga2.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga6.png',70 , 50 ),
    }); 
});