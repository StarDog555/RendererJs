# RendererJS

> **Simple Yet Powerful Native JavaScript Rendering Library**

A lightweight software rendering library written in pure JavaScript. RenderJS, short for RendererJS, renders directly into a pixel buffer using the HTML5 Canvas API, giving you complete control over every pixel.

Perfect for learning graphics programming, building retro-style games, creating software renderers, or experimenting with 2D/3D rendering algorithms.

🌐 **Live Demo:** https://renderjsdemo.netlify.app/

---

## Features

* 🚀 Pure JavaScript (No dependencies)
* 🎨 Software pixel renderer
* 📦 Lightweight and easy to integrate
* 🖥 Direct pixel buffer manipulation
* 📐 Primitive drawing functions
* 🔺 Triangle rasterization
* 📦 Rectangle rendering
* ⚪ Circle rendering
* 📏 Bresenham line drawing
* 🎥 Simple 3D projection utilities
* 🔄 3D rotation helpers (X, Y, Z)
* ⚡ Fast Uint8ClampedArray framebuffer

---

# Project Structure

```text
ROOT/
│
├── RenderJs.js          # Main JavaScript rendering library
├── README.md
│
├── CLib/
│   └── RenderJs.h       # SDL3 C version of the library
│
├── demo/
│   ├── index.html
│   ├── demo.js
│   └── lib/
└──     └── RenderJs.js

```

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/RenderJS.git
```

Open the demo:

```text
demo/index.html
```

No build system is required.

Include it in Your Projects By:

```bash
<script src="RenderJs.js"><script>
```
Nothing else required!

---

# Basic Example

```html
<canvas id="screen"></canvas>

<script src="RenderJs.js"></script>
<script>
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

Set_Size(ctx, 640, 480);

const screen = new RenderCanvas(640, 480);

clearRenderCanvas(
    screen,
    new Color(30,30,30)
);

drawCircle(
    screen,
    new Circle(80,320,240),
    new Color(255,0,0)
);

updateRenderCanvas(screen, ctx);
</script>
```

---

# Drawing Functions

## Pixels

```javascript
drawPixel(RenderCanvas, position, color);
```

Draws a single pixel.

---

## Lines

```javascript
drawLine(RenderCanvas, start, end, color, thickness);
```

Uses Bresenham's line algorithm.

---

## Rectangles

```javascript
drawRect(RenderCanvas, rect, color);
```

Draws a filled rectangle.

---

## Circles

```javascript
drawCircle(RenderCanvas, circle, color);
```

Draws a filled circle.

---

## Triangles

```javascript
drawTriangle(RenderCanvas, a, b, c, color);
```

Draws an outlined triangle.

```javascript
fillTriangle(RenderCanvas, a, b, c, color);
```

Draws a filled triangle using barycentric rasterization.

---

# 3D Utilities

RenderJS includes helper functions for simple 3D rendering.

### Projection

```javascript
project(point);
```

Projects a 3D point into normalized screen space.

### Screen Conversion

```javascript
screen(point, screenSize);
```

Converts normalized coordinates into screen pixels.

### Translation

```javascript
translate_z(point, distance);
```

Moves a point along the Z-axis.

### Rotation

```javascript
rotateX(point, angle);

rotateY(point, angle);

rotateZ(point, angle);
```

Rotate a point around the X, Y, or Z axis.

---

# 3D Model Loading (JSON)

RenderJS supports loading custom 3D models using a simple JSON format.

Models use two sections:

- `VS` → Vertices (3D points)
- `FS` → Faces (polygon vertex indexes)

Example model:

```json
{
    "VS": {
        "0": [-1,-1,-1],
        "1": [1,-1,-1],
        "2": [1,1,-1],
        "3": [-1,1,-1]
    },

    "FS": {
        "Cube": [
            [0,1,2,3]
        ]
    }
}
```

# Classes

## Pos

```javascript
new Pos(x, y, z);
```

Stores a 3D position.

---

## Color

```javascript
new Color(r, g, b);
```

RGB color.

---

## Rect

```javascript
new Rect(width, height, x, y);
```

Rectangle primitive.

---

## Circle

```javascript
new Circle(radius, x, y);
```

Circle primitive.

---

## Screen

```javascript
new Screen(width, height);
```

Stores screen dimensions.

---

## RenderCanvas

```javascript
new RenderCanvas(width, height);
```

Creates an off-screen framebuffer backed by a `Uint8ClampedArray`.

---

# Rendering Pipeline

A typical rendering loop looks like this:

```javascript
clearRenderCanvas(buffer, backgroundColor);

// Draw your scene here

updateRenderCanvas(buffer, ctx);
```

---

# Included Demo

The repository includes a complete example inside:

```text
demo/
```

Run `index.html` In your browser, see RenderJS in action.

---

# C Version

A native SDL3 implementation is included in:

```text
CLib/
```

This version provides similar functionality for C applications using SDL3.

---

# Use Cases

* Retro game engines
* Software rendering
* Pixel art editors
* Graphics programming education
* 3D engine experiments
* Rendering algorithm demonstrations
* Computer graphics courses

---

# Browser Support

RenderJS works in all modern browsers supporting:

* HTML5 Canvas
* ES6 Classes
* Uint8ClampedArray
* ImageData

---

# Roadmap

* [ ] Text rendering
* [ ] Image loading
* [ ] Polygon rendering
* [ ] Texture mapping
* [ ] Depth buffer (Z-buffer)
* [ ] OBJ model loader
* [ ] Camera class
* [ ] Matrix math library
* [ ] Lighting
* [ ] Clipping
* [ ] Wireframe renderer
* [ ] WebGPU backend (optional)

---

# License

MIT License

---

## Author

Created by **StarDog555**

Built for developers who want complete control over every pixel.
