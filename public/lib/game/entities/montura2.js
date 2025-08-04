ig.module(
    'game.entities.montura2'
)
.requires(
	'game.entities.montura'
)
.defines(function() { 
    EntityMontura2 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/montura2.png',71 , 72 ), 
		dobleJump:false,
		dJump:false,
		size: {x : 71, y : 72 },
		offset:{x:0, y:0},
		montura:2,
		jump: 300,
		maxVelYFueraAgua:{x:300,y:1500},
		accel:{ground:700,air:900},
		gravedad:1,
		settings:{arma:'ice',flip:false,firePos:{x:0,y:-10}},
		animacion: function(){
			this.addAnim( 'idle', 5, [0,0,14] );			
			this.addAnim( 'run', 0.1, [1,2,3,4] );
			this.addAnim( 'jump1', 0.3, [16,17] );
			this.addAnim( 'jump2', 1.5, [16] );
			this.addAnim( 'die', 0.1, [7,8,9] );
			this.addAnim( 'init', 0.1, [7,8,9] );
			this.addAnim( 'fire', 0.3, [13] );
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [13] );
				btn_fire.addAnim( 'active', 1, [14] );
			}	
			this.dobleJump=false;	
		},
		movimiento:function(){
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)){	//abajo del agua					
				this.desmonta();
			}else{
				this.parent();
			}
		},
		movimientoUp: function(){
			this.vel.y = -this.jump;				
			this.gravityFactor=this.gravedad;							
		},
    }); 
});