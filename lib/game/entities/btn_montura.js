ig.module(
    'game.entities.btn_montura'
)
.requires(
    'impact.entity','plugins.button'
)
.defines(function() {
 
    EntityBtn_montura = Button.extend({	
		//Pre-cargamos los sprites
        size: {x : 50 , y : 50 },
		gravityFactor:0,
		zIndex:-10,
		noWater:false,
		_wmIgnore:true,
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [1] );
			this.addAnim( 'active', 1, [2] );
			this.addAnim( 'deactive', 1, [4] );
			this.addAnim( 'noUse', 1, [0] );
			this.addAnim( 'equiped', 1, [3] );
        },
		update: function(){
			this.parent();
		},
		update_ex: function(){
			if(lStorage.get('montura'+this.montura)=='off'){
				this.addAnim( 'idle', 1, [0] );
				this.setState( 'idle' );
			}
			else{
				this.addAnim( 'idle', 1, [1] );
				this.setState( 'idle' );
				if((this.noWater&&ig.game.player.currentAnim.alpha==1)||ig.game.player instanceof EntityMontura5){ // si no es acuatico, lo desactivo en el agua
					if(ig.game.player.getTileAgua(ig.game.player.pos.x+2, ig.game.player.pos.y+ig.game.player.size.y/2+2)||ig.game.player instanceof EntityMontura5){
						this.currentAnim = this.anims.noUse;
						this.state='deactive';
						this.equiped=false;
					}
					else if(ig.game.getMapByName('main').getTile(ig.game.player.pos.x+2, ig.game.player.pos.y)!=16){
						if(this.equiped){
							this.currentAnim = this.anims.equiped;
						}
						else{
							this.currentAnim = this.anims.idle;
							this.setState( 'idle' );
						}
					}
				}
				else{
					if(ig.game.player.currentAnim.alpha!=1){ // en transparencia del player no se puede usar
						this.currentAnim = this.anims.noUse;
						this.state='deactive';
					}
					else{
						if(this.equiped){
							this.currentAnim = this.anims.equiped;
						}
						else{
							this.currentAnim = this.anims.idle;
							this.setState( 'idle' );
						}
					}
				}
				if(typeof lStorage.get('montura'+this.montura) == 'number'){ //se desactiva por tiempo
					this.currentAnim = this.anims.deactive;
					this.state='deactive';
					if(ig.ua.mobile&&navigator.onLine&&fetchedRewardedVideo)
						this.pressedDeactive=this.monturaxVideo;
					else if(ig.ua.mobile&&navigator.onLine)
						Ads.fetchRewardedVideo();
					if(lStorage.get('montura'+this.montura)<new Date().valueOf()){ //vuelve a activarse
						lStorage.set('montura'+this.montura,'ok');	
						this.currentAnim = this.anims.idle;
						this.setState( 'idle' );
						this.pressedDeactive=function(){};
					}
				}
			}
		},
		draw: function(){
			this.parent();
			if(typeof lStorage.get('montura'+this.montura) == 'number'){ // timer regeneración
				this.currentAnim = this.anims.deactive;
				this.drawTimer();
			}
		},
		drawTimer:function (){
			var ms = lStorage.get('montura'+this.montura)-new Date().valueOf(),
			min = (ms/1000/60) << 0,
			sec = Math.round((ms/1000) % 60);
			sec =(sec<10)?'0'+sec:sec;
			var porcentaje = -ms*100/(60000*1),
			radianes = porcentaje * (Math.PI*2) / 100;
			var fontCounter = new ig.Font('media/fonts/font15_counter.png');
			fontCounter.draw(min + ":" + sec,this.pos.x-ig.game.screen.x+31, this.pos.y-ig.game.screen.y+23,ig.Font.ALIGN.CENTER);
		},
		pressedUp: function(){
			this.equipar();
		},
		equipar: function(){
			if(!ig.game.player.murio){
				if(lStorage.get('montura'+this.montura)=='off'){
					this.habilitar();
				}else{
					if(ig.game.player.tipo=='player'){
						ig.game.player.monta(this.montura);
						this.equiped = true;
					}
					else if(ig.game.player.tipo=='montura'){
						if(this.montura==ig.game.player.montura){
							ig.game.player.desmonta();
							this.equiped = false;
						}
						else{
							ig.game.player.monta(this.montura);
							this.equiped = true;
						}
					}
				}
			}
		},
		pressedUpCheatMode: function(){
			if(lStorage.get('montura'+this.montura)!='off'){
				if(cheatCode==null)
					cheatCode=[];
				cheatCode.push(this.montura);
			}
			if(JSON.stringify(lStorage.get('cheat_1'))==JSON.stringify(cheatCode)){
				var popups = ig.game.getEntitiesByType(EntityPopup);
				for (i=0;i<popups.length;i++){
					popups[i].kill();
				}
				lStorage.set('enable_cheat_1',true);
				ig.game.player.activarSaiyajinMode();
			}
		},
		habilitar:function(){},
		monturaxVideo: function() {},
    }); 
});