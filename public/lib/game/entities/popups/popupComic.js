ig.module(
    'game.entities.popups.popupComic'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupComic = EntityPopup.extend({	
    	fadeIn:true,    		
		size: {x : 780 , y : 480 },
		center:true,
		delay:0, 
        posCloseBtn:{x:690,y:10}, 
		animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
		timer:0,
		lastImageShowed:0,
		endDelay:200,
		arrayImages:null,
		keepConsole:false,
		skip:true,
		animacionVertical:false,
		init: function(x, y, settings) {           
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			this.parent(x, y, settings);
			this.arrayImages = [[1,new ig.Image('media/img/comic/uno.jpg'),0,false,true],[2,new ig.Image('media/img/comic/dos.png'),5,false,false],[3,new ig.Image('media/img/comic/tres.png'),20,false,false],[4,new ig.Image('media/img/comic/cuatro.png'),25,false,true],[5,new ig.Image('media/img/comic/cinco.jpg'),26,false,false],[6,new ig.Image('media/img/comic/seis.png'),40,false,false],[7,new ig.Image('media/img/comic/siete.png'),60,false,true],[8,new ig.Image('media/img/comic/ocho.png'),65,false,false],[9,new ig.Image('media/img/comic/nueve.png'),80,false,true],[10,new ig.Image('media/img/comic/diez.png'),85,false,false],[11,new ig.Image('media/img/comic/once.png'),100,false,true],[12,new ig.Image('media/img/comic/doce.png'),105,false,false],[13,new ig.Image('media/img/comic/trece.png'),120,false,false],[14,new ig.Image('media/img/comic/catorce.png'),130,false,false],[15,new ig.Image('media/img/comic/quince.png'),140,false,true],[16,new ig.Image('media/img/comic/dieciseis.png'),145,false,false],[17,new ig.Image('media/img/comic/diecisiete.png'),160,false,true],[18,new ig.Image('media/img/comic/dieciocho.jpg'),165,false,false],[18,new ig.Image('media/img/comic/diecinueve.png'),180,false,false]];
		},
		inicia: function(){
			var esto=this;	
			this.parent();
			if(this.skip){
				this.btn_close=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet('media/img/comic/skip-video.png', 265, 84 ) ,		
					idParent:esto.id,
					posX:esto.pos.x-60,
					posY:this.pos.y-10,
					size:{x:265, y:84},
					noFix:true,	
					state:'active',
					idParent:esto.id,
					onPopup:true,
					pressedUp: function(){
						showedComic=true;
						soundButton.play();
						esto.kill();
					},				
				});
				this.btn_close.addAnim( 'active', 9999, [0] );
			}
			this.btn_next=ig.game.spawnEntity( Button, 0, 0, {animSheet: new ig.AnimationSheet( 'media/img/next.png', 80, 80 ) ,		
				idParent:esto.id,
				posX:this.pos.x+690,
				posY:this.pos.y+10,
				size:{x:100, y:100},
				noFix:true,	
				state:'active',
				idParent:esto.id,
				onPopup:true,
				pressedUp: function(){
					esto.arrayImages[esto.lastImageShowed][3] = true;
					esto.pausa=false;
					this.state='deactive';
				},				
			});
			this.btn_next.addAnim( 'active', 9999, [0] );
		},
		draw: function(){
			var ctx=ig.system.context;
			ctx.fillStyle = "#000";
			ctx.fillRect(0,0,ig.system.width,ig.system.height);
			var showed = false;
			if (this.lastImageShowed < this.arrayImages.length && this.timer < this.endDelay){
				for (i = 0; i < this.arrayImages.length; i++) { 
					if (this.timer >= this.arrayImages[i][2]){//si tiene que estar mostrándose detro de este intervalo
						if (this.arrayImages[i][1].loaded){
							showed = true;
							this.arrayImages[i][1].draw(0,0);
							this.lastImageShowed = i;
							if (this.arrayImages[i][3]){
								ctx.save();
								ctx.globalAlpha=0.8;
								ctx.fillRect(0,0,ig.system.width,ig.system.height);
								ctx.restore();
							}
						}
						else
							showed = false;
					}
				}
				if (showed){
					if (this.arrayImages[this.lastImageShowed][4] && !this.arrayImages[this.lastImageShowed][3]){
						this.btn_next.draw();
						this.btn_next.state='active';
					}
					else
						this.timer+=(0.1)*ig.system.fps/((1 / ig.system.tick).round());
				}
			}
			else{
				showedComic=true;
				this.kill();
			}
			if(this.skip)
				this.btn_close.draw();
		},
		kill: function(){
			var aButtons=ig.game.getEntitiesByType(Button);
			var aButtonsLength=aButtons.length;
			for (i = 0; i < aButtonsLength; i++) { 
				if(aButtons[i].idParent==this.id)
					aButtons[i].kill();
			}
			this.parent();
		},
    }); 
});