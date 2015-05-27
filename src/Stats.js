/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function (options) {
	// Use high resolution timing API, if available
	window.performance = window.performance || {};
	performance.now = performance.now || function() { return new Date().getTime(); };

	options = options || {};

	var barHeight = options.barHeight || 30;
	var bars = options.bars || 74;

	var startTime = performance.now(), prevTime = startTime;
	var ms = 0, msMin = Infinity, msMax = 0;
	var fps = 0, fpsMin = Infinity, fpsMax = 0;
	var frames = 0, mode = 0;

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ); }, false );
	container.style.cssText = 'width:' + (bars + 6) + 'px;opacity:0.9;cursor:pointer;font-family:Consolas,Arial,monospace;font-size:9px;font-weight:bold;line-height:15px;text-align:left';

	var fpsDiv = document.createElement( 'div' );
	fpsDiv.id = 'fps';
	fpsDiv.style.cssText = 'padding:0 0 3px 3px;background-color:#002;color:#0ff';
	container.appendChild( fpsDiv );

	var fpsMinMax = document.createElement( 'div' );
	fpsMinMax.id = 'fpsTextMinMax';
	fpsMinMax.style.cssText = 'text-align:right;height:0;padding-right:3px';
	fpsDiv.appendChild( fpsMinMax );

	var fpsText = document.createElement( 'div' );
	fpsText.id = 'fpsText';
	fpsText.innerHTML = 'FPS';
	fpsDiv.appendChild( fpsText );

	var fpsGraph = document.createElement( 'div' );
	fpsGraph.id = 'fpsGraph';
	fpsGraph.style.cssText = 'position:relative;width:' + bars + 'px;height:' + barHeight + 'px;background-color:#0ff';
	fpsDiv.appendChild( fpsGraph );

	while ( fpsGraph.children.length < bars ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:' + barHeight + 'px;float:left;background-color:#113';
		fpsGraph.appendChild( bar );

	}

	var msDiv = document.createElement( 'div' );
	msDiv.id = 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;background-color:#020;display:none;color:#0f0;';
	container.appendChild( msDiv );

	var msMinMax = document.createElement( 'div' );
	msMinMax.id = 'msTextMinMax';
	msMinMax.style.cssText = 'text-align:right;height:0;padding-right:3px';
	msDiv.appendChild( msMinMax );

	var msText = document.createElement( 'div' );
	msText.id = 'msText';
	msText.innerHTML = 'MS';
	msDiv.appendChild( msText );

	var msGraph = document.createElement( 'div' );
	msGraph.id = 'msGraph';
	msGraph.style.cssText = 'position:relative;width:' + bars + 'px;height:' + barHeight + 'px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < bars ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height: ' + barHeight + 'px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var setMode = function ( value ) {

		mode = value;

		switch ( mode ) {

			case 0:
				fpsDiv.style.display = 'block';
				msDiv.style.display = 'none';
				break;
			case 1:
				fpsDiv.style.display = 'none';
				msDiv.style.display = 'block';
				break;
		}

	};

	var updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	};

	return {

		REVISION: 12,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = performance.now();

		},

		end: function () {

			var time = performance.now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ms.toFixed(1) + ' MS';
			msMinMax.textContent = '(' + msMin.toFixed(1) + '-' + msMax.toFixed(1) + ')';
			updateGraph( msGraph, Math.min( barHeight, barHeight - ( ms / 200 ) * barHeight ) );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = (( frames * 1000 ) / ( time - prevTime )).toFixed(1);
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS';
				fpsMinMax.textContent = '(' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, Math.min( barHeight, barHeight - ( fps / 100 ) * barHeight ) );

				prevTime = time;
				frames = 0;

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	};

};

if ( typeof module === 'object' ) {

	module.exports = Stats;

}