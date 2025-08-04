ig.module(
    'game.entities.montura1'
)
.requires(
	'game.entities.montura'
)
.defines(function() { 
    EntityMontura1 = EntityMontura.extend({	
		animSheet: new ig.AnimationSheet( 'media/img/montura1.png',71 , 72 ), 
		size: {x : 71, y : 72 },
		offset:{x:0, y:0},
		montura:1,
		accel:{ground:1000,air:400},
		maxVelYFueraAgua:{x:350,y:1500},
		friction: {x: 1000, y:0},
		jump: 650,
		settings:{arma:'ray',flip:false,firePos:{x:0,y:-10}},
		animacion: function(){
			this.addAnim( 'idle', 5, [0] );			
			this.addAnim( 'run', 0.1, [1,2,3,4] );
			this.addAnim( 'jump1', 1, [5] );
			this.addAnim( 'jump2', 1, [6] );
			this.addAnim( 'die', 0.1, [7,8,9] );
			this.addAnim( 'init', 0.1, [9,8,7] );	
			this.addAnim( 'fire', 0.3, [13] );	
			if(ig.ua.mobile){
				btn_fire.addAnim( 'idle', 1, [9] );
				btn_fire.addAnim( 'active', 1, [10] );
			}
			this.dobleJump=true;
		},
		movimiento:function(){
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)){	//abajo del agua					
				this.desmonta();
			}
			else{
				this.parent();
			}
		},
    }); 
});