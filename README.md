# RendererJS

> **Simple Yet Powerful Native JavaScript Rendering Library**

A lightweight software rendering library written in pure JavaScript.

RendererJS renders directly into a pixel buffer using the HTML5 Canvas API, giving developers control over rendering, pixels, geometry, cameras, and simple 3D pipelines.

Perfect for learning graphics programming, building retro-style engines, experimenting with software rendering, creating wireframe viewers, or understanding how rendering systems work internally.

🌐 **Live Demo:** https://renderjsdemo.netlify.app/

💡 **Inspired By:** https://www.youtube.com/watch?v=qjWkNZ0SXfo

🎬 **Model By:** https://github.com/Max-Kawula/penger-obj

---

# Features

* 🚀 Pure JavaScript (No dependencies)
* 📦 Lightweight and easy to integrate
* 🎨 Software pixel renderer
* 🖥 Direct pixel buffer manipulation
* ⚡ Fast `Uint8ClampedArray` framebuffer
* 🎯 Pixel-perfect rendering
* 📐 Primitive drawing functions
* 🔺 Filled and outlined triangles
* 📦 Rectangle rendering
* ⚪ Circle rendering
* 📏 Bresenham line drawing
* 🎥 Built-in Camera system
* 🌍 World → Camera transformations
* 🔍 Perspective projection
* 🔄 X/Y/Z rotation helpers
* 📤 Z-axis translation helpers
* 📂 JSON model loading
* 📦 OBJ model loading
* 🧩 Automatic wireframe generation
* 🖼 Image loading system
* 🎨 Texture helper system
* 🔁 Image transformation support
* 🎨 RGB color utilities
* 📜 MIT Licensed

---

# Project Structure

```text
RendererJs/
│
├── lib/
│   ├── Renderer.js
│   └── Helper.js
│
├── demo/
│   │
│   ├── lib/
│   │   ├── Renderer.js
│   │   └── Helper.js
│   │
│   ├── index.html
│   ├── demo.js
│   ├── Model.obj
│   └── images/
│       └── Space.png
│
├── README.md
├── LICENSE
└── .git/
Getting Started

Clone the repository:

git clone https://github.com/YOUR_USERNAME/RendererJs.git

Open:

demo/index.html

RendererJS uses ES Modules.

Example:

import * as R from "./lib/Renderer.js";

No package manager or build system is required.

Basic Example
<canvas id="screen"></canvas>

<script type="module">

import * as R from "./lib/Renderer.js";

const canvas =
document.getElementById("screen");

const ctx =
canvas.getContext("2d");


const buffer =
new R.RenderCanvas(
    640,
    480
);


R.clearRenderCanvas(
    buffer,
    new R.Color(
        20,
        20,
        20
    )
);


R.drawCircle(
    buffer,
    new R.Circle(
        80,
        320,
        240
    ),
    new R.Color(
        255,
        0,
        0
    )
);


R.updateRenderCanvas(
    buffer,
    ctx
);

</script>

---

# Rendering Pipeline

A normal RendererJS render loop:

```javascript
R.clearRenderCanvas(
    buffer,
    backgroundColor
);


// Draw scene here


R.updateRenderCanvas(
    buffer,
    ctx
);

Animation example:

function render(){

    R.clearRenderCanvas(
        buffer,
        new R.Color(
            20,
            20,
            20
        )
    );


    // Draw objects


    R.updateRenderCanvas(
        buffer,
        ctx
    );


    requestAnimationFrame(render);
}


render();
Drawing Functions
Pixels
drawPixel(
    buffer,
    position,
    color
);

Draws a single pixel directly into the framebuffer.

Lines
drawLine(
    buffer,
    start,
    end,
    color,
    thickness
);

Uses Bresenham's line algorithm with adjustable thickness.

Rectangles
drawRect(
    buffer,
    rect,
    color
);

Draws filled rectangles.

Circles
drawCircle(
    buffer,
    circle,
    color
);

Draws filled circles.

Triangles

Outlined triangle:

drawTriangle(
    buffer,
    a,
    b,
    c,
    color
);

Filled triangle:

fillTriangle(
    buffer,
    a,
    b,
    c,
    color
);

Uses triangle rasterization.

Camera System

RendererJS includes a simple 3D perspective camera.

Create a camera:

const camera =
new R.Camera(
    0,
    0,
    -5,
    90
);

Move:

camera.move(
    x,
    y,
    z
);

Rotate:

camera.rotate(
    pitch,
    yaw,
    roll
);

Convert world position:

camera.worldToCamera(
    point
);

Project 3D position:

