ig.module(
    'game.entities.personaje'
)
.requires(
    'impact.entity',
	'plugins.button',
	'game.entities.armas',
	'game.entities.popups.popupGameOver',
	'game.entities.dJump',
	'game.entities.capaInvul',
	'game.entities.capaInvul'
)
.defines(function() { 
    EntityPersonaje = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.ACTIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/personaje.png',62,64),
        flip: false,
        maxVel: {x: 1000, y: 1500},
		friction: {x: 800, y:0},
		accel:{ground:600,air:300},
		maxVelYNado:{x:150,y:500},
		maxVelYFueraAgua:{x:250,y:1500},
		jump: 550,
		masVel:0, //suma vel desde wm
		health:0,
		alfa:100,
		murio:false,
		gameOverB:false,
		delayMuere:100,
		posPierdeX:null,
		posPierdeY:null,
		zIndex:1,
		gravityFactor:1,
		gravedad:2,
		animacionMuerte:null,
		items:{'iman':null, 'snorkel':null, 'fly':null, 'invul':null},
		item:null,
		arma:null,
		key:null,
		dobleJump:true,
		dJump:false,
		torch:false	,
		bTorch:true,
		fly:false,
		sobreLava:false,
		oxigeno:null,
		oxigenTime:20,
		invulTime:10,
		imanTime:10,
		nvTime:10,
		barraLlena:{'iman':100, 'invul':100},
		grounded:false,
		who:'player',
		scroll:null,
		modo:null,
		baja:{x:null, y:null},
		slope:false,
		saleDeMontura:false,
		tipo:'player',
		velYNado:-100,
		gravedadBajoAgua:0.3,
		inWater:false,
		invulFire:false,
		animInvul:null,
		updateOffScreen:true,
		saiyajinMode:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			if(!ig.global.wm){
				if((lStorage.get('enable_cheat_1')||this.saiyajinMode)&&this.tipo=='player')
					this.animSheet=new ig.AnimationSheet('media/img/personaje_saiyan.png',62,64);
			}
			this.animacion();
			if(!ig.global.wm)
				this.animInvul = ig.game.spawnEntity(EntityCapaInvul,this.pos.x+this.size.x/2,this.pos.y+this.size.y-10);
            if(!ig.global.wm&&!this.saleDeMontura){
				this.posInit={x:this.pos.x,y:this.pos.y}; //posicion que se utiliza para resetear la pos del player en el game over
            	if(lStorage.get('posPierdeX')==null)lStorage.set('posPierdeX',this.pos.x);
            	if(lStorage.get('posPierdeY')==null)lStorage.set('posPierdeY',this.pos.y);
            	this.pos.x=lStorage.get('posPierdeX');
				this.pos.y=lStorage.get('posPierdeY');
				if(this.scroll!=null){
					if(this.pos.x < ig.system.width/2-this.size.x/2)
						ig.game.screen.x =0;
					else 
						ig.game.screen.x =this.pos.x-ig.system.width/2+this.size.x;
				}
			}
			this.gravityFactor=this.gravedad;
			this.fin=(!ig.global.wm&&!infinite)?ig.game.getEntitiesByType( EntityFin )[0]:0;
			this.oxigeno=0;				
			if(ig.global.wm)infinite=false;
			if(!ig.global.wm){
				this.health=lStorage.get('vidas');
				//arma activa del player. Si se desea cambiar el comportamiento y que el player pierda el arma al terminar el nivel, quitar lStorague('arma') delas entidades:personaje, popupInvent y armas_item.
				if(lStorage.get('arma')!=null && lStorage.get('arma')!='pico')
					this.arma=lStorage.get('arma');
			}
			this.frictionInit={x:this.friction.x, y:this.friction.y};
			this.accelInit={ground:this.accel.ground,air:this.accel.air};
			if(!ig.global.wm){
				if(lStorage.get('enable_cheat_1')){
					this.activarSaiyajinMode();
				}
			}
		},
		initPlayerPos: function(){
			this.killEntMap();
			if(random){
				ig.game.onRandom=true;
				ig.game.randomLevel = ig.game.getNewLevel();
			}
			else if(infinite){
				ig.game.onRandom=true;
				ig.game.infiniteLevel = ig.game.getNewLevel();
			}
			else{ 
				this.reloadEntMap();
			}
			ig.game.player=ig.game.getEntitiesByType( EntityPersonaje )[0];
			this.screenFader = new ig.ScreenFader({ fade: 'out', speed: 5 });
			ig.game.playPauseMusic();
			ig.game.scroleaX=true;
			ig.game.cameraPassage={scroleaX:false,drawBG:true};
		},
		killEntMap: function(){
			var ents = ig.game.entities;
			var lengthEnts = ents.length;
			for(var i = 0;i<lengthEnts;i++){
				if(ents[i].tipo!='boton')
					ents[i].kill();
			}
		},
		reloadEntMap: function(){
			var data=ig.global['LevelLevel_'+currentLevel];
			var lengthDataEntities = data.entities.length;
			for( var i = 0; i < lengthDataEntities; i++ ) {
				var ent = data.entities[i];
				ig.game.spawnEntity( ent.type, ent.x, ent.y, ent.settings );			
			}
			ig.game.sortEntities();
		},
		update: function() {
			if(!ig.game.pause){
				this.parent();
				this.movimiento();	
			}
			if(this.modo=='runner'&&this.currentAnim!=this.anims.transfSiyajin){ // modo runner
				this.movimientoDer();
			}
			if(this.alfa>0){
				this.currentAnim.alpha=0.5;
				this.alfa-=this.compensadorTick(1);
				this.collides= ig.Entity.COLLIDES.LITE;
			}
			else{
				this.currentAnim.alpha=1;
				if(!this.murio)
					this.collides= ig.Entity.COLLIDES.ACTIVE;
			}
			if((this.pos.y > ig.system.height+ig.game.difAlto&&this.delayMuere >1&&!this.murio)||(this.arrastra==null&&this.scroll!=null&&this.pos.x<ig.game.screen.x&&!ig.game.cameraPassage.b)){ // si se va de la pantalla o si esta en modo runner y se lo come la pantalla, muere!
				this.alfa=0;
				this.arma=null;
				this.animacionMuerte=2; 
				this.pierdeVida();
			}	
			if(this.arrastra=='true'&&this.scroll!=null&&this.pos.x-this.size.x<ig.game.screen.x&&this.currentAnim!=this.anims.transfSiyajin){
				this.movimientoDer();
			}
			if(random)
				this.fin=(!ig.global.wm&&!infinite)?ig.game.getEntitiesByType(EntityFin)[0]:0;
		},
		draw: function() {
	        this.parent();
			if(!this.saiyajinMode||this.tipo!='player'){
				if(this.items.invul!=null){
					this.animInvul.pos.x=this.pos.x-(this.animInvul.size.x/2-this.size.x/2);
					this.animInvul.pos.y=this.pos.y-(this.animInvul.size.y/2-this.size.y/2);
					this.animInvul.currentAnim = this.animInvul.anims.idle;
					this.animInvul.currentAnim.alpha=1;
				}
				else{
					if(this.animInvul!=null){
						this.animInvul.currentAnim = this.animInvul.anims.off;
						this.animInvul.currentAnim.alpha=0;
					}
				}
			}
			else{
				this.animInvul.currentAnim = this.animInvul.anims.off;
				this.animInvul.currentAnim.alpha=0;
			}
		},  
		handleMovementTrace: function( res ) {
			if(this.delayMuere <100){				
				this.pos.x += this.vel.x * ig.system.tick;
				this.pos.y += this.vel.y * ig.system.tick;
			}
			else{
				//var oldPosY = this.pos.y;
				this.parent(res);
				if( res.collision.slope&&res.collision.slope.ny!=-1){// player en pendiente	
					this.friction.x=0;
					var angle=Math.round(res.collision.slope.nx * 100) / 100;	
				 	this.slope=true;					 		 	
				 	this.currentAnim.angle = angle;
				 	this.accel.ground=1600;
					switch (angle) {
						case -0.71:
							//console.log('-071');
							this.offset.y=-10;
							break; 
						case -0.45:
							//console.log('-045');
							this.offset.y=-10;
							break; 
						case -0.32:
							//console.log('-032');
							this.offset.y=-10;
							break;
						default: 
							this.offset.y=0;
					}
		        }else{
		        	this.currentAnim.angle = 0;
		        	this.slope=false;	
		        	this.accel.ground=this.accelInit.ground;
					this.offset.y=0;
					this.friction.x=this.frictionInit.x;
		        }
				if(this.arrastra=='true'&&this.scroll!=null&&this.pos.x<ig.game.screen.x&&res.collision.x){
					this.animacionMuerte=2; 
					this.pierdeVida();
				}		
			}					
		},
		pierdeVida: function(){
			if(this.alfa<1.5){		//si no esta en alfa
				if(!this.murio)
					sounds[5].play();
				this.collides= ig.Entity.COLLIDES.NEVER;
				if((this.arma==null&&!this.murio)||(this.arma!=null&&this.oxigeno>100&&!this.murio)){ //muere sin arma o se queda sin oxigeno con arma
					this.vel.y = -this.jump;				
					this.gravityFactor=this.gravedad;
					lStorage.set('vidas',lStorage.get('vidas')-1);
					ig.game.pierdeVidasCont++;
					this.murio=true;
					ig.music.fadeOut(1);
					ig.game.scroleaX=false;	
					if(lStorage.get('arma')!=null)
						lStorage.set('arma',null);
				}
				if(this.arma!=null&&this.oxigeno<=100){
					this.arma=null;
					if(lStorage.get('arma')!=null)lStorage.set('arma',null);
					if(ig.game.animFire)ig.game.animFire=false;
					this.alfa=100;
				}						
			}
		},
		movimiento: function(){
			accel = this.standing||this.grounded ? this.accel.ground : this.accel.air;	
			if(this.dobleJump&&this.standing||this.dobleJump&&this.grounded)
				this.dJump=false; //desactiva el doblesalto cuando pisa el terreno o los tiles
			if(ig.game.getMapByName('water').getTile(this.pos.x+this.size.x/2, this.pos.y+this.size.y/2)==1){//si toca la lava se quema
				this.arma=null;
				this.animacionMuerte=1;
				this.pierdeVida();
			}
			//nadar
			if(this.oxigeno>100&&this.items.snorkel==null){ //si se queda sin oxigeno
				this.animacionMuerte=2;
				this.pierdeVida();
			}
			if(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)){	//abajo del agua	
				if(!this.inWater){
					sounds[15].play();
					this.vel.y = 10/100*this.vel.y;//10% de la velocidad con la que entra al agua
				}
				this.inWater=true;
				this.gravityFactor=this.gravedadBajoAgua;
				this.maxVel.y=this.maxVelYNado.y;
				this.maxVel.x=this.maxVelYNado.x+this.masVel;//velocidad en el agua
				if(this.items.snorkel==null&&!this.murio){ // si no tiene el item de nadar, resta oxígeno
					this.oxigeno+=this.oxigenTime/60;
				}
			}
			else if(!(this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))&&this.gravityFactor!=0){ //sale del agua
				//if(this.inWater)sounds[15].play();
				this.inWater=false;
				this.gravityFactor=this.gravedad;
				this.maxVel.y=this.maxVelYFueraAgua.y;
				this.maxVel.x=this.maxVelYFueraAgua.x+this.masVel; //velocidad fuera del agua
				if(this.oxigeno>0&&!this.murio){this.oxigeno-=3;}
			}//nadar hasta aca			
			if(this.items.iman!=null||this.items.fly!=null||this.items.invul!=null||this.items.snorkel!=null){
				this.activeItems();
				this.item=true
			} // activa items
			else 
				this.item=false;
			
			if(!this.murio&&this.currentAnim!=this.anims.transfSiyajin){ //si no murio
				if(ig.input.state('left'))
					this.movimientoIzq();
				else if(ig.input.state('right'))
					this.movimientoDer();
				else
					this.accel.x = 0;
				if(ig.input.pressed('jump')) { // salta
					ig.game.btnUp1time=false;
					this.movimientoUp();
				}	
				if(ig.input.released('jump')) { // deja de apretar la tecla salto salta
					ig.game.btnUp1time=true;
				}	
				if(ig.input.pressed('down')&&ig.game.passageEnabled/*&&btn_up.currentAnim.flip.y*/) { // baja
					this.movimientoDown();
				}
				if(ig.input.pressed('fire')&&(this.arma!=null||this.tipo!='player')) { 
					this.dispara();
					ig.game.animFire=true;
				}
				if(ig.ua.mobile){
					if(this.arma!=null&&this.arma!='pico'&&this.tipo=='player') { //activo o desactivo el boton de disparar
						btn_fire.state='active';
						if(this.arma=='ice'){
							btn_fire.addAnim( 'idle', 1, [0] );
							btn_fire.addAnim( 'active', 1, [1] );
						}else if(this.arma=='axe'){
							btn_fire.addAnim( 'idle', 1, [3] );
							btn_fire.addAnim( 'active', 1, [4] );
						}else if(this.arma=='fire'){
							btn_fire.addAnim( 'idle', 1, [5] );
							btn_fire.addAnim( 'active', 1, [6] );
						}
					}
					else if(this.arma==null&&this.tipo=='player'){
						btn_fire.state='deactive';
					}
				}
				this.selectSprite();
			}
			else if(this.murio){
				this.delayMuere-=1;
				this.collides= ig.Entity.COLLIDES.NEVER;
				if(this.animacionMuerte == 1)
					this.animMuereFuego();
				else if(this.animacionMuerte == 2)
					this.animMuereAlas();				
			}
			else if(this.currentAnim==this.anims.transfSiyajin){
				this.selectSprite();
			}
		},
		movimientoIzq: function(){
			//if(this.standing||this.grounded)sounds[11].play();
			if(this.pos.x>this.size.x){ 				
				this.accel.x = -accel;			
				this.flip=true;
				this.currentAnim.flip.x= this.flip;
			}else{
				this.accel.x = 0;
			}
			
		},
		movimientoDer: function(){
			this.accel.x = accel;
			this.flip=false;
			this.currentAnim.flip.x= this.flip;
		},
		movimientoUp: function(){
			if(this.dJump||this.items.fly!=null){ //doble salto o volar
				this.vel.y = -this.jump;				
				this.gravityFactor=this.gravedad;				
			}
			if(this.dJump && this.items.fly==null){
				this.dJump=false;
				sounds[8].play();
				ig.game.spawnEntity(EntityDJump, ig.game.player.pos.x+ig.game.player.size.x/2, ig.game.player.pos.y);
				ig.game.sortEntitiesDeferred();
			}
			if(this.getTileAgua(this.pos.x+2, this.pos.y)){ //nada
				this.vel.y = this.velYNado;		
			}else if(this.getTileAgua(this.pos.x+2, this.pos.y+(this.size.y-5))){ //sale del agua
				this.vel.y = -this.jump;	
				this.gravityFactor=this.gravedad;	
			}
			if((this.standing || this.grounded && !this.fin.fin)&&!this.inWater) {//si no esta saltando, no esta debajo del agua y si no llego al fin de nivel
				this.vel.y = -this.jump;				
				this.gravityFactor=this.gravedad;
				if(this.dobleJump)this.dJump=true;
				sounds[8].play();
			}	
			if(this.grounded)this.grounded=false;				
		},
		movimientoDown: function(){	
			ig.game.pause=true;
			ig.game.screenFader = new ig.ScreenFader({ 
				fade: 'in', 
				speed:2, 
				delayBefore:0,
				player:ig.game.player,
				callback: function (){
					this.player.pos={x:this.player.baja.x, y:this.player.baja.y};
					ig.game.pause=false;
					ig.game.screenFader = new ig.ScreenFader({ 
						fade: 'out', 
						speed: 1, 
						delayBefore:0,
					});
					
				}
			});						
		},
		movimientoDown2: function(){	
			ig.game.pause=true;
			ig.game.player.pos={x:ig.game.player.baja.x, y:ig.game.player.baja.y};
			ig.game.screenFader = new ig.ScreenFader({ 
				fade: 'in', 
				speed:2, 
				delayBefore:0,
				player:ig.game.player,
				callback: function (){
					ig.game.pause=false;
					ig.game.screenFader = new ig.ScreenFader({ 
						fade: 'out', 
						speed: 1, 
						delayBefore:0,
						/*callback: function (){
							ig.game.player.pos={x:ig.game.player.baja.x, y:ig.game.player.baja.y};
						},*/
					});
					
				}
			});						
		},
		activeItems: function(){
			if(this.saiyajinMode){
				this.items.invul=100;
				this.items.iman=100;
			}
			if(this.items.iman!=null){
				if(!this.saiyajinMode)
					this.barraLlena.iman-=this.compensadorTick(this.imanTime/60);					
			}
			if(this.items.invul!=null){
				if(!this.saiyajinMode)
					this.barraLlena.invul-=this.compensadorTick(this.invulTime/60);
				accel = this.standing ? 800 : this.accel.air;
				this.maxVel.x=400+this.masVel;
			}
			if(this.items.fly!=null){ // cambio de gravedad si vuela
				this.jump=220;
				this.gravedad=0.5;
			}
			if(this.items.snorkel!=null){ 
				//snorkel activado
			}
			if(this.barraLlena.iman<0){this.items.iman=null;this.barraLlena.iman=100;}
			if(this.barraLlena.invul<0){this.items.invul=null;this.barraLlena.invul=100;}
		},
		deactiveItems: function(){
			this.item=null;
			this.barraLlena=100;
		},
		deactiveFly: function(){
			this.gravedad=2;
			this.jump=550;
		},
		animacion: function(){
			this.offset={x:10,y:0};
			this.size={x:45,y:64};
			if(this.saiyajinMode){
				this.addAnim( 'idle', 0.1, [0,1,2] );
				this.addAnim( 'run', 0.1, [3,4,5,6] );
				this.addAnim( 'flyRun', 0.1, [3,4,5,6] );
				this.addAnim( 'flyIdle', 0.1, [0,1,2] );
				this.addAnim( 'snorkel1', 0.4, [12,13] );
				this.addAnim( 'snorkel2', 0.3, [12,13] );
				this.addAnim( 'snorkeJump1', 1, [12] );
				this.addAnim( 'snorkeJump2', 1, [13] );
				this.addAnim( 'snorkeIdle', 0.1, [0,1,2] );				
				this.addAnim( 'die', 0.1, [35,35,36,35,36,9],true );
				this.addAnim( 'die2', 0.1, [35,35,36,35,36,9],true );
				this.addAnim( 'transfSiyajin', 0.1, [40,41,42,41,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,55] );
			}
			else{
				this.addAnim( 'idle', 9999, [0] );
				this.addAnim( 'run', 0.1, [1,2,3,4,5,6] );
				this.addAnim( 'flyRun', 0.1, [15,16,17,18,19,20] );
				this.addAnim( 'flyIdle', 9999, [14] );
				this.addAnim( 'snorkel1', 0.4, [26,27] );
				this.addAnim( 'snorkel2', 0.3, [26,27] );
				this.addAnim( 'snorkeJump1', 1, [26] );
				this.addAnim( 'snorkeJump2', 1, [27] );
				this.addAnim( 'snorkeIdle', 9999, [25] );
				this.addAnim( 'die', 1, [9] );
				this.addAnim( 'die2', 1, [9] );
			}
			this.addAnim( 'jump1', 1, [7] );
			this.addAnim( 'jump2', 1, [8] );
			this.addAnim( 'dieFuego', 0.2, [10,11] );
			this.addAnim( 'swim1', 0.4, [12,13] );
			this.addAnim( 'swim2', 0.3, [12,13] );
			this.addAnim( 'fly1', 0.1, [21,22] );
			this.addAnim( 'fly2', 0.1, [23,24] );			
			this.addAnim( 'snorkeRun', 0.1, [29,30,31,32,33,34] );
			this.addAnim( 'fire', 0.1, [37] );
			this.addAnim( 'fireFly', 0.1, [38] );
			this.addAnim( 'fireSnorkel', 0.1, [39] );
		},
		activarSaiyajinMode: function(){
			if(!this.saiyajinMode){
				if(this.tipo=='player'){
					this.animSheet=new ig.AnimationSheet('media/img/personaje_saiyan.png',62,64);
					this.saiyajinMode=true;
					this.animacion();
					this.currentAnim=this.anims.transfSiyajin.rewind();
				}
				else
					this.saiyajinMode=true;
			}
			if(this.tipo=='player'){
				this.items.fly=true;
				this.items.snorkel=true;
				this.items.invul=100;
				this.items.iman=100;
				this.barraLlena.iman=100;
				this.barraLlena.invul=100;
			}
		},
		selectSprite: function(){
			if(this.currentAnim==this.anims.transfSiyajin&&this.currentAnim.loopCount<=0){
			}
			else{
				if(ig.game.animFire){// disparo
					if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))
						this.currentAnim = this.anims.fireSnorkel;
					else if(this.items.fly!=null)
						this.currentAnim = this.anims.fireFly;
					else 
						this.currentAnim = this.anims.fire;
					if(this.currentAnim.loopCount>=1)
						ig.game.animFire=false;
				}
				else if( this.items.snorkel!=null&& this.vel.y < 0 &&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)&&!this.grounded)//nadar snorkel1						
					this.currentAnim = this.anims.snorkel2;
				else if( this.items.snorkel!=null&&this.vel.y > 0 &&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)&&!this.grounded)//nadar snorkel2			
					this.currentAnim = this.anims.snorkel1;
				else if( this.vel.y < 0 &&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)&&!this.grounded)//nadar 2
					this.currentAnim = this.anims.swim2;
				else if( this.vel.y > 0 &&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2)&&!this.grounded)//nadar 1
					this.currentAnim = this.anims.swim1;
				else if( this.vel.y < 0&&!this.grounded&&!this.slope){// jump1
					if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y))
						this.currentAnim = this.anims.snorkeJump1;
					else if(this.items.fly!=null)
						this.currentAnim = this.anims.fly1;
					else 
						this.currentAnim = this.anims.jump1;
				}
				else if( this.vel.y > 0 &&!this.grounded&&!this.slope){// jump2
					if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y))
						this.currentAnim = this.anims.snorkeJump2;
					else if(this.items.fly!=null)
						this.currentAnim = this.anims.fly2;
					else 
						this.currentAnim = this.anims.jump2;
				}
				else if( this.vel.x != 0 ){//run
					if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))
						this.currentAnim = this.anims.snorkeRun;
					else if(this.items.fly!=null)
						this.currentAnim = this.anims.flyRun;
					else 
						this.currentAnim = this.anims.run;
				}
				else if(this.vel.y==0||this.grounded){//idle				
					if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))
						this.currentAnim = this.anims.snorkeIdle;
					else if(this.items.fly!=null)
						this.currentAnim = this.anims.flyIdle;
					else 
						this.currentAnim = this.anims.idle;
				}
			}
			this.currentAnim.flip.x= this.flip;
		},
		dispara: function(){
			var settings = {'direc':0, 'arma':null};
			var posIniY=10;
			var veloc=500;
			if(this.items.snorkel!=null&&this.getTileAgua(this.pos.x+2, this.pos.y+this.size.y/2+2))
				this.currentAnim = this.anims.fireSnorkel.rewind();
			else if(this.items.fly!=null)
				this.currentAnim = this.anims.fireFly.rewind();
			else 
				this.currentAnim = this.anims.fire.rewind();
			this.currentAnim.flip.x= this.flip;
			if(this.arma=='fire')
				settings.arma='fire';
			else if(this.arma=='ice')
				settings.arma='ice';
			else if(this.arma=='axe'){
				settings.arma='axe';
				posIniY=15;
			}
			if(this.currentAnim.flip.x)
				settings.direc=-veloc;
			else 
				settings.direc=veloc;
			ig.game.spawnEntity(EntityArmas, this.pos.x, this.pos.y+posIniY, settings);
			sounds[10].play();
		},
		animMuereAlas: function(){
			this.vel.x=0;
			if ( this.delayMuere <1.5){
				if(lStorage.get('vidas') < 1&&!this.gameOverB){this.gameOver();}
				else if(lStorage.get('vidas') >0){
					this.initPlayerPos();
					ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });
				}
			}
			if ( this.vel.y > 0){
				this.currentAnim.flip.y = true;
				if(this.currentAnim != this.anims.die2)
					this.currentAnim = this.anims.die2;
				this.currentAnim.alpha=1;
			}
			else{
				if(this.currentAnim != this.anims.die)
					this.currentAnim = this.anims.die;
				this.currentAnim.angle = 0;
			}
		},
		animMuereFuego: function(){
			this.vel.x=0;
			this.currentAnim.alpha=1;
			this.currentAnim.angle = 0;
			this.currentAnim = this.anims.dieFuego;
			this.currentAnim.flip.x= this.flip;
			if ( this.delayMuere <1.5){				
				this.pos.x=this.posPierdeX;
				this.pos.y=this.posPierdeY;
				if(lStorage.get('vidas') < 1&&!this.gameOverB)this.gameOver();
				else if(lStorage.get('vidas') >0){
					this.initPlayerPos();
					ig.game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 1 });					
				}
			}
			
		},
		monta: function(montura){
			sounds[14].play();
			if(montura==1)montura=EntityMontura1;
			else if(montura==2)montura=EntityMontura2;
			else if(montura==3)montura=EntityMontura3;
			else if(montura==4)montura=EntityMontura4;
			else if(montura==6)montura=EntityMontura6;
			var enableMont = false;
			var posMont={x:this.pos.x,y:this.pos.y-30};
			var cant_steps=0;
			while (!enableMont) {
				if((!this.getTileCollision(posMont.x,71,posMont.y,72))||(cant_steps>10)){
					ig.game.spawnEntity(montura, posMont.x, posMont.y, {item:this.item,items:this.items,arma:this.arma,barraLlena:this.barraLlena,saleDeMontura:true,dobleJump:this.dobleJump,scroll:this.scroll,modo:this.modo,arrastra:this.arrastra,masVel:this.masVel,animInvul:this.animInvul,saiyajinMode:this.saiyajinMode});
					ig.game.player=ig.game.getEntitiesByType( EntityPersonaje )[1];
					this.kill();
					ig.game.player.movimientoUp();
					enableMont=true;
				}
				else{
					posMont.x=posMont.x-10;
					cant_steps++;
				}
			}
		},
		gameOver: function(){
			this.gameOverB=true;
			lStorage.set('posPierdeX',null); //reseteo posicion del jugador al default
            lStorage.set('posPierdeY',null);
            sounds[6].play();
			ig.game.spawnEntity(EntityPopupGameOver, ig.game.screen.x, ig.game.screen.y);
			this.desbloqueCartelesAut();
		},		
		desbloqueCartelesAut: function(){
			for(var i=0, len=localStorage.length; i<len; i++) {
					var key = localStorage.key(i);
					var value = localStorage[key];
					if(key!=null&&key.substring(0,4)=='cart'&&value==1){lStorage.remove(key);this.desbloqueCartelesAut();}								
			}
		},
		irMenu: function(){
			ig.game.screenFader = new ig.ScreenFader({ 
				fade: 'in', 
				speed: 2, 
				callback: function (){
					ig.system.setGame(Levels);lStorage.set('vidas',3)
				}
			});
			
		},
		getTileAgua: function(posX, posY){
			if(!ig.global.wm){
				for(i=3;i<=16;i++){
					if(ig.game.getMapByName('water').getTile(posX, posY)==i){
						return true;
					}
				}
				return false;
			}
		},
		getTileCollision: function(posX,sizeX,posY,sizeY){
			if(!ig.global.wm){
				if(ig.game.getMapByName('collision').getTile(posX, posY)||ig.game.getMapByName('collision').getTile(posX+sizeX, posY+sizeY)){
					return true;
				}
				return false;
			}
		},
		collideWith: function(other, axis){
			this.parent(other, axis);
			if(this.saiyajinMode&&axis=='x'&&this.tipo=='player'&&(other instanceof EntityTile1 || other instanceof EntityTile2))
				other.rompeTile();
		},
		kill: function(){
			if(this.animInvul!=null)
				this.animInvul.kill();
			this.parent();
		},
    }); 
});