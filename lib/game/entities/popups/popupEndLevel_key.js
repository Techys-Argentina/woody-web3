ig.module(
    'game.entities.popups.popupEndLevel_key'
)
.requires(
    'impact.entity',
    'game.entities.popups.popupEndLevel'
)
.defines(function() {
 
    EntityPopupEndLevel_key = EntityPopupEndLevel.extend({	
		animacionVertical:false,
		imgTop:null,
		keepConsole:false,
		btnMenuImg:'media/img/close.png',
		btnMenuImgSize:{x:48, y:48},
		size:{x:780, y:480},
		enableBanner:false,
		//Constructor
		init: function(x, y, settings){		
			this.animSheet= new ig.AnimationSheet('media/img/inst/key-found.png',780,480);
			this.parent(x, y, settings);	
		},
        inicia: function() {			
			this.parent();
			var esto =this;	
			this.btn_next.kill();
			this.btn_menu.posX=this.pos.x+700;
			this.btn_menu.posY=this.pos.y+50;
			btn_pause.pressedUp = function(){soundButton.play();esto.kill();};
			this.btn_menu.pressedUp = function(){soundButton.play();esto.kill();};
		}, 
		kill: function(){
			lStorage.set('posBtnLevelMap_'+currentWorld,currentLevel);
			this.setCurrentLevel();
			this.parent();
			var esto=this;
			ig.game.screenFader = new ig.ScreenFader({fade: 'in', speed: 5,
				callback: function (){
					if (ig.ua.mobile&&navigator.onLine)
						esto.showInterstitial(function(){if(currentWorld<4)ig.system.setGame(Levels);else{loadWorld=true;ig.system.setGame(Levels);}});
					else{
						if(currentWorld<4)
							ig.system.setGame(Levels);
						else{
							loadWorld=true;
							ig.system.setGame(Levels);
						}
					}
				}
			});
		},
	}); 
});