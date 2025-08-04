ig.module(
    'plugins.camera_vibration'
)
.requires(
	'impact.impact',
    'impact.game'
)
.defines(function(){

Camera_vibration = ig.Class.extend({
	defaultOptions: {
		intensidad:5,
		duration:0,
		dispVibration:0
	},
    init: function(options) {
		this._setOptions(options);
		this.duration=this.options.duration*ig.system.fps;
		//if(this.options.dispVibration!=0)navigator.vibrate(this.options.dispVibration*1000);
		this.intens={x:this.options.intensidad, y:this.options.intensidad};
    },
	update: function(){
		
		var randX = Math.floor(Math.random() * 2) + 1; 
		var randY = Math.floor(Math.random() * 2) + 1;
		if(this.duration>0){
			if(this.duration%2==0){
				if(randX==1){
					ig.game.screen.x+=this.intens.x;
					this.intens.x*=-1;
				}
				if(randY==1){
					ig.game.screen.y+=this.intens.y;
					this.intens.y*=-1;
				}
			}
			this.duration--;
		}/*else{
			if(this.options.dispVibration>0)navigator.vibrate(0);
		}*/
	},
	_setOptions: function(userOptions) {
		this.options = ig.copy(this.defaultOptions);					
		if (userOptions) {
			ig.merge(this.options, userOptions);
		}		
	},

});

});