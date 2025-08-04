ig.module(
    'game.entities.huevo'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityHuevo = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.FIXED,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/trans.png',60 , 60 ),
        size: {x : 30 , y : 60 },
        offset: {x : 30, y : 0},    
		vel:{x:0, y:0},
		gravityFactor:1,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 9999, [0] );
			this.addAnim( 'move', 0.1, [1,2,1,1,1,2] );
			this.addAnim( 'crack', 0.1, [3,3,4,5] );	
			this.addAnim( 'check', 0.5, [6,7,7] );
			this.addAnim( 'die', 9999, [8] );
			this.currentAnim = this.anims.idle;		
        },
		update: function() {
			this.parent();
			
			if(this.currentAnim.loopCount==2&&this.currentAnim == this.anims.move){
				this.currentAnim = this.anims.crack.rewind();
			}else if(this.currentAnim.loopCount==1&&this.currentAnim == this.anims.crack){
				this.currentAnim = this.anims.check;
			}
		},
		collideWith: function(other, axis){
			if(other==ig.game.player&&this.currentAnim == this.anims.idle&&axis=='y'&&other.pos.y < this.pos.y){
				this.currentAnim = this.anims.move.rewind();
				other.vel.y = -other.jump;	
			}
			else if(other==ig.game.player&&this.currentAnim == this.anims.move||this.currentAnim == this.anims.crack&&axis=='y'&&other.pos.y < this.pos.y){
				other.vel.y = -other.jump;
			}
			else if(other==ig.game.player&&this.currentAnim == this.anims.check&&axis=='y'&&other.pos.y < this.pos.y){
				this.currentAnim = this.anims.die;
				this.collides= ig.Entity.COLLIDES.PASIVE;
				ig.game.player.who='yoshi';
				ig.game.player.animacion();
				ig.game.player.arma='yoshiFire';
			}
		},
    }); 
});