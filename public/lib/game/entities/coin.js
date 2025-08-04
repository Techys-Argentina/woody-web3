ig.module(
    'game.entities.coin'
)
.requires(
    'impact.entity'
)
.defines(function() {
 
    EntityCoin = ig.Entity.extend({	
    	collides: ig.Entity.COLLIDES.PASIVE,
    	type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.A,
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/coin.png',33 , 33 ),
        size: {x : 33 , y : 33 },
        offset: {x : 0, y : 0},    
		vel:{x:0, y:0},
		maxVel:{x:500, y:500},
		valor:1,
		gravityFactor:0,
		_wmIgnore:true,
		checkedVida:false,
		anima:false,
		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);	
			this.settings = settings;	
			this.posTextY=0;
            this.alphaText=1.0;
        },
		update: function() {
			this.parent();
			if(this.distanceTo(ig.game.player)<=200&&!this.anima&&ig.game.player.items.iman!=null)this.imanta();
			if(this.anima){
				var vel = 8;
				var cX=this.pos.x-ig.game.screen.x;
				var cY=this.pos.y-ig.game.screen.y;	
				
				var dif= (cX-cY)/100;
				//console.log('cX: '+cX+'\ncY: '+cY);
				//console.log(dif/100);
				
				if(dif>0){
					this.pos.x-=vel+dif*vel; 
					this.pos.y-=vel;
				}else if(dif<0){
					this.pos.x-=vel; 
					this.pos.y-=vel-dif*vel;
				}else{
					this.pos.x-=vel; 
					this.pos.y-=vel;
				}	
				if(this.pos.y-ig.game.screen.y<20||this.pos.x-ig.game.screen.x<20)this.kill();
			}
			if(this.checkedVida){
				if(this.alphaText<0.01){
					this.kill();
				}else{
					this.posTextY+=1;
					this.alphaText-=0.01;
				}
			}
		},
		check: function(other){
			if(!this.checkedVida && !this.anima&& other== ig.game.player){
				sounds[0].play();
				for(i=1;i<=this.valor;i++){
					//lStorage.set('monedas',lStorage.get('monedas')+1);
					monedasNoAcumul++;		
					if(monedasNoAcumul%100==0){ // cada 100 monedas gana una vida
						sounds[2].play();
						other.health++;
						lStorage.set('vidas',other.health);
						this.checkedVida=true;
						this.collides= ig.Entity.COLLIDES.NEVER;
						this.currentAnim.alpha=0;
					}else{
						//this.anima=true;
						this.kill();
						this.gravityFactor=0;
					}
				}
			}
			
		},
		draw: function() {
			if(this.checkedVida){
				ig.system.context.save();
				ig.system.context.font = 'bold 12pt hoboStd';
				ig.system.context.fillStyle='#393';
				ig.system.context.globalAlpha = this.alphaText;
      			ig.system.context.fillText('1UP', this.pos.x-ig.game.screen.x, this.pos.y-ig.game.screen.y-this.posTextY);
      			ig.system.context.restore();
			}			
			this.parent();
		},
		imanta: function(){
				var player=ig.game.player;
				var vel = 10;
				var cX=this.pos.x-ig.game.player.pos.x;
				var cY=this.pos.y-ig.game.player.pos.y;					
				var dif= (cX-cY)/100;
				if(this.pos.x>player.pos.x)this.pos.x-=vel+dif*vel; 
				if(this.pos.x<player.pos.x)this.pos.x+=vel-dif*vel;				
				if(this.pos.y<player.pos.y)this.pos.y+=vel;
				if(this.pos.y>player.pos.y)this.pos.y-=vel;
		},
    }); 
});