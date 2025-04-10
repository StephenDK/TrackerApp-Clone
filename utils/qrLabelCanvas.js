const { createCanvas } = require("canvas");

function setupCanvas() {
  const width = 200; // 400px width
  const height = 80; // 15px height

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Set a background color for the label
  ctx.fillStyle = "#ffffff"; // white background
  ctx.fillRect(0, 0, width, height);

  return { canvas, ctx, width, height };
}

module.exports = setupCanvas;
