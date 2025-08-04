ig.module(
    'game.entities.popups.popupRunner'
)
.requires(
    'impact.entity',
    'game.entities.popups.popup'
)
.defines(function() {
 
    EntityPopupRunner = EntityPopup.extend({	
    	fadeIn:true,    		
		size: {x : 400 , y : 200 },
		center:true,
		delay:0, 
        animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
		timer:0,
		lastImageShowed:0,
		endDelay:40,
		arrayImages:null,
		init: function(x, y, settings) {           
			ig.game.pause=true;
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			this.parent(x, y, settings);
			this.arrayImages = [[1,new ig.Image('media/img/countdown/tres.png'),0,true,false,false],[2,new ig.Image('media/img/countdown/dos.png'),10,true,false,false],[3,new ig.Image('media/img/countdown/uno.png'),20,true,false,false],[4,new ig.Image('media/img/countdown/run.png'),30,true,false,false]];
		},
		inicia: function(){
			this.parent();
		},
		draw: function(){
			var ctx=ig.system.context;
			var showed = false;
			if (this.lastImageShowed < this.arrayImages.length && this.timer < this.endDelay){
				for (i = 0; i < this.arrayImages.length; i++) { 
					if(this.arrayImages[i]!=null&&(this.timer >= this.arrayImages[i][2])){//si tiene que estar mostrándose detro de este intervalo
						if (this.arrayImages[i][1].loaded){
							showed = true;
							this.arrayImages[i][1].draw(this.pos.x,this.pos.y-this.size.y-50);
							this.lastImageShowed = i;
							if (this.arrayImages[i][3]){
								this.arrayImages[i-1]=null;
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
						this.timer+=this.compensadorTick(0.1);
				}
			}
			else{
				showedComic=true;
				ig.game.pause=false;
				this.kill();
			}
		},
	}); 
});