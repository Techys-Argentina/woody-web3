ig.module(
    'game.entities.destello'    
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityDestello = ig.Entity.extend({	
        offset: {x : 0, y : 0},  
		maxVel:{x:500, y:500},	
		vel:{x:0, y:0},
		gravityFactor:0,
		zIndex:100,
		autoKill:null,
		delay:0,
		animSheet: new ig.AnimationSheet('media/img/destello.png',53 , 53 ),
		//_wmIgnore:true,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 0.1, [0,1,2,3,4] );
			ig.game.destelloOn=true;
			if (this.delay!=null)
				this.autoKill = this.autoKill + this.delay;
		},
		draw: function(){
			//destello con cambio de alpha
			if (this.currentAnim.loopCount>=this.delay){
				if(this.autoKill!=null&&this.currentAnim.loopCount>=this.autoKill){
					ig.game.destelloOn=false;
					this.currentAnim.alpha = 0;
					this.kill();
				}
				else
					this.parent();
			}
		},
    });
});