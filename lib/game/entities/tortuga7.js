ig.module(
    'game.entities.tortuga7'
)
.requires(
    'impact.entity',
	'game.entities.tortuga'
)
.defines(function() { 
    EntityTortuga7 = EntityTortuga.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga5.png',45 , 50),
		size: {x : 45 , y : 50 },    
		offset: {x : 0 , y : 0 },
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