ig.module(
    'game.entities.vida'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityVida = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.LITE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/vida.png',36 , 33 ),
        size: {x : 36 , y : 33 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		checked:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			this.posTextY=0;
            this.alphaText=1.0;
        },
		update: function() {
			this.parent();
			if(this.checked){
				if(this.alphaText<0.01){
					this.kill();
				}else{
					this.posTextY+=1;
					this.alphaText-=0.01;
				}
			}
		},
		check: function(other){
			if(!this.checked&&other==ig.game.player){
				sounds[2].play();
				other.health++;
				lStorage.set('vidas',other.health);
				this.checked=true;
				this.collides= ig.Entity.COLLIDES.NEVER;
				this.currentAnim.alpha=0;
			}
		},
		draw: function() {
			if(this.checked){
				ig.system.context.save();
				ig.system.context.font = 'bold 12pt hoboStd';
				ig.system.context.fillStyle='#393';
				ig.system.context.globalAlpha = this.alphaText;
      			ig.system.context.fillText('1UP', this.pos.x-ig.game.screen.x, this.pos.y-ig.game.screen.y-this.posTextY);
      			ig.system.context.restore();
			}			
			this.parent();
		}, 
    }); 
});