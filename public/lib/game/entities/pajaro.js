ig.module(
    'game.entities.pajaro'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityPajaro = EntityEnemigo.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/enemy/pajaro.png',63 , 60 ),
        size: {x : 63 , y : 55},
		offset: {x :0 , y : 5 },		
		vel:{x:-100, y:	0},
		maxVel: {x: 200, y: 0},
		gravityFactor:0,
		_wmIgnore:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'run', 0.1, [0,1] );
			this.addAnim( 'die', 9999, [0] );
			this.addAnim( 'dieFuego', 0.1, [4,5] );
			this.addAnim( 'ice', 9999, [6] );
			this.currentAnim = this.anims.run;
        },
        update:function(){
        	this.parent();
        	if(this.congela){
				this.collides= ig.Entity.COLLIDES.PASIVE;
				this.type= ig.Entity.TYPE.A;
				this.checkAgainst= ig.Entity.TYPE.B;
				this.currentAnim = this.anims.ice;
				this.vel.x=0;
				this.maxVel.y=1000;
				this.gravityFactor=5;
				if(this.standing)
					this.rompeHielo();
			}
			else{
				this.currentAnim.flip.x=(this.vel.x>=0);
			}
			
        },
		check: function(other){
			if(this.congela&&other.tipo!='undefined'&&other.tipo=='tile'){
				this.rompeHielo();
			}
		},
		muere: function(){
			this.maxVel.y=1000;
			this.currentAnim = this.anims.die;
			this.gravityFactor=3;
			this.parent();
		},
    }); 
});