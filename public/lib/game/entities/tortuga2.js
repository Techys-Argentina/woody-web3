ig.module(
    'game.entities.tortuga2'
)
.requires(
    'impact.entity',
	'game.entities.tortuga'
)
.defines(function() { 
    EntityTortuga2 = EntityTortuga.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/enemy/tortuga2.png',70 , 50 ),
		size: {x : 70 , y : 45 },    
		offset: {x : 0 , y : 5 },
		init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'run', 0.1, [0,1,2,3] );
			this.addAnim( 'dieFuego', 0.1, [4,5] );
			this.addAnim( 'ice', 9999, [6] );
			this.currentAnim = this.anims.run;
			this.timer = new ig.Timer();
			
			
        },	
    }); 
});