/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var startTime = Date.now(), prevTime = startTime;
	var frames = 0, mode = 0, size = 74;
	var ArrayType = Int16Array || Array;

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
	container.style.cssText = 'width:' + ( size + 6 ) + 'px;opacity:0.9;cursor:pointer';

	var createGraph = function( id, color, bgColor, graphBgColor, maxValue ) {

		var history = new ArrayType( size ), next = 0, min = 0, max = 0, isFull = false;

		var div = document.createElement( 'div' );
		div.id = id;
		div.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:' + bgColor;
		container.appendChild( div );

		var text = document.createElement( 'div' );
		text.id = id + 'Text';
		text.style.cssText = 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + color;
		text.innerHTML = id.toUpperCase();
		div.appendChild( text );

		var graph = document.createElement( 'div' );
		graph.id = id + 'Graph';
		graph.style.cssText = 'position:relative;width:' + size + 'px;height:30px;background-color:' + color;
		div.appendChild( graph );

		while ( graph.children.length < size ) {

			var bar = document.createElement( 'span' );
			bar.style.cssText = 'width:1px;height:30px;float:left;background-color:' + graphBgColor;
			graph.appendChild( bar );

		}

		var updateExtreme = function ( extreme, compareFunc, value ) {

			// check if value is a new extreme
			if ( compareFunc( value, history[ extreme ] ) === value ) {

				extreme = next;

			// check if old extreme will be overwritten
			} else if ( extreme === next ) {

				// only look at the part of the history that was filled so far
				var length = isFull ? size : next + 1;

				// start at the oldest value
				extreme = ( next + 1 ) % length;

				// go through the whole history
				for ( var i = extreme; i !== next; i = ( i + 1 ) % length ) {

					// look for the most recent extreme
					if ( compareFunc( history[ extreme ], history[ i ] ) === history[ i ] ) {

						extreme = i;

					}

				}

			}

			return extreme;

		}

		return {

			update : function( value ) {

				// update the extremes if necessary
				min = updateExtreme( min, Math.min, value );
				max = updateExtreme( max, Math.max, value );

				// save the new value
				history[ next ] = value;
				next = ( next + 1 ) % size;

				// check if the history has been filled
				if ( next === 0 ) {

					isFull = true;

				}

				text.textContent = value + ' ' + id.toUpperCase() + ' (' + history[ min ] + '-' + history[ max ] + ')';

				var child = graph.appendChild( graph.firstChild );
				child.style.height = Math.max( ( 1 - value / maxValue ) * 30, 1 ) + 'px';

			},

			display : function ( value ) {

				div.style.display = value;

			}

		}

	}

	var setMode = function ( value ) {

		mode = value;

		fps.display( mode === 0 ? 'block' : 'none' );
		ms.display( mode === 1 ? 'block' : 'none' );

	}

	var fps = createGraph( 'fps', '#0ff', '#002', '#113', 100 );
	var ms = createGraph( 'ms', '#0f0', '#020', '#131', 200 );

	setMode( 0 );

	return {

		REVISION: 11,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = Date.now();

		},

		end: function () {

			var time = Date.now();

			ms.update( time - startTime );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps.update( Math.round( ( frames * 1000 ) / ( time - prevTime ) ) );

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
