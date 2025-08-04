ig.module(
    'game.entities.topo4'
)
.requires(
    'impact.entity',
	'game.entities.topo2'
)
.defines(function() {
 
    EntityTopo4 = EntityTopo2.extend({	
        size: {x : 69 , y : 94 }, 
		offset:{x:0,y:0},
		delayInit:125,
		seEntierra:false,
		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/topo4.png',69 , 94 );
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