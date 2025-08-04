ig.module(
    'game.entities.btn_montura_console'
)
.requires(
    'impact.entity','plugins.button', 'game.entities.btn_montura'
)
.defines(function() {
 
    EntityBtn_montura_console = EntityBtn_montura.extend({	
		//Pre-cargamos los sprites
        size: {x : 70 , y : 70 },
		gravityFactor:0,
		zIndex:100,
		//Constructor
		init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'active', 1, [1] );
			this.addAnim( 'deactive', 1, [2] );
			this.addAnim( 'noUse', 1, [2] );
			this.addAnim( 'equiped', 1, [2] );
        },
		drawTimer: function(){},
		habilitar:function(){},
    }); 
});