ig.module(
    'game.entities.bullet'
)
.requires(
    'impact.entity',
	'game.entities.enemigo'
)
.defines(function() {
 
    EntityBullet = EntityEnemigo.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/enemy/bullet.png',58 , 36 ),
        size: {x : 58 , y : 36 },  
		vel:{x:0, y:	0},
		maxVel: {x:800, y: 0},
		gravityFactor:0,
		velX:-400,
		seCongela:false,
		seQuema:false,
		seMuereConObjeto:false,
		seCongelaMontura:false,
		seQuemaMontura:false,
		seMuereConGas:false,
		_wmIgnore:false,
		updateOffScreen:true,
		collides: ig.Entity.COLLIDES.ACTIVE,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'run', 9999, [0] );
			this.currentAnim = this.anims.run;
        },
        update:function(){
        	this.parent();
			
        },
		
		muere: function(){
			this.currentAnim = this.anims.run;
			this.gravityFactor=5;
			this.parent();
		},
    }); 
});