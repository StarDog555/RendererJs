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

import * as R from "./lib/Renderer.js";

window.alert("WASD Move | Mouse Look | Q/E Space Depth");

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const buffer = new R.RenderCanvas(innerWidth, innerHeight);
const size = new R.Screen(innerWidth, innerHeight);

const cyan = new R.Color(0,220,255);
const black = new R.Color(0,0,0);

const camera = new R.Camera(0,0,-8,90);

let cube = [];
let edges = [];

let space;
let angle = 0;
let spaceRotation = 0;
let bgZ = 1;


function resize(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    buffer.width = innerWidth;
    buffer.height = innerHeight;

    buffer.pixels =
        new Uint8ClampedArray(
            innerWidth * innerHeight * 4
        );

    size.WIDTH = innerWidth;
    size.HEIGHT = innerHeight;
}

addEventListener("resize",resize);



const keys = {};

onkeydown = e =>
    keys[e.key.toLowerCase()] = true;

onkeyup = e =>
    keys[e.key.toLowerCase()] = false;



let locked = false;

canvas.onclick = () =>
    canvas.requestPointerLock();


document.onpointerlockchange = () =>
    locked =
    document.pointerLockElement === canvas;


document.onmousemove = e => {

    if(!locked) return;

    camera.yaw -= e.movementX * 0.002;
    camera.pitch -= e.movementY * 0.002;

    const limit = Math.PI/2 - 0.05;

    camera.pitch = Math.max(
        -limit,
        Math.min(limit,camera.pitch)
    );
};



function updateCamera(){

    const speed = 0.15;

    const fx = Math.sin(camera.yaw);
    const fz = Math.cos(camera.yaw);

    const rx = Math.cos(camera.yaw);
    const rz = -Math.sin(camera.yaw);


    if(keys.w){
        camera.position.x += fx*speed;
        camera.position.z += fz*speed;
    }

    if(keys.s){
        camera.position.x -= fx*speed;
        camera.position.z -= fz*speed;
    }

    if(keys.a){
        camera.position.x -= rx*speed;
        camera.position.z -= rz*speed;
    }

    if(keys.d){
        camera.position.x += rx*speed;
        camera.position.z += rz*speed;
    }


    if(keys.q)
        bgZ += 0.02;

    if(keys.e)
        bgZ -= 0.02;


    bgZ = Math.max(
        0.3,
        Math.min(3,bgZ)
    );
}



function drawBackground(){

    if(!space)
        return;


    const scale =
        Math.max(
            innerWidth / 1024,
            innerHeight / 1024
        ) / bgZ;


    R.DrawImage(
        buffer,
        space,
        0,
        0,
        innerWidth * scale,
        innerHeight * scale,
        spaceRotation
    );
}



function loop(){

    updateCamera();


    R.clearRenderCanvas(
        buffer,
        black
    );


    drawBackground();



    const projected = [];


    for(const v of cube){

        let p = new R.Pos(
            v.x*4.5,
            v.y*4.5,
            v.z*4.5
        );


        p = R.rotateY(
            p,
            angle
        );


        projected.push(
            camera.projectCamera(
                p,
                size.WIDTH,
                size.HEIGHT
            )
            ||
            new R.Pos(-100,-100,0)
        );
    }



    for(const e of edges){

        R.drawLine(
            buffer,
            projected[e[0]],
            projected[e[1]],
            cyan,
            3
        );
    }



    R.updateRenderCanvas(
        buffer,
        ctx
    );


    angle += 0.02;


    requestAnimationFrame(loop);
}



async function start(){

    resize();


    const model =
        await R.LoadObjModel(
            "./Model.obj"
        );


    for(let i=0;i<model.vertices.length;i+=3){

        cube.push(
            new R.Pos(
                model.vertices[i],
                model.vertices[i+1],
                model.vertices[i+2]
            )
        );
    }



    for(let i=0;i<model.indices.length;i+=3){

        const a = model.indices[i];
        const b = model.indices[i+1];
        const c = model.indices[i+2];


        edges.push(
            [a,b],
            [b,c],
            [c,a]
        );
    }


    space =
        await R.LoadImage(
            "./images/Space.png"
        );

    loop();
}


start();