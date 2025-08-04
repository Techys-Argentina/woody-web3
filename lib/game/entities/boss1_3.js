ig.module(
    'game.entities.boss1_3'
)
.requires(
    'impact.entity',
	'game.entities.boss1'
)
.defines(function() {
	EntityBoss1_3 = EntityBoss1.extend({
		loopPowerInit:6,
		spawnEnemies:false,
		init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.animSheet=new ig.AnimationSheet( 'media/img/enemy/boss1-3.png',120 , 124 );
			this.addAnim( 'idle', 0.1, [1,0,0,0,0] );
			this.addAnim( 'run', 0.1, [2,3,4,5] );
			this.addAnim( 'startTwister', 0.1, [6,7,8,9] );
			this.addAnim( 'endTwister', 0.1, [9,8,7,6] );
			this.addAnim( 'twister', 0.1, [10,11] );
			this.addAnim( 'ice', 9999, [14] );
			this.addAnim( 'die', 0.1, [3,4] );
			this.addAnim( 'dieFuego', 0.1, [12,13] );
			this.currentAnim = this.anims.idle;
		},
    }); 
});