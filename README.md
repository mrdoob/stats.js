stats.js
========

#### JavaScript Performance Monitor ####

This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.


### Screenshots ###

![stats_js_fps.png](http://mrdoob.github.com/stats.js/assets/stats_js_fps.png)
![stats_js_ms.png](http://mrdoob.github.com/stats.js/assets/stats_js_ms.png)


### Usage ###

```javascript
var stats = new Stats();
stats.setMode(1); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

var update = function () {

	stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( update );

};

requestAnimationFrame( update );
```


### Bookmarklet ###

You can add this code to any page using the following bookmarklet:

```javascript
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();stats.domElement.style.cssText='position:fixed;left:0;top:0;z-index:10000';document.body.appendChild(stats.domElement);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
```
