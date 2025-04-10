const BorrowedDevices = require("../model/borrowedDevices");

let data;
let ids = [];

let getData = async () => {
  const devices = await BorrowedDevices.find();
  data = [...devices];
  // console.log("First Data: ", data);
  filterData(data);
  // console.log("Second Data: ", data);
};

let filterData = (arr) => {
  // filter array for specific device
  // console.log("Arr: ", arr);
  let filteredArray = arr.filter((item) => item.model === "EliteBook G8");
  // console.log("FilteredData: ", filteredArray);
  data = [...filteredArray];
  // Get mongo Id's
  // console.log("After Filter Function: ", data);
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]._id);
    ids.push(data[i]._id);
  }
  // console.log("ID Array:", ids);
  addField(ids, "Laptop");
};

let addField = async (arr, value) => {
  for (let i = 0; i < ids.length; i++) {
    await BorrowedDevices.findByIdAndUpdate(
      arr[i],
      { deviceType: value },
      {
        new: true,
        runValidators: true
      }
    );
  }
  console.log("DONE");
};

module.exports = getData;
