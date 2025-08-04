ig.module(
    'game.entities.popups.popupAlert'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupAlert = EntityPopup.extend({	
    	fadeIn:0,
		_wmIgnore:false,
		center:true,
		txtW:265,
		txtX:30,
		txtY:60,
		txtColor:'#000',
		lineHeight:20,
		fontSize:18,
		fontFamily:'Arial',
		fontStyle:'Normal',
		textAlign:'left',
		txt:null,
		img:null,
		imgX:0,
		imgY:0,
		imgTile:null,
		imgTileSizeX:null,
		imgTileSizeY:null,
		txtW_d:265,
		txtX_d:30,
		txtY_d:60,
		txtColor_d:'#000',
		lineHeight_d:20,
		fontSize_d:18,
		fontFamily_d:'Arial',
		fontStyle_d:'Normal',
		textAlign_d:'left',
		txt_d:null,
		imgX_d:0,
		imgY_d:0,
		imgTile_d:0,
		delay:10,
		addBoxes:0,
		addTile:0,
		bgImg:'media/img/alert.png',
		sizeX:319,
		sizeY:322,
		fromImage:true,
		fromImage_d:true,
		fontImage:'font20_green',//fuente por default 
		fontImage_d:'font20_green',//fuente por default 
		animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
		closeOnTap:false,
		btn_close:null,
		enableFadeIn:false,
		enableCloseOnTap:false,
		init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;	
			this.size= {x : this.sizeX , y : this.sizeY };
			this.pos={x: ig.game.screen.x, y:ig.game.screen.y};
			this.bgImg=new ig.Image(this.bgImg);
			if(this.img!=null)
				this.img=new ig.Image(this.img);
			if(this.addBoxes>0)
				this.initCajasAdicionales();	
			else{
				this.pos.x= -this.size.x;	
				this.pos.y= -this.size.y;			
			}
			
		},
        inicia: function(){
			if (this.closeOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
					idParent:esto.id,
					posX:this.pos.x+this.size.x-150,
					posY:this.pos.y-10,
					size:{x:120 ,y:120},
					offset:{x:-30 ,y:-30},
					noFix:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
			if (this.enableCloseOnTap){
				var esto=this;		
				this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
					idParent:esto.id,
					posX:0,
					posY:0,
					size:{x:780,y:480},
					offset:{x:0 ,y:0},
					fixed:true,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();
						esto.kill();
					},	
				});
			}
		}, 
		update: function(){
			//this.parent();
			if (this.enableFadeIn){
				if(this.delay>0)
					this.delay-=0.1;
				if(this.fadeIn<1&&this.delay<=0)
					this.fadeIn+=0.1;
				else{
					this.parent();
					ig.game.pause=true;
				}
			}
			else{
				this.fadeIn=1.1;
				this.parent();
				ig.game.pause=true;
			}
			this.pos={x: ig.game.screen.x, y:ig.game.screen.y};
			if(this.center){
				this.pos.x= ig.game.screen.x+ig.system.width/2-this.size.x/2;	
				this.pos.y= ig.game.screen.y+ig.system.height/2-this.size.y/2;
			}
		},
		draw: function(){
			this.parent();
			var ctx=ig.system.context;
			/*if(!ig.global.wm&&this.fadeIn>1){
				for ( var t in ig.input.touches ) {//fix multi-touch android browser				
					var touch = ig.input.touches[t];
					if(touch.state=='down'&&touch.x >= this.pos.x-ig.game.screen.x && touch.x <= this.pos.x-ig.game.screen.x+this.size.x && touch.y >= this.pos.y-ig.game.screen.y && touch.y <= this.pos.y-ig.game.screen.y+this.size.y){			
						this.kill();
					}
				}
			}*/
			if(this.img!=null||this.bgImg!=null||this.imgTile!=null){
				ctx.save();
				ctx.globalAlpha = this.fadeIn;
				if(this.bgImg!=null)
					this.bgImg.draw( this.pos.x-ig.game.screen.x, this.pos.y-ig.game.screen.y);
				if(this.imgTile!=null&&this.imgTileSizeX!=null&&this.imgTileSizeY!=null)
					this.img.drawTile( this.pos.x-ig.game.screen.x+this.imgX, this.pos.y-ig.game.screen.y+this.imgY, this.imgTile, this.imgTileSizeX, this.imgTileSizeY );
				else if(this.img!=null) 
					this.img.draw( this.pos.x-ig.game.screen.x+this.imgX, this.pos.y-ig.game.screen.y+this.imgY );
				if(this.addTile>0){ //draw multiples tileset
					for(var i=1; i<=this.addTile; i++){
						this.img.drawTile( this.pos.x-ig.game.screen.x+this['imgX'+i], this.pos.y-ig.game.screen.y+this['imgY'+i], this['imgTile'+i], this.imgTileSizeX, this.imgTileSizeY );
					}
				}
				ctx.restore();
			}
			if(this.txt!=null){
				ctx.save();
				ctx.globalAlpha = this.fadeIn;
				var text= this.txt;
				if(this.textAlign=='center')
					var x = this.pos.x-ig.game.screen.x+this.txtX+this.txtW/2; // Posición en el eje X donde empezar a dibujar. CENTRADO
				else if(this.textAlign=='right') 
					var x = this.pos.x-ig.game.screen.x+this.txtX+this.txtW; // Posición en el eje X donde empezar a dibujar. DERECHA
				else 
					var x = this.pos.x-ig.game.screen.x+this.txtX;// Posición en el eje X donde empezar a dibujar. IZQUIERDA
				var y = this.pos.y-ig.game.screen.y+this.txtY; // Posición en el eje Y donde empezar a dibujar.              
				ctx.font = this.fontStyle+' '+this.fontSize+"px "+this.fontFamily;
				ctx.fillStyle = this.txtColor;	
				ctx.textAlign = this.textAlign;			
                if (this.fromImage)
					this.ajusteDeTextoImg(text, x, y, this.txtW, this.lineHeight, ctx, this.fontImage);
				else
					this.ajusteDeTexto(text, x, y, this.txtW, this.lineHeight, ctx);
				if(this.addBoxes>0)
					this.drawCajasAdicionales();
				ctx.restore();
			}
			if(!ig.global.wm&&this.fadeIn>1){
				if(!(typeof btn_pause === 'undefined'))
					btn_pause.draw(true);
			}
		},
		ajusteDeTexto: function(texto, x, y, maxWidth, alturaDeLinea, ctx){
			 // crea el array de las palabras del texto
			var palabrasRy = texto.split(" ");
			  // inicia la variable var lineaDeTexto
			var lineaDeTexto = "";
			  // un bucle for recorre todas las palabras
			var lengthPalabrasRy = palabrasRy.length;
            for(var i = 0; i < lengthPalabrasRy; i++) {
				var testTexto = lineaDeTexto + palabrasRy[i] + " ";
				// calcula la anchura del texto textWidth
				var textWidth = ctx.measureText(testTexto).width;
				// si textWidth > maxWidth
                if (textWidth > maxWidth && i > 0) {
					// escribe en el canvas la lineaDeTexto
					ctx.fillText(lineaDeTexto, x, y);
					// inicia otra lineaDeTexto         
					lineaDeTexto = palabrasRy[i]+ " " ;
					// incrementa el valor de la variable y
					//donde empieza la nueva lineaDeTexto
					y += alturaDeLinea;
                }
				else {// de lo contrario, si textWidth <= maxWidth
					  lineaDeTexto = testTexto;
                }
            }// acaba el bucle for
			// escribe en el canvas la última lineaDeTexto
			ctx.fillText(lineaDeTexto, x, y);
		},
		ajusteDeTextoImg: function(texto, x, y, maxWidth, alturaDeLinea, ctx, imageFont){
			//Imagen de font
			var fontImage = new ig.Font('media/fonts/' + imageFont + '.png');
			fontImage.letterSpacing = -1;
			var align = null;
			switch (ctx.textAlign) {
				case "left":
					align = ig.Font.ALIGN.LEFT;
					break;
				case "right":
					align = ig.Font.ALIGN.RIGHT;
					break;
				case "center":
					align = ig.Font.ALIGN.CENTER;
					break;
				default: 
					align = ig.Font.ALIGN.CENTER;
			}
			 // crea el array de las palabras del texto
			var palabrasRy = texto.split(" ");
			  // inicia la variable var lineaDeTexto
			var lineaDeTexto = "";
			  // un bucle for recorre todas las palabras
			var lengthPalabrasRy = palabrasRy.length;
            for(var i = 0; i < lengthPalabrasRy; i++) {
				var testTexto = lineaDeTexto + palabrasRy[i] + " ";
				// calcula la anchura del texto textWidth
				var textWidth = ctx.measureText(testTexto).width;
				// si textWidth > maxWidth
                if (textWidth > maxWidth && i > 0) {
					// escribe en el canvas la lineaDeTexto
					fontImage.draw(lineaDeTexto,x,y,align);
					// inicia otra lineaDeTexto         
					lineaDeTexto = palabrasRy[i]+ " " ;
					// incrementa el valor de la variable y
					//donde empieza la nueva lineaDeTexto
					y += alturaDeLinea;
                }
				else {// de lo contrario, si textWidth <= maxWidth
					  lineaDeTexto = testTexto;
                }
            }// acaba el bucle for
			// escribe en el canvas la última lineaDeTexto
			
			fontImage.draw(lineaDeTexto,x,y,align);
		},
		initCajasAdicionales: function(){
			for(var i=1; i<=this.addBoxes; i++){
				if(this['txtW'+i]==null)
					this['txtW'+i]=this.txtW_d;
				if(this['txtX'+i]==null)
					this['txtX'+i]=this.txtX_d;
				if(this['txtY'+i]==null)
					this['txtY'+i]=this.txtY_d;
				if(this['txtColor'+i]==null)
					this['txtColor'+i]=this.txtColor_d;
				if(this['lineHeight'+i]==null)
					this['lineHeight'+i]=this.lineHeight_d;
				if(this['fontSize'+i]==null)
					this['fontSize'+i]=this.fontSize_d;
				if(this['fontFamily'+i]==null)
					this['fontFamily'+i]=this.fontFamily_d;
				if(this['fontStyle'+i]==null)
					this['fontStyle'+i]=this.fontStyle_d;
				if(this['textAlign'+i]==null)
					this['textAlign'+i]=this.textAlign_d;
				if(this['txt'+i]==null)
					this['txt'+i]=this.txt_d;
				if(this['fontImage'+i]==null)
					this['fontImage'+i]=this.fontImage_d;
				if(this['fromImage'+i]==null)
					this['fromImage'+i]=this.fromImage_d;
			}
		},
		drawCajasAdicionales: function(){
			var ctx=ig.system.context;
			for(i=1; i<=this.addBoxes; i++){
				var text= this['txt'+i];
				if(this['textAlign'+i]=='center')var x = this.pos.x-ig.game.screen.x+this['txtX'+i]+this['txtW'+i]/2; // Posición en el eje X donde empezar a dibujar. CENTRADO
				else if(this['textAlign'+i]=='right') var x = this.pos.x-ig.game.screen.x+this['txtX'+i]+this['txtW'+i]; // Posición en el eje X donde empezar a dibujar. DERECHA
				else var x = this.pos.x-ig.game.screen.x+this['txtX'+i];// Posición en el eje X donde empezar a dibujar. IZQUIERDA
				var y = this.pos.y-ig.game.screen.y+this['txtY'+i]; // Posición en el eje Y donde empezar a dibujar.              
                ctx.font = this['fontStyle'+i]+' '+this['fontSize'+i]+"px "+this['fontFamily'+i];
                ctx.fillStyle = this['txtColor'+i];	
				ctx.textAlign = this['textAlign'+i];
				if (this['fromImage'+i])
					this.ajusteDeTextoImg(text, x, y,  this['txtW'+i], this['lineHeight'+i], ctx, this['fontImage'+i]);
				else
					this.ajusteDeTexto(text, x, y, this['txtW'+i], this['lineHeight'+i], ctx);
			}
		},
	}); 
});