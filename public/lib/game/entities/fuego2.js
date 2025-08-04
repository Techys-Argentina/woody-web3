ig.module(
    'game.entities.fuego2'
)
.requires(
    'impact.entity',
	'game.entities.fuego'
)
.defines(function() { 
    EntityFuego2 = EntityFuego.extend({	
        animSheet: new ig.AnimationSheet( 'media/img/enemy/fuego2.png',45 , 57),
		 init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',0.1, [0,0,0,1] );
			this.currentAnim = this.anims.idle;
        },
    }); 
});