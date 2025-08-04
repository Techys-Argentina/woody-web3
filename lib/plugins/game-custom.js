ig.module(
	'plugins.game-custom'
)
.requires(
	'impact.game'
)
.defines(function(){ 

ig.Game_custom = ig.Game.extend({
		
	loadPartsLevels:false,
	onLoadLevel:true,
	aLayersToLoad:[],
	
	loopCont:0,	
	
	loaderLevel:true,
	
	layersIni:null,
	porcentajeCarga:0,
	loadingMessage: new ig.Font( 'media/fonts/font16_white.png'  ),
	tipMessage: new ig.Font( 'media/fonts/font20_green.png'  ),//este puede que este de mas
	tip:"",
	background:[],
	tipsArray:[	"You start with a lot of free Power Ups for you... \n Use them when you are stuck.",
				"When you get 100 coins in the same level you will get 1 UP.",
				"In the trolley you have a special weapon... \n The Pick, you have some free.",
				"When you have problems with a level don't forget to use Power Ups.",
				"There are 4 Mounts in the game 3 are well hidden and protected.",
				"If you find a key you are closer to get a Mount.",
				"To get a Mount you need to defeat a Boss.",
				"The power ups are cheap... \n buy them, don't be cheap, you don't need money just coins. ;).",
				"If you are stuck in a level you could use Skip Level with a Video. \n But you Must pass it to Win the game.",
				"If you need coins in the pause menu or in the game \n over screen you could see a video for 100 Coins.",
				"There is one mount inmune to Lava.",
				"To find the Keys look at the map. There are some clues.",
				"Woody can hold the breath under the water for 5 seconds, \n if you wanto to get deeper use the snorkel.",
				"If a level is to hard... you always have the wings..."],
	loaderSizeParcial:0,
	loadLevel: function( data ) {
		this.parent(data);
		this.onLoadLevelInit();
	},
	loadLevelParts: function( data, background ) {
		this.screen = {x: 0, y: 0};

		// Entities
		this.entities = [];
		this.namedEntities = {};
		for( var i = 0; i < data.entities.length; i++ ) {
			var ent = data.entities[i];
			this.spawnEntity( ent.type, ent.x, ent.y, ent.settings );
		}
		this.sortEntities();
		
		// Map Layer
		this.collisionMap = ig.CollisionMap.staticNoCollision;
		this.backgroundMaps = [];
		for( var i = 0; i < data.layer.length; i++ ) {
			var ld = data.layer[i];
			if( ld.name == 'collision' ) {
				this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data );
			}
			else{
				if(this.onRandom){
					var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
					newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
					newMap.repeat = ld.repeat;
					newMap.distance = ld.distance;
					newMap.foreground = !!ld.foreground;
					newMap.preRender = !!ld.preRender;
					newMap.name = ld.name;
					this.backgroundMaps.push( newMap );
				}
				this.aLayersToLoad.push(ld.name);
			}
		}
		
		// Call post-init ready function on all entities
		for( var i = 0; i < this.entities.length; i++ ) {
			this.entities[i].ready();
		}
		this.loadPartsLevels=true;
		this.onLoadLevel=false;
		this.layersIni=this.aLayersToLoad.length;
		if(background) {
			this.background = this.getBackgrounds(background);
		}
	},
	getBackgrounds: function(background_data){
		var backgroundMaps = null;
		for (i = 0; i < background_data.length; i++) { 
			var backgroundMap = new ig.BackgroundMap(background_data[i].tilesize, [[1]], background_data[i].img);
			backgroundMap.anims = {};
			backgroundMap.repeat = background_data[i].repeat;
			backgroundMap.distance = background_data[i].distance;
			backgroundMap.foreground = false;
			backgroundMap.preRender = false;
			backgroundMap.speedScroll = background_data[i].speedScroll;
			backgroundMap.name = "bg_"+i;
			if(backgroundMaps!=null)
				backgroundMaps.push(backgroundMap);
			else
				backgroundMaps = [backgroundMap];
		}
		return backgroundMaps;
	},	
	
	update: function(){
		// load new level?
		if( this._levelToLoad ) {
			this.loadLevel( this._levelToLoad );
			this._levelToLoad = null;
		}
		// update entities
		if(this.onLoadLevel){
			this.updateEntities();
			this.checkEntities();
		}
		
		// remove all killed entities
		for( var i = 0; i < this._deferredKill.length; i++ ) {
			this._deferredKill[i].erase();
			this.entities.erase( this._deferredKill[i] );
		}
		this._deferredKill = [];
		
		// sort entities?
		if( this._doSortEntities || this.autoSort ) {
			this.sortEntities();
			this._doSortEntities = false;
		}
		
		// update background animations
		for( var tileset in this.backgroundAnims ) {
			var anims = this.backgroundAnims[tileset];
			for( var a in anims ) {
				anims[a].update();
			}
		}
		if(this.onRandom){
			if(this.loadPartsLevels){
				this.aLayersToLoad.shift();
				if(this.loaderLevel){
					if(this.porcentajeCarga==100 && this.loaderSizeParcial >= this.porcentajeCarga*2)
						this.onLoadLevelInit();
				}else{
					if(this.aLayersToLoad.length==0)
						this.onLoadLevelInit();
				}
			}
		}
		else if(this.onInfinite){
			if(this.loadPartsLevels&&this.loopCont==10){
				this.loopCont=0;
				// Map Layer
				var data =ig.global['LevelLevel_'+currentLevel] ;
				//this.backgroundMaps = [];
				for( var i = 0; i < data.layer.length; i++ ) {
					var ld = data.layer[i];
					if( ld.name == this.aLayersToLoad[0]) {
						var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
						newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
						newMap.repeat = ld.repeat;
						newMap.distance = ld.distance;
						newMap.foreground = !!ld.foreground;
						newMap.preRender = !!ld.preRender;
						newMap.name = ld.name;
						this.backgroundMaps.push( newMap );
					}
				}
				this.aLayersToLoad.shift();
				if(this.loaderLevel){
					if(this.porcentajeCarga==100 && this.loaderSizeParcial >= this.porcentajeCarga*2)
						this.onLoadLevelInit();
				}
				else{
					if(this.aLayersToLoad.length==0)
						this.onLoadLevelInit();
				}
				if(this.loadPartsLevels)
					this.loopCont++;
			}
		}
		else {
			if(this.loadPartsLevels&&this.loopCont==10){
				this.loopCont=0;
				// Map Layer
				var data =ig.global['LevelLevel_'+currentLevel] ;
				//this.backgroundMaps = [];
				for( var i = 0; i < data.layer.length; i++ ) {
					var ld = data.layer[i];
					if( ld.name == this.aLayersToLoad[0]) {
						var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
						newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
						newMap.repeat = ld.repeat;
						newMap.distance = ld.distance;
						newMap.foreground = !!ld.foreground;
						newMap.preRender = !!ld.preRender;
						newMap.name = ld.name;
						this.backgroundMaps.push( newMap );
					}
				}
				//for( var i = 0; i < this.background.length; i++ ) {
				//	this.backgroundMaps.push(this.background[i]);
				//}
				this.aLayersToLoad.shift();
				if(this.loaderLevel){
					if(this.porcentajeCarga==100 && this.loaderSizeParcial >= this.porcentajeCarga*2)
						this.onLoadLevelInit();
				}else{
					if(this.aLayersToLoad.length==0)
						this.onLoadLevelInit();
				}
			}
			if(this.loadPartsLevels)
				this.loopCont++;
		}
	},
	onLoadLevelInit: function(){
		this.loadPartsLevels=false;
		this.onLoadLevel=true;
		this.tip = "";
		this.screenFader = new ig.ScreenFader({ fade: 'out', speed:1 });
	},	
	
	draw: function(){
		if( this.clearColor ) {
			ig.system.clear( this.clearColor );
		}
		this.drawBackground();
		// This is a bit of a circle jerk. Entities reference game._rscreen 
		// instead of game.screen when drawing themselfs in order to be 
		// "synchronized" to the rounded(?) screen position
		this._rscreen.x = ig.system.getDrawPos(this.screen.x)/ig.system.scale;
		this._rscreen.y = ig.system.getDrawPos(this.screen.y)/ig.system.scale;
		var mapIndex;
		for( mapIndex = 0; mapIndex < this.backgroundMaps.length; mapIndex++ ) {
			var map = this.backgroundMaps[mapIndex];
			if( map.foreground ) {
				// All foreground layers are drawn after the entities
				break;
			}
			if(this.onLoadLevel&&mapIndex==1)
				this.drawEntitiesBack();
			map.setScreenPos( this.screen.x, this.screen.y );
			map.draw();
		}
		if(this.onLoadLevel)
			this.drawEntities();
		else
			this.drawRectangle("#000", 0, 0, ig.system.width, ig.system.height, 'fill');
		for( mapIndex; mapIndex < this.backgroundMaps.length; mapIndex++ ) {
			var map = this.backgroundMaps[mapIndex];
			map.setScreenPos( this.screen.x, this.screen.y );
			map.draw();
		}
		
		if(this.loaderLevel&&this.loadPartsLevels){
			var ctx=ig.system.context;
			var s = ig.system.scale;
			var w = ig.system.width * 0.6;
			var h = ig.system.height * 0.03;
			var x = ig.system.width * 0.5-w/2;
			var y = ig.system.height * 0.5-h/2;
			
			this.porcentajeCarga = (((this.layersIni-this.aLayersToLoad.length)*100)/this.layersIni);
			
			this.drawLoader(ctx,this.loaderSizeParcial);
			if(this.loaderSizeParcial<this.porcentajeCarga*2)
				this.loaderSizeParcial+=2;
			this.loadingMessage.draw('Loading level...',ig.system.width/2,ig.system.height/2+110,ig.Font.ALIGN.CENTER);
			//if (this.tip.length == 0){//si todavia no cargue ningun tip
			//	this.tip = this.getTip();
			//}
			//this.tipMessage.draw("'" + this.tip + "'",ig.system.width/2,ig.system.height/2+150,ig.Font.ALIGN.CENTER);
		}
	},
	drawEntities: function() {
		for( var i = 0; i < this.entities.length; i++ ) {
			if(this.entities[i].zIndex>-100){
				if ((this.entities[i].pos.x>ig.game.screen.x-this.entities[i].size.x&&this.entities[i].pos.x<ig.game.screen.x+ig.system.width&&this.entities[i].pos.y>ig.game.screen.y-this.entities[i].size.y&&this.entities[i].pos.y<ig.game.screen.y+ig.system.height)||!onLevel){
					this.entities[i].draw();
				}
			}
		}
	},
	drawEntitiesBack: function() {
		for( var i = 0; i < this.entities.length; i++ ) {
			if(this.entities[i].zIndex<=-100){
				if ((this.entities[i].pos.x>ig.game.screen.x-this.entities[i].size.x&&this.entities[i].pos.x<ig.game.screen.x+ig.system.width&&this.entities[i].pos.y>ig.game.screen.y-this.entities[i].size.y&&this.entities[i].pos.y<ig.game.screen.y+ig.system.height)||!onLevel){
					this.entities[i].draw();
				}
			}
		}
	},
	drawRectangle:function(color, x, y, w, h, tipo){
		var ctx = ig.system.context;
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		if (tipo=='stroke'){
			ctx.strokeStyle = color;
			ctx.lineWidth='1';
			ctx.stroke();
		}else if (tipo=='fill'){
			ctx.fillStyle = color;
			ctx.fill();
		}
	},
	getTip: function () {
		if(lStorage.get('tipsShowed')==null)
			lStorage.set('tipsShowed',"");
		var arrTipsShowed = lStorage.get('tipsShowed').toString().split("|");
		var lengthArrShowed = arrTipsShowed.length;
		var existe = true;
		while (existe){
			existe = false;
			rand = Math.floor(Math.random() * this.tipsArray.length);
			for(i=0; i < lengthArrShowed; i++ ) {
				if (parseInt(arrTipsShowed[i]) == rand)
					existe = true;		
			}
		}
		if ((lStorage.get('tipsShowed').toString().length > 0)&&(arrTipsShowed.length<this.tipsArray.length-1))
			lStorage.set('tipsShowed',lStorage.get('tipsShowed').toString() + "|" + rand);
		else{
			lStorage.set('tipsShowed',rand);
		}
		return(this.tipsArray[rand]);
	},
	drawLoader:function(ctx, loaderSizeParcial){
	
		// layer5/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(780.5, 480.5);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(0.5, 22.1);
      ctx.lineTo(780.5, 22.1);
      ctx.lineTo(780.5, 480.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
	  
	  // verde/Path
      ctx.save();
      ctx.beginPath();
      ctx.rect(200,330-loaderSizeParcial,400,loaderSizeParcial);
	  ctx.closePath();
	  ctx.fillStyle = "rgb(0, 165, 80)";
	  ctx.fill();
      ctx.restore();
	  
	   ctx.save();
      ctx.beginPath();

      // negro/Compound Path/Path
      ctx.moveTo(0.5, 22.1);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(780.5, 480.5);
      ctx.lineTo(780.5, 22.1);
      ctx.lineTo(0.5, 22.1);
      ctx.closePath();

      // negro/Compound Path/Path
      ctx.moveTo(452.6, 304.7);
      ctx.bezierCurveTo(446.9, 304.7, 435.0, 305.2, 416.5, 306.3);
      ctx.bezierCurveTo(402.8, 278.2, 394.8, 262.9, 392.7, 260.9);
      ctx.bezierCurveTo(380.7, 289.0, 373.2, 304.5, 370.5, 307.3);
      ctx.lineTo(330.8, 302.6);
      ctx.bezierCurveTo(328.3, 301.4, 318.3, 272.5, 300.7, 215.4);
      ctx.bezierCurveTo(289.0, 182.9, 283.2, 165.4, 283.4, 162.9);
      ctx.bezierCurveTo(283.6, 160.6, 306.6, 155.8, 351.1, 148.8);
      ctx.bezierCurveTo(352.2, 150.8, 356.8, 181.6, 364.9, 241.1);
      ctx.lineTo(365.9, 241.2);
      ctx.bezierCurveTo(366.0, 239.9, 373.8, 229.3, 389.1, 209.6);
      ctx.bezierCurveTo(394.7, 214.8, 405.1, 225.7, 420.2, 242.2);
      ctx.lineTo(422.1, 242.5);
      ctx.lineTo(422.2, 241.4);
      ctx.bezierCurveTo(426.8, 203.1, 429.8, 182.2, 431.2, 178.2);
      ctx.bezierCurveTo(467.4, 186.9, 484.9, 191.8, 484.9, 193.1);
      ctx.bezierCurveTo(464.8, 264.0, 453.9, 301.9, 452.6, 304.7);
      ctx.closePath();
      ctx.fill();

      // negro/Path
      ctx.beginPath();
      ctx.moveTo(780.5, 30.3);
      ctx.lineTo(0.5, 30.3);
      ctx.lineTo(0.5, 0.5);
      ctx.lineTo(780.5, 0.5);
      ctx.lineTo(780.5, 30.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
	  
	   // w/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(780.5, 480.5);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(0.5, 0.5);
      ctx.lineTo(780.5, 0.5);
      ctx.lineTo(780.5, 480.5);
      ctx.closePath();
      ctx.stroke();

      // w/Group

      // w/Group/Compound Path
      ctx.save();
      ctx.beginPath();

      // w/Group/Compound Path/Path
      ctx.moveTo(370.2, 311.9);
      ctx.lineTo(330.5, 307.3);
      ctx.bezierCurveTo(330.0, 307.3, 329.5, 307.2, 329.1, 307.0);
      ctx.bezierCurveTo(326.1, 305.6, 323.5, 304.3, 296.3, 216.6);
      ctx.bezierCurveTo(278.4, 166.9, 278.6, 164.0, 278.7, 162.0);
      ctx.bezierCurveTo(279.1, 157.4, 279.2, 155.1, 350.0, 144.2);
      ctx.bezierCurveTo(351.8, 144.0, 353.7, 145.0, 354.7, 146.8);
      ctx.bezierCurveTo(355.7, 148.4, 356.9, 150.5, 367.7, 230.1);
      ctx.bezierCurveTo(371.3, 225.2, 376.9, 217.8, 385.8, 206.4);
      ctx.bezierCurveTo(387.2, 204.6, 389.9, 204.5, 391.7, 206.2);
      ctx.bezierCurveTo(396.8, 211.0, 405.8, 220.3, 418.8, 234.6);
      ctx.bezierCurveTo(424.6, 187.8, 426.5, 178.8, 427.4, 176.2);
      ctx.bezierCurveTo(428.1, 174.3, 429.9, 173.4, 431.7, 173.8);
      ctx.bezierCurveTo(449.9, 178.3, 463.5, 181.7, 472.3, 184.2);
      ctx.bezierCurveTo(485.1, 187.8, 488.9, 188.9, 488.7, 193.8);
      ctx.bezierCurveTo(488.7, 194.1, 488.6, 194.4, 488.5, 194.8);
      ctx.bezierCurveTo(458.2, 302.3, 456.8, 305.5, 456.1, 306.9);
      ctx.bezierCurveTo(455.5, 308.3, 454.2, 309.2, 452.8, 309.2);
      ctx.bezierCurveTo(447.2, 309.2, 435.2, 309.8, 416.9, 310.9);
      ctx.bezierCurveTo(415.3, 311.1, 413.7, 310.1, 412.9, 308.4);
      ctx.bezierCurveTo(402.4, 287.0, 396.7, 275.9, 393.5, 270.1);
      ctx.bezierCurveTo(379.8, 301.9, 375.6, 308.6, 373.4, 310.8);
      ctx.bezierCurveTo(372.6, 311.6, 371.4, 312.1, 370.2, 311.9);
      ctx.closePath();

      // w/Group/Compound Path/Path
      ctx.moveTo(333.1, 298.0);
      ctx.lineTo(368.5, 302.3);
      ctx.bezierCurveTo(370.6, 299.0, 375.9, 288.9, 388.8, 258.7);
      ctx.bezierCurveTo(389.3, 257.4, 390.4, 256.6, 391.7, 256.3);
      ctx.bezierCurveTo(393.0, 256.1, 394.3, 256.5, 395.3, 257.5);
      ctx.bezierCurveTo(396.7, 258.8, 399.1, 261.1, 418.8, 301.6);
      ctx.bezierCurveTo(433.4, 300.8, 443.7, 300.3, 449.8, 300.2);
      ctx.bezierCurveTo(452.1, 292.9, 459.7, 267.1, 480.1, 195.4);
      ctx.bezierCurveTo(475.4, 193.8, 463.7, 190.5, 434.3, 183.4);
      ctx.bezierCurveTo(433.1, 189.3, 430.8, 204.4, 426.3, 242.2);
      ctx.lineTo(426.2, 243.1);
      ctx.bezierCurveTo(426.1, 245.6, 424.1, 247.3, 421.9, 247.0);
      ctx.lineTo(419.9, 246.7);
      ctx.bezierCurveTo(419.0, 246.6, 418.1, 246.1, 417.4, 245.3);
      ctx.bezierCurveTo(405.0, 231.8, 395.7, 222.0, 389.8, 216.1);
      ctx.bezierCurveTo(374.1, 236.5, 370.7, 241.6, 370.0, 242.9);
      ctx.bezierCurveTo(369.5, 244.9, 367.6, 246.2, 365.6, 245.9);
      ctx.lineTo(364.6, 245.7);
      ctx.bezierCurveTo(362.5, 245.4, 360.9, 243.6, 360.6, 241.4);
      ctx.bezierCurveTo(352.7, 183.7, 349.4, 161.9, 347.9, 154.1);
      ctx.bezierCurveTo(306.8, 160.7, 293.0, 164.1, 288.5, 165.6);
      ctx.bezierCurveTo(289.7, 170.0, 293.5, 182.0, 305.0, 214.0);
      ctx.bezierCurveTo(305.0, 214.1, 305.0, 214.2, 305.1, 214.2);
      ctx.bezierCurveTo(324.5, 277.1, 331.0, 293.8, 333.1, 298.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();
      ctx.restore();
      ctx.restore();
	  this.drawRectangle("#000", 0, 0, 10, ig.system.height, 'fill');
	},
	drawBackground: function(){
		for (i = 0; i < this.background.length; i++) {
			this.setScreenPos(this.background[i], ig.game.screen.x, ig.game.screen.y );
			this.background[i].draw();
		}
	},
	setScreenPos: function(map, x, y ) {
		map.scroll.x = (x / map.distance)*map.speedScroll;
		map.scroll.y = y / map.distance;
	},
});
});