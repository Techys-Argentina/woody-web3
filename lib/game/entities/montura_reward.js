ig.module(
    'game.entities.montura_reward'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityMontura_reward = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.FIXED,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/monturas_reward.png',120,100), 
		size: {x:120,y:100},
		offset:{x:0,y:0},
		vel:{x:0,y:0},
		gravityFactor:1,
		montura:1,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			var constMont=0;
			switch(this.montura) {
				case 1:
					constMont=8;	
					break;
				case 2:
					constMont=4;
					break;
				case 3:
					constMont=12;
					break;
				case 4:
					constMont=16;
					break;
				case 6:
					constMont=0;
					break;
			}
			this.addAnim('idle',0.1,[constMont,constMont+1,constMont+2,constMont+3,constMont+1,constMont,constMont,constMont,constMont,constMont,constMont,constMont,constMont,constMont,constMont,constMont,constMont]);
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				if(!(lStorage.get('montura'+this.montura.toString())== 'off')){
					this.kill();
				}
			}
        },
		collideWith: function(other, axis){
			if(other==ig.game.player){
				this.collides= ig.Entity.COLLIDES.PASIVE;
				ig.game.player.monta(this.montura);
				lStorage.set('montura'+this.montura.toString(),'on');
				this.kill();
			}
		},
    }); 
});