# 📊 Performance Stats

A lightweight and powerful JavaScript performance monitor designed to track your application's performance in real-time.

## ✨ Features

- **FPS** - Number of frames rendered in the last second (high = good)
- **MS** - Milliseconds required to render a frame (low = good)
- **MB** - Amount of allocated memory
- **CUSTOM** - Support for user-defined panels
- ✅ Zero dependencies
- ✅ Lightweight and fast
- ✅ TypeScript support
- ✅ Responsive design

## 📦 Installation

```bash
npm install performance-stats

import Stats from 'performance-stats';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function animate() {
  stats.begin();
  
  // İzlenecek kodunuz buraya
  
  stats.end();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```
# React Examples
```
import { useEffect, useRef } from 'react';
import Stats from 'performance-stats';

export function PerformanceMonitor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    containerRef.current?.appendChild(stats.dom);

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      containerRef.current?.removeChild(stats.dom);
    };
  }, []);

  return <div ref={containerRef} />;
}

```
## VueJs Examples

```
 <template>
  <div ref="monitor"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Stats from 'performance-stats';

const monitor = ref(null);
let stats = null;
let animationId = null;

onMounted(() => {
  stats = new Stats();
  stats.showPanel(0);
  monitor.value?.appendChild(stats.dom);

  const animate = () => {
    stats.begin();
    stats.end();
    animationId = requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  monitor.value?.removeChild(stats.dom);
});
</script>
```

##Panel 
```
const stats = new Stats();
const customPanel = stats.addPanel(new Stats.Panel('Custom', '#f0f', '#202'));
stats.showPanel(3);

function animate() {
  stats.begin();
  customPanel.update(Math.random() * 100, 100);
  stats.end();
  requestAnimationFrame(animate);
}
```

#Location Change
```
const stats = new Stats();
stats.dom.style.position = 'fixed';
stats.dom.style.bottom = '10px';
stats.dom.style.right = '10px';
stats.dom.style.opacity = '0.9';
document.body.appendChild(stats.dom);
```

##🔖 Bookmarklet
```
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);(function loop(){stats.update();requestAnimationFrame(loop)})()};script.src='https://cdn.jsdelivr.net/npm/performance-stats/build/stats.min.js';document.head.appendChild(script);})()
```

#⚠️ Important Notes
##Chrome Memory Info: Launch Chrome with --enable-precise-memory-info to retrieve memory data
##Production: Consider disabling in the production environment
##Browser Support: All modern browsers (Chrome, Firefox, Safari, Edge)
