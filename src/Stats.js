/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var size = 74;
	var ArrayType = Int16Array || Array;

	var startTime = Date.now(), prevTime = startTime;
	var ms = 0, msIndex = 0, msMin = 0, msMax = 0, msHistory = new ArrayType( size ), msFull = false;
	var fps = 0, fpsIndex = 0, fpsMin = 0, fpsMax = 0, fpsHistory = new ArrayType( size ), fpsFull = false;
	var frames = 0, mode = 0;

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var fpsDiv = document.createElement( 'div' );
	fpsDiv.id = 'fps';
	fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
	container.appendChild( fpsDiv );

	var fpsText = document.createElement( 'div' );
	fpsText.id = 'fpsText';
	fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	fpsText.innerHTML = 'FPS';
	fpsDiv.appendChild( fpsText );

	var fpsGraph = document.createElement( 'div' );
	fpsGraph.id = 'fpsGraph';
	fpsGraph.style.cssText = 'position:relative;width:' + size + 'px;height:30px;background-color:#0ff';
	fpsDiv.appendChild( fpsGraph );

	while ( fpsGraph.children.length < size ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
		fpsGraph.appendChild( bar );

	}

	var msDiv = document.createElement( 'div' );
	msDiv.id = 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
	container.appendChild( msDiv );

	var msText = document.createElement( 'div' );
	msText.id = 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML = 'MS';
	msDiv.appendChild( msText );

	var msGraph = document.createElement( 'div' );
	msGraph.id = 'msGraph';
	msGraph.style.cssText = 'position:relative;width:' + size + 'px;height:30px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < size ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
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

	}

	var updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	}

	var findIndex = function ( array, length, compareFunc, currentIndex ) {

		var index = ( currentIndex + 1 ) % length;

		for ( var i = index; i !== currentIndex; i = ( i + 1 ) % length ) {

			if ( compareFunc( array[index], array[i] ) === array[i] ) {

				index = i;

			}

		}

		return index;

	}

	return {

		REVISION: 11,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = Date.now();

		},

		end: function () {

			var time = Date.now();

			ms = time - startTime;

			if ( ms <= msHistory[ msMin ] ) {

				msMin = msIndex;

			} else if ( msMin === msIndex ) {

				msMin = findIndex( msHistory, msFull ? size : msIndex + 1, Math.min, msIndex );

			}

			if ( ms >= msHistory[ msMax ] ) {

				msMax = msIndex;

			} else if ( msMax === msIndex ) {

				msMax = findIndex( msHistory, msFull ? size : msIndex + 1, Math.max, msIndex );

			}

			msHistory[ msIndex ] = ms;
			msIndex = ( msIndex + 1 ) % size;

			if ( msIndex === 0 ) {

				msFull = true;

			}

			msText.textContent = ms + ' MS (' + msHistory[ msMin ] + '-' + msHistory[ msMax ] + ')';
			updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );

				if ( fps <= fpsHistory[ fpsMin ] ) {

					fpsMin = fpsIndex;

				} else if ( fpsMin === fpsIndex ) {

					fpsMin = findIndex( fpsHistory, fpsFull ? size : fpsIndex + 1, Math.min, fpsIndex );

				}

				if ( fps >= fpsHistory[ fpsMax ] ) {

					fpsMax = fpsIndex;

				} else if ( fpsMax === fpsIndex ) {

					fpsMax = findIndex( fpsHistory, fpsFull ? size : fpsIndex + 1, Math.max, fpsIndex );

				}

				fpsHistory[ fpsIndex ] = fps;
				fpsIndex = ( fpsIndex + 1 ) % size;

				if ( fpsIndex === 0 ) {

					fpsFull = true;

				}

				fpsText.textContent = fps + ' FPS (' + fpsHistory[ fpsMin ] + '-' + fpsHistory[ fpsMax ] + ')';
				updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

				prevTime = time;
				frames = 0;

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	}

};
