stats.js
========

#### JavaScript Performance Monitor ####

This class provides a simple info box that will help you monitor your code performance.

* **FPS** Frames rendered in the last second. The higher the number the better.
* **MS** Milliseconds needed to render a frame. The lower the number the better.


### Screenshots ###

Original version by Mr. doob :
![stats_js_fps.png](http://mrdoob.github.com/stats.js/assets/stats_js_fps.png)
![stats_js_ms.png](http://mrdoob.github.com/stats.js/assets/stats_js_ms.png)

Tweaked version by daformat :
![stats_js_fps.png](http://mathieujouhet.com/_external/stats_js_fps.png)
![stats_js_ms.png](http://mathieujouhet.com/_external/stats_js_ms.png)


### Live example ###
You can watch the tweaked widget live on [http://mathieujouhet.com/demos/flipping-clock/](http://mathieujouhet.com/demos/flipping-clock/)
And if you really want to challenge your processor, goto this [css 3d particles demo](http://mathieujouhet.com/demos/MnMs-Css-3d-particles/) and start adding particles (safari recommended)

### Usage ###

```javascript
var stats = new Stats();

// Align top-left
stats.getDomElement().style.position = 'absolute';
stats.getDomElement().style.left = '0px';
stats.getDomElement().style.top = '0px';

document.body.appendChild( stats.getDomElement() );

setInterval( function () {

	stats.update();

}, 1000 / 60 );
```


### Bookmarklet ###

Albeit theorically not as accurate the widget can also be easily inserted to **any site** using a bookmarklet.
[Follow the instructions](http://mrdoob.com/blog/post/707).


### Change Log ###

2012 01 18 - **r9** (2,872 KB, gzip: 1,038 B)

* Changed `.domElement` to `.getDomElement()`
* Added `.getFps()`, `.getFpsMin()`, `.getFpsMax()`, `.getMs()`, `.getMsMin()`, `.getMsMax()`.


2011 10 16 - **r8** (2.670 KB, gzip: 987 B)

* Performance and size optimizations.
* Removed memory mode.


2011 10 13 - **r7** (4.083 KB, gzip: 1.377 KB)

* Replaced `new Date().getTime()` with `Date.now()`.


2011 05 28 - **r6** (4.103 KB, gzip: 1.384 KB)

* Updated check for memory accesible browsers.
* Renamed MEM to MB for consistency reasons.


2010 09 21 - **r5** (3.800 KB)

* Different color per mode.
* Added MEM mode. (Webkit-based browsers only)
* Force text left aligned.


2010 06 11 - **r4** (2.235 KB)

* Added MS mode.


2010 05 12 - **r3** (1.241 KB)

* Switched to module pattern code style.
* Removed `position = 'absolute'`.


2010 03 01 - **r2** (2.177 KB)

* Simplified.


2010 02 21 - **r1**

* Accurate FPS calculation. (thx Spite!)

 
2009 08 09 - **r0**

* Base code.
