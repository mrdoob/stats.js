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

	var extremIndex = function ( array, length, compareFunc, currentIndex ) {

		var index = ( currentIndex + 1 ) % length;

		for ( var i = index; i !== currentIndex; i = ( i + 1 ) % length ) {

			if ( compareFunc( array[index], array[i] ) === array[i] ) {

				index = i;

			}

		}

		return index;

	}

	var createGraph = function( id, color, bgColor, graphBgColor, scale ) {

		var index = 0, min = 0, max = 0, history = new ArrayType( size ), looped = false;

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

		return {

			update : function( value ) {

				if ( value <= history[ min ] ) {

					min = index;

				} else if ( min === index ) {

					min = extremIndex( history, looped ? size : index + 1, Math.min, index );

				}

				if ( value >= history[ max ] ) {

					max = index;

				} else if ( max === index ) {

					max = extremIndex( history, looped ? size : index + 1, Math.max, index );

				}

				history[ index ] = value;
				index = ( index + 1 ) % size;

				if ( index === 0 ) {

					looped = true;

				}

				text.textContent = value + ' ' + id.toUpperCase() + ' (' + history[ min ] + '-' + history[ max ] + ')';

				var child = graph.appendChild( graph.firstChild );
				child.style.height = Math.max( ( 1 - value / scale ) * 30, 1 ) + 'px';

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
