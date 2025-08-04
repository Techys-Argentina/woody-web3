ig.module(
    'game.entities.coin2'
)
.requires(
	'game.entities.coin',
	'impact.entity-pool'
)
.defines(function() {
 
    EntityCoin2 = EntityCoin.extend({	
		//Pre-cargamos los sprites
		collides: ig.Entity.COLLIDES.LITE,
		maxVel:{x:500, y:600},	
		gravityFactor:2,
		updateOffScreen:true,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.animSheet= new ig.AnimationSheet('media/img/coin1.png',33 , 33 ),
			this.addAnim( 'moveRight', 0.07, [0,1,2,3] );	
			this.addAnim( 'moveLeft', 0.07, [3,2,1,0] );
			this.addAnim( 'idle', 9999, [0] );			
			this.currentAnim = this.anims.moveLeft;			
			this.vel.y=Math.floor(Math.random() * (-400 - (-600) + 1)) + -600;
			this.vel.x=Math.floor(Math.random() * (200 - (-200) + 1)) + -200;
			if(this.vel.x>0)this.currentAnim = this.anims.moveRight;	
			else this.currentAnim = this.anims.moveLeft;	
			this.timer = new ig.Timer(6);
        },
		reset: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.currentAnim = this.anims.moveLeft;			
			this.vel.y=Math.floor(Math.random() * (-400 - (-600) + 1)) + -600;
			this.vel.x=Math.floor(Math.random() * (200 - (-200) + 1)) + -200;
			if(this.vel.x>0)this.currentAnim = this.anims.moveRight;	
			else this.currentAnim = this.anims.moveLeft;	
			this.timer = new ig.Timer(6);
			this.anima=false;
			this.gravityFactor=2;
		},
		update: function() {
			this.parent();
			if(this.standing&&!this.anima){
				this.vel.x=0;this.currentAnim = this.anims.idle;}
			if(this.timer.delta()>0&&!this.anima){this.kill();}
		},
		check: function(other){
			this.parent(other);
		},
		collideWith: function( other, axis ){
			this.parent(other, axis);
			if(other instanceof EntityTile1 || other instanceof EntityTile2){
				this.vel.x = 0;
				this.currentAnim = this.anims.idle;	
			}
		}
    }); 
	ig.EntityPool.enableFor( EntityCoin2 );
});