ig.module(
	'impact.loader'
)
.requires(
	'impact.image',
	'impact.font',
	'impact.sound'
)
.defines(function(){ "use strict";

ig.Loader = ig.Class.extend({
	resources: [],
	
	gameClass: null,
	status: 0,
	done: false,
	
	_unloaded: [],
	_drawStatus: 0,
	_intervalId: 0,
	_loadCallbackBound: null,
	tipMessage: new ig.Font( 'media/fonts/font20_green.png'  ),
	
	init: function( gameClass, resources ) {
		this.gameClass = gameClass;
		this.resources = resources;
		this._loadCallbackBound = this._loadCallback.bind(this);
		
		for( var i = 0; i < this.resources.length; i++ ) {
			this._unloaded.push( this.resources[i].path );
		}
	},
	
	
	load: function() {
		ig.system.clear( '#000' );
		
		if( !this.resources.length ) {
			this.end();
			return;
		}

		for( var i = 0; i < this.resources.length; i++ ) {
			this.loadResource( this.resources[i] );
		}
		this._intervalId = setInterval( this.draw.bind(this), 16 );
		
	},
	
	
	loadResource: function( res ) {
		res.load( this._loadCallbackBound );
	},
	
	
	end: function() {
		if( this.done ) { return; }
		
		this.done = true;
		clearInterval( this._intervalId );
		ig.system.setGame( this.gameClass );
	},
	
	
	draw: function() {
		this._drawStatus += (this.status - this._drawStatus)/5;
		var s = ig.system.scale;
		var w = ig.system.width * 0.6;
		var h = ig.system.height * 0.03;
		var x = ig.system.width * 0.5-w/2;
		var y = ig.system.height * 0.5-h/2;
		var ctx = ig.system.context;
		
		//console.log(this._drawStatus);
		//ig.system.context.fillStyle = '#000';
		//ig.system.context.fillRect( 0, 0, 480, 320 );
		
		/*ig.system.context.fillStyle = '#040';
		ig.system.context.fillRect( x*s, y*s, w*s, h*s );
		
		ig.system.context.fillStyle = '#000';
		ig.system.context.fillRect( x*s+s, y*s+s, w*s-s-s, h*s-s-s );
		
		ig.system.context.fillStyle = '#040';
		ig.system.context.fillRect( x*s, y*s, w*s*this._drawStatus, h*s );*/
		
		
		// layer5/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(780.5, 480.5);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(0.5, 22.1);
      ctx.lineTo(780.5, 22.1);
      ctx.lineTo(780.5, 480.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
	  
	  // verde/Path
      ctx.save();
      ctx.beginPath();
      ctx.rect(200,320-this._drawStatus*200,400,400);
	  ctx.closePath();
	  ctx.fillStyle = "rgb(0, 165, 80)";
	  ctx.fill();
      ctx.restore();
	  
	   ctx.save();
      ctx.beginPath();

      // negro/Compound Path/Path
      ctx.moveTo(0.5, 22.1);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(780.5, 480.5);
      ctx.lineTo(780.5, 22.1);
      ctx.lineTo(0.5, 22.1);
      ctx.closePath();

      // negro/Compound Path/Path
      ctx.moveTo(452.6, 304.7);
      ctx.bezierCurveTo(446.9, 304.7, 435.0, 305.2, 416.5, 306.3);
      ctx.bezierCurveTo(402.8, 278.2, 394.8, 262.9, 392.7, 260.9);
      ctx.bezierCurveTo(380.7, 289.0, 373.2, 304.5, 370.5, 307.3);
      ctx.lineTo(330.8, 302.6);
      ctx.bezierCurveTo(328.3, 301.4, 318.3, 272.5, 300.7, 215.4);
      ctx.bezierCurveTo(289.0, 182.9, 283.2, 165.4, 283.4, 162.9);
      ctx.bezierCurveTo(283.6, 160.6, 306.6, 155.8, 351.1, 148.8);
      ctx.bezierCurveTo(352.2, 150.8, 356.8, 181.6, 364.9, 241.1);
      ctx.lineTo(365.9, 241.2);
      ctx.bezierCurveTo(366.0, 239.9, 373.8, 229.3, 389.1, 209.6);
      ctx.bezierCurveTo(394.7, 214.8, 405.1, 225.7, 420.2, 242.2);
      ctx.lineTo(422.1, 242.5);
      ctx.lineTo(422.2, 241.4);
      ctx.bezierCurveTo(426.8, 203.1, 429.8, 182.2, 431.2, 178.2);
      ctx.bezierCurveTo(467.4, 186.9, 484.9, 191.8, 484.9, 193.1);
      ctx.bezierCurveTo(464.8, 264.0, 453.9, 301.9, 452.6, 304.7);
      ctx.closePath();
      ctx.fill();

      // negro/Path
      ctx.beginPath();
      ctx.moveTo(780.5, 30.3);
      ctx.lineTo(0.5, 30.3);
      ctx.lineTo(0.5, 0.5);
      ctx.lineTo(780.5, 0.5);
      ctx.lineTo(780.5, 30.3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
	  
	   // w/Path
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(780.5, 480.5);
      ctx.lineTo(0.5, 480.5);
      ctx.lineTo(0.5, 0.5);
      ctx.lineTo(780.5, 0.5);
      ctx.lineTo(780.5, 480.5);
      ctx.closePath();
      ctx.stroke();

      // w/Group

      // w/Group/Compound Path
      ctx.save();
      ctx.beginPath();

      // w/Group/Compound Path/Path
      ctx.moveTo(370.2, 311.9);
      ctx.lineTo(330.5, 307.3);
      ctx.bezierCurveTo(330.0, 307.3, 329.5, 307.2, 329.1, 307.0);
      ctx.bezierCurveTo(326.1, 305.6, 323.5, 304.3, 296.3, 216.6);
      ctx.bezierCurveTo(278.4, 166.9, 278.6, 164.0, 278.7, 162.0);
      ctx.bezierCurveTo(279.1, 157.4, 279.2, 155.1, 350.0, 144.2);
      ctx.bezierCurveTo(351.8, 144.0, 353.7, 145.0, 354.7, 146.8);
      ctx.bezierCurveTo(355.7, 148.4, 356.9, 150.5, 367.7, 230.1);
      ctx.bezierCurveTo(371.3, 225.2, 376.9, 217.8, 385.8, 206.4);
      ctx.bezierCurveTo(387.2, 204.6, 389.9, 204.5, 391.7, 206.2);
      ctx.bezierCurveTo(396.8, 211.0, 405.8, 220.3, 418.8, 234.6);
      ctx.bezierCurveTo(424.6, 187.8, 426.5, 178.8, 427.4, 176.2);
      ctx.bezierCurveTo(428.1, 174.3, 429.9, 173.4, 431.7, 173.8);
      ctx.bezierCurveTo(449.9, 178.3, 463.5, 181.7, 472.3, 184.2);
      ctx.bezierCurveTo(485.1, 187.8, 488.9, 188.9, 488.7, 193.8);
      ctx.bezierCurveTo(488.7, 194.1, 488.6, 194.4, 488.5, 194.8);
      ctx.bezierCurveTo(458.2, 302.3, 456.8, 305.5, 456.1, 306.9);
      ctx.bezierCurveTo(455.5, 308.3, 454.2, 309.2, 452.8, 309.2);
      ctx.bezierCurveTo(447.2, 309.2, 435.2, 309.8, 416.9, 310.9);
      ctx.bezierCurveTo(415.3, 311.1, 413.7, 310.1, 412.9, 308.4);
      ctx.bezierCurveTo(402.4, 287.0, 396.7, 275.9, 393.5, 270.1);
      ctx.bezierCurveTo(379.8, 301.9, 375.6, 308.6, 373.4, 310.8);
      ctx.bezierCurveTo(372.6, 311.6, 371.4, 312.1, 370.2, 311.9);
      ctx.closePath();

      // w/Group/Compound Path/Path
      ctx.moveTo(333.1, 298.0);
      ctx.lineTo(368.5, 302.3);
      ctx.bezierCurveTo(370.6, 299.0, 375.9, 288.9, 388.8, 258.7);
      ctx.bezierCurveTo(389.3, 257.4, 390.4, 256.6, 391.7, 256.3);
      ctx.bezierCurveTo(393.0, 256.1, 394.3, 256.5, 395.3, 257.5);
      ctx.bezierCurveTo(396.7, 258.8, 399.1, 261.1, 418.8, 301.6);
      ctx.bezierCurveTo(433.4, 300.8, 443.7, 300.3, 449.8, 300.2);
      ctx.bezierCurveTo(452.1, 292.9, 459.7, 267.1, 480.1, 195.4);
      ctx.bezierCurveTo(475.4, 193.8, 463.7, 190.5, 434.3, 183.4);
      ctx.bezierCurveTo(433.1, 189.3, 430.8, 204.4, 426.3, 242.2);
      ctx.lineTo(426.2, 243.1);
      ctx.bezierCurveTo(426.1, 245.6, 424.1, 247.3, 421.9, 247.0);
      ctx.lineTo(419.9, 246.7);
      ctx.bezierCurveTo(419.0, 246.6, 418.1, 246.1, 417.4, 245.3);
      ctx.bezierCurveTo(405.0, 231.8, 395.7, 222.0, 389.8, 216.1);
      ctx.bezierCurveTo(374.1, 236.5, 370.7, 241.6, 370.0, 242.9);
      ctx.bezierCurveTo(369.5, 244.9, 367.6, 246.2, 365.6, 245.9);
      ctx.lineTo(364.6, 245.7);
      ctx.bezierCurveTo(362.5, 245.4, 360.9, 243.6, 360.6, 241.4);
      ctx.bezierCurveTo(352.7, 183.7, 349.4, 161.9, 347.9, 154.1);
      ctx.bezierCurveTo(306.8, 160.7, 293.0, 164.1, 288.5, 165.6);
      ctx.bezierCurveTo(289.7, 170.0, 293.5, 182.0, 305.0, 214.0);
      ctx.bezierCurveTo(305.0, 214.1, 305.0, 214.2, 305.1, 214.2);
      ctx.bezierCurveTo(324.5, 277.1, 331.0, 293.8, 333.1, 298.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fill();
      ctx.restore();
      ctx.restore();
	  this.tipMessage.draw("'The game starts after the ad'",ig.system.width/2,ig.system.height/2+150,ig.Font.ALIGN.CENTER);
	},
	
	
	_loadCallback: function( path, status ) {
		if( status ) {
			this._unloaded.erase( path );
		}
		else {
			throw( 'Failed to load resource: ' + path );
		}
		
		this.status = 1 - (this._unloaded.length / this.resources.length);
		if( this._unloaded.length == 0 ) { // all done?
			setTimeout( this.end.bind(this), 250 );
		}
	}
});

});