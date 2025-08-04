ig.module(
    'game.entities.btn_level_map'
)
.requires(
    'impact.entity',
	'game.entities.personajeMapa',
	'game.entities.destello'
)
.defines(function() {
 
    EntityBtn_level_map = ig.Entity.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/btn_level_map.png',50 , 50 ),
        size: {x : 60 , y : 60 },
        offset: {x : -5, y : -5}, 
        collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A, 
		vel:{x:0, y:0},
		gravityFactor:0,
		posX:0,
		posY:0,
		font: new ig.Font( 'media/04b03.font.png'),
		textPos: { x: 20, y: 17 },
		level:null,
		alert:null,
		zIndex:-10,
		prevSecret:0,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x-10, y-10, settings);	
			//if(typeof this.level == 'string')
			//	this.animSheet= new ig.AnimationSheet('media/img/btn_level_map_s.png',50 , 50 );
			
			this.addAnim( 'idle', 1, [0] );
      		this.addAnim( 'blocked', 1, [1] );
      		this.addAnim( 'deactive', 1, [2] );
			this.addAnim( 'active', 1, [3] );
			
			if(!ig.global.wm) { // no sale en weltmeister				
				if(currentWorld=="1"||currentWorld=="2"||currentWorld=="3"){
					if(this.level == 0 || this.level==null || parseInt(lStorage.get('nivel_1').toString().split("_")[0]) < parseInt(this.level.toString().split("_")[0]) || (parseInt(lStorage.get('nivel_1').toString().split("_")[0]) <= parseInt(this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_1').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1]))){
						this.currentAnim= this.anims.deactive;
						this.state='deactive';
					}
					else if(lStorage.get('nivel_1') === this.level){
						this.currentAnim=this.anims.active;
						this.state='active';
					}
					if(this.level != 0 && this.level!=null && (parseInt(lStorage.get('nivel_1').toString().split("_")[0]) < parseInt(this.level.toString().split("_")[0]) || (parseInt(lStorage.get('nivel_1').toString().split("_")[0]) <= parseInt(this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_1').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1])))){
						this.currentAnim = this.anims.blocked;
					}
				}
				else if(currentWorld=="lw"){
					if(this.level == 0 || this.level==null || (lStorage.get('nivel_lw').toString().split("_")[0]) < (this.level.toString().split("_")[0]) || ((lStorage.get('nivel_lw').toString().split("_")[0]) <= (this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_lw').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1]))){
						this.currentAnim= this.anims.deactive;
						this.state='deactive';
					}
					else if(lStorage.get('nivel_lw') === this.level){
						this.currentAnim=this.anims.active;
						this.state='active';
					}
					if(this.level != 0 && this.level!=null && ((lStorage.get('nivel_lw').toString().split("_")[0]) < (this.level.toString().split("_")[0]) || ((lStorage.get('nivel_lw').toString().split("_")[0]) <= (this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_lw').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1])))){
						this.currentAnim = this.anims.blocked;
					}
				}
				else if(currentWorld=="bw"){
					if(this.level == 0 || this.level==null || parseInt(lStorage.get('nivel_bw').toString().split("_")[0]) < parseInt(this.level.toString().split("_")[0]) || (parseInt(lStorage.get('nivel_bw').toString().split("_")[0]) <= parseInt(this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_bw').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1]))){
						this.currentAnim= this.anims.deactive;
						this.state='deactive';
					}
					else if(lStorage.get('nivel_bw') === this.level){
						this.currentAnim=this.anims.active;
						this.state='active';
					}
					if(this.level != 0 && this.level!=null && (parseInt(lStorage.get('nivel_bw').toString().split("_")[0]) < parseInt(this.level.toString().split("_")[0]) || (parseInt(lStorage.get('nivel_bw').toString().split("_")[0]) <= parseInt(this.level.toString().split("_")[0]) && parseInt(lStorage.get('nivel_bw').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1])))){
						this.currentAnim = this.anims.blocked;
					}
				}
				if(lStorage.get('nivelesSkipeados')!=''){ // lo dejo activo pero sin el icono de completado si el nivel fue skipeado
					var aNivelesSkipeados =  lStorage.get('nivelesSkipeados').split(',');
					var aNivelesSkipeadosLength= aNivelesSkipeados.length;
					for(i=1;i<aNivelesSkipeadosLength;i++){
						if(aNivelesSkipeados[i]==this.level)this.currentAnim=this.anims.active;						
					}
				}
				if(this.level!=null && this.level != 0){
					if(this.level.toString().split("_")[1].indexOf('s') >= 0){ //nivel secreto
						this.completado=false;
						this.currentAnim= this.anims.blocked;
						this.state='deactive';
						var aKeys=lStorage.get('keys').split(',');
						var lengthKeys = aKeys.length;
						var aSLC=lStorage.get('secretLevelComplet').split(',');
						var lengthSLC = aSLC.length;
						for (s=0; s<lengthSLC;s++){	
							if(s>0){
								if(aSLC[s]==this.level && (parseInt(this.prevSecret.toString().split("_")[1]) < parseInt(lStorage.get('nivel_1').toString().split('_')[1]) || parseInt(lStorage.get('nivel_1').toString().split("_")[0]) > parseInt(this.level.toString().split("_")[0]))){
									this.state='active';
									this.currentAnim= this.anims.idle; // botón en estado idle si ya fue completado
									this.completado=true;
								}
							}
						}
						for (k=0; k<lengthKeys;k++) {	
							if(aKeys[k].split('_')[0]==this.key){
								if(!this.completado ){//activo el botón si tiene la llave en el locastorage con el mismo id
									this.state='active';
									this.currentAnim= this.anims.active;
									var settings={delay:4,autoKill:6};
									ig.game.spawnEntity(EntityDestello, this.pos.x-10, this.pos.y-16,settings);
								}
								if(this.completado){
									if(aKeys[k].split('_')[3]!='used'){
										//console.log('rn')
										var str = lStorage.get('keys');
										var res = str.replace(aKeys[k], aKeys[k]+'_used');
										lStorage.set('keys',res);
									}
								}
								if(!(parseInt(this.prevSecret.toString().split("_")[1]) < parseInt(lStorage.get('nivel_1').toString().split('_')[1]) ||parseInt(lStorage.get('nivel_1').toString().split("_")[0]) > parseInt(this.level.toString().split("_")[0]))){
									this.state='deactive';
								}
							}
						}
					}
				}
			}
			else if(ig.global.wm&&this.level==null){
				this._wmDrawBox=true;
				this._wmBoxColor='#fff';
			}
			
        },
		iniciaMov: function(){
				var player=ig.game.getEntitiesByType(EntityPersonajeMapa)[0];
				var btn_level=ig.game.getEntitiesByType(EntityBtn_level_map);			
				
				if (player.currentAnim.alpha > 0){//Si ya termino la animacion de personajeBoteMapa
				//console.log(player.o%1==0);
				
				if(!(player.btnFinal%1==0)&&parseInt(player.o.toFixed())==parseInt(player.btnFinal.toFixed())){
					player.dif=0.1;				
				}else if(player.o%1==0){
					player.dif=1;					
				}else{player.dif=0.1;}
				var lengthBtn_level = btn_level.length;
				if(player.o%1!=0&&player.btnFinal>player.o&&parseInt(player.o.toFixed())!=parseInt(player.btnFinal.toFixed())){
					for(i=0;i<lengthBtn_level;i++){
						if(btn_level[i].o==(player.o-player.dif).toFixed(1)){
							player.posX=btn_level[i].pos.x;
							player.posY=btn_level[i].pos.y;														
						}						
					}
					
				}else if(player.o>this.o){
					for(i=0;i<lengthBtn_level;i++){
						if(btn_level[i].o==(player.o-player.dif).toFixed(1)){
							player.posX=btn_level[i].pos.x;
							player.posY=btn_level[i].pos.y;							
						}
					}
					
				}else if(player.o<this.o){				
					for(i=0;i<lengthBtn_level;i++){
						if(btn_level[i].o==(player.o+player.dif).toFixed(1)){
							player.posX=btn_level[i].pos.x;
							player.posY=btn_level[i].pos.y;
						}
					}
					
				}else{
					player.posX=this.pos.x;
					player.posY=this.pos.y;
				}
			}		
				//console.log((player.o+player.dif).toFixed(1));			
		},
		check: function(other){
			other.o=this.o;	
		},
		draw: function(){
			this.parent();
			var player=(!ig.global.wm)?ig.game.getEntitiesByType(EntityPersonajeMapa)[0]:null;
			for ( var t in ig.input.touches ) {//fix multi-touch android browser
				var touch = ig.input.touches[t];
				if(touch.x >= this.pos.x && touch.x <= this.pos.x+this.size.x && touch.y >= this.pos.y && touch.y <= this.pos.y+this.size.y&&!ig.game.pause){
					if(player.vel.x==0&&player.vel.y==0&&this.state != 'deactive'&&this.level!=0){
						player.btnFinal=this.o;
						this.iniciaMov();
					}else if(this.state == 'deactive'&&this.alert!=null&&this.currentAnim!= this.anims.active){
						var settings={delay:0,bgImg:this.alert,sizeX:780,sizeY:480,closeOnTap:true};
						ig.game.spawnEntity(EntityPopupAlert, ig.game.screen.x, ig.game.screen.y,settings);
					}
				}
			}
		}, 
    }); 
});