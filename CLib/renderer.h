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

#ifndef RENDERER_H
#define RENDERER_H

#include <stdint.h>
#include <math.h>


// ==========================
//        Structures
// ==========================

typedef struct
{
    double x;
    double y;
    double z;
} Pos;


typedef struct
{
    uint8_t r;
    uint8_t g;
    uint8_t b;
} Color;


typedef struct
{
    int width;
    int height;
    Color *pixels;

} RenderCanvas;



// ==========================
//       Constructors
// ==========================

Color Color_RGB(uint8_t r, uint8_t g, uint8_t b)
{
    Color c;

    c.r = r;
    c.g = g;
    c.b = b;

    return c;
}


Pos Pos_Create(double x, double y, double z)
{
    Pos p;

    p.x = x;
    p.y = y;
    p.z = z;

    return p;
}



// ==========================
//        Projection
// ==========================

Pos Project(Pos p)
{
    if(p.z == 0)
        return p;


    p.x /= p.z;
    p.y /= p.z;


    return p;
}



Pos Screen(Pos p, int width, int height)
{
    double scale = height * 0.5;


    p.x = width * 0.5 + p.x * scale;
    p.y = height * 0.5 - p.y * scale;


    return p;
}



// ==========================
//        Transform
// ==========================

Pos RotateY(Pos p, double angle)
{
    Pos r;


    r.x = p.x * cos(angle) + p.z * sin(angle);
    r.y = p.y;
    r.z = -p.x * sin(angle) + p.z * cos(angle);


    return r;
}



Pos RotateX(Pos p, double angle)
{
    Pos r;


    r.x = p.x;
    r.y = p.y * cos(angle) - p.z * sin(angle);
    r.z = p.y * sin(angle) + p.z * cos(angle);


    return r;
}



// ==========================
//        Pixels
// ==========================

void DrawPixel(RenderCanvas *canvas,
               Pos p,
               Color color)
{
    if(p.x < 0 ||
       p.y < 0 ||
       p.x >= canvas->width ||
       p.y >= canvas->height)
        return;


    int x = (int)p.x;
    int y = (int)p.y;


    canvas->pixels[
        y * canvas->width + x
    ] = color;
}



// ==========================
//        Lines
// ==========================

void DrawLine(RenderCanvas *canvas,
              Pos a,
              Pos b,
              Color color)
{
    int x0 = (int)a.x;
    int y0 = (int)a.y;

    int x1 = (int)b.x;
    int y1 = (int)b.y;


    int dx = abs(x1-x0);
    int dy = abs(y1-y0);


    int sx = x0 < x1 ? 1 : -1;
    int sy = y0 < y1 ? 1 : -1;


    int err = dx - dy;


    while(1)
    {
        DrawPixel(
            canvas,
            Pos_Create(x0,y0,0),
            color
        );


        if(x0 == x1 && y0 == y1)
            break;


        int e2 = err * 2;


        if(e2 > -dy)
        {
            err -= dy;
            x0 += sx;
        }


        if(e2 < dx)
        {
            err += dx;
            y0 += sy;
        }
    }
}



// ==========================
//        Clear
// ==========================

void Clear(RenderCanvas *canvas,
           Color color)
{
    for(int i = 0;
        i < canvas->width * canvas->height;
        i++)
    {
        canvas->pixels[i] = color;
    }
}


#endif