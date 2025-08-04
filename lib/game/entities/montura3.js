ig.module(
    'game.entities.montura3'
)
.requires(
	'game.entities.montura'
)
.defines(function() { 
    EntityMontura3 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/montura3.png',71 , 72 ), 
		accelGround:600,
		size: {x : 71, y : 72 },
		offset:{x:0, y:0},
		montura:3,
		dobleJump:false,
		dJump:false,
		velYNado:-150,
		settings:{arma:'gas',flip:false,firePos:{x:0,y:-10}},
		gravedad:1,
		animacion: function(){
			this.addAnim( 'idle', 5, [0,0,14] );	
			this.addAnim( 'run', 0.1, [1,2,3,4] );
			this.addAnim( 'jump1', 0.5, [5] );
			this.addAnim( 'jump2', 0.5, [6] );
			this.addAnim( 'die', 0.1, [7,8,9] );
			this.addAnim( 'init', 0.1, [7,8,9] );	
			this.addAnim( 'swim1', 0.2, [3,4,4,4,4,4,4,4] );
			this.addAnim( 'swim2', 0.2, [1,2] );	
			this.addAnim( 'fire', 0.3, [13] );
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [11] );
				btn_fire.addAnim( 'active', 1, [12] );	
			}
			this.dobleJump=false;
		},
		movimiento:function(){
			this.parent();
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)){//abajo del agua
				this.gravityFactor=0.2;
				this.maxVel.y=150;
				this.maxVel.x=300;//velocidad en el agua
				this.oxigeno=99;
			}else{
				this.gravityFactor=this.gravedad;
				this.jump=400;
				this.maxVel.y=500;
				this.maxVel.x=50;//velocidad fuera del agua
			}
		},
    }); 
});