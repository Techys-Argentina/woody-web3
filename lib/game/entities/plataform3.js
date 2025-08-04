ig.module(
    'game.entities.plataform3'
)
.requires(
    'impact.entity',
    'game.entities.plataform'
)
.defines(function() {
 
    EntityPlataform3= EntityPlataform.extend({	
		animSheet: new ig.AnimationSheet('media/img/plataform3.png',144 , 36 ),
        size: {x : 144 , y : 36 },   
        _wmIgnore:false,
    }); 
});