ig.module(
    'game.entities.countdown'
)
.requires(
    'impact.entity',
	'game.entities.personaje',
	'game.entities.popups.popupRunner',
	'plugins.button'
)
.defines(function() {
 
    EntityCountdown = Button.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		tipo:'botonAlert',
        animSheet: new ig.AnimationSheet('media/img/warning.png',48 , 48 ),
        size: {x : 48 , y : 48 },
        offset: {x : 0, y : 0},    
		gravityFactor:0,
		invisible:false,
		delay:2,
		bgImg:'media/img/alert.png',
		sizeX:319,
		sizeY:322,
		zIndex:-10,
		delay:0,
		timer:0,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'active', 1, [0] );
			this.currentAnim = this.anims.idle;	
			if(this.invisible=='true'){
				if(ig.global.wm){
					this._wmScalable=true;
					this._wmDrawBox=true;
					this._wmBoxColor='#fff';
				}else{
					this.currentAnim.alpha=0;
					ig.game.pause=true;
				}
			}
		},
		update: function(){
			this.parent();
			if(this.invisible=='true'){
				if(!ig.global.wm){
					this.currentAnim.alpha=0;
				}
			}
			this.timer+=this.compensadorTick(0.1);
		},
		openPopUp: function(){
			var settings = {};
			ig.game.spawnEntity(EntityPopupRunner, ig.game.screen.x, ig.game.screen.y,settings);
		},
		check: function(other){
			ig.game.pause = true;
			if(this.timer>=this.delay){
				this.openPopUp();
				this.kill();
			}
		},	
    }); 
});