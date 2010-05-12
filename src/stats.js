/*
 * stats.js r3
 * http://github.com/mrdoob/stats.js
 *
 * Released under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * How to use:
 *
 *  var stats = new Stats();
 *  parentElement.appendChild(stats.domElement);
 *
 *  setInterval(loop, 1000/60);
 *
 *  function loop() {
 *     stats.update();
 *  }
 *
 */

var Stats = function () {

	var frames, framesMin, framesMax, time, timePrev, container,
	text, canvas, context, imageData;
	
	frames = 0;
	framesMin = 1000;
	framesMax = 0;
	
	time = new Date().getTime();
	timePrev = time;
	
	container = document.createElement('div');
	container.style.fontFamily = 'Helvetica, Arial, sans-serif';
	container.style.fontSize = '9px';
	container.style.backgroundColor = '#000020';
	container.style.opacity = '0.9';
	container.style.width = '80px';
	container.style.paddingTop = '2px';
	
	text = document.createElement('div');
	text.style.color = '#00ffff';
	text.style.marginLeft = '3px';
	text.style.marginBottom = '3px';
	text.innerHTML = '<strong>FPS</strong>';
	container.appendChild(text);

	canvas = document.createElement('canvas');
	canvas.width = 74;
	canvas.height = 30;
	canvas.style.display = 'block';
	canvas.style.marginLeft = '3px';
	canvas.style.marginBottom = '3px';
	container.appendChild(canvas);
		
	context = canvas.getContext('2d');
	context.fillStyle = '#101030';
	context.fillRect(0, 0, canvas.width, canvas.height);

	imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	
	return {
		
		domElement: container,
		
		update: function () {

			var fps, index;

			time = new Date().getTime();
			frames += 1;

			if (time >= timePrev + 1000) {
			
				fps = Math.round((frames * 1000) / (time - timePrev));

				framesMin = Math.min(framesMin, fps);
				framesMax = Math.max(framesMax, fps);
	
				text.innerHTML = '<strong>' + fps + ' FPS</strong> (' + framesMin + '-' + framesMax + ')';
	
				imageData = context.getImageData(1, 0, canvas.width - 1, 30);
				context.putImageData(imageData, 0, 0);
		
				context.fillStyle = '#101030';
				context.fillRect(canvas.width - 1, 0, 1, 30);
		
				index = Math.floor(30 - Math.min(30, (fps / 60) * 30));

				context.fillStyle = '#80ffff';
				context.fillRect(canvas.width - 1, index, 1, 1);

				context.fillStyle = '#00ffff';
				context.fillRect(canvas.width - 1, index + 1, 1, 30 - index);

				timePrev = time;
				frames = 0;
			}
		}
	};
};
