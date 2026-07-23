export function SetTextureScale(texture, x, y = x) {
    texture.scaleX = x;
    texture.scaleY = y;
}

export function SetTextureOffset(texture, x, y) {
    texture.offsetX = x;
    texture.offsetY = y;
}

export function RotateTexture(texture, radians) {
    texture.rotation = radians;
}

export function RepeatTexture(texture, x, y = x) {
    texture.repeatX = x;
    texture.repeatY = y;
}

export function ClampTexture(texture) {
    texture.wrapMode = "clamp";
}

export function RepeatWrap(texture) {
    texture.wrapMode = "repeat";
}

export function MirrorTexture(texture) {
    texture.wrapMode = "mirror";
}

export function FlipTextureY(texture) {
    texture.flipY = !texture.flipY;
}