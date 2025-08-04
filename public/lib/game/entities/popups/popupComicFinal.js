ig.module(
    'game.entities.popups.popupComicFinal'
)
.requires(
    'impact.entity',
    'game.entities.popups.popupComic'
)
.defines(function() {
 
    EntityPopupComicFinal = EntityPopupComic.extend({	
    	fadeIn:true,    		
		size: {x : 780 , y : 480 },
		center:true,
		delay:0, 
        posCloseBtn:{x:690,y:10}, 
		animSheet: new ig.AnimationSheet('media/img/trans.png',1 , 1 ),
		timer:0,
		lastImageShowed:0,
		endDelay:90,
		arrayImages:null,
		keepConsole:false,
		skip:false,
		animacionVertical:false,
		end:false,
		endGame:null,
		stageClear:null,
		endWorld:null,
		bg:null,
		init: function(x, y, settings) {           
			this.addAnim( 'idle', 9999, [0] );
			this.currentAnim = this.anims.idle;
			this.parent(x, y, settings);
			this.arrayImages = [[1,new ig.Image('media/img/comic_final/uno.jpg'),0,false,false],[2,new ig.Image('media/img/comic_final/dos.jpg'),20,false,false],[3,new ig.Image('media/img/comic_final/tres.jpg'),40,false,false],[4,new ig.Image('media/img/comic_final/cuatro.jpg'),60,false,false],[5,new ig.Image('media/img/comic_final/cinco.jpg'),80,false,true]];
			showedComicEnd=true;
		},
		update: function(){
			this.parent();
			btn_pause.state='deactive';
		},
		callBackKill:function(){
			if(!this.end){
				this.end=true;
				btn_pause.state='idle';
				var settings={'endGame':this.endGame,'stageClear':this.stageClear,'endWorld':this.endWorld,'bg':this.bg};
				ig.game.spawnEntity(EntityPopupEndLevel, ig.game.screen.x, ig.game.screen.y+100, settings);
			}
		},
	}); 
});