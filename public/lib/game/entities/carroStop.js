ig.module(
    'game.entities.carroStop'
)
.requires(
    'impact.entity',
	'game.entities.carroCheck'
)
.defines(function() {
 
    EntityCarroStop = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/carroStop.png',48 , 48 ),
        size: {x : 48 , y : 250 },
		offset: {x : 0, y : -200},
		vel:{x:0, y:0},
		gravityFactor:1,
		zIndex:10,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
            this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
		},
		update: function(){
			this.parent();
			var player = ig.game.player;
			if(player &&player.tipo=='montura'&&player.montura==5&& this.distanceToX( player )<100&& this.distanceToY( player )<100){
				player.nearStop=true;
			}
		},
	}); 
});