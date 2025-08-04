ig.module(
    'game.entities.btn_level'
)
.requires(
    'impact.entity',
	'plugins.button'
)
.defines(function() {
 
    EntityBtn_level = Button.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/trans.png',1 ,1 ),
        size: {x : 75 , y : 75},
        offset: {x : 0, y : 0},  
		vel:{x:0, y:0},
		gravityFactor:0,
		posX:0,
		posY:0,
		font: new ig.Font( 'media/btn_level.font.png'),
		textPos: { x: 28, y:22 },
		fixed:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			if(!ig.global.wm) {
				if((parseInt(lStorage.get('nivel').toString().split("_")[1]) < parseInt(this.level.toString().split("_")[1])) && (parseInt(lStorage.get('nivel').toString().split("_")[0]) <= parseInt(this.level.toString().split("_")[0]))){
					this.state= 'deactive';
				}else{
					this.text=this.num.toString();
				}
			}
			if(this.text.length>1){
				this.textPos.x=16;
			}
        },
		pressedUp: function(){
			if(this.state != 'deactive'&&!ig.game.pause){
				loadWorld=false;
				ig.system.setGame(MyGame);
				currentLevel=this.level;
			}
		},
    }); 
});