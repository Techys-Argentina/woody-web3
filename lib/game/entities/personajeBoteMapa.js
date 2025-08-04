ig.module(
    'game.entities.personajeBoteMapa'
)
.requires(
    'impact.entity',
	'plugins.button'
	
)
.defines(function() {
	EntityPersonajeBoteMapa = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.NEVER,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/personaje_bote_mapa.png',46,48),
        size: {x : 30 , y : 40 }, 
        offset: {x : 10, y : 10},
        flip: false,
        maxVel: {x: 200, y: 800},
		jump: 440,
		gravityFactor:0,
		posX:null,
		posY:null,
		btnFinal:null,
		dif:1,
		o:0,
		inicia:true,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.1, [0,1,2,3] );
			this.addAnim( 'stop', 9999, [4]);
			if(!ig.global.wm){
				if (x < 0)
					this.vel.x = 20;
				this.posX = -this.size.x + x;
				this.posY = y;
				this.pos.x=this.posX;
				this.pos.y=this.posY;						
			}
        },
		update: function(){
			this.parent();
			if(this.vel.x == 0)
				this.currentAnim = this.anims.stop;
		},
		check: function(other){
			if(other instanceof EntityPersonajeMapa){
				this.vel.x=0;
				other.currentAnim.alpha = 1;//muestro el personajeMapa
			}
		},
	}); 
});