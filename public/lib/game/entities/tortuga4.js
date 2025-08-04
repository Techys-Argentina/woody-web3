ig.module(
    'game.entities.tortuga4'
)
.requires(
    'impact.entity',
	'game.entities.tortuga2'
)
.defines(function() { 
    EntityTortuga4 = EntityTortuga2.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga4.png',70 , 50 ),
    }); 
});