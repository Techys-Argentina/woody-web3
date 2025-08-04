ig.module(
    'game.entities.pajaro3'
)
.requires(
    'impact.entity',
	'game.entities.pajaro'
)
.defines(function() {
	EntityPajaro3 = EntityPajaro.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/enemy/pajaro3.png',106 , 60 ),
        size: {x : 106 , y : 60},
		offset: {x :0 , y : 5 },		
		vel:{x:-100, y:	0},
		maxVel: {x: 200, y: 0},
		gravityFactor:0,
		_wmIgnore:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'run', 0.1, [0,1] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [2,3] );
			this.addAnim( 'ice', 9999, [4] );
			this.currentAnim = this.anims.run;
        },
	});		
});