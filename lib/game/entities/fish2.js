ig.module(
    'game.entities.fish2'
)
.requires(
    'impact.entity',
	'game.entities.fish'
)
.defines(function() {
 
    EntityFish2 = EntityFish.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/enemy/fish2.png',50 , 45 ),
    }); 
});