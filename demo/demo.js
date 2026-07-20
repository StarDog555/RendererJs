const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");


function resize()
{
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


const cube = [
    new Pos(-1,-1,-1),
    new Pos( 1,-1,-1),
    new Pos( 1, 1,-1),
    new Pos(-1, 1,-1),

    new Pos(-1,-1,1),
    new Pos( 1,-1,1),
    new Pos( 1, 1,1),
    new Pos(-1, 1,1)
];


const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
];


let angle = 0;


function loop()
{
    clearRenderCanvas(buffer, black);


    let projected = [];


    for (let vertex of cube)
    {
        let p = rotateY(vertex, angle);
        p = rotateX(p, angle);


        // move cube away from camera
        p.z += 4;


        p = project(p);
        p = screen(p, size);


        projected.push(p);
    }


    for (let edge of edges)
    {
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


resize();
loop();