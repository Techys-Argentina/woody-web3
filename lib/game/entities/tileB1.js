ig.module(
    'game.entities.tileB1'
)
.requires(
    'impact.entity',
	'game.entities.coin3',
	'game.entities.vidaTile1',
	'game.entities.tile'
)
.defines(function() {
 
    EntityTileB1 = EntityTile.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/question_mark.png',48 , 48 ),
        size: {x : 48 , y : 48 },
        offset: {x : 0, y : 0},
		mon:0,
		vida:null,	
		item:null,
		weapon:null,
		_wmIgnore:false,	
		caminaEnemy:[],
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,0,0,0,0,0,1,2,3] );
			this.addAnim( 'blocked', 0.1, [4] );
			this.currentAnim=this.anims.idle;
			this.maxVel.y=0;
        },
		update: function() {
			this.parent();
			var player = ig.game.player;			
			if(this.mon==0&&this.vida==null&&this.item==null&&this.weapon==null)this.currentAnim=this.anims.blocked;
			this.caminaEnemy=[];
			this.golpe=false;
		},
		collideWith: function(other, axis){
			var player=	ig.game.player;	
			
			if(other==player&&axis=='y'&&other.pos.y+6>this.pos.y+this.size.y&&other.vel.y>0&&!this.invisible){
				this.suelta();
				if(this.currentAnim==this.anims.blocked)sounds[9].play();
			}
			if(other.tipo!='undefined'&&other.tipo=='enemy'&&axis=='y'&&this.pos.y>other.pos.y){ // Enemigo camina sobre
				this.caminaEnemy.push(other.id);
			}		
			this.parent(other, axis);		
		},
		suelta: function(){
			this.mataEnemySobre();
			if(ig.game.getEntitiesByType(EntityCoin3).length==0){
				if(this.mon>0){
					this.sueltaMonedas();
				}else if(this.item!=null){
					this.sueltaItem();
				}else if(this.weapon!=null){
					this.sueltaArma();
				}else if(this.key!=null){
					this.sueltaKey();
				}else if(this.vida!=null){
					this.sueltaVida();
				}				
			}
		},
		sueltaMonedas: function(){
			monedasNoAcumul++;
			sounds[0].play();
			ig.game.spawnEntity(EntityCoin3, this.pos.x+this.size.x/2-17, this.pos.y-20);
			this.mon--;
		},
		sueltaVida: function(){
			var settings = {'direc':this.vida};
			this.vida=null;
			ig.game.spawnEntity(EntityVidaTile1, this.pos.x+this.size.x/2-20, this.pos.y-24, settings);
		},
		sueltaItem: function(){
			var settings = {'item':this.item};
			this.item=null;
			ig.game.spawnEntity(EntityArmas_item, this.pos.x+this.size.x/2-18, this.pos.y-36, settings);
		},
		sueltaArma: function(){
			var settings = {'weapon':this.weapon};
			this.weapon=null;
			ig.game.spawnEntity(EntityArmas_item, this.pos.x+this.size.x/2-18, this.pos.y-this.size.y/2-36, settings);
		},
		sueltaKey: function(){
			var settings = {'key':this.key};
			this.key=null;
			ig.game.spawnEntity(EntityArmas_item, this.pos.x+this.size.x/2-18, this.pos.y+this.size.y/2-36, settings);
		},
		mataEnemySobre: function(){
			var aEnemy=ig.game.getEntitiesByType( EntityEnemigo );
			var lengthEnemy = aEnemy.length;
			for (i=0; i<lengthEnemy;i++){
				var lengthCaminaEnemy = this.caminaEnemy.length;
				for(j=0;j<lengthCaminaEnemy;j++){
					if(aEnemy[i].id==this.caminaEnemy[j])aEnemy[i].muere();
				}
			}
		},
    }); 
});