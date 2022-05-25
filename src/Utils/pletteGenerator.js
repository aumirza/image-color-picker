import quantize from "quantize";

export function createPixelArray(imgData, pixelCount, quality) {
    const pixels = imgData;
    const pixelArray = [];

    for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];

        // If pixel is mostly opaque and not white
        if (typeof a === 'undefined' || a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }
    return pixelArray;
}

export const generatePalette = (image, colorCount) => {
    const imageData = image.data
    const pixels = image.height * image.width
    const pixelArray = createPixelArray(imageData, pixels, 5)
    const colorMap = quantize(pixelArray, colorCount)
    const palette = colorMap?.palette()
    return palette
}