ig.module(
    'game.entities.btn_crossPromotion'
)
.requires(
    'impact.entity','plugins.button'
)
.defines(function() {
 
    EntityBtn_crossPromotion = Button.extend({	
		//Pre-cargamos los sprites
        size: {x : 80 , y : 80 },
		gravityFactor:0,
		zIndex:10,
		noWater:false,
		_wmIgnore:true,
		animated:true,
		vel:{x:0,y:-25},
		//animateX:false,
		
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.posYIni=this.pos.y;
			if(this.animateX){
				this.posXIni=this.pos.x;
				this.vel.x=15;
			}
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'active', 1, [0] );
			this.addAnim( 'deactive', 1, [0] );
        },
		update: function(){
			this.parent();
			if(this.pos.y<=this.posYIni-40)
				this.vel.y=25;	
			else if(this.pos.y>this.posYIni)
				this.vel.y=-25;
			
			if(this.animateX){
				if(this.pos.x<this.posXIni-50)
					this.vel.x=20;
				else if(this.pos.x>this.posXIni+50)
					this.vel.x=-20;
			}
		},
        handleMovementTrace: function( res ) {// colision con terreno
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;					
		},
    }); 
});