![stats_js.png](http://mrdoob.googlecode.com/svn/trunk/assets/stats_js.png)

This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames per second, how many frames were rendered in 1 second. The higher the number, the better.

### How to use

	var stats = new Stats();
	container.appendChild( stats.getDisplayElement() ); // container is a DOM Element
	
	setInterval(loop, 1000/60);
	
	function loop()
	{
		stats.tick();
	}

### Change Log

2010 02 21 - v**1.1**

* Accurate FPS calculation (thx Spite!)

 
2009 08 09 - v**1.0**

* Base code
