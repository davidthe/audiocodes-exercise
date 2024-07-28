// const healthReasons = require('../data/health_reasons.json');

exports.reportHealthIssue = (req, res) => {
    // Assume that req.body contains the chained drop down selections
    res.status(200).send({ message: 'Your request is being processed.' });
};