const asyncHandler = require("../middleware/async");
const ExcelJS = require("exceljs");

const Computers = require("../model/computer");
const Monitors = require("../model/monitors");
const Phones = require("../model/phone");
const DockingStations = require("../model/docks");
const DeskPhones = require("../model/deskPhone");
const BorrowedDevices = require("../model/borrowedDevices");
const ErrorResponse = require("../utils/errorResponse");
const moment = require("moment");

exports.generateReport = asyncHandler(async (req, res, next) => {
  const computers = await Computers.find({});
  const monitors = await Monitors.find({});
  const phones = await Phones.find({});
  const docks = await DockingStations.find({});
  const deskphones = await DeskPhones.find({});
  const borrowedDevices = await BorrowedDevices.find({});
  const workbook = new ExcelJS.Workbook();

  // ExcelJS Work
  workbook.creator = "ASD-Tech";
  workbook.lastModifiedBy = "ASD-Tech";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.lastPrinted = new Date();

  let analysis = workbook.addWorksheet("Analytics");
  let computerWorksheet = workbook.addWorksheet("Computers");
  let phoneWorksheet = workbook.addWorksheet("Phones");
  let monitorWorksheet = workbook.addWorksheet("Monitors");
  let dockWorksheet = workbook.addWorksheet("DockingStations");
  let deskPhoneWorkSheet = workbook.addWorksheet("DeskPhones");

  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 0,
      visibility: "visible",
      state: "frozen",
      ySplit: 1,
    },
  ];

  computerWorksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  phoneWorksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  monitorWorksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];
  dockWorksheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];
  deskPhoneWorkSheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  let total = computers.length + phones.length + monitors.length + docks.length;

  // analysis workbook
  analysis.addRow(["Total Number of Devices"]);
  analysis.addRow(["Total Devices", total]);
  analysis.addRow(["Total Computers", computers.length]);
  analysis.addRow(["Total Phones", phones.length]);
  analysis.addRow(["Total Monitors", monitors.length]);
  analysis.addRow(["Total DockingStations", docks.length]);
  analysis.addRow(["Total Deskphones", deskphones.length]);
  analysis.addRow([""]);

  // ASD
  analysis.addRow(["Devices By Division"]);
  analysis.addRow(["ASD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "ASD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "ASD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "ASD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "ASD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "ASD").length,
  ]);
  analysis.addRow([""]);
  // BLD
  analysis.addRow(["BLD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "BLD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "BLD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "BLD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "BLD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "BLD").length,
  ]);
  analysis.addRow([""]);
  // CSD
  analysis.addRow(["CSD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "CSD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "CSD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "CSD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "CSD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "CSD").length,
  ]);
  analysis.addRow([""]);
  // ELVS
  analysis.addRow(["ELVS"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "ELVS").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "ELVS").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "ELVS").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "ELVS").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "ELVS").length,
  ]);
  analysis.addRow([""]);
  // EXEC
  analysis.addRow(["EXEC"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "EXEC").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "EXEC").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "EXEC").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "EXEC").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "EXEC").length,
  ]);
  analysis.addRow([""]);
  // FISCAL
  analysis.addRow(["FISCAL"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "FISCAL").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "FISCAL").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "FISCAL").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "FISCAL").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "FISCAL").length,
  ]);
  analysis.addRow([""]);
  // MAPPING
  analysis.addRow(["MAPPING"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "MAPPING").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "MAPPING").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "MAPPING").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "MAPPING").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "MAPPING").length,
  ]);
  analysis.addRow([""]);
  // P&P
  analysis.addRow(["P&P"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "P&P").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "P&P").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "P&P").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "P&P").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "P&P").length,
  ]);
  analysis.addRow([""]);
  // PLA
  analysis.addRow(["PLA"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "PLA").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "PLA").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "PLA").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "PLA").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "PLA").length,
  ]);
  analysis.addRow([""]);
  // POD
  analysis.addRow(["POD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "POD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "POD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "POD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "POD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "POD").length,
  ]);
  analysis.addRow([""]);
  // TSD
  analysis.addRow(["TSD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "TSD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "TSD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "TSD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "TSD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "TSD").length,
  ]);
  analysis.addRow([""]);
  // TSS
  analysis.addRow(["TSS"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "TSS").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "TSS").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "TSS").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "TSS").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "TSS").length,
  ]);
  analysis.addRow([""]);
  // VBM
  analysis.addRow(["VBM"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "VBM").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "VBM").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "VBM").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "VBM").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "VBM").length,
  ]);
  analysis.addRow([""]);
  // VRD
  analysis.addRow(["VRD"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.division === "VRD").length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.division === "VRD").length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.division === "VRD").length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.division === "VRD").length,
  ]);
  analysis.addRow([
    "DeskPhones",
    deskphones.filter((element) => element.division === "VRD").length,
  ]);
  analysis.addRow([""]);
  // Filter for  checked out devices
  analysis.addRow(["Checked Out Devices"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.checkedOut === true).length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.checkedOut === true).length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.checkedOut === true).length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.checkedOut === true).length,
  ]);
  analysis.addRow([""]);
  analysis.addRow(["Items in ASD Inventory"]);
  analysis.addRow([
    "Computers",
    computers.filter((element) => element.checkedOut === false).length,
  ]);
  analysis.addRow([
    "Phones",
    phones.filter((element) => element.checkedOut === false).length,
  ]);
  analysis.addRow([
    "Monitors",
    monitors.filter((element) => element.checkedOut === false).length,
  ]);
  analysis.addRow([
    "DockingStations",
    docks.filter((element) => element.checkedOut === false).length,
  ]);
  analysis.addRow([""]);
  analysis.addRow(["Computers by Type"]);
  analysis.addRow([
    "Surface Tablet 128 GB",
    computers.filter(
      (element) => element.computerModel === "Surface Tablet 128 GB"
    ).length,
  ]);
  analysis.addRow([
    "EliteBook 840 G6",
    computers.filter((element) => element.computerModel === "EliteBook 840 G6")
      .length,
  ]);
  analysis.addRow([
    "EliteBook 840 G5",
    computers.filter((element) => element.computerModel === "EliteBook 840 G5")
      .length,
  ]);
  analysis.addRow([
    "EliteBook 840 G4",
    computers.filter((element) => element.computerModel === "EliteBook 840 G4")
      .length,
  ]);
  analysis.addRow([
    "EliteBook 840 G3",
    computers.filter((element) => element.computerModel === "EliteBook 840 G3")
      .length,
  ]);
  analysis.addRow([
    "EliteBook x360 1030 G4",
    computers.filter(
      (element) => element.computerModel === "EliteBook x360 1030 G4"
    ).length,
  ]);
  analysis.addRow([
    "EliteBook Folio 9480m",
    computers.filter(
      (element) => element.computerModel === "EliteBook Folio 9480m"
    ).length,
  ]);
  analysis.addRow([
    "EliteBook Folio 9470m",
    computers.filter(
      (element) => element.computerModel === "EliteBook Folio 9470m"
    ).length,
  ]);
  analysis.addRow([
    "EliteDesk 800 G3 Mini",
    computers.filter(
      (element) => element.computerModel === "EliteDesk 800 G3 Mini"
    ).length,
  ]);
  analysis.addRow([
    "EliteDesk 800 G4",
    computers.filter((element) => element.computerModel === "EliteDesk 800 G4")
      .length,
  ]);
  analysis.addRow([
    "EliteDesk 800 G2",
    computers.filter((element) => element.computerModel === "EliteDesk 800 G2")
      .length,
  ]);
  analysis.addRow([""]);
  analysis.addRow(["Phones by Type"]);
  analysis.addRow([
    "AT&T MiFi",
    phones.filter((element) => element.phoneModel === "MiFi").length,
  ]);
  analysis.addRow([
    "iPhone 12",
    phones.filter((element) => element.phoneModel === "12").length,
  ]);
  analysis.addRow([
    "iPhone 11 Pro",
    phones.filter((element) => element.phoneModel === "11 Pro").length,
  ]);
  analysis.addRow([
    "iPhone 11 Pro Max",
    phones.filter((element) => element.phoneModel === "11 Pro Max").length,
  ]);
  analysis.addRow([
    "iPhone 11",
    phones.filter((element) => element.phoneModel === "11").length,
  ]);
  analysis.addRow([
    "iPhone SE",
    phones.filter((element) => element.phoneModel === "SE").length,
  ]);
  analysis.addRow([
    "iPhone XS",
    phones.filter((element) => element.phoneModel === "XS").length,
  ]);
  analysis.addRow([
    "iPhone XS Max",
    phones.filter((element) => element.phoneModel === "XS Max").length,
  ]);
  analysis.addRow([
    "iPhone XR",
    phones.filter((element) => element.phoneModel === "XR").length,
  ]);
  analysis.addRow([
    "iPhone X",
    phones.filter((element) => element.phoneModel === "X").length,
  ]);
  analysis.addRow([
    "iPhone 8 Plus",
    phones.filter((element) => element.phoneModel === "8 Plus").length,
  ]);
  analysis.addRow([
    "iPhone 8",
    phones.filter((element) => element.phoneModel === "8").length,
  ]);
  analysis.addRow([
    "iPhone 7 Plus",
    phones.filter((element) => element.phoneModel === "7 Plus").length,
  ]);
  analysis.addRow([
    "iPhone 7",
    phones.filter((element) => element.phoneModel === "7").length,
  ]);
  analysis.addRow([
    "iPhone 6s",
    phones.filter((element) => element.phoneModel === "6s").length,
  ]);
  analysis.addRow([
    "iPhone 6 Plus",
    phones.filter((element) => element.phoneModel === "6 Plus").length,
  ]);
  analysis.addRow([
    "iPhone 6",
    phones.filter((element) => element.phoneModel === "6").length,
  ]);
  analysis.addRow([""]);
  analysis.addRow(["Monitors by Type"]);
  analysis.addRow([
    "E243i Monitor",
    monitors.filter((element) => element.monitorModel === "E243i Monitor")
      .length,
  ]);
  analysis.addRow([
    "EliteDisplay E242 Monitor",
    monitors.filter(
      (element) => element.monitorModel === "EliteDisplay E242 Monitor"
    ).length,
  ]);
  analysis.addRow([
    "MultiSync E233WMi",
    monitors.filter((element) => element.monitorModel === "MultiSync E233WMi")
      .length,
  ]);
  analysis.addRow([""]);
  analysis.addRow(["DockingStations by Type"]);
  analysis.addRow([
    "Thunderbolt Dock 120W G2",
    docks.filter(
      (element) => element.dockingStationModel === "Thunderbolt Dock 120W G2"
    ).length,
  ]);
  analysis.addRow([
    "UltraSlim Docking Station",
    docks.filter(
      (element) => element.dockingStationModel === "UltraSlim Docking Station"
    ).length,
  ]);

  analysis.getColumn("A").width = 40;

  // Analysis Worksheet Styles
  analysis.getCell("A1").font = {
    bold: true,
  };
  analysis.getCell("A9").font = {
    bold: true,
  };
  analysis.getCell("A10").font = {
    bold: true,
  };
  analysis.getCell("A17").font = {
    bold: true,
  };
  analysis.getCell("A24").font = {
    bold: true,
  };
  analysis.getCell("A31").font = {
    bold: true,
  };
  analysis.getCell("A38").font = {
    bold: true,
  };
  analysis.getCell("A45").font = {
    bold: true,
  };
  analysis.getCell("A52").font = {
    bold: true,
  };
  analysis.getCell("A59").font = {
    bold: true,
  };
  analysis.getCell("A66").font = {
    bold: true,
  };
  analysis.getCell("A73").font = {
    bold: true,
  };
  analysis.getCell("A80").font = {
    bold: true,
  };
  analysis.getCell("A87").font = {
    bold: true,
  };
  analysis.getCell("A94").font = {
    bold: true,
  };
  analysis.getCell("A101").font = {
    bold: true,
  };
  analysis.getCell("A108").font = {
    bold: true,
  };
  analysis.getCell("A114").font = {
    bold: true,
  };
  analysis.getCell("A120").font = {
    bold: true,
  };
  analysis.getCell("A133").font = {
    bold: true,
  };
  analysis.getCell("A152").font = {
    bold: true,
  };
  analysis.getCell("A157").font = {
    bold: true,
  };

  computerWorksheet.columns = [
    { header: "Serial", key: "serial", width: 20 },
    { header: "Computer Name", key: "name", width: 32 },
    { header: "Make", key: "make", width: 10 },
    { header: "Model", key: "model", width: 32 },
    { header: "User Name", key: "username", width: 32 },
    { header: "Location", key: "location", width: 15 },
    { header: "Manager", key: "manager", width: 25 },
    { header: "Division", key: "division", width: 25 },
    { header: "Peripherals", key: "peripherals", width: 40 },
    { header: "Telework", key: "telework", width: 25 },
    { header: "Description", key: "description", width: 25 },
    { header: "Checked Out", key: "checkedout", width: 25 },
    { header: "Previous User", key: "previous", width: 25 },
    { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
    { header: "Checked In Date", key: "checkedInDate", width: 25 },
    { header: "Date Inventoried", key: "inventoryDate", width: 25 },
  ];

  phoneWorksheet.columns = [
    { header: "IMEI", key: "imei", width: 25 },
    { header: "Phone Number", key: "number", width: 25 },
    { header: "Make", key: "make", width: 10 },
    { header: "Model", key: "model", width: 25 },
    { header: "User Name", key: "username", width: 25 },
    { header: "Manager", key: "manager", width: 25 },
    { header: "Division", key: "division", width: 25 },
    { header: "Peripherals", key: "peripherals", width: 25 },
    { header: "Description", key: "description", width: 25 },
    { header: "Previous User", key: "previous", width: 25 },
    { header: "Telework", key: "telework", width: 25 },
    { header: "Checked Out", key: "checkedout", width: 25 },
    { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
    { header: "Checked In Date", key: "checkedInDate", width: 25 },
    { header: "Date Inventoried", key: "inventoryDate", width: 25 },
  ];

  monitorWorksheet.columns = [
    { header: "Serial", key: "serial", width: 25 },
    { header: "Make", key: "make", width: 25 },
    { header: "Model", key: "model", width: 25 },
    { header: "User Name", key: "username", width: 25 },
    { header: "Location", key: "location", width: 15 },
    { header: "Manager", key: "manager", width: 25 },
    { header: "Division", key: "division", width: 25 },
    { header: "Description", key: "description", width: 25 },
    { header: "Previous User", key: "previous", width: 25 },
    { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
    { header: "Checked In Date", key: "checkedInDate", width: 25 },
    { header: "Telework", key: "telework", width: 25 },
    { header: "Being Used", key: "checkedout", width: 25 },
    { header: "Date Inventoried", key: "inventoryDate", width: 25 },
  ];

  dockWorksheet.columns = [
    { header: "Serial", key: "serial", width: 25 },
    { header: "Make", key: "make", width: 25 },
    { header: "Model", key: "model", width: 25 },
    { header: "User Name", key: "username", width: 25 },
    { header: "Location", key: "location", width: 15 },
    { header: "Manager", key: "manager", width: 25 },
    { header: "Division", key: "division", width: 25 },
    { header: "Description", key: "description", width: 25 },
    { header: "Previous User", key: "previous", width: 25 },
    { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
    { header: "Checked In Date", key: "checkedInDate", width: 25 },
    { header: "Telework", key: "telework", width: 25 },
    { header: "Being Used", key: "checkedout", width: 25 },
    { header: "Date Inventoried", key: "inventoryDate", width: 25 },
  ];

  deskPhoneWorkSheet.columns = [
    { header: "ROVDP #", key: "name", width: 12 },
    { header: "Mac Address", key: "mac", width: 25 },
    { header: "Phone Number", key: "number", width: 20 },
    { header: "Extension", key: "extension", width: 15 },
    { header: "Checked Out", key: "checkedOut", width: 15 },
    { header: "Make", key: "make", width: 10 },
    { header: "Model", key: "model", width: 10 },
    { header: "User Name", key: "username", width: 25 },
    { header: "Division", key: "division", width: 10 },
    { header: "Location", key: "location", width: 25 },
    { header: "Lines", key: "lines", width: 25 },
    { header: "Description", key: "description", width: 25 },
    { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
    { header: "Checked In Date", key: "checkedInDate", width: 25 },
    { header: "Date Inventoried", key: "createdAt", width: 20 }
  ];

  // { header: "Serial", key: "serial", width: 20 },
  //   { header: "Computer Name", key: "name", width: 32 },
  //   { header: "Make", key: "make", width: 10 },
  //   { header: "Model", key: "model", width: 32 },
  //   { header: "User Name", key: "username", width: 32 },
  //   { header: "Manager", key: "manager", width: 25 },
  //   { header: "Division", key: "division", width: 25 },
  //   { header: "Peripherals", key: "peripherals", width: 25 },
  //   { header: "Telework", key: "telework", width: 25 },
  //   { header: "Description", key: "description", width: 25 },
  //   { header: "Previous User", key: "previous", width: 25 },
  //   { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
  //   { header: "Checked In Date", key: "checkedInDate", width: 25 },
  //   // { header: "Being Used", key: "checkedout", width: 25 },
  //   { header: "Date Inventoried", key: "inventoryDate", width: 25 }

  computers.forEach((element, index) => {
    let obj = element.periphs;
    let formatedPriphs = Object.values(obj).join(", ");
    if (formatedPriphs === "") {
      formatedPriphs = "None";
    }
    computerWorksheet.addRow({
      serial: element.computerSerial,
      name: element.computerName,
      make: element.computerMake,
      model: element.computerModel,
      username: element.userName,
      location: element.location,
      manager: element.manager,
      division: element.division,
      peripherals: formatedPriphs,
      description: element.description,
      previous: element.prevUser,
      telework: element.teleWork ? "Yes" : "No",
      checkedOutDate: element.checkedOutDate,
      checkedInDate: element.checkedInDate,
      checkedout: element.checkedOut,
      inventoryDate: element.createdAt,
    });

    // if (computers[index].checkedOut === true) {
    //   computerWorksheet.getRow(index + 2).fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "ccffdc" },
    //     bgColor: { argb: "ccffdc" }
    //   };
    // }
  });

  phones.forEach((element, index) => {
    let formatedNumber = element.phoneNumber
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");
    let obj = element.periphs;
    let formatedPriphs = Object.values(obj).join(", ");
    if (formatedPriphs === "") {
      formatedPriphs = "None";
    }
    phoneWorksheet.addRow({
      imei: element.phoneIMEI,
      number: formatedNumber,
      make: element.phoneMake,
      model: element.phoneModel,
      username: element.userName,
      manager: element.manager,
      division: element.division,
      peripherals: formatedPriphs,
      description: element.description,
      previous: element.prevUser,
      telework: element.teleWork ? "Yes" : "No",
      checkedout: element.checkedOut,
      checkedOutDate: element.checkedOutDate,
      checkedInDate: element.checkedInDate,
      inventoryDate: element.createdAt,
    });

    // if (phones[index].checkedOut === true) {
    //   phoneWorksheet.getRow(index + 2).fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "ccffdc" },
    //     bgColor: { argb: "ccffdc" }
    //   };
    // }
  });

  monitors.forEach((element, index) => {
    monitorWorksheet.addRow({
      serial: element.monitorSerial,
      make: element.monitorMake,
      model: element.monitorModel,
      username: element.userName,
      manager: element.manager,
      location: element.location,
      division: element.division,
      description: element.description,
      previous: element.prevUser,
      telework: element.teleWork ? "Yes" : "No",
      checkedout: element.checkedOut,
      checkedOutDate: element.checkedOutDate,
      checkedInDate: element.checkedInDate,
      inventoryDate: element.createdAt,
    });

    // if (monitors[index].checkedOut === true) {
    //   monitorWorksheet.getRow(index + 2).fill = {
    //     type: "pattern",
    //     pattern: "solid",
    //     fgColor: { argb: "ccffdc" },
    //     bgColor: { argb: "ccffdc" }
    //   };
    // }
  });

  docks.forEach((element, index) => {
    dockWorksheet.addRow({
      serial: element.dockingStationSerial,
      make: element.dockingStationMake,
      model: element.dockingStationModel,
      username: element.userName,
      location: element.location,
      manager: element.manager,
      division: element.division,
      description: element.description,
      previous: element.prevUser,
      checkedOutDate: element.checkedOutDate,
      checkInDate: element.checkedInDate,
      telework: element.teleWork,
      checkedout: element.checkedOut,
      inventoryDate: element.createdAt,
    });
  });

  deskphones.forEach((element, index) => {
    let data = {};
    if (element.lines.length > 0) {
      for (let i = 0; i < element.lines.length; i++) {
        data[element.lines[i].lineName] = element.lines[i].lineNumber;
      }
    } else {
      data = "No Lines";
    }

    deskPhoneWorkSheet.addRow({
      name: element.phoneName,
      mac: element.phoneMAC,
      number: element.phoneNumber,
      extension: element.extension,
      checkedOut: element.checkedOut,
      make: element.phoneMake,
      model: element.phoneModel,
      username: element.user,
      division: element.division,
      location: element.location,
      lines: data,
      description: element.description,
      checkedOutDate: element.checkedOutDate,
      checkInDate: element.checkedInDate,
      createdAt: element.createdAt
    });
  });

  if (borrowedDevices.length > 0) {
    let borrowedDevicesWorkSheet = workbook.addWorksheet(
      "ITAM Loaned Equipment"
    );

    borrowedDevicesWorkSheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    borrowedDevicesWorkSheet.columns = [
      { header: "Serial", key: "serial", width: 25 },
      { header: "Make", key: "make", width: 15 },
      { header: "Model", key: "model", width: 20 },
      { header: "Device Type", key: "type", width: 15 },
      { header: "Checked Out", key: "checkedOut", width: 15 },
      { header: "User", key: "user", width: 25 },
      { header: "Division", key: "division", width: 10 },
      { header: "Manager", key: "manager", width: 18 },
      { header: "Location", key: "location", width: 10 },
      { header: "Description", key: "description", width: 50 },
      { header: "Checked Out Date", key: "checkedOutDate", width: 25 },
      { header: "Checked In Date", key: "checkedInDate", width: 25 },
      { header: "Date Inventoried", key: "createdAt", width: 25 },
    ];

    borrowedDevices.forEach((element, index) => {
      borrowedDevicesWorkSheet.addRow({
        serial: element.serial,
        make: element.make,
        model: element.model,
        type: element.deviceType,
        checkedOut: element.checkedOut,
        user: element.userName,
        division: element.division,
        manager: element.manager,
        location: element.location,
        description: element.description,
        checkedOutDate: element.checkedOutDate,
        checkedInDate: element.checkedInDate,
        createdAt: element.createdAt,
      });
    });

    const borrowedDevicesFirstRow = borrowedDevicesWorkSheet.getRow(1);

    borrowedDevicesFirstRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    borrowedDevicesFirstRow.font = { bold: true };

    borrowedDevicesWorkSheet.getColumn("J").alignment = { wrapText: true };
  }

  // ExcelJS Styling
  const computerFirstRow = computerWorksheet.getRow(1);
  const phoneFirstRow = phoneWorksheet.getRow(1);
  const monitorFirstRow = monitorWorksheet.getRow(1);
  const dockFirstRow = dockWorksheet.getRow(1);
  const deskPhoneFirstRow = deskPhoneWorkSheet.getRow(1);

  computerFirstRow.alignment = { vertical: "middle", horizontal: "center" };
  phoneFirstRow.alignment = { vertical: "middle", horizontal: "center" };
  monitorFirstRow.alignment = { vertical: "middle", horizontal: "center" };
  dockFirstRow.alignment = { vertical: "middle", horizontal: "center" };
  deskPhoneFirstRow.alignment = { vertical: "middle", horizontal: "center" };

  computerFirstRow.font = { bold: true };
  phoneFirstRow.font = { bold: true };
  monitorFirstRow.font = { bold: true };
  dockFirstRow.font = { bold: true };
  deskPhoneFirstRow.font = { bold: true };

  let date = new Date();
  let formattedDate = moment(date).format("YYYY-MM-DD");

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Hardware_Inventory_Report_${formattedDate}.xlsx`
  );
  workbook.xlsx.write(res).then(function (data) {
    res.end();
    console.log("File write done");
  });

  console.log("Generating report");

  res.status(200);
});

// @desc    Delete multiple devices from inventory
// @route   DELETE /api/v1/admin//:id
// @access  Public
exports.barcodeDelete = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);

  try {
    let computer = await Computers.find({ computerSerial: req.params.id });
    let phone = await Phones.find({ phoneIMEI: req.params.id });
    let monitor = await Monitors.find({ monitorSerial: req.params.id });

    if (computer.length > 0) {
      console.log("There is a computer");
      computer[0].remove();
      res.status(200).json({
        success: true,
      });
    } else if (phone.length > 0) {
      console.log("Deleting phone");
      phone[0].remove();
      res.status(200).json({
        success: true,
      });
    } else if (monitor.length > 0) {
      console.log("Deleting Monitor");
      monitor[0].remove();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
    console.log(computer);
    console.log(phone);
  } catch (error) {
    console.log(error);
  }
  // res.status(200).json({
  //   success: true
  // })
});

exports.updateLocation = asyncHandler(async (req, res, next) => {
  console.log("Updating Location");
  console.log(req.body);
  try {
    const { computerSerial, monitor1, monitor2, location } = req.body;
    // test
    // console.log(computerSerial);
    // console.log(monitor1);
    // console.log(monitor2);
    let comp, mon1, mon2;
    let computerSuccess = true;
    let monitor1Success = true;
    let monitor2Success = true;

    // check for devices
    if (computerSerial !== "") {
      comp = await Computers.find({ computerSerial: computerSerial });
      // testing
      // console.log(typeof(comp));
      // console.log(comp[0].description);
      if (comp.length > 0) {
        console.log("updating");
        comp = await Computers.findByIdAndUpdate(comp[0]._id, {
          location: location,
        });
      } else {
        comp = null;
        computerSuccess = false;
      }
    } else {
      comp = null;
      computerSuccess = false;
    }

    if (monitor1 !== "") {
      console.log("Monitor 1 next");
      mon1 = await Monitors.find({ monitorSerial: monitor1 });

      if (mon1.length > 0) {
        mon1 = await Monitors.findByIdAndUpdate(mon1[0]._id, {
          location: location,
        });
      } else {
        mon1 = null;
        monitor1Success = false;
      }
    } else {
      mon1 = null;
      monitor1Success = false;
    }

    if (monitor2 !== "") {
      console.log("Monitor 2 next");
      mon2 = await Monitors.find({ monitorSerial: monitor2 });

      if (mon2.length > 0) {
        mon2 = await Monitors.findByIdAndUpdate(mon2[0]._id, {
          location: location,
        });
      } else {
        mon2 = null;
        monitor2Success = false;
      }
    } else {
      mon2 = null;
      monitor2Success = false;
    }
    console.log(comp);
    if (comp === null && mon1 === null && mon2 === null) {
      throw Error;
    }
    res.status(200).json({
      success: true,
      computer: comp,
      monitor1: mon1,
      monitor2: mon2,
      computerSuccess,
      monitor1Success,
      monitor2Success,
    });
  } catch (error) {
    res.status(401).json({
      error: true,
      message: "Sorry something went wrong!",
    });
  }
});
