ig.module(
    'game.entities.enem3'
)
.requires(
    'impact.entity',
	'game.entities.enem2'
)
.defines(function() {
 
    EntityEnem3 = EntityEnem2.extend({
		size: {x : 63 , y : 94 }, 
		delay:150,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/enem3.png',63 , 94 );
			this.addAnim( 'idle', 0.8, [0] );
			this.addAnim( 'run', 0.1, [1,2] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [5,6] );
			this.addAnim( 'ice', 9999, [7] );
			this.addAnim( 'fire', 0.1, [3,4] );
			this.currentAnim = this.anims.idle;
		},				
    }); 
});