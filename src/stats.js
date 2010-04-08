/*
 * stats.js 1.2
 * http://code.google.com/p/mrdoob/wiki/stats_js
 *
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * How to use:
 *
 *  var stats = new Stats();
 *  dom_element.appendChild( stats.getDisplayElement() );
 *
 *  setInterval(loop, 1000/60);
 *
 *  function loop()
 *  {
 *     stats.update();
 *  }
 *
 * version log:
 *
 *	10.03.01		1.2		Mr.doob		+ Simplified
 *	10.02.21		1.1		Mr.doob		+ Accurate FPS calculation (thx Spite!)
 *	09.08.10		1.0		Mr.doob		+ Base code
 *	
 */

function Stats()
{
	this.init();
}

Stats.prototype =
{
	init: function()
	{
		this.frames = 0;
		this.framesMin = 1000;
		this.framesMax = 0;
			
		this.time = new Date().getTime();
		this.timePrev = new Date().getTime(); 
	
		this.container = document.createElement("div");
		this.container.style.position = 'absolute';
		this.container.style.fontFamily = 'Arial';
		this.container.style.fontSize = '10px';
		this.container.style.backgroundColor = '#000020';
		this.container.style.opacity = '0.9';
		this.container.style.width = '80px';
		this.container.style.paddingTop = '2px';
		
		this.framesText = document.createElement("div");
		this.framesText.style.color = '#00ffff';
		this.framesText.style.marginLeft = '3px';
		this.framesText.style.marginBottom = '3px';
		this.framesText.innerHTML = '<strong>FPS</strong>';
		this.container.appendChild(this.framesText);
		
		this.canvas = document.createElement("canvas");
		this.canvas.width = 74;
		this.canvas.height = 30;
		this.canvas.style.display = 'block';
		this.canvas.style.marginLeft = '3px';
		this.canvas.style.marginBottom = '3px';
		this.container.appendChild(this.canvas);
			
		this.context = this.canvas.getContext("2d");
		this.context.fillStyle = '#101030';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height );
	
		this.contextImageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	},

	getDisplayElement: function()
	{
		return this.container;
	},
	
	update: function()
	{
		this.frames++

		this.time = new Date().getTime();

		if (this.time >= this.timePrev + 1000)
		{
			this.fps = Math.round((this.frames * 1000 ) / (this.time - this.timePrev));

			this.framesMin = Math.min(this.framesMin, this.fps);
			this.framesMax = Math.max(this.framesMax, this.fps);
	
			this.framesText.innerHTML = '<strong>' + this.fps + ' FPS</strong> (' + this.framesMin + '-' + this.framesMax + ')';
	
			this.contextImageData = this.context.getImageData(1, 0, this.canvas.width - 1, 30);
			this.context.putImageData(this.contextImageData, 0, 0);
		
			this.context.fillStyle = '#101030';
			this.context.fillRect(this.canvas.width - 1, 0, 1, 30);
		
			this.index = ( Math.floor(30 - Math.min(30, (this.fps / 60) * 30)) );

			this.context.fillStyle = '#80ffff';
			this.context.fillRect(this.canvas.width - 1, this.index, 1, 1);

			this.context.fillStyle = '#00ffff';
			this.context.fillRect(this.canvas.width - 1, this.index + 1, 1, 30 - this.index);

			this.timePrev = this.time;
			this.frames = 0;
		}
	}
}
