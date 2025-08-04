ig.module(
    'game.entities.estalac_activate'
)
.requires(
    'impact.entity',
	'game.entities.personaje'
)
.defines(function() {
 
    EntityEstalac_activate = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
        size: {x : 48, y : 48 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		durationVib:2,
		gravityFactor:0,
		zIndex:-10,
		aId:0,
		_wmDrawBox:true,
		_wmBoxColor:'#666',
		_wmScalable:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle',9999, [0] );
			this.currentAnim = this.anims.idle;
			this.timerCheck = new ig.Timer();
			this.colisiona=false;
        },
        update: function() {
			this.parent();			
			if(this.colisiona){ // si la colision esta en true la cambio a false despues de x segs (fix - colision multiple)
				if (this.timerCheck.delta() >= 0.1){
					this.colisiona=false;
				}
			}
		},
        check: function(other){
			this.parent();
			if(!this.colisiona){ // fix multiple colision, si colisiona esta en false, lo pongo en true y seteo el timer para volverlo a false				
				if(other==ig.game.player&&!other.murio){
					var aEstalac = ig.game.getEntitiesByType( EntityEstalactita );
					var lengthEstalac = aEstalac.length;
					for(i=0; i<lengthEstalac; i++){
						if(aEstalac[i].aId==this.aId)aEstalac[i].act=true;
					}
					ig.game.cameraVibration.init({duration:this.durationVib, dispVibration:this.durationVib, intensidad:3});
					this.kill();	
				}				
				this.colisiona=true; 
				this.timerCheck.set(); // arranca el timer para poner la colision en false
			}			
		},
    }); 
});