camera.projectCamera(
    point,
    width,
    height
);

The camera supports:

Position movement
Pitch rotation
Yaw rotation
Roll rotation
Perspective projection
3D Math Helpers
Projection
project(point);

Converts a 3D point into normalized projection space.

Screen Conversion
screen(
    point,
    screenSize
);

Converts normalized coordinates into pixels.

Translation
translate_z(
    point,
    distance
);

Moves a point along the Z axis.

Rotation
rotateX(
    point,
    angle
);

rotateY(
    point,
    angle
);

rotateZ(
    point,
    angle
);

Rotate around X, Y, and Z axes.

Angles use radians.

3D Model Loading

RendererJS supports loading JSON and OBJ models.

JSON Models

Load a JSON model:

await R.loadJsonModel(
    "model.json"
);

The loader generates:

Vertex positions
Face data
Wireframe edges

Example conversion:

Face:

0 1 2 3


Creates:

0 -> 1
1 -> 2
2 -> 3
3 -> 0

Supports:

Triangles
Quads
Polygons
OBJ Models

RendererJS includes a universal OBJ loader.

Example:

const model =
await R.LoadObjModel(
    "./Model.obj"
);

Returns:

{
    vertices,
    texcoords,
    normals,
    indices
}

Supported OBJ features:

✅ Vertex positions (v)
✅ Texture coordinates (vt)
✅ Normals (vn)
✅ Faces (f)
✅ Triangles
✅ Quads
✅ N-gons
✅ Negative indexes

Texture and Image System

RendererJS includes basic image handling.

Load an image:

const image =
await R.LoadImage(
    "./images/texture.png"
);

Returns a:

Texture

object.

Texture Class

Create a texture:

new R.Texture(image);

Contains:

offsetX
offsetY

scaleX
scaleY

rotation

repeatX
repeatY

wrapMode

flipY

These values allow future texture transformations.

Applying Images

Apply a texture to a mesh:

R.ApplyImage(
    mesh,
    texture
);

Apply a texture to one face:

R.ApplyImage(
    mesh,
    texture,
    faceID
);

---

# Classes

## Pos

```javascript
new R.Pos(
    x,
    y,
    z
);

Stores a 3D position.

Color
new R.Color(
    r,
    g,
    b
);

Stores an RGB color.

Screen
new R.Screen(
    width,
    height
);

Stores screen dimensions.

RenderCanvas
new R.RenderCanvas(
    width,
    height
);

Creates a software framebuffer using:

Uint8ClampedArray
Rect
new R.Rect(
    width,
    height,
    x,
    y
);

Rectangle primitive.

Circle
new R.Circle(
    radius,
    x,
    y
);

Circle primitive.

Camera
new R.Camera(
    x,
    y,
    z,
    fov
);

3D perspective camera.

Texture
new R.Texture(
    image
);

Stores image texture data.

Utility Functions

Resize canvas:

R.Set_Size(
    ctx,
    width,
    height
);

Clear framebuffer:

R.clearRenderCanvas(
    buffer,
    color
);

Update canvas:

R.updateRenderCanvas(
    buffer,
    ctx
);

Load image:

await R.LoadImage(
    path
);

Load OBJ:

await R.LoadObjModel(
    path
);

Load JSON model:

await R.loadJsonModel(
    path
);
Included Demo

RendererJS includes a demo project:

demo/

The demo includes:

ES Module setup
Camera controls
Mouse look
OBJ model loading
Image backgrounds
Wireframe rendering
Texture experiments

Controls:

W A S D  - Move camera

Mouse    - Look around

Q / E    - Change background depth
Browser Support

RendererJS works in modern browsers supporting:

HTML5 Canvas
ES Modules
Fetch API
ImageData
Uint8ClampedArray
JavaScript Classes
Roadmap

Completed:

 Pixel framebuffer
 Primitive drawing
 Triangle rasterization
 Camera system
 Perspective projection
 Rotation helpers
 JSON model loading
 OBJ model loading
 Image loading
 Texture helper system

Planned:

 Full texture mapping
 Triangle UV rendering
 Depth buffer (Z-buffer)
 Back-face culling
 Lighting system
 Materials
 Matrix math library
 Mesh class
 Scene graph
 Frustum clipping
 Animation system
 Sprite renderer
 Orthographic camera
 WebGPU backend
Use Cases

RendererJS can be used for:

Learning computer graphics
Software rendering experiments
Retro game engines
Pixel art tools
Wireframe viewers
2D/3D experiments
Graphics programming education
Rendering algorithm testing
License

MIT License

Copyright (c) 2026 StarDog555

Author

Created by StarDog555