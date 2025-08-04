// A Button Entity for Impact.js

ig.module( 'game.entities.entity_star' )
.requires( 'impact.entity' )
.defines(function() {
	EntityEntity_star = ig.Entity.extend({
		size: { x: 32, y: 34 },
		collides: ig.Entity.COLLIDES.NEVER,
    	type: ig.Entity.TYPE.NONE,
    	checkAgainst: ig.Entity.TYPE.NONE,
		animSheet: new ig.AnimationSheet('media/img/star_back.png',32 , 34 ),
		state: 'idle',
		zIndex:-100,
		noFix:false,
		fixed:true,
		posX:null,
		posY:null,
		updateOffScreen:true,
		_wmIgnore:false,
		animated:true,
		gravityFactor:0,
		distance:40,
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,1,2,3,4] );
			this.addAnim( 'deactive', 1, [2] );
			if(this.posX==null)
				this.posX=this.pos.x;
			if(this.posY==null)
				this.posY=this.pos.y;
		},
		update: function() {
			if(this.fixed){
				this.setScreenPos(ig.game.screen.x,ig.game.screen.y);
			}
			else if(this.noFix){
				this.pos.x=this.posX;
				this.pos.y=this.posY;
			}
			if(this.animated)
				this.parent();
		},
		draw: function() {
			if(!ig.global.wm){
				if(this.fixed){
					this.setScreenPos(ig.game.screen.x,ig.game.screen.y);
				}
				else if(this.noFix){
					this.pos.x=this.posX;
					this.pos.y=this.posY;
				}
				if (this.state !== 'hidden') {
					this.parent();
				}
			}
		},
		setState: function( s ) {
			this.state = s;
			if(this.state!=='hidden') {
				this.currentAnim = this.anims[ this.state ];
			}
		},
		setScreenPos: function( x, y ) {
			var mapIndex=0;
			//for( mapIndex; mapIndex < ig.game.backgroundMaps.length; mapIndex++ ) {
				var map = ig.game.backgroundMaps[1];
				this.pos.x = this.posX + map.scroll.x - x/this.distance;
				this.pos.y = this.posY + map.scroll.y - y/this.distance;
				
			//}
		},
	});
});