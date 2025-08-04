ig.module(
    'game.entities.clouds_map'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityClouds_map = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.A,
    	checkAgainst: ig.Entity.TYPE.B,
        animSheet: new ig.AnimationSheet('media/img/clouds_map.png',224, 107 ),
        size: {x : 224 , y : 107 },    
		vel:{x:10, y:0},
		maxVel: {x: 400, y: 0},
		gravityFactor:0,
		nube:1,	
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'n1', 9999, [0] );
			this.addAnim( 'n2', 9999, [1] );
			this.addAnim( 'n3', 9999, [2] );
			this.addAnim( 'n4', 9999, [3] );
			switch(this.nube){
				case 1:
					this.currentAnim = this.anims.n1;
					break;
				case 2:
					this.currentAnim = this.anims.n2;
					break;
				case 3:
					this.currentAnim = this.anims.n3;
					break;
				case 4:
					this.currentAnim = this.anims.n4;
					break;
			}
        },
		update:function (){
			this.parent();
			this.pos.x+=0.2;
			if(this.pos.x>ig.system.width){
				this.pos.x=0-this.size.x;
			}
		},
		
    }); 
});