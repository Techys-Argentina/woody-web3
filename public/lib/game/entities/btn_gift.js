ig.module(
    'game.entities.btn_gift'
)
.requires(
    'impact.entity',
	'plugins.button'
)
.defines(function() {
 
    EntityBtn_gift = Button.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/btn_gift.png',80 , 80 ),
        size: {x : 80 , y : 80},
        offset: {x : 0, y : 0},  
		vel:{x:0, y:0},
		gravityFactor:0,
		posX:660,
		posY:370,
		fixed:false,
		_wmScalable:true,
		animated:true,
		sound:true,	
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);					
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'active', 1, [0] );
			this.addAnim( 'deactive', 1, [0] );				
			this.addAnim( 'animate', 0.1, [0,1,2,3] );	
			this.initGift();			
			this.currentAnim = this.anims.animate;
        },
		pressedUp: function(){
			ig.game.spawnEntity(EntityPopupGift, 0, 0);
		},
		initGift: function(){
			var d = new Date().valueOf();
			var uc = lStorage.get('giftlastConex');
			var hs24 = 86400*1000;
			var hs48 = 172800*1000;
			//var hs24 = 10*1000;
			//var hs48 = 20*1000;
			if(lStorage.get('giftDay')==0){
				lStorage.set('giftDay',1); 	
				lStorage.set('giftAcumul', '');
				var aGift=lStorage.get('giftAcumul').split(',');
				aGift.push(lStorage.get('giftDay'));				
				lStorage.set('giftAcumul', aGift.toString());
			}			
			if(d-uc>hs24){	//si pasaron 24 horas
				lStorage.set('giftlastConex', new Date().valueOf());
				if(d-uc<hs48){ // no llegaron a pasar 48hs
					if(lStorage.get('giftDay')==7){lStorage.set('giftDay',1);lStorage.set('giftAcumul', '');}
					else {lStorage.set('giftDay',lStorage.get('giftDay')+1);}					
				}else{//pasaron 48hs
					lStorage.set('giftDay',1);
					lStorage.set('giftAcumul', '');
				}
				var aGift=lStorage.get('giftAcumul').split(',');
				aGift.push(lStorage.get('giftDay'));
				
				lStorage.set('giftAcumul', aGift.toString());
			}
		},
		draw: function(){
			this.parent();
			var imgChapita = new ig.Image('media/img/popups/inventario_botones/boton-cantidad.png');
			var fontCant = new ig.Font('media/fonts/font15_fff_hobo_0-9.png');
			fontCant.firstChar = 48;
			fontCant.letterSpacing = -1;
			var aGift=lStorage.get('giftAcumul').split(',');
			var cantAcum=-1;
			var lengthGift = aGift.length;
			for(j=0;j<lengthGift;j++){//recorre array giftAcumul
				if(aGift[j].split('_')[1]!='used'){
					cantAcum++;
				}
			}
			if(cantAcum>0){
				this.currentAnim = this.anims.animate;
				imgChapita.drawTile(this.pos.x-ig.game.screen.x+this.size.x-25,this.pos.y+40-ig.game.screen.y,1,34);
			}
			else
				this.currentAnim = this.anims.idle;
			fontCant.draw((cantAcum!=0)?cantAcum:'',this.pos.x-ig.game.screen.x+this.size.x-9,this.pos.y+49-ig.game.screen.y,ig.Font.ALIGN.CENTER);
		},
    }); 
});