ig.module(
    'game.entities.passage'
)
.requires(
    'impact.entity',
	'game.entities.tile'
)
.defines(function() {
 
    EntityPassage= EntityTile.extend({	
		//Pre-cargamos los sprites
        animSheet: new ig.AnimationSheet('media/img/passage.png',48 , 96 ),
        size: {x : 48 , y : 96 },
        offset: {x : 0, y : 0}, 
        maxVel:{x:0,y:0},   
		rompe:true,
		id:null,
		exit:null,
		camera:null,
		flip:null,
		light:8,
		state:'normal',
		music:null,
		key:null,
		invisible:false,
		_wmIgnore:false,
		drawBG:false,
		updateOffScreen:true,		
        //Constructor
        init: function(x, y, settings) {
            this.parent(x, y, settings);
			this.addAnim( 'normal', 9999, [0] );	
			this.addAnim( 'blocked', 9999, [1] );
			this.addAnim( 'unblocked', 9999, [2] );			
            if(this.drawBG=='true')this.drawBG=true;
			this.setState(this.state);
			if(this.flip=='true'){
            	this.currentAnim.flip.y= true;	
				this.offset.y=-this.size.y/2;					
            }
			if(this.invisible){
				this.currentAnim.alpha=0;
				if(ig.global.wm){this._wmDrawBox=true;this._wmBoxColor='green';}
			}
        },
		update: function() {
			this.parent();
			var player = ig.game.player;
			if(this.caminaSobre&&(this.flip!='true'&&this.flip!=true)&&this.exit!=null&&this.state!='blocked'){
				if(ig.ua.mobile){
					btn_up.state='deactive';
					btn_down.state='active';
				}
				ig.game.passageEnabled=true;
				var pas =ig.game.getEntitiesByType( EntityPassage );
				var lengthPas = pas.length;
				for(i=0; i<lengthPas; i++){
					if(this.exit==pas[i].id){
						player.baja={x:pas[i].pos.x, y:pas[i].pos.y-player.size.y};	
						if(pas[i].flip=='true'||pas[i].flip==true){
							player.baja.y=pas[i].pos.y+pas[i].size.y-5;
						}
					}
				}					
			}
			else if(!this.caminaSobre&&this.distanceTo( player )<120){ //Garcha! si!!! este distance en una PORONGA
				if(ig.ua.mobile){
					btn_up.state='active';
					btn_down.state='deactive';
				}
				ig.game.passageEnabled=false;
			}
			if(this.camera=='end'){
				this.endScroll=this.id;
				if(ig.game.cameraPassage.endScroll==this.id){
					var correc=(player.tipo=='player')?5:-25; //esta correccion es una garcha, problemas con el ancho del player. Lo mismo en fin
					if(player && this.pos.x+correc-player.pos.x<ig.system.width/2){
						ig.game.cameraPassage.scroleaX=false;				
					}else{
						ig.game.cameraPassage.scroleaX=true;
					}
				}
				
			}
			if(this.state=='blocked'){ // desactiva el boton si tiene llave
				if(player && this.distanceTo( player )<90 && this.key==player.key){
					btn_key.state='active';
				}else if(player && this.distanceTo( player )>90 && this.key==player.key){
					btn_key.state='deactive';
				}
			}
		
		},
		check: function(other){
			this.parent(other);
			var player = ig.game.player;
			if(!this.invisible){
				if(this.camera=='ini'){ //intra nivel
					if(this.music==null)
						ig.game.music='bg2';
					else 
						ig.game.music=this.music;
					if(lStorage.get('music'))
						ig.music.play(ig.game.music);
					ig.game.cameraPassage.b=true;
					ig.game.cameraPassage.x=this.pos.x;	
					ig.game.cameraPassage.iniX=this.pos.x;				
					ig.game.cameraPassage.endScroll=this.endScroll;
					ig.game.cameraPassage.drawBG=this.drawBG;					
				
				}
				else if(this.camera==null){//sale de intra nivel
					if(this.music==null)
						ig.game.music='bg';
					else 
						ig.game.music=this.music;
					if(lStorage.get('music'))
						ig.music.play(ig.game.music);
					ig.game.cameraPassage.b=false;
					if(lStorage.get('sounds'))
						ig.game.cameraPassage.endScroll=null;
					ig.game.cameraPassage.drawBG=true;
				}
				else if(this.camera=='end'){//entra en el final del intra nivel
					if(this.music==null)
						ig.game.music='bg2';
					else 
						ig.game.music=this.music;
					if(lStorage.get('music'))
						ig.music.play(ig.game.music);
					ig.game.cameraPassage.b=true;
					ig.game.screen.x=this.pos.x-(ig.system.width-this.size.x);
					var pas=ig.game.getEntitiesByType( EntityPassage );
					var lengthPas = pas.length;
					for(i=0; i<lengthPas; i++){
						if(this.iniScroll==pas[i].id){						
							ig.game.cameraPassage.x=pas[i].pos.x;				
						}
					}
					ig.game.scroleaX = true;//mod por cambio en la entidad fin (lo pone en false)
					ig.game.cameraPassage.endScroll=this.endScroll;		
				}
				else if(this.camera=='inter'){
					if(this.music==null)ig.game.music='bg2';
					else ig.game.music=this.music;
					if(lStorage.get('music'))ig.music.play(ig.game.music);
					ig.game.cameraPassage.drawBG=this.drawBG;	
				}
			}
			else{
				if(this.music==null)ig.game.music='bg1';
				else ig.game.music=this.music;
				if(lStorage.get('music'))ig.music.play(ig.game.music);
				this.collides= ig.Entity.COLLIDES.PASIVE;
			}
			
		},
		collideWith: function(other, axis){
			this.parent(other, axis);
			if(other == ig.game.player&&axis=='y'&&this.pos.y<other.pos.y&&this.flip=='true'&&!ig.game.btnUp1time&&!this.invisible){
				var player = ig.game.player;
				var pas =ig.game.getEntitiesByType( EntityPassage );
				var lengthPas = pas.length;
				for(i=0; i<lengthPas; i++){
					if(this.exit==pas[i].id){
						player.baja={x:pas[i].pos.x, y:pas[i].pos.y-player.size.y};	
						if(pas[i].flip=='true'||pas[i].flip==true){
							player.baja.y=pas[i].pos.y+pas[i].size.y-5;
						}
						player.maxVel.y=0;
						player.movimientoDown();						
					}
				}
			}				
		},
		setState: function(s){
			this.state=s;
			if(s=='normal'){
				this.currentAnim = this.anims.normal;
				this.offset= {x : 0, y : 48};
			}else if(s=='blocked'){
				this.currentAnim = this.anims.blocked;
				this.offset= {x : 0, y : 36};
			}else if(s=='unblocked'){
				this.currentAnim = this.anims.unblocked;
				this.offset= {x : 0, y : 48};
			}
		},
    }); 
});