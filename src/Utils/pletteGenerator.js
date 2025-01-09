import quantize from "quantize";

// creates a pixel [[r,g,b],[r,g,b]] array from image data [r,g,b,a,r,g,b,a]
// filter out transparent and white pixel a < 125
export function createPixelArray(imgData, pixelCount, quality) {
  const pixels = imgData;
  const pixelArray = [];
  const brightnessThreshold = 100; // Brightness threshold for selecting bright colors
  const minRGBThreshold = 20; // Minimum value for RGB channels to avoid dark pixels

  for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
    offset = i * 4;
    r = pixels[offset + 0];
    g = pixels[offset + 1];
    b = pixels[offset + 2];
    a = pixels[offset + 3];

    // If pixel is mostly opaque and not white
    if (typeof a === "undefined" || a >= 125) {
      if (!(r > 250 && g > 250 && b > 250)) {
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        // Check if the pixel is bright enough and not too dark
        if (
          brightness >= brightnessThreshold &&
          r > minRGBThreshold &&
          g > minRGBThreshold &&
          b > minRGBThreshold
        ) {
          pixelArray.push([r, g, b]);
        }
        // pixelArray.push([r, g, b]);
      }
    }
  }
  return pixelArray;
}

export const generatePalette = (image, colorCount) => {
  const imageData = image.data;
  const pixels = image.height * image.width;
  const pixelArray = createPixelArray(imageData, pixels, 5);
  const colorMap = quantize(pixelArray, colorCount);
  const palette = colorMap?.palette();
  return palette;
};
