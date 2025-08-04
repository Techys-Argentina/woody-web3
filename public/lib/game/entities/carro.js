ig.module(
    'game.entities.carro'
)
.requires(
    'impact.entity',
	'game.entities.carroCheck'
)
.defines(function() {
 
    EntityCarro = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/carro.png',68 , 39 ),
        size: {x : 68 , y : 39 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:1,
		checkBottom:true,
		zIndex:10,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
            this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			if(!ig.global.wm){
				this.partB=ig.game.spawnEntity(EntityCarroCheck, this.pos.x, this.pos.y+this.size.y-4, {'position':'bottom','checkBottom':this.checkBottom,'idCarro':this.id});
				this.partL=ig.game.spawnEntity(EntityCarroCheck, this.pos.x, this.pos.y, {'position':'left','checkBottom':this.checkBottom,'idCarro':this.id});
				this.partR=ig.game.spawnEntity(EntityCarroCheck, this.pos.x+this.size.x-4, this.pos.y, {'position':'right','checkBottom':this.checkBottom,'idCarro':this.id});
			}
        },
		update: function(){
			this.parent();
		},
		kill: function(){
			this.parent();
			var aCarroCheck=ig.game.getEntitiesByType( EntityCarroCheck );
			var lengthCarroCheck = aCarroCheck.length;
			for(i=0; i<lengthCarroCheck;i++){
				if (aCarroCheck[i].idCarro == this.id)
					aCarroCheck[i].kill();
			}
		},
		
    }); 
});