ig.module(
    'game.entities.continue'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityContinue = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/checkpoint.png',40 , 40 ),
        size: {x : 40 , y : 40 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		light:null,
		music:null,
		zIndex : -10,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
        },
		update: function() {
			this.parent();
			//console.log(this.settings.m);
		},
		check: function(other){		
			if(ig.game.player.pos.x!=this.pos.x)
				sounds[4].play();
			lStorage.set('posPierdeX',this.pos.x);
            lStorage.set('posPierdeY',this.pos.y);
			if(this.music!=null){
				ig.game.music=this.music;
				if(lStorage.get('music'))ig.music.play(ig.game.music);
			}
			this.kill();
		},
    }); 
});