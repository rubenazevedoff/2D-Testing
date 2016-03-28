MAIN = {};

MAIN = {
	start: function() {
		this.canvas = document.getElementById('game');
		this.context = this.canvas.getContext('2d');

		this.normalizeCanvas();
	},

	normalizeCanvas: function() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.initImages();
	},

	initImages: function() {
		var _this = this;

		this.grass = new Image(),
		this.rock = new Image();
		this.char = new Image();

		this.grass.src = 'img/grass.png';
		this.rock.src = 'img/rock.png';
		this.char.src = 'img/char.png';
		
		//When last image is loaded
		this.char.onload = function(){
	   		_this.initMap();
	  	}
	},

	initMap: function() {
		var i=0,
			j=0,
			posX=0,
			posY=0;
		
		this.tileSize = 32;

		this.map = [
			[1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1]
		];

		this.renderMap();

		this.initChar();
		this.bindMovement();
	},

	renderMap: function() {
		var i=0,
			j=0,
			posX=0,
			posY=0;
			
		for(i=0; i<this.map.length; i++) {
			for(j=0; j<this.map[i].length; j++) {
				if(this.map[i][j] === 0) {
					this.context.drawImage(this.grass, posX, posY, this.tileSize, this.tileSize);
				}
				if(this.map[i][j] === 1) {
					this.context.drawImage(this.rock, posX, posY, this.tileSize, this.tileSize);
				}
				posX += this.tileSize;
			}
			posX = 0;
			posY += this.tileSize;
		}
	},

	initChar: function() {
		this.charX = 4*this.tileSize;
		this.charY = 3*this.tileSize;

		this.context.drawImage(this.char, this.charX, this.charY, this.tileSize, this.tileSize);
	},

	bindMovement: function(e) {
		window.addEventListener('keyup', this.movement.bind(this));
	},

	movement: function(e) {
		var code = e.keyCode;

		if(code === 38) {
			this.renderMap();
			this.context.drawImage(this.char,  this.charX, this.charY-=32, this.tileSize, this.tileSize);
		}

		if(code === 39) {
			this.renderMap();
			this.context.drawImage(this.char, this.charX+=32, this.charY, this.tileSize, this.tileSize);
		}

		if(code === 40) {
			this.renderMap();
			this.context.drawImage(this.char,  this.charX, this.charY+=32, this.tileSize, this.tileSize);
		}

		if(code === 37) {
			this.renderMap();
			this.context.drawImage(this.char, this.charX-=32, this.charY, this.tileSize, this.tileSize);
		}
	}
}

MAIN.start();