ig.module( 'game.entities.entity_comet' )

.requires( 'game.entities.entity_star' )

.defines(function() {
	EntityEntity_comet = EntityEntity_star.extend({
		size: {x:80,y:80},
		animSheet: new ig.AnimationSheet('media/img/comet_back.png',80,80),
		state: 'idle',
		zIndex:-100,
		noFix:false,
		fixed:true,
		posX:null,
		posY:null,
		posYEnd:600,
		velX:-4,
		velY:1,
		showTime:500,
		showTimeDelay:500,
		updateOffScreen:true,
		_wmIgnore:false,
		animated:true,
		gravityFactor:0,
		distance:40,
		showed:false,
		init: function( x, y, settings ) {
			this.addAnim( 'idle', 0.05, [27,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],true);
			this.addAnim( 'deactive', 9999, [0] );
			this.parent( x, y, settings );
			this.currentAnim.angle=Math.PI/12;
			this.posXTemp=this.posX;
			this.posYTemp=this.posY;
		},
		update: function() {
			this.parent();
			if(this.showTimeDelay<0){
				//this.posXTemp=this.posX;
				this.posXTemp=ig.game.player.pos.x+(Math.floor(Math.random()*100)-100);
				this.posYTemp=this.posY;
				this.showed=true;
				this.showTimeDelay=this.showTime;
				this.currentAnim.rewind();
			}
			else{
				this.showTimeDelay-=this.compensadorTick(1);
			}
		},
		draw: function() {
			if(!ig.global.wm){
				if(this.showed){
					if(this.fixed){
						this.setScreenPos(ig.game.screen.x,ig.game.screen.y);
						this.posXTemp=this.posXTemp-this.velX;
						this.posYTemp=this.posYTemp+this.velY;
						if(this.currentAnim.loopCount>0)
							this.showed=false;
					}
					else if(this.noFix){
						this.pos.x=this.posXTemp;
						this.pos.y=this.posYTemp;
					}
				}
				if (this.state !== 'hidden') {
					this.parent();
				}
			}
		},
		setScreenPos: function( x, y ) {
			var map = ig.game.backgroundMaps[1];
			this.pos.x = this.posXTemp;
			this.pos.y = this.posYTemp + map.scroll.y - y/this.distance;
		},
	});
});