/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var now = ( self.performance && self.performance.now ) ? self.performance.now.bind( performance ) : Date.now;

	var startTime = now(), prevTime = startTime;
	var frames = 0, mode = 0;

	function createElement( tag, id, css ) {

		var element = document.createElement( tag );
		element.id = id;
		element.style.cssText = css;
		return element;

	}

	function createPanelDiv( id, fg, bg ) {

		var div = createElement( 'div', id, 'padding:0 0 3px 3px;text-align:left;background:' + bg );
		div.style.display = 'none';

		var text = createElement( 'div', id + 'Text', 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + fg );
		text.innerHTML = id.toUpperCase();
		div.appendChild( text );

		var graph = createElement( 'div', id + 'Graph', 'width:74px;height:30px;background:' + fg );
		div.appendChild( graph );

		for ( var i = 0; i < 74; i ++ ) {

			graph.appendChild( createElement( 'span', '', 'width:1px;height:30px;float:left;opacity:0.9;background:' + bg ) );

		}

		return div;

	}

	function createPanel( id, fg, bg, displayName, topVal ) {
		var min = Infinity;
		var max = 0;
		var div = createPanelDiv( id, fg, bg );
		var text = div.children[ 0 ];
		var graph = div.children[ 1 ];
		container.appendChild( div );
		return {
			div: div,
			update: function(newVal) {
				min = Math.min( min, newVal );
				max = Math.max( max, newVal );
				text.textContent = ( newVal | 0 ) + ' ' + displayName + ' (' + ( min | 0 ) + '-' + ( max | 0 ) + ')';
				updateGraph( graph, newVal / topVal );
			}
		}
	}

	function setMode( value ) {

		var children = container.children;

		for ( var i = 0; i < children.length; i ++ ) {

			children[ i ].style.display = i === value ? 'block' : 'none';

		}

		mode = value;

	}

	function updateGraph( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = Math.min( 30, 30 - value * 30 ) + 'px';

	}

	//

	var container = createElement( 'div', 'stats', 'width:80px;opacity:0.9;cursor:pointer' );
	container.addEventListener( 'mousedown', function ( event ) {

		event.preventDefault();
		setMode( ++ mode % container.children.length );

	}, false );

	// FPS

	var fpsPanel = createPanel( 'fps', '#0ff', '#002', 'FPS', 100 );

	// MS

	var msPanel = createPanel( 'ms', '#0f0', '#020', 'MS', 200 );

	// MEM

	if ( self.performance && self.performance.memory ) {

		var memPanel = createPanel( 'mb', '#f08', '#201', 'MB', performance.memory.jsHeapSizeLimit );

	}

	//

	setMode( mode );

	return {

		REVISION: 14,

		domElement: container,

		setMode: setMode,

		createPanel: createPanel,

		begin: function () {

			startTime = now();

		},

		end: function () {

			var time = now();

			ms = time - startTime;
			msPanel.update( ms );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsPanel.update( fps );

				prevTime = time;
				frames = 0;

				if ( memPanel !== undefined ) {

					var heapSize = performance.memory.usedJSHeapSize;
					mem = Math.round( heapSize * 0.000000954 );
					memPanel.update( mem );

				}

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
