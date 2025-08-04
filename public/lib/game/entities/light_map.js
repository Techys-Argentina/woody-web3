ig.module(
    'game.entities.light_map'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityLight_map = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet('media/img/light_effect_levels_1.png',1560,480),
        size: {x : 1560 , y : 480 },    
		vel:{x:0, y:0},
		maxVel: {x: 400, y: 0},
		gravityFactor:0,
		light:1,
		dir:1,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			switch(this.light){
				case 1:
					this.animSheet = new ig.AnimationSheet('media/img/light_effect_levels_1.png',1560, 480 );
					this.size={x:1560,y:480};
					this.addAnim( 'idle',9999,[0]);
					this.dir=1;
					break;
				case 2:
					this.animSheet = new ig.AnimationSheet('media/img/light_effect_levels_2.png',1560, 480 );
					this.size={x:1560,y:480};
					this.addAnim( 'idle',9999,[0]);
					this.dir=0;
					break;
			}
        },
		update:function (){
			this.parent();
			//if(this.light==1){
				if(this.dir==1){
					this.pos.x+=1;
					if(this.pos.x>=0&&this.pos.x>-this.size.x/2)
						this.dir=0;
				}
				else if(this.dir==0){
					this.pos.x-=1;
					if(this.pos.x<=0&&this.pos.x<-this.size.x/2)
						this.dir=1;
				}
			//}
		},
	}); 
});