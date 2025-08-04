ig.module(
    'game.entities.coin1'
)
.requires(
	'game.entities.coin'
)
.defines(function() {
	
    EntityCoin1 = EntityCoin.extend({	 
		_wmIgnore:false,
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.animSheet= new ig.AnimationSheet('media/img/coin.png',33 , 33 ),
			this.addAnim( 'move', 0.07, [0,1,2,3,4] );
			this.addAnim( 'move2', 0.07, [4,3,2,1,0] );
            this.checked=false;		
            if(parseInt(this.valor)>1){
            	this.currentAnim = this.anims.move2;
            	this.posTextY=0;
            	this.alphaText=1.0;
            }else this.currentAnim = this.anims.move;	
        },
		
		check: function(other){
			if(!this.checked)this.parent(other);
		},
		update:function(){
			this.parent();
			if(this.checked){
				if(this.alphaText<0.01){
					this.kill();
					this.valor=1;	
				}else{
					this.posTextY+=1;
					this.alphaText-=0.01;
				}
			}
		},
		draw: function() {
			if(this.checked){
				ig.system.context.save();
				ig.system.context.font = 'bold 12pt sans-serif';
				ig.system.context.fillStyle='#c00';
				ig.system.context.globalAlpha = this.alphaText;
      			ig.system.context.fillText(this.valor, this.pos.x-ig.game.screen.x, this.pos.y-ig.game.screen.y-this.posTextY);
      			ig.system.context.restore();
			}
			
			this.parent();
		},
		kill: function(){
			if(parseInt(this.valor)==1)this.parent();
			else if(parseInt(this.valor)>1){
				this.checked=true;
				this.currentAnim.alpha=0;
			}
		}, 
    }); 
});