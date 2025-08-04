ig.module(
    'game.entities.personajeMapa'
)
.requires(
    'impact.entity',
	'plugins.button',
	'game.entities.personajeBoteMapa'
)
.defines(function() {
 
    EntityPersonajeMapa = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.ACTIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet( 'media/img/personaje_mapa.png',50 , 46),
        size: {x : 30 , y : 40 },
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
            this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'leftright', 0.1, [0,1] );
			this.addAnim( 'down', 0.1, [2,3] );
			this.addAnim( 'up', 0.1, [4,5] );
			if(!ig.global.wm){
				var btn_level=ig.game.getEntitiesByType(EntityBtn_level_map); //pos del player en el nivel anterior al current level del storage
				var res1Pos=(lStorage.get('posBtnLevelMap_'+currentWorld)==lStorage.get('nivel'))?1:0; // variable que resta 1 posicion en el mapa si el nivel no se completo
				if(lStorage.get('posBtnLevelMap_'+currentWorld)==null)
					lStorage.set('posBtnLevelMap_'+currentWorld,0);
				var lengthBtn_level = btn_level.length;
				if(lStorage.get('posBtnLevelMap_'+currentWorld) == 0 && parseInt(currentWorld)>1){//Woody entrando en el bote cuando es la primera vez que entra en el mundo.
					ig.game.spawnEntity(EntityPersonajeBoteMapa,-20, this.pos.y+this.size.y-1);
					this.currentAnim.alpha = 0;
				}
				for(i=0;i<lengthBtn_level;i++){
					if(lStorage.get('posBtnLevelMap_'+currentWorld) != 0 && btn_level[i].o == 0 &&parseInt(currentWorld)>1) {//El bote de Woody estacionado
						ig.game.spawnEntity(EntityPersonajeBoteMapa,btn_level[i].pos.x, btn_level[i].pos.y+btn_level[i].size.y);
					}
					if(btn_level[i].level==lStorage.get('posBtnLevelMap_'+currentWorld)){
						this.pos.x=btn_level[i].pos.x;
						this.pos.y=btn_level[i].pos.y;						
					}
				}
				
			}
        },		
		ready: function(){  
			if((lStorage.get('nivel_1')=='1_1'&&currentWorld==1&&this.pos.x==36)||(lStorage.get('nivel_1')=='2_1'&&currentWorld==2&&this.pos.x==106)||(lStorage.get('nivel_1')=='3_1'&&currentWorld==3&&this.pos.x==112)||(lStorage.get('nivel_lw')=='lw_1'&&currentWorld=='lw'&&this.pos.y==-38)){   // esto es para que la primera vez camine solito hasta el nivel (que feeeo el hardckodeo)
				var btnLevel=ig.game.getEntitiesByType(EntityBtn_level_map);
				var lengthBtnLevel = btnLevel.length;			
				for(i=0;i<lengthBtnLevel;i++){					
					if(btnLevel[i].o==1){
						this.btnFinal=btnLevel[i].o;	
						btnLevel[i].iniciaMov();						
					}
				}								
			}
		},
		update: function() {
			this.parent();
			
			if(this.posX!=null || this.posY!=null){
				this.movimiento();	
			}else{
				this.currentAnim = this.anims.idle;
			}	
			var btnLevel=(!ig.global.wm)?ig.game.getEntitiesByType(EntityBtn_level_map):null;
			var lengthBtnLevel = btnLevel.length;
			if(this.o!=this.btnFinal&&this.vel.x==0&&this.vel.y==0){				
				for(i=0;i<lengthBtnLevel;i++){					
					if(btnLevel[i].o==this.btnFinal){
						btnLevel[i].iniciaMov();						
					}
				}								
			}
			else if(this.inicia&&this.o==this.btnFinal&&this.vel.x==0&&this.vel.y==0){				
				for(i=0;i<lengthBtnLevel;i++){					
					if(btnLevel[i].o==this.btnFinal){	
						currentLevel=btnLevel[i].level;							
					}
				}
				ig.game.screenFader = new ig.ScreenFader({ 
					fade: 'in', 
					speed: 2, 
					callback: function(){
						ig.system.setGame(MyGame);
					},
				});
				this.inicia=false;
			}	
		},
		movimiento: function(){		
				if(this.pos.y < this.posY+2&&this.pos.y > this.posY){
					this.pos.y = this.posY;
					this.vel.y=0;								
				}
				if(this.pos.x < this.posX+2&&this.pos.x > this.posX){
					this.pos.x = this.posX;
					this.vel.x=0;					
				}
				
				if(this.pos.y != this.posY+2){					
					if(this.pos.y > this.posY){
						this.movimientoUp();						
					}
					if(this.pos.y < this.posY){
						this.movimientoDown();
					}
				}
				if(this.pos.x != this.posX+2){					
					if(this.pos.x > this.posX){
						this.movimientoLeft();						
					}
					if(this.pos.x < this.posX){
						this.movimientoRight();
					}
				}
						
				
				if( this.vel.y < 0) {
					this.currentAnim = this.anims.up;
				}else if( this.vel.y > 0 ) {					
					this.currentAnim = this.anims.down;
				}else if( this.vel.x > 0 ) {
					this.currentAnim = this.anims.leftright;
					this.currentAnim.flip.x= false;
				}else if( this.vel.x < 0 ){
					this.currentAnim = this.anims.leftright;
					this.currentAnim.flip.x= true;
				}else{
					this.currentAnim = this.anims.idle;
					this.currentAnim.flip.x= false;
				}
		},
		movimientoLeft: function(){
			this.vel.x = -100;
			this.flip=true;
			this.currentAnim.flip.x= this.flip;
		},
		movimientoRight: function(){
			this.vel.x = 100;
			this.flip=false;
			this.currentAnim.flip.x= this.flip;
		},
		movimientoUp: function(){
			this.vel.y = -100;
		},
		movimientoDown: function(){
			this.vel.y = 100;
			
		},
    }); 
});