const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const pdflib = require("pdf-lib");
const path = require("path");
// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Import Scripts
// const getBorrowed = require("./scripts/updateField");
// const addField = require("./scripts/addField");
// const addFieldDeskPhone = require("./scripts/newFieldDeskPhones");
// const addArchiveField = require("./scripts/addArchiveField");
const connectDB = require("./config/dbConfig");
// const { PDFDocument } = require("pdf-lib");

// middleware
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 8080;
const app = express();
//body parser
app.use(express.json());

app.use(cors());

connectDB();
app.use(express.static("client/build"));

// routes
const auth = require("./routes/auth");
const actions = require("./routes/actions");
const computers = require("./routes/computers");
const phones = require("./routes/phones");
const monitors = require("./routes/monitors");
const devices = require("./routes/devices");
const admin = require("./routes/admin");
const dockingStations = require("./routes/dockingStations");
const users = require("./routes/users");
const borrowedDevices = require("./routes/borrowedDevices");
const deskPhones = require("./routes/deskPhones");
const documents = require("./routes/documents");
// const scripts = require("./routes/scripts");

// Accessory Routes
const accessories = require("./routes/accessories");

// Search Routes
const search = require("./routes/search");

app.use("/api/v1/auth", auth);
app.use("/api/v1/actions", actions);
app.use("/api/v1/search", search);
app.use("/api/v1/devices", devices);
app.use("/api/v1/computers", computers);
app.use("/api/v1/phones", phones);
app.use("/api/v1/monitors", monitors);
app.use("/api/v1/admin", admin);
app.use("/api/v1/dockingstations", dockingStations);
app.use("/api/v1/users", users);
app.use("/api/v1/itam", borrowedDevices);
app.use("/api/v1/deskphones", deskPhones);
app.use("/api/v1/accessory", accessories);
app.use("/api/v1/documents", documents);
// app.use("/api/v1/scripts", scripts);

// middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  // Serve static assets from client/build
  app.use(express.static(path.join(__dirname, "client/build")));

  // Serve index.html for unrecognized routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Scripts
// getBorrowed();
// // addField();
// addFieldDeskPhone();
// addArchiveField();

app.listen(PORT, () => {
  console.log("Server is running");
});
