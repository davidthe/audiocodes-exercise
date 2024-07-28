const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

exports.uploadFile = (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send({ message: 'No file uploaded' });

    const csvFilePath = path.join(__dirname, '..', file.path);
    const jsonFilePath = path.join(__dirname, '..', 'uploads', `${file.filename}.json`);

    csv()
        .fromFile(csvFilePath)
        .then(jsonObj => {
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
            res.status(200).send(jsonObj);
        })
        .catch(err => res.status(500).send({ message: 'Error processing file', error: err }));
};
