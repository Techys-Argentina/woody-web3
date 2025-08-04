ig.module(
    'game.entities.tile2_group'
)
.requires(
    'impact.entity',
	'game.entities.tile_group'
)
.defines(function() {
 
    EntityTile2_group = EntityTile_group.extend({	
		imgTile:new ig.Image( 'media/img/tile2.png' ),
		tileEnt:2,
		_wmIgnore:false,
    });   
	   
});