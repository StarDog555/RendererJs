//MIT License

//Copyright (c) 2026 StarDog555

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.


const FPS = 60;
const dt = 1.0 / FPS;
let RUNNING = true;

class Pos {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Screen {
  constructor(width = 0, height = 0) {
    this.WIDTH = width;
    this.HEIGHT = height;
  }
}

class Color {
  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

class RenderCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint8ClampedArray(width * height * 4);
  }
}

class Rect {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

class Circle {
  constructor(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
  }
}

class Camera {
  constructor(x = 0, y = 0, z = -5, fov = 90) {
    this.position = new Pos(x, y, z);

    // radians
    this.pitch = 0;
    this.yaw = 0;
    this.roll = 0;

    // degrees
    this.fov = fov;
  }

  move(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  rotate(pitch, yaw, roll = 0) {
    this.pitch += pitch;
    this.yaw += yaw;
    this.roll += roll;
  }

  worldToCamera(point) {
    let p = new Pos(
      point.x - this.position.x,
      point.y - this.position.y,
      point.z - this.position.z
    );

    // inverse camera rotation
    p = rotateZ(p, -this.roll);
    p = rotateX(p, -this.pitch);
    p = rotateY(p, -this.yaw);

    return p;
  }

  projectCamera(point, width, height) {
    const p = this.worldToCamera(point);

    if (p.z <= 0.01)
      return null;

    const f = 1 / Math.tan(
      (this.fov * Math.PI / 180) / 2
    );

    return new Pos(
      (p.x * f / p.z) * height + width / 2,
      -(p.y * f / p.z) * height + height / 2,
      p.z
    );
  }
}


let pos = new Pos(0.0, 0.0, 0.0);

function Set_Size(ctx, width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function clearRenderCanvas(RenderCanvas, color) {
    for (let i = 0; i < RenderCanvas.width * RenderCanvas.height; i++) {
      let index = i * 4;
  
      RenderCanvas.pixels[index] = color.r;
      RenderCanvas.pixels[index + 1] = color.g;
      RenderCanvas.pixels[index + 2] = color.b;
      RenderCanvas.pixels[index + 3] = 255;
    }
}

function updateRenderCanvas(RenderCanvas, ctx) {
    const image = new ImageData(
      RenderCanvas.pixels,
      RenderCanvas.width,
      RenderCanvas.height
    );
  
    ctx.putImageData(image, 0, 0);
}

function screen(p, Size) {
    const scale = Size.HEIGHT * 0.5;
  
    return new Pos(
      Size.WIDTH * 0.5 + p.x * scale,
      Size.HEIGHT * 0.5 - p.y * scale,
      p.z
    );
}

function project(p) {
    if (p.z === 0) return new Pos(0, 0, p.z);

    return new Pos(
      p.x / p.z,
      p.y / p.z,
      p.z
    );
}

function drawPixel(RenderCanvas, p, color) {
    if (
      p.x < 0 ||
      p.y < 0 ||
      p.x >= RenderCanvas.width ||
      p.y >= RenderCanvas.height
    ) return;
  
    const x = Math.floor(p.x);
    const y = Math.floor(p.y);
  
    const index = (y * RenderCanvas.width + x) * 4;
  
    RenderCanvas.pixels[index] = color.r;
    RenderCanvas.pixels[index + 1] = color.g;
    RenderCanvas.pixels[index + 2] = color.b;
    RenderCanvas.pixels[index + 3] = 255;
}

function drawLine(RenderCanvas, a, b, color, lineWidth = 1) {
    let x0 = Math.floor(a.x);
    let y0 = Math.floor(a.y);
    const x1 = Math.floor(b.x);
    const y1 = Math.floor(b.y);
  
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
  
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
  
    let err = dx - dy;
  
    const half = Math.floor(lineWidth / 2);
  
    function drawThickPixel(x, y) {
      for (let py = -half; py <= half; py++) {
        for (let px = -half; px <= half; px++) {
          drawPixel(
            RenderCanvas,
            new Pos(x + px, y + py),
            color
          );
        }
      }
    }
  
    while (true) {
      drawThickPixel(x0, y0);
  
      if (x0 === x1 && y0 === y1) break;
  
      const e2 = err * 2;
  
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
  
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
}

function translate_z(pos, dz) {
  return new Pos(pos.x, pos.y, pos.z + dz);
}

function rotateY(p, angle) {
  const r = new Pos();
  r.y = p.y;
  r.x = p.x * Math.cos(angle) + p.z * Math.sin(angle);
  r.z = -p.x * Math.sin(angle) + p.z * Math.cos(angle);
  return r;
}

function rotateX(p, angle) {
  const r = new Pos();
  r.x = p.x;
  r.y = p.y * Math.cos(angle) - p.z * Math.sin(angle);
  r.z = p.y * Math.sin(angle) + p.z * Math.cos(angle);
  return r;
}

function rotateZ(p, angle) {
  const r = new Pos();
  r.x = p.x * Math.cos(angle) - p.y * Math.sin(angle);
  r.y = p.x * Math.sin(angle) + p.y * Math.cos(angle);
  r.z = p.z;
  return r;
}

function drawRect(RenderCanvas, rect, color) {
  for (let y = rect.y; y < rect.y + rect.height; y++) {
    for (let x = rect.x; x < rect.x + rect.width; x++) {
      const p = new Pos(x, y);
      drawPixel(RenderCanvas, p, color);
    }
  }
}

function drawCircle(RenderCanvas, circle, color) {
  for (let y = -circle.radius; y <= circle.radius; y++) {
    for (let x = -circle.radius; x <= circle.radius; x++) {
      if (x * x + y * y <= circle.radius * circle.radius) {
        const p = new Pos(circle.x + x, circle.y + y);
        drawPixel(RenderCanvas, p, color);
      }
    }
  }
}

function drawTriangle(RenderCanvas, a, b, c, color) {
  drawLine(RenderCanvas, a, b, color);
  drawLine(RenderCanvas, b, c, color);
  drawLine(RenderCanvas, c, a, color);
}

function edgeFunction(a, b, c)
{
    return (c.x - a.x) * (b.y - a.y) -
           (c.y - a.y) * (b.x - a.x);
}


function fillTriangle(RenderCanvas, a, b, c, color)
{
    // Find bounding box
    const minX = Math.floor(Math.min(a.x, b.x, c.x));
    const maxX = Math.ceil(Math.max(a.x, b.x, c.x));

    const minY = Math.floor(Math.min(a.y, b.y, c.y));
    const maxY = Math.ceil(Math.max(a.y, b.y, c.y));


    const area = edgeFunction(a, b, c);


    for (let y = minY; y <= maxY; y++)
    {
        for (let x = minX; x <= maxX; x++)
        {
            const p = new Pos(x, y);


            const w0 = edgeFunction(b, c, p);
            const w1 = edgeFunction(c, a, p);
            const w2 = edgeFunction(a, b, p);


            if (
                (w0 >= 0 && w1 >= 0 && w2 >= 0) ||
                (w0 <= 0 && w1 <= 0 && w2 <= 0)
            )
            {
                drawPixel(
                    RenderCanvas,
                    p,
                    color
                );
            }
        }
    }
}

async function loadModel(file)
{
    const response = await fetch(file);
    const data = await response.json();

    // Load vertices
    cube = Object.values(data.VS).map(
        ([x, y, z]) => new Pos(x, y, z)
    );

    // Generate edges from faces
    edges = [];

    for (const group of Object.values(data.FS))
    {
        for (const face of group)
        {
            for (let i = 0; i < face.length; i++)
            {
                edges.push([
                    face[i],
                    face[(i + 1) % face.length]
                ]);
            }
        }
    }
}