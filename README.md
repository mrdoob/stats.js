stats.js
========

#### Javascript Performance Monitor ####

![stats_js.png](http://github.com/mrdoob/stats.js/raw/master/assets/stats_js.png)

This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames per second, how many frames were rendered in 1 second. The higher the number, the better.


### How to use ###

	var stats = new Stats();
	parentElement.appendChild(stats.domElement);

	setInterval(function () {
		stats.update();
	}, 1000/60);

Aligning the panel on the top-left corner can be done like this:

	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';

	parentElement.appendChild(stats.domElement);

	setInterval(function () {
		stats.update();
	}, 1000/60);

### Change Log ###

2010 05 12 - **r3** (1.241 kb)

* Switched to module pattern code style.
* Removed position = 'absolute'


2010 03 01 - **r2** (2.177 kb)

* Simplified.


2010 02 21 - **r1**

* Accurate FPS calculation (thx Spite!)

 
2009 08 09 - **r0**

* Base code
