const path = require('path');
const fs = require('fs');

exports.checkImage = async (req, res) => {
    const { userid } = req.params; // Expecting userid and filename in the request body
    const expectedFileName = `${userid}`; // Construct the expected file name

    // Path to the image
    const imagePath = path.join(__dirname, 'images', 'profile', expectedFileName);

    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }
        // If found, return the full file name
        return res.json({ fileName: expectedFileName });
    });
}