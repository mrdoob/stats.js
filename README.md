stats.js
========

#### Javascript Performance Monitor ####

[![Flattr this](http://api.flattr.com/button/button-compact-static-100x17.png)](http://flattr.com/thing/1993/stats-js)

This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.
* **MEM** Mbytes of memory allocated. Make sure it doesn't keep incrementing. (Chrome only, --enable-memory-info flag required)

### Screenshots ###

![stats_js_fps.png](http://mrdoob.github.com/stats.js/assets/stats_js_fps.png) ![stats_js_ms.png](http://mrdoob.github.com/stats.js/assets/stats_js_ms.png)  ![stats_js_mem.png](http://mrdoob.github.com/stats.js/assets/stats_js_mem.png)

### Usage ###

	var stats = new Stats();
	parentElement.appendChild(stats.domElement);

	setInterval(function () {

		stats.update();

	}, 1000/60);

Aligning the panel to the top-left corner:

	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	parentElement.appendChild(stats.domElement);

	setInterval(function () {

		stats.update();

	}, 1000/60);

### Change Log ###

2010 09 21 - **r5** (3.775 kb)

* Different color per mode.
* Added MEM mode. (Chrome only)


2010 06 11 - **r4** (2.235 kb)

* Added MS mode.


2010 05 12 - **r3** (1.241 kb)

* Switched to module pattern code style.
* Removed `position = 'absolute'`.


2010 03 01 - **r2** (2.177 kb)

* Simplified.


2010 02 21 - **r1**

* Accurate FPS calculation. (thx Spite!)

 
2009 08 09 - **r0**

* Base code.
