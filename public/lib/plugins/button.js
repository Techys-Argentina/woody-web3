// A Button Entity for Impact.js

ig.module( 'plugins.button' )
.requires(
  'impact.entity'
)
.defines(function() {

  Button = ig.Entity.extend({
    size: { x: 80, y: 80 },
    text: [],
    textPos: { x: 0, y: 0 },
    textAlign: ig.Font.ALIGN.LEFT,
    
    font: null,
    animSheet: null,
    state: 'idle',
    zIndex:20,
	
	sound:false,
	
    _oldPressed: false,
    _startedIn: false,
    _actionName: 'click',
	
	noFix:false,
	fixed:false,
	posX:null,
	posY:null,
	animated:false,
    
    btn1time:true,
	
	habilitado:true,
	tipo:'boton',
	onPopup:false,
    updateOffScreen:true,
    init: function( x, y, settings ) {
      this.parent( x, y, settings );
      
      this.addAnim( 'idle', 1, [0] );
      this.addAnim( 'active', 1, [1] );
      this.addAnim( 'deactive', 1, [2] );
		
		
	  
      if ( this.text.length > 0 && this.font === null ) {
        if ( ig.game.buttonFont !== null ) this.font = ig.game.buttonFont;
        else console.error( 'If you want to display text, you should provide a font for the button.' );
      }
	  if(this.posX==null)this.posX=this.pos.x;
	  if(this.posY==null)this.posY=this.pos.y;
	 
		
	 
    },
    
    update: function() {
		if(this.animated)
			this.parent();
		if(this.state !== 'hidden' ){
			var _clicked = ig.input.state( this._actionName );
			if( ig.ua.mobile ){	
				_clicked=false;
				for ( var t in ig.input.touches ) {//fix multi-touch android browser
					var touch = ig.input.touches[t];
					if(touch.state=='down'){
						//console.log(touch.id + ": esta down");
						_clicked=true;
					}
					else{ 
						_clicked=false;
					}
				}
			}
			if ( !this._oldPressed && _clicked && this._inButton() ) {		
				this._startedIn = true;
			}
			if(this.state=='deactive'){
				this.setState('deactive');
				if ( this._startedIn && this._inButton() && this.habilitado && ((!ig.game.popupOn && !this.onPopup)||(ig.game.popupOn && this.onPopup)||this.alwaysEnable) ){
					if ( _clicked && !this._oldPressed ) { // down
						this.pressedDownDeactive();
					}
					else if ( _clicked ) { // pressed
						this.pressedDeactive();
					}
					else if(this._oldPressed){
						this.pressedUpDeactive();
					}
				}
			}
			else if(this.state=='no_active'){
				this.setState('no_active');
				if ( this._startedIn && this._inButton() && this.habilitado && ((!ig.game.popupOn && !this.onPopup)||(ig.game.popupOn && this.onPopup)||this.alwaysEnable) ){
					if ( _clicked && !this._oldPressed ) { // down
						this.pressedDownDeactive();
					}
					else if ( _clicked ) { // pressed
						this.pressedDeactive();
					}
					else if(this._oldPressed){
						this.pressedUpDeactive();
					}
				}
			}
			else if ( this._startedIn && (this.state !== 'deactive' || this.pressedDeactive || this.state !== 'no_active') && this._inButton() && this.habilitado ) {
				if ( _clicked && !this._oldPressed ) { // down
					this.setState( 'active' );
					if(this.habilitado && ((!ig.game.popupOn && !this.onPopup)||(ig.game.popupOn && this.onPopup)||this.alwaysEnable))
						this.pressedDown();
				}
				else if ( _clicked ) { // pressed
					this.setState( 'active' );
					if(this.habilitado && ((!ig.game.popupOn && !this.onPopup)||(ig.game.popupOn && this.onPopup)||this.alwaysEnable))
						this.pressed();
				}
				else if(this._oldPressed){ // up
					this.setState( 'idle' );
					if(this.habilitado && ((!ig.game.popupOn && !this.onPopup)||(ig.game.popupOn && this.onPopup)||this.alwaysEnable))
						this.pressedUp();
				}
			}
			else if ( this.state === 'active' ) {
				this.setState( 'idle' );
			}
			else if(this._startedIn&&!this.habilitado&&this.state=='idle'&& this._inButton()){//cheat entry
				if ( _clicked && !this._oldPressed ) { // down
					this.setState( 'active' );
					this.pressedDownCheatMode();
				}
				else if ( _clicked ) { // pressed
					this.setState( 'active' );
					this.pressedCheatMode();
				}
				else if(this._oldPressed){ // up
					this.setState( 'idle' );
					this.pressedUpCheatMode();
				}
			}
			if ( this._oldPressed && !_clicked ) {
				this._startedIn = false;
			}
			if( ig.ua.mobile ){	
				for ( var t in ig.input.touches ) {//fix multi-touch android browser
					var touch = ig.input.touches[t];
					if(touch.state=='down'){
						this._oldPressed=true;
					}
					else{
						this._oldPressed=false;
					}
				}
			}
			else{
				this._oldPressed = _clicked;
			}
			this.zIndex=20;//mod05052016
		}
	},
    draw: function() {
		if(this.fixed){
			this.pos.x=this.posX+ig.game.screen.x;
			this.pos.y=this.posY+ig.game.screen.y;
		}
		else if(this.noFix){
			this.pos.x=this.posX;
			this.pos.y=this.posY;
		}
		if ( this.state !== 'hidden' ) {
			this.parent();
			if ( this.font !== null ) {
				for ( var i = 0; i < this.text.length; i++ ) {
					this.font.draw( 
						this.text[i], 
						this.pos.x + ((18) * i) + this.textPos.x - ig.game.screen.x, 
						this.pos.y + this.textPos.y - ig.game.screen.y, 
						this.textAlign
					);
				}
			}
		}
	},
    setState: function( s ) {
		this.state = s;
		if ( this.state !== 'hidden' ) {
			this.currentAnim = this.anims[ this.state ];
		}
    },
    pressedDown: function() {},
	pressed: function() {},
	pressedUp: function() {},
	pressedDownDeactive: function() {},
	pressedDeactive: function() {},
	pressedUpDeactive: function() {},
	pressedDownCheatMode: function() {},
	pressedCheatMode: function() {},
	pressedUpCheatMode: function() {},
	action: function(a){      	    		
		a;	
	},
    _inButton: function() {      
		if( ig.ua.mobile ){	 			
		  return ig.touchLocation.x + ig.game.screen.x > this.pos.x && 
				 ig.touchLocation.x + ig.game.screen.x < this.pos.x + this.size.x &&
				 ig.touchLocation.y + ig.game.screen.y > this.pos.y && 
				 ig.touchLocation.y + ig.game.screen.y < this.pos.y + this.size.y;
		}else{
			return ig.input.mouse.x + ig.game.screen.x > this.pos.x && 
             ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
             ig.input.mouse.y + ig.game.screen.y > this.pos.y && 
             ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
		}
    }
  });

});