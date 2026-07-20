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


window.alert("Use W, A, S, D and Mouse to Move There are some bugs this is a demo...");

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const buffer = new RenderCanvas(
    window.innerWidth,
    window.innerHeight
);

const size = new Screen(
    window.innerWidth,
    window.innerHeight
);

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

window.addEventListener("resize", resize);

const green = new Color(0, 255, 0);
const black = new Color(0, 0, 0);

let cube = [];
let edges = [];

const camera = new Camera(
    0,
    0,
    -8,
    90
);


// INPUT

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});


// MOUSE LOOK

let mouseLocked = false;
const mouseSensitivity = 0.002;

canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
    mouseLocked =
        document.pointerLockElement === canvas;
});

document.addEventListener("mousemove", e => {
    if (!mouseLocked)
        return;

    camera.yaw -= e.movementX * mouseSensitivity;
    camera.pitch += e.movementY * mouseSensitivity;

    const limit = Math.PI / 2 - 0.05;

    camera.pitch = Math.max(
        -limit,
        Math.min(limit, camera.pitch)
    );
});


// CAMERA

function resetCamera() {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -8;

    camera.yaw = 0;
    camera.pitch = 0;
}


function updateCamera() {
    const speed = 0.15;

    const forwardX = Math.sin(camera.yaw);
    const forwardZ = Math.cos(camera.yaw);

    const rightX = Math.cos(camera.yaw);
    const rightZ = -Math.sin(camera.yaw);

    if (keys["w"]) {
        camera.position.x += forwardX * speed;
        camera.position.z += forwardZ * speed;
    }

    if (keys["s"]) {
        camera.position.x -= forwardX * speed;
        camera.position.z -= forwardZ * speed;
    }

    if (keys["a"]) {
        camera.position.x -= rightX * speed;
        camera.position.z -= rightZ * speed;
    }

    if (keys["d"]) {
        camera.position.x += rightX * speed;
        camera.position.z += rightZ * speed;
    }

    if (keys[" "])
        camera.position.y += speed;

    if (keys["shift"])
        camera.position.y -= speed;

    if (keys["r"])
        resetCamera();
}


// RENDER

let angle = 0;

function loop() {
    updateCamera();

    clearRenderCanvas(
        buffer,
        black
    );

    const projected = [];
    const SCALE = 4.5;

    for (const vertex of cube) {

        let p = new Pos(
            vertex.x * SCALE,
            vertex.y * SCALE,
            vertex.z * SCALE
        );

        // object rotation
        p = rotateY(
            p,
            angle
        );

        p = rotateY(
            p,
            angle * 0.5
        );

        // camera
        p = camera.projectCamera(
            p,
            size.WIDTH,
            size.HEIGHT
        );

        projected.push(
            p || new Pos(-100, -100, 0)
        );
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


    updateRenderCanvas(
        buffer,
        ctx
    );

    angle += 0.02;

    requestAnimationFrame(loop);
}


async function start() {
    resize();

    await loadModel(
        "model.json"
    );

    loop();
}

start();