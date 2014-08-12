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

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

setInterval( function () {

	stats.begin();

	// your code goes here

	stats.end();

}, 1000 / 60 );
```


### Bookmarklet ###

Albeit theorically not as accurate the widget can also be easily inserted to **any site** using a bookmarklet.
[Follow the instructions](http://ricardocabello.com/blog/post/707).


### Change Log ###

2014 08 11 - **r12** (2,310 KB, gzip: 1,087 B)

* Browserify support. (@Miha-ha)


2012 09 01 - **r11** (2,243 KB, gzip: 903 B)

* Renamed `build/Stats.js` to `build/stats.min.js`.


2012 05 10 - **r10** (2,243 KB, gzip: 903 B)

* Changed `.getDomElement()` to `.domElement` back.
* Removed `.getFps()`, `.getFpsMin()`, `.getFpsMax()`, `.getMs()`, `.getMsMin()`, `.getMsMax()`.
* Added `.begin()` and `.end()`.
* Added `.setMode()`.
* Themeable with CSS.


2012 01 18 - **r9** (2,872 KB, gzip: 1,038 KB)

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

* Accurate FPS calculation. (thx @spite!)


2009 08 09 - **r0**

* Base code.
