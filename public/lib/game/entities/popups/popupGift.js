ig.module(
    'game.entities.popups.popupGift'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupGift = EntityPopup.extend({	
    	fadeIn:true,
    	animSheet: new ig.AnimationSheet('media/img/popup_gifts.png',682,460 ),		
		giftImg: new ig.Image( 'media/img/regalos-activos.png' ),
		giftImgDeactive: new ig.Image( 'media/img/regalos-inactivos.png' ),
		giftImgAccepted: new ig.Image( 'media/img/regalos-tilde.png' ),
		size: {x : 682 , y : 460 },
		center:true,
		day:null,
		oneTouch:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.day=lStorage.get('giftDay');
			this.parent(x, y, settings);	
			this.addAnim( 'bg', 9999, [0]);			
			this.currentAnim = this.anims.bg;
			var esto=this;		
			this.close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/powerups/close.png', 60, 60),
				idParent:esto.id,
				posX:this.pos.x+this.size.x-50,
				posY:this.pos.y-10,
				size:{x:60 ,y:60},
				noFix:true,
				onPopup:true,
				pressedUp: function(){
					soundButton.play();
					esto.kill();
				},	
			});
			var pX=35;
			var pY=95;	
			var padbottom=180;	
			var padRight=150;
			for(i=0; i<8; i++){
				this['btn_day_'+i]=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/trans.png', 1, 1 ),
					idParent:esto.id,		
					posX:this.pos.x+pX,
					posY:this.pos.y+pY,
					size:{x:140 ,y:164},
					noFix:true,
					day:i+1,
					onPopup:true,
					pressedUp: function(){
						soundButton.play();	
						esto.aceptGift(this.day);	
					},	
				});	
				
				pX+=padRight;
				var ite= i+1;
				if(ite%4==0&&i>2){
					pX=35;
					pY+=padbottom;
				}
			}	
        }, 
		draw: function(){			
			this.parent();
			for(i=0; i<8; i++){//recorre los btns
				var tile =i;
				if(this.keysFaltantes()==null&&i==6)
					tile=7;
				if(this.day-1<i){
					this.giftImgDeactive.drawTile( this['btn_day_'+i].pos.x, this['btn_day_'+i].pos.y, tile, 160, 185);
					this['btn_day_'+i].state='deactive';
				}
				else
					this.giftImg.drawTile( this['btn_day_'+i].pos.x, this['btn_day_'+i].pos.y, tile, 160, 185);
				
				var aGift=lStorage.get('giftAcumul').split(',');
				var lengthGift = aGift.length;
				for(j=0;j<lengthGift;j++){//recorre array giftAcumul
					if(aGift[j].split('_')[0]==i+1&&aGift[j].split('_')[1]=='used'){
						this.giftImgAccepted.draw( this['btn_day_'+i].pos.x+15, this['btn_day_'+i].pos.y+20);
						this['btn_day_'+i].state='deactive';
					}
				}
			}			
		},
		aceptGift: function(day){
			
			var aGift=lStorage.get('giftAcumul').split(',');
			var lengthGift = aGift.length;
			for(i=0;i<lengthGift;i++){
				if(aGift[i]==day)aGift[i]=aGift[i]+'_used';
			}
			lStorage.set('giftAcumul', aGift.toString());			
			switch(day){
				case 1:
					lStorage.set('monedas',lStorage.get('monedas')+500);
					break;
				case 2:
					lStorage.set('monedas',lStorage.get('monedas')+750);
					break;
				case 3:
					lStorage.set('monedas',lStorage.get('monedas')+1000);
					break;
				case 4:
					lStorage.set('monedas',lStorage.get('monedas')+500);
					lStorage.set('pu_fireBall',lStorage.get('pu_fireBall')+1);
					lStorage.set('pu_iceBall',lStorage.get('pu_iceBall')+1);
					lStorage.set('pu_axe',lStorage.get('pu_axe')+1);
					break;
				case 5:
					lStorage.set('monedas',lStorage.get('monedas')+1000);
					lStorage.set('pu_invul',lStorage.get('pu_invul')+1);
					lStorage.set('pu_iman',lStorage.get('pu_iman')+1);
					lStorage.set('pu_axe',lStorage.get('pu_axe')+1);
					break;
				case 6:
					lStorage.set('monedas',lStorage.get('monedas')+2000);
					lStorage.set('pu_invul',lStorage.get('pu_invul')+1);
					lStorage.set('pu_fly',lStorage.get('pu_fly')+1);
					break;
				case 7:
					if(this.keysFaltantes()==1)lStorage.set('keys',lStorage.get('keys')+','+'1_14_14');
					else if(this.keysFaltantes()==2)lStorage.set('keys',lStorage.get('keys')+','+'2_15_15');
					else lStorage.set('pu_fly',lStorage.get('pu_fly')+3);
					break;			
			}			
		},
		keysFaltantes: function(){
			var aKey=[];
			var key=null;
			var aKeys=lStorage.get('keys').split(',');
			var lengthKeys = aKeys.length;
			for (k=0; k<lengthKeys;k++) {	
				if(k>0){
					aKey.push(aKeys[k].split('_')[0]);
				}
			}			
			if(aKey.indexOf('3')==-1)key=3; // tambien le falta la llave 1 (esta va primero)
			if(aKey.indexOf('2')==-1)key=2; // le falta la llave 2
			if(aKey.indexOf('1')==-1)key=1; // tambien le falta la llave 1 (esta va primero)
			
			return key;
		},
    }); 
});