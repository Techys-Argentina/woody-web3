ig.module(
    'game.entities.plataform1'
)
.requires(
    'impact.entity',
    'game.entities.plataform'
)
.defines(function() {
 
    EntityPlataform1= EntityPlataform.extend({	
		//animSheet: new ig.AnimationSheet('media/img/plataform1.png',48 , 36 ),
		animSheet: new ig.AnimationSheet('media/img/plataform1.png',48 , 36 ),
        size: {x : 48 , y : 36 }, 
        _wmIgnore:false,  
    }); 
});