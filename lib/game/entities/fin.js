ig.module(
    'game.entities.fin'
)
.requires(
    'impact.entity',
	'game.entities.personaje'
	
)
.defines(function() {
 
    EntityFin = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet( 'media/img/finish.png',48,48),
        newWorld:null,
		endWorld:null,
		endGame:null,
		bg:null,
		imgTop:'default',
		unblock:null,
        size: {x :48 , y : 48},
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		zIndex:-10,
		camera:false,
		invisible:false,
		settings:{},
		cameraStop:true,
		regenerate:true,
		updateOffScreen:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			this.settings = settings;
			if(this.invisible){
				this.currentAnim.alpha=0;
				if(ig.global.wm){this._wmDrawBox=true;this._wmBoxColor='blue';this._wmScalable=true;}
			}
        },
		update: function() {
			this.parent();
			var player=ig.game.player;
			if(this.distanceTo(player)<ig.game.getMapByName( 'main' ).height*ig.game.getMapByName( 'main' ).tilesize){
				var correc=(player.tipo=='player')?100:90; //esta correccion es una garcha, problemas con el ancho del player. Lo mismo en passage
				if(this.cameraStop==true && player && this.pos.x+correc-player.pos.x<ig.system.width/2){
					ig.game.scroleaX=false;				
				}else{
					ig.game.scroleaX=true;
				}
			}
		},
		check: function(other){// fin del nivel, igual que en el metodo kill de la entidad enemigo
			if(!this.camera&&other==ig.game.player){
				other.accelGround=0;
				sounds[3].play();
				ig.music.fadeOut(2);
				this.camera=true;
				ig.game.pause=true;
				
				lStorage.set('posPierdeX',null); //reseteo posicion del jugador al default
            	lStorage.set('posPierdeY',null);
				if(this.newWorld!=null){
					if(lStorage.get('world')<this.newWorld)lStorage.set('world',this.newWorld);
				}
				var settings={'endWorld':this.endWorld, 'newWorld':this.newWorld, 'endGame':this.endGame,'bg':this.bg, 'imgTop':this.imgTop, 'noButtons':this.noButtons, 'unblock':this.unblock,'center':(!this.unblock)};
            	ig.game.spawnEntity(EntityPopupEndLevel, ig.game.screen.x, ig.game.screen.y, settings);
				if(currentLevel.toString().split("_")[1].indexOf('s') >= 0){ //nivel secreto completado
					var yaCompletado=false;
					var aLSC=lStorage.get('secretLevelComplet').split(',');
					var lengthLSC = aLSC.length;
					for (i=0; i<lengthLSC;i++) {	
						if(i>0)
							if(aLSC[i]==currentLevel)
								yaCompletado=true;
					}
					if(!yaCompletado)
						lStorage.set('secretLevelComplet',lStorage.get('secretLevelComplet')+','+currentLevel);
				}
			}
		},
    }); 
});