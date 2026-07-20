# RendererJS

> **Simple Yet Powerful Native JavaScript Rendering Library**

A lightweight software rendering library written in pure JavaScript. RenderJS, short for RendererJS, renders directly into a pixel buffer using the HTML5 Canvas API, giving you complete control over every pixel.

Perfect for learning graphics programming, building retro-style games, creating software renderers, or experimenting with 2D and 3D rendering algorithms.

🌐 **Live Demo:** https://renderjsdemo.netlify.app/

💡 **Inspired By:** https://www.youtube.com/watch?v=qjWkNZ0SXfo

🎬 **Model By:** https://github.com/Max-Kawula/penger-obj

---

# Features

* 🚀 Pure JavaScript (No dependencies)
* 🎨 Software pixel renderer
* 📦 Lightweight and easy to integrate
* 🖥 Direct pixel buffer manipulation
* ⚡ Fast `Uint8ClampedArray` framebuffer
* 🎯 Pixel-perfect rendering
* 📐 Primitive drawing functions
* 🔺 Filled and outlined triangles
* 📦 Rectangle rendering
* ⚪ Circle rendering
* 📏 Bresenham line drawing with adjustable thickness
* 🎥 Built-in Camera class
* 🌍 World → Camera transformations
* 🔍 Perspective projection
* 📐 Screen-space conversion helpers
* 🔄 3D rotation helpers (X, Y, Z)
* 📤 Z-axis translation helper
* 📂 JSON model loading
* 🧩 Automatic wireframe edge generation
* 🖼 Off-screen render canvas
* 🎨 RGB color utilities
* 📜 MIT Licensed

---

# Project Structure

```text
ROOT/
│
├── RenderJs.js          # Main JavaScript rendering library
├── README.md
│
├── demo/
│   ├── index.html
│   ├── object.json
│   ├── demo.js
│   └── lib/
│       └── RenderJs.js
│
└── CLib/
    └── ...              # Native SDL3 implementation
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

No build system or package manager is required.

Include it in your project:

```html
<script src="RenderJs.js"></script>
```

That's it!

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

# Rendering Pipeline

A typical rendering loop:

```javascript
clearRenderCanvas(buffer, backgroundColor);

// Draw your scene here

updateRenderCanvas(buffer, ctx);
```

For animation:

```javascript
function render()
{
    clearRenderCanvas(buffer, new Color(20,20,20));

    // Draw objects...

    updateRenderCanvas(buffer, ctx);

    if (RUNNING)
        requestAnimationFrame(render);
}

render();
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

Uses Bresenham's line algorithm and supports adjustable line thickness.

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

# Camera

RendererJS includes a simple perspective camera.

```javascript
const camera = new Camera(
    0,
    0,
    -5,
    90
);
```

Move the camera:

```javascript
camera.move(x, y, z);
```

Rotate the camera:

```javascript
camera.rotate(
    pitch,
    yaw,
    roll
);
```

Convert a world-space point into camera space:

```javascript
camera.worldToCamera(point);
```

Project a 3D point onto the screen:

```javascript
camera.projectCamera(
    point,
    width,
    height
);
```

The Camera automatically handles:

- Translation
- Pitch
- Yaw
- Roll
- Perspective projection

---

# 3D Utilities

RendererJS includes helper functions for simple 3D rendering.

## Projection

```javascript
project(point);
```

Projects a 3D point into normalized screen space.

---

## Screen Conversion

```javascript
screen(point, screenSize);
```

Converts normalized coordinates into screen pixels.

---

## Translation

```javascript
translate_z(point, distance);
```

Moves a point along the Z-axis.

---

## Rotation

```javascript
rotateX(point, angle);

rotateY(point, angle);

rotateZ(point, angle);
```

Rotate a point around the X, Y, or Z axis.

Angles are specified in **radians**.

---

# 3D Model Loading (JSON)

RendererJS supports loading custom 3D models from a JSON file.

Models contain two sections:

- `VS` — Vertex positions
- `FS` — Face groups

Example:

```json
{
    "VS":
    {
        "0": [-1,-1,-1],
        "1": [ 1,-1,-1],
        "2": [ 1, 1,-1],
        "3": [-1, 1,-1]
    },

    "FS":
    {
        "Cube":
        [
            [
                [0,1,2,3]
            ]
        ]
    }
}
```

## Loading a Model

```javascript
await loadModel("model.json");
```

The loader automatically creates:

- `cube` — An array of `Pos` objects.
- `edges` — Wireframe edge pairs generated from every face.

For example:

```text
Face:

0 1 2 3

Automatically becomes:

0 → 1
1 → 2
2 → 3
3 → 0
```

Triangles, quads, and arbitrary polygons are all supported.

---

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

Stores an RGB color.

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

## Camera

```javascript
new Camera(
    x,
    y,
    z,
    fov
);
```

Perspective camera supporting movement, rotation, and projection.

---

## RenderCanvas

```javascript
new RenderCanvas(width, height);
```

Creates an off-screen framebuffer backed by a `Uint8ClampedArray`.

---

# Utility Functions

Resize the canvas:

```javascript
Set_Size(ctx, width, height);
```

Clear the framebuffer:

```javascript
clearRenderCanvas(buffer, color);
```

Display the framebuffer:

```javascript
updateRenderCanvas(buffer, ctx);
```

---

# Constants

```javascript
FPS
```

Target frame rate.

```javascript
dt
```

Frame delta (`1 / FPS`).

```javascript
RUNNING
```

Global rendering loop flag.

---

# Included Demo

The repository includes a complete example inside:

```text
demo/
```

Open `index.html` in your browser to see RendererJS in action.

---

# C Version

A native SDL3 implementation is included in:

```text
CLib/
```

The C version mirrors much of the JavaScript API and is designed for native applications using SDL3.

---

# Use Cases

* Retro game engines
* Software rendering
* Pixel art editors
* Graphics programming education
* 2D rendering experiments
* 3D engine experiments
* Rendering algorithm demonstrations
* Computer graphics courses
* Wireframe model viewers
* Learning how graphics pipelines work

---

# Browser Support

RendererJS works in all modern browsers supporting:

* HTML5 Canvas
* ES6 Classes
* Fetch API
* Uint8ClampedArray
* ImageData

---

# Roadmap

* [ ] Text rendering
* [ ] Image loading
* [ ] Sprite rendering
* [ ] Polygon rendering
* [ ] Texture mapping
* [ ] Depth buffer (Z-buffer)
* [ ] Back-face culling
* [ ] Lighting
* [ ] Materials
* [ ] Matrix math library
* [ ] Mesh class
* [ ] Scene graph
* [ ] OBJ model loader
* [ ] Frustum clipping
* [ ] Orthographic camera
* [ ] Animation system
* [ ] Multi-camera support
* [ ] WebGPU backend (optional)

---

# License

MIT License

Copyright (c) 2026 StarDog555

---

## Author

Created by **StarDog555**