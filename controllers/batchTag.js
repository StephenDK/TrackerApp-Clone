const asyncHandler = require("../middleware/async");
const Computers = require("../model/computer");
const xlsx = require('xlsx');

exports.batchTag = asyncHandler(async (req, res, next) => {
    try {
        // Check if there's a file uploaded with the name 'file' in the request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        if (!req.query.tags) {
            return res.status(400).json({ error: 'No tags inputted.' })
        }

        // Access the uploaded file data from req.file.buffer
        const fileBuffer = req.file.buffer;

        // Basic setup for xlsx
        const workbook = xlsx.read(fileBuffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const columnAData = [];

        for (let i = 1; ; i++) {
            const cellAddress = `A${i}`;
            const cell = sheet[cellAddress];

            if (!cell || !cell.v) {
                break;
            }
            columnAData.push(cell.v);
        }

        const cellInDatabase = await Computers.find({ 'computerSerial': { $in: columnAData } });
        const cellsNotFound = [];

        columnAData.forEach(device => {
            const found = cellInDatabase.some(cell => cell.computerSerial === device);

            if (!found) {
                cellsNotFound.push(device);
            }
        });

        const computerNamesToUpdate = cellInDatabase.map(cell => cell.computerSerial);

        const query = { 'computerSerial': { $in: computerNamesToUpdate } };

        const update = {
            $addToSet: {
                tags: { $each: req.query.tags }
            }
        };

        if (computerNamesToUpdate.length === 0) {
            res.json({ message: "Nothing to update", missingComputers: cellsNotFound });
        } else {
            const updateTags = await Computers.updateMany(query, update);
            console.log(JSON.stringify(cellsNotFound));
            res.status(200).json({
                message: "Successfully tagged the following devices: " + JSON.stringify(computerNamesToUpdate),
                missingComputers: cellsNotFound
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the file.' });
    }
});