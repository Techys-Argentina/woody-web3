ig.module(
    'game.entities.message'
)
.requires(
    'impact.entity',
	'game.entities.personaje',
	'game.entities.popups.popupAlert',
	'plugins.button'
)
.defines(function() {
 
    EntityMessage = Button.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		tipo:'botonAlert',
        animSheet: new ig.AnimationSheet('media/img/warning.png',48 , 48 ),
        size: {x : 48 , y : 48 },
        offset: {x : 0, y : 0},    
		gravityFactor:0,
		invisible:false,
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
		delay:2,
		addBoxes:0,
		addTile:0,
		bgImg:'media/img/alert.png',
		sizeX:319,
		sizeY:322,
		zIndex:-10,
		auto:0,
		autoReset:false,
		ide:null,
		noClick:null,
		fromImage:false,
		fromImage_d:false,
		fontImage:null,
		fontImage_d:null,
		closeOnTap:false,
		noCloseButton:false,
		enableCloseOnTap:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'active', 1, [0] );
			if(!ig.global.wm){
				this.ide='cart-'+currentLevel+'-'+this.ide;
				if(lStorage.get(this.ide)!=null)this.auto=0;
			}			
			this.currentAnim = this.anims.idle;	
			if(this.invisible=='true'){
				if(ig.global.wm){
					this._wmScalable=true;
					this._wmDrawBox=true;
					this._wmBoxColor='#fff';
				}else{
					this.currentAnim.alpha=0;
				}
			}		
        },
		update: function(){
			this.parent();
			if(this.invisible=='true'){
				if(!ig.global.wm){
					this.currentAnim.alpha=0;
				}
			}		
        },
		pressedUp: function(){
			if(!this.invisible)this.openPopUp();
		},
		openPopUp: function(){
			if(this.auto>1&&lStorage.set(this.ide)==null){				
					if(this.auto==2)lStorage.set(this.ide, 1); // creo la variable local para eliminarla en el game over
					if(this.auto==3)lStorage.set(this.ide, 0); // esta no se elimina mas
				}
			if(this.auto>0)this.auto=0;
			var settings={'txt':this.txt, 'txtW':this.txtW, 'txtX':this.txtX, 'txtY':this.txtY, 'txtColor':this.txtColor, 'lineHeight':this.lineHeight, 'fontSize':this.fontSize, 'fontFamily':this.fontFamily, 'fontStyle':this.fontStyle, 'fontImage':this.fontImage, 'fromImage':this.fromImage, 'textAlign':this.textAlign, 'delay':this.delay, 'addBoxes':this.addBoxes, 'addTile':this.addTile, 'img':this.img, 'imgX':this.imgX, 'imgY':this.imgY, 'imgTile':this.imgTile, 'imgTileSizeX':this.imgTileSizeX, 'imgTileSizeY':this.imgTileSizeY, 'bgImg':this.bgImg, 'sizeX':this.sizeX, 'sizeY':this.sizeY, 'closeOnTap':this.closeOnTap, 'noCloseButton':this.noCloseButton, 'enableCloseOnTap': this.enableCloseOnTap};
			if(this.addBoxes>0){
				for(var i=1; i<=this.addBoxes; i++){	
					if(this['txtW'+i]==null)settings['txtW'+i]=this.txtW_d;else settings['txtW'+i]= this['txtW'+i];
					if(this['txtX'+i]==null)settings['txtX'+i]=this.txtX_d;else settings['txtX'+i]= this['txtX'+i];
					if(this['txtY'+i]==null)settings['txtY'+i]=this.txtY_d;else settings['txtY'+i]= this['txtY'+i];
					if(this['txtColor'+i]==null)settings['txtColor'+i]=this.txtColor_d;else settings['txtColor'+i]= this['txtColor'+i];
					if(this['lineHeight'+i]==null)settings['lineHeight'+i]=this.lineHeight_d;else settings['lineHeight'+i]= this['lineHeight'+i];
					if(this['fontSize'+i]==null)settings['fontSize'+i]=this.fontSize_d;else settings['fontSize'+i]= this['fontSize'+i];
					if(this['fontFamily'+i]==null)settings['fontFamily'+i]=this.fontFamily_d;else settings['fontFamily'+i]= this['fontFamily'+i];
					if(this['fontStyle'+i]==null)settings['fontStyle'+i]=this.fontStyle_d;else settings['fontStyle'+i]=this['fontStyle'+i];
					if(this['textAlign'+i]==null)settings['textAlign'+i]=this.textAlign_d;else settings['textAlign'+i]=this['textAlign'+i];
					if(this['txt'+i]==null)settings['txt'+i]=this.txt_d;else settings['txt'+i]=this['txt'+i];
					if(this['fontImage'+i]==null)settings['fontImage'+i]=this.fontImage_d;else settings['fontImage'+i]= this['fontImage'+i];
					if(this['fromImage'+i]==null)settings['fromImage'+i]=this.fromImage_d;else settings['fromImage'+i]= this['fromImage'+i];
				}
			}
			if(this.addTile>0){
				for(var i=1; i<=this.addTile; i++){	
					if(this['imgX'+i]==null)settings['imgX'+i]=this.imgX_d;else settings['imgX'+i]= this['imgX'+i];
					if(this['imgY'+i]==null)settings['txtX'+i]=this.imgY_d;else settings['imgY'+i]= this['imgY'+i];	
					if(this['imgTile'+i]==null)settings['imgTile'+i]=this.imgTile_d;else settings['imgTile'+i]= this['imgTile'+i];	
						
				}
			}
			ig.game.spawnEntity(EntityPopupAlert, ig.game.screen.x, ig.game.screen.y,settings);
		},
		check: function(other){
			if(other&&ig.game.player&&this.auto>0){
				if(this.auto>1){				
					if(this.auto==2)lStorage.set(this.ide, 1); // creo la variable local para eliminarla en el game over
					if(this.auto==3)lStorage.set(this.ide, 0); // esta no se elimina mas
				}
				this.openPopUp();	
			}	
		},	
    }); 
});