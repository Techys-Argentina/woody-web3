ig.module(
    'game.entities.btn_inventario'
)
.requires(
    'impact.entity','plugins.button'
)
.defines(function() {
 
    EntityBtn_inventario = Button.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/popups/inventario_botones/axe.png',105 , 105),
        size: {x : 105, y : 105},
		zIndex:-10,
		_wmIgnore:true,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [1] );
			this.addAnim( 'active', 1, [2] );
			this.addAnim( 'deactive', 1, [0] );
			this.addAnim( 'equiped', 1, [3] );
			this.state = 'active';
        },
	}); 
});