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


const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    buffer.width = canvas.width;
    buffer.height = canvas.height;
    buffer.pixels = new Uint8ClampedArray(
        buffer.width * buffer.height * 4
    );

    size.WIDTH = canvas.width;
    size.HEIGHT = canvas.height;
}

const buffer = new RenderCanvas(
    window.innerWidth,
    window.innerHeight
);

const size = new Screen(
    window.innerWidth,
    window.innerHeight
);

window.addEventListener("resize", resize);

const green = new Color(0, 255, 0);
const black = new Color(0, 0, 0);

// These will be filled by loadModel()
let cube = [];
let edges = [];

let angle = 0;

function loop() {
    clearRenderCanvas(buffer, black);

    const projected = [];

    const SCALE = 4.5; // Increase this value

    for (const vertex of cube){
        let p = new Pos(
            vertex.x * SCALE,
            vertex.y * SCALE,
            vertex.z * SCALE
        );

        p = rotateY(p, angle);
        p = rotateY(p, angle * 0.5);

        p = translate_z(p, 4);

        p = project(p);
        p = screen(p, size);

        projected.push(p);
    }

    for (const edge of edges) {
        drawLine(
            buffer,
            projected[edge[0]],
            projected[edge[1]],
            green,
            3
        );
    }

    updateRenderCanvas(buffer, ctx);

    angle += 0.02;

    requestAnimationFrame(loop);
}

async function start() {
    resize();

    // Load model.json from the same directory
    await loadModel("model.json");

    loop();
}

start();