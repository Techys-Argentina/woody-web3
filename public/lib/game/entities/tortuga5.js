ig.module(
    'game.entities.tortuga5'
)
.requires(
    'impact.entity',
	'game.entities.tortuga'
)
.defines(function() { 
    EntityTortuga5 = EntityTortuga.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/cangrejo.png',60 , 40 ),
		size: {x : 60 , y : 35 },    
		offset: {x : 0 , y : 5 },
		seMuereConSalto:false,
		init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'run', 0.1, [0,1,2] );
			this.addAnim( 'dieFuego', 0.1, [3,4] );
			this.addAnim( 'ice', 9999, [5] );
			this.currentAnim = this.anims.run;
			this.timer = new ig.Timer();
			
			
        },	
    }); 
});