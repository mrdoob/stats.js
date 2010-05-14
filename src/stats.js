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

	var _frames, _framesMin, _framesMax, _time, _timePrev,
	_container, _text, _canvas, _context, _imageData;
	
	_frames = 0;
	_framesMin = 1000;
	_framesMax = 0;
	
	_time = new Date().getTime();
	_timePrev = _time;
	
	_container = document.createElement('div');
	_container.style.fontFamily = 'Helvetica, Arial, sans-serif';
	_container.style.fontSize = '9px';
	_container.style.backgroundColor = '#000020';
	_container.style.opacity = '0.9';
	_container.style.width = '80px';
	_container.style.paddingTop = '2px';
	
	_text = document.createElement('div');
	_text.style.color = '#00ffff';
	_text.style.marginLeft = '3px';
	_text.style.marginBottom = '3px';
	_text.innerHTML = '<strong>FPS</strong>';
	_container.appendChild(_text);

	_canvas = document.createElement('canvas');
	_canvas.width = 74;
	_canvas.height = 30;
	_canvas.style.display = 'block';
	_canvas.style.marginLeft = '3px';
	_canvas.style.marginBottom = '3px';
	_container.appendChild(_canvas);
		
	_context = _canvas.getContext('2d');
	_context.fillStyle = '#101030';
	_context.fillRect(0, 0, _canvas.width, _canvas.height);

	_imageData = _context.getImageData(0, 0, _canvas.width, _canvas.height);
	
	return {
		
		domElement: _container,
		
		update: function () {

			var fps, index;

			_time = new Date().getTime();
			_frames += 1;

			if (_time >= _timePrev + 1000) {
			
				fps = Math.round((_frames * 1000) / (_time - _timePrev));

				_framesMin = Math.min(_framesMin, fps);
				_framesMax = Math.max(_framesMax, fps);
	
				_text.innerHTML = '<strong>' + fps + ' FPS</strong> (' + _framesMin + '-' + _framesMax + ')';
	
				_imageData = context.getImageData(1, 0, _canvas.width - 1, 30);
				_context.putImageData(_imageData, 0, 0);
		
				_context.fillStyle = '#101030';
				_context.fillRect(_canvas.width - 1, 0, 1, 30);
		
				index = Math.floor(30 - Math.min(30, (fps / 60) * 30));

				_context.fillStyle = '#80ffff';
				_context.fillRect(_canvas.width - 1, index, 1, 1);

				_context.fillStyle = '#00ffff';
				_context.fillRect(_canvas.width - 1, index + 1, 1, 30 - index);

				_timePrev = _time;
				_frames = 0;
			}
		}
	};
};
