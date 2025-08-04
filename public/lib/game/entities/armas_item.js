ig.module(
    'game.entities.armas_item'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityArmas_item = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/img/armasItems.png',36 , 36 ),
        size: {x : 36 , y : 36 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:0,
		item:null,		
		weapon:null,
		key:null,
		img:null,
		anima:false,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
            this.addAnim( 'nada', 9999, [0] );
			this.addAnim( 'fire', 0.1, [1,2] );
			this.addAnim( 'ice', 0.1, [3,4] );
			this.addAnim( 'dobleJump', 9999, [5] );
			this.addAnim( 'swim', 0.1, [6,7] );
			this.addAnim( 'fly', 0.1, [10,11] );
			this.addAnim( 'invul', 0.1, [12,13] );
			this.addAnim( 'axe', 0.1, [14,15] );
			this.addAnim( 'iman', 0.1, [16,17] );
			this.addAnim( 'pico', 0.1, [25,26] );
			this.addAnim( 'key_1', 0.1, [19,20] );
			this.addAnim( 'key_2', 0.1, [21,22] );
			this.addAnim( 'key_3', 0.1, [23,24] );
			this.currentAnim = this.anims.nada;
			switch(this.item){
				case 'dobleJump':
					this.currentAnim = this.anims.dobleJump;
					break;
				case 'snorkel':
					this.currentAnim = this.anims.swim;
					break;
				case 'fly':
					this.currentAnim = this.anims.fly;
					break;
				case 'invul':
					this.currentAnim = this.anims.invul;
					break;
				case 'iman':
					this.currentAnim = this.anims.iman;
					break;	
			}
			switch(this.weapon){
				case 'fire':
					this.currentAnim = this.anims.fire;
					break;
				case 'ice':
					this.currentAnim = this.anims.ice;
					break;
				case 'axe':
					this.currentAnim = this.anims.axe;
					break;
				case 'pico':
					this.currentAnim = this.anims.pico;
					break;			
			}
			if(this.key!=null){
				if(!ig.global.wm) { 
					switch(this.key.split('_')[0]){
						case "1":
							this.currentAnim = this.anims.key_1;
							break;
						case "2":
							this.currentAnim = this.anims.key_2;
							break;
						case "3":
							this.currentAnim = this.anims.key_3;
							break;
						default:
					}
					var aKeys=lStorage.get('keys').split(',');
					varLengthKeys = aKeys.length
					for (k=0; k<varLengthKeys;k++){	
						if(k>0)
							if(aKeys[k]==this.key||aKeys[k]==this.key+'_used')
								this.kill();
					}
				}
				else{
					this._wmDrawBox=true;
					this._wmBoxColor='yellow';
				}
			}
        },
		check: function(other){
			sounds[13].play();
			if(other==ig.game.player){
				if(other.barraLlena<100)
					other.barraLlena=100;
				if(this.weapon!=null){
					lStorage.set('arma',this.weapon);
					other.arma=this.weapon;
					this.kill();
				}
				if(this.item!=null){
					if(other.items[this.item]){
						lStorage.set('pu_'+this.item,lStorage.get('pu_'+this.item)+1);//si ya está activo lo sumo al inventario
						this.anima=true;
						this.gravityFactor=0;
						this.collides = ig.Entity.COLLIDES.NEVER;
						this.checkAgainst =ig.Entity.TYPE.NONE;
					}
					else{
						other.items[this.item]=true; // sino, lo activo
						this.kill();
					}
					if(this.item=='invul')
						sounds[12].play();
				}
				if(this.key!=null){
					lStorage.set('keys',lStorage.get('keys')+','+(this.key));
					this.kill();
					 // fin del nivel, igual que en el metodo check de la entidad fin
					ig.game.player.accelGround=0;
					sounds[3].play();
					ig.music.fadeOut(2);
					ig.game.pause=true;
					lStorage.set('posPierdeX',null); //reseteo posicion del jugador al default
					lStorage.set('posPierdeY',null);
					//if(this.newWorld!=null)//esto lo comente... no sabia por que estaba aca
					var settings={ 'noButtons':this.noButtons};
					ig.game.spawnEntity(EntityPopupEndLevel_key, ig.game.screen.x, ig.game.screen.y+100, settings);
					if(currentLevel.split("_")[1].indexOf('s') >= 0){ //nivel secreto completado
						var yaCompletado=false;
						var aLSC=lStorage.get('secretLevelComplet').split(',');
						var lengthLSC = aLSC.length;
						for (i=0; i<lengthLSC;i++) {	
							if(i>0){
								if(aLSC[i]==currentLevel)
									yaCompletado=true;
							}
						}
						if(!yaCompletado)lStorage.set('secretLevelComplet',lStorage.get('secretLevelComplet')+','+currentLevel);
					
					}
				}
			}
		},
		update: function() {
			this.parent();
			if(this.anima){
				var vel = 8;
				var cX=this.pos.x-ig.game.screen.x;
				var cY=this.pos.y-ig.game.screen.y;	
				
				var dif= (cX-cY)/100;
				
				//console.log('cX: '+cX+'\ncY: '+cY);
				//console.log(dif/100);
				
				if(dif>0){
					this.pos.x+=vel+dif*vel; 
					this.pos.y-=vel + 15;
				}
				else if(dif<0){
					this.pos.x+=vel; 
					this.pos.y-=vel-dif*vel + 15;
				}
				else{
					this.pos.x+=vel; 
					this.pos.y=-vel + 15;
				}	
				if(this.pos.y-ig.game.screen.y<20||this.pos.x-ig.game.screen.x<20)
					this.kill();
			}
		},
	}); 
});