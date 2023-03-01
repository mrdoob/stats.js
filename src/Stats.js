/**
 * @author mrdoob / http://mrdoob.com/
 */
let conf = {
    containerStyle: 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000',
    canvas: {
        cssText: 'width:180px;height:148px;text-size:9px;cursor:move;',
        textBaseline: 'top',
    },
    panels: {
        fpsPanel: {
            foreground: '#0ff',
            background: '#002'
        },
        msPanel: {
            foreground: '#1f0',
            background: '#020'
        },
        memPanel: {
            foreground: '#f08',
            background: '#201'
        },
    }
};
var Stats = function(customConf) {
    if (customConf !== undefined) {
        Object.assign(conf, customConf);
    }
    var mode = 0;
    var container = document.createElement('div');
    container.style.cssText = conf.containerStyle
    container.addEventListener('click', function(event) {
        event.preventDefault();
        showPanel(++mode % container.children.length);
    }, false);
    //
    function addPanel(panel) {
        container.appendChild(panel.dom);
        return panel;
    }

    function showPanel(id) {
        for (var i = 0; i < container.children.length; i++) {
            container.children[i].style.display = i === id ? 'block' : 'none';
        }
        mode = id;
    }
    var beginTime = (performance || Date).now(),
        prevTime = beginTime,
        frames = 0;
    var fpsPanel = addPanel(new Stats.Panel('FPS', conf.panels.fpsPanel.foreground, conf.panels.fpsPanel.background));
    var msPanel = addPanel(new Stats.Panel('MS', conf.panels.msPanel.foreground, conf.panels.msPanel.background));
    if (self.performance && self.performance.memory) {
        var memPanel = addPanel(new Stats.Panel('MB', conf.panels.memPanel.foreground, conf.panels.memPanel.background));
    }
    showPanel(0);
    return {
        REVISION: 16,
        dom: container,
        addPanel: addPanel,
        showPanel: showPanel,
        begin: function() {
            beginTime = (performance || Date).now();
        },
        end: function() {
            frames++;
            var time = (performance || Date).now();
            msPanel.update(time - beginTime, 200);
            if (time >= prevTime + 1000) {
                fpsPanel.update((frames * 1000) / (time - prevTime), 100);
                prevTime = time;
                frames = 0;
                if (memPanel) {
                    var memory = performance.memory;
                    memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
                }
            }
            return time;
        },
        update: function() {
            beginTime = this.end();
        },
        // Backwards Compatibility
        domElement: container,
        setMode: showPanel
    };
};
Stats.Panel = function(name, fg, bg) {
    var min = Infinity,
        max = 0,
        round = Math.round;
    var PR = round(window.devicePixelRatio || 1);
    const ucs = (() => {
        let w = 80;
        let h = 48;
        let tsize = 9;
        let lft = conf.canvas.cssText;
        const regexps = [/width\:\d{1,4}px\;/gm, /height\:\d{1,4}px\;/gm, /font\-size\:\d{1,4}px\;/gm];
        w = parseInt(lft.match(regexps[0])[0].replace(/.*\:/g, ''));
        h = parseInt(lft.match(regexps[1])[0].replace(/.*\:/g, ''));
        tsize = parseInt(lft.match(regexps[2])[0].replace(/.*\:/g, ''));
        lft = lft.replace(regexps[0], '').replace(regexps[1], '').replace(regexps[2], '');
        return {
            w,
            h,
            tsize,
            lft
        }
    })()
    var WIDTH = ucs.w * PR,
        HEIGHT = ucs.h * PR,
        TEXT_X = 3 * PR,
        TEXT_Y = 2 * PR,
        GRAPH_X = 3 * PR,
        GRAPH_Y = 15 * PR,
        GRAPH_WIDTH = (WIDTH - 6) * PR,
        GRAPH_HEIGHT = (HEIGHT - 18) * PR;
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = ucs.lft;
    var context = canvas.getContext('2d');
    context.font = 'bold ' + (ucs.tsize * PR) + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = conf.canvas.textBaseline;
    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    return {
        dom: canvas,
        update: function(value, maxValue) {
            min = Math.min(min, value);
            max = Math.max(max, value);
            context.fillStyle = bg;
            context.globalAlpha = 1;
            context.fillRect(0, 0, WIDTH, GRAPH_Y);
            context.fillStyle = fg;
            context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);
            context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
            context.fillStyle = bg;
            context.globalAlpha = 0.9;
            context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));
        }
    };
};
export { Stats as default};