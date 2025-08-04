ig.module(
    'game.entities.tortuga3'
)
.requires(
    'impact.entity',
	'game.entities.tortuga'
)
.defines(function() { 
    EntityTortuga3 = EntityTortuga.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga3.png',45 , 50 ),
    }); 
});