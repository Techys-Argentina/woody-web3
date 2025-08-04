ig.module(
    'game.entities.tile1_group'
)
.requires(
    'impact.entity',
	'game.entities.tile_group'
)
.defines(function() {
 
    EntityTile1_group = EntityTile_group.extend({	
		imgTile:new ig.Image( 'media/img/tile.png' ),
		tileEnt:1,
		_wmIgnore:false,
	});	
});
