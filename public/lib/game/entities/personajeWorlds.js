ig.module(
    'game.entities.personajeWorlds'
)
.requires(
    'impact.entity',
	'plugins.button',
	'game.entities.btn_world'
)
.defines(function() {
 
    EntityPersonajeWorlds = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.ACTIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/woody-remando.png',84,65),
        size: {x : 84 , y : 65 },
        offset: {x : 10, y : 10},
        flip: false,        
        maxVel: {x: 200, y: 800},
		jump: 440,
		gravityFactor:0,
		posX:null,
		posY:null,
		btnFinal:null,
		dif:1,
		o:0,
		inicia:true,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.2, [0,1] );
			this.addAnim( 'stop', 9999, [0] );
			if(!ig.global.wm){
				var btn_level=ig.game.getEntitiesByType(EntityBtn_world);
				if(lStorage.get("posBtnLevelWorld") == null){
					lStorage.set('posBtnLevelWorld', 1);
					this.currentAnim = this.anims.stop;
				}
				var lengthBtn_level = btn_level.length;
				for(i=0;i<lengthBtn_level;i++){
					if(btn_level[i].world == lStorage.get('posBtnLevelWorld')){
						this.pos.x=btn_level[i].posBoteX;
						this.pos.y=btn_level[i].posBoteY;
						this.currentAnim = this.anims.stop;							
					}
				}
			}
		},
		movimiento: function(punto){
			var x0 = this.pos.x;
			var y0 = this.pos.y;
			var x1 = punto.posBoteX;
			var y1 = punto.posBoteY;
			var SPEED_VAR = 50; 
			var xDistPerIteration = (x1 - x0) / SPEED_VAR;
			var yDistPerIteration = (y1 - y0) / SPEED_VAR;
			if (Math.round(this.distanceTo(x1,y1))>10&&(Math.abs(xDistPerIteration)>0.1||Math.abs(yDistPerIteration)>0.1)){
				this.pos.x += xDistPerIteration;
				this.pos.y += yDistPerIteration;
			}
			else{
				currentWorld=this.btnFinal.world;
				this.btnFinal = null;
				this.vel.x=0;
				lStorage.set('posBtnLevelWorld',currentWorld);
				if(currentWorld!="4" && currentWorld!="bw")//mundo final
					ig.system.setGame(Levels);
				else if(currentWorld=="4"){
					currentLevel='4_1';
					ig.system.setGame(MyGame);
				}
				else if(currentWorld=="bw"){
					currentLevel=lStorage.get('nivel_bw');
					ig.system.setGame(MyGame);
				}
			}
		},
		update: function(){
			this.parent();
			if (this.btnFinal == null){
				this.currentAnim = this.anims.stop;
			}
			else{
				this.currentAnim = this.anims.idle;
				this.movimiento(this.btnFinal);
			}
		},
		distanceTo: function(x,y) {
			var xd = (this.pos.x + this.size.x/2) - (x); 
			var yd = (this.pos.y + this.size.y/2) - (y);
			return Math.sqrt( xd*xd + yd*yd );
		},
	}); 
});