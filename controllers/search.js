const DeviceLookup = require("../model/deviceLookup");

exports.returnAllDevices = async (req, res, next) => {
  console.log("Searching...");
  console.log(req.query);
  console.log("[REQUEST]: ", req.query.query);
  try {
    const searchText = req.query.query?.toLowerCase();

    if (!searchText) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    // Search by serial or userName
    let matchedItems = await DeviceLookup.find({
      $or: [
        { serial: { $regex: searchText, $options: "i" } }, // Case-insensitive partial match for serial
        { userName: { $regex: searchText, $options: "i" } }, // Case-insensitive partial match for userName
      ],
    });

    if (matchedItems.length === 0) {
      matchedItems = [];
    }

    console.log("[MATCHED]", matchedItems);

    res.status(200).json({
      success: true,
      data: matchedItems,
    });
  } catch (error) {
    console.error("Error in search route:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching devices.",
    });
  }
};

/*
const Computers = require("../model/computer");
const Monitors = require("../model/monitors");
const DockingStations = require("../model/dockingStations");
const Phones = require("../model/phone");
const DeskPhones = require("../model/deskPhone");
const BorrowedDevices = require("../model/borrowedDevices");
const Accessories = require("../model/accessories");


// // Function to calculate Levenshtein distance
// const levenshteinDistance = (a, b) => {
//   const matrix = Array.from({ length: a.length + 1 }, () =>
//     Array(b.length + 1).fill(0)
//   );

//   for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
//   for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

//   for (let i = 1; i <= a.length; i++) {
//     for (let j = 1; j <= b.length; j++) {
//       matrix[i][j] =
//         a[i - 1] === b[j - 1]
//           ? matrix[i - 1][j - 1]
//           : Math.min(
//               matrix[i - 1][j] + 1, // Deletion
//               matrix[i][j - 1] + 1, // Insertion
//               matrix[i - 1][j - 1] + 1 // Substitution
//             );
//     }
//   }

//   return matrix[a.length][b.length];
// };

// // Function to find similar items
// const findSimilarItems = (items, searchText, maxDistance = 3) =>
//   items.filter((item) =>
//     Object.values(item).some((value) => {
//       if (!value) return false;
//       const strValue = value.toString().toLowerCase();
//       const distance = levenshteinDistance(strValue, searchText);
//       return distance <= maxDistance || strValue.includes(searchText);
//     })
//   );

exports.returnAllDevices = async (req, res, next) => {
  console.log("Searching...");
  console.log(req.query);
  console.log("[REQUEST]: ", req.query.query);
  try {
    console.log("Searching...");
    const searchText = req.query.query?.toLowerCase() || "";

    // Run database queries in parallel
    const [computers, monitors, docks, phones, deskPhones, itam, accessories] =
      await Promise.all([
        Computers.find({}, "_id computerSerial userName"),
        Monitors.find({}, "_id monitorSerial userName"),
        DockingStations.find({}, "_id dockingStationSerial userName"),
        Phones.find({}, "_id phoneIMEI userName"),
        DeskPhones.find({}, "_id phoneMAC userName"),
        BorrowedDevices.find({}, "_id serial userName"),
        Accessories.find({}, "_id barcode serial userName"),
      ]);

    // Mapping function
    const mapItems = (items, type, serialKey, additionalKey = null) =>
      items.map((item) => ({
        id: item._id,
        type,
        serial: additionalKey
          ? item[serialKey] || item[additionalKey]
          : item[serialKey],
        user: item.userName,
      }));

    // Transform data
    const inventoryItems = [
      ...mapItems(computers, "computers", "computerSerial"),
      ...mapItems(phones, "phones", "phoneIMEI"),
      ...mapItems(monitors, "monitors", "monitorSerial"),
      ...mapItems(docks, "docks", "dockingStationSerial"),
      ...mapItems(deskPhones, "deskphones", "phoneMAC"),
      ...mapItems(accessories, "accessory", "serial", "barcode"),
      ...mapItems(itam, "itam", "serial"),
    ];

    // Find exact and similar matches
    // const filteredData = findSimilarItems(inventoryItems, searchText);

      const filteredData = inventoryItems.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchText)
      )
    );

    res.status(200).json({
      success: true,
      data: filteredData,
    });
  } catch (error) {

    console.error("Error in search route:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching devices.",
    });
  }
};


*/
