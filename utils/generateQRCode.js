const QRCode = require("qrcode");
const fs = require("fs");
const setupCanvas = require("./qrLabelCanvas");
const { createCanvas } = require("canvas");

async function generateQRCode(data) {
  // const { canvas, ctx, width, height } = setupCanvas();

  try {
    // Create a temporary canvas to generate the QR code
    const qrCodeCanvas = createCanvas(20, 20); // QR code size, 15x15px
    await QRCode.toCanvas(qrCodeCanvas, data, {
      errorCorrectionLevel: "H",
      margin: 1,
      scale: 2,
    });

    // // Calculate the position to center the QR code on the main canvas
    // const qrCodeWidth = qrCodeCanvas.width;
    // const qrCodeHeight = qrCodeCanvas.height;
    // const x = (width - qrCodeWidth) / 2; // Center horizontally
    // const y = (height - qrCodeHeight) / 2; // Center vertically

    // // Draw the QR code onto the main canvas
    // ctx.drawImage(qrCodeCanvas, x, y);

    // Save the canvas image as PNG
    // const out = fs.createWriteStream("./label.png");
    // const stream = canvas.createPNGStream();
    // stream.pipe(out);

    // await new Promise((resolve, reject) => {
    //   out.on("finish", resolve);
    //   out.on("error", reject);
    // });

    // console.log(
    //   "The label with QR code has been generated and saved as label.png"
    // );

    // Return the base64 data URL to the front end
    // return canvas.toDataURL();
    return qrCodeCanvas.toDataURL();
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

module.exports = generateQRCode;
