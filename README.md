This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames per second, how many frames were rendered in 1 second. The higher the number, the better.

### Screenshot

![stats_js.png](http://github.com/mrdoob/stats.js/raw/master/assets/stats_js.png)

### How to use

	var stats = new Stats();
	dom_element.appendChild( stats.getDisplayElement() );
	
	setInterval(loop, 1000/60);
	
	function loop()
	{
		stats.update();
	}

### Change Log

2010 03 01 - v**1.2**

* Simplified


2010 02 21 - v**1.1**

* Accurate FPS calculation (thx Spite!)

 
2009 08 09 - v**1.0**

* Base code
