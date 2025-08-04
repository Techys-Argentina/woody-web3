ig.module(
    'game.entities.tile1'
)
.requires(
    'impact.entity',
	'game.entities.tile1_particle',
	'game.entities.coin2',
	'game.entities.tile'
)
.defines(function() {
 
    EntityTile1 = EntityTile.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/tile.png',48 , 48 ),
        size: {x : 48 , y : 48 },
        offset: {x : 0, y : 0},    
		rompe:true,
		roto:false,
		caminaEnemy:[],
		_wmIgnore:false,	
		//Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			if(this.rompe)this.maxVel.y=0;
			
        },
		update: function() {
			this.parent();
			var player = ig.game.player;
			if(this.standing)this.rompeTile();
			this.caminaEnemy=[];
		},
		collideWith: function(other, axis){			
			var player=	ig.game.player;
			if(other.tipo!='undefined'&&other.tipo=='enemy'&&axis=='y'&&this.pos.y>other.pos.y){ // Enemigo camina sobre
				this.caminaEnemy.push(other.id);
			}
			if(axis== 'y'&&other.pos.y+6>this.pos.y+this.size.y&&other.vel.y>0&& other == player&&this.rompe==true&&!this.invisible){
				this.mataEnemySobre();
				this.rompeTile();
			}else if(axis== 'y'&&other.pos.y+6>this.pos.y+this.size.y&&other.vel.y>0&& other == player&&!this.rompe==true&&!this.invisible){				
				sounds[9].play();
			}
			this.parent(other, axis);
		},
		rompeTile: function(){
				sounds[1].play();
				var x=0;
				var y=0;
				for(i=0;i<=3;i++){
					var settings = {'por':i};
					var x = x+24;
					if((i+1)%2==0){
						x=0;
						y+=24;
					}
					ig.game.spawnEntity(EntityTile1_particle, this.pos.x+x, this.pos.y+y, settings);
				}		
				if(this.settings.mon){
					this.sueltaMonedas();
				}
				if(this.settings.vida){
					this.sueltaVida();
				}	
				if(this.item!=null){
					this.sueltaItem();
				}
				if(this.weapon!=null){
					this.sueltaArma();
				}
				if(this.key!=null){
					this.sueltaKey();
				}
				ig.game.sortEntitiesDeferred();			
				this.kill();
			
		},
		sueltaMonedas: function(){
			var cant = this.settings.mon;
			for(i=1;i<=cant;i++){
				ig.game.spawnEntity(EntityCoin2, this.pos.x, this.pos.y);
			}
		},
		sueltaVida: function(){
			var settings = {'direc':this.settings.vida};
			ig.game.spawnEntity(EntityVidaTile, this.pos.x, this.pos.y, settings);
		},
		sueltaItem: function(){
			var settings = {'item':this.item};
			this.item=null;
			ig.game.spawnEntity(EntityArmas_item, this.pos.x+this.size.x/2-18, this.pos.y-36, settings);
		},
		sueltaArma: function(){
			var settings = {'weapon':this.weapon};
			this.arma=null;
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