ig.module(
    'game.entities.plataform2'
)
.requires(
    'impact.entity',
    'game.entities.plataform'
)
.defines(function() {
 
    EntityPlataform2= EntityPlataform.extend({	
		animSheet: new ig.AnimationSheet('media/img/plataform2.png',96 , 36 ),
        size: {x : 96 , y : 36 },   
        _wmIgnore:false,
    }); 
});