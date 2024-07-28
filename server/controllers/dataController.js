const request = require('request');

const options = {
    method: 'GET',
    url: 'https://users-2724.restdb.io/rest/test-db',
    headers: { 'cache-control': 'no-cache', 'x-apikey': '2e9647973f18f3eaa38cb24c42834d0605d9d' }
};

exports.getUsers = (req, res) => {
    request(options, (error, response, body) => {
        if (error) return res.status(500).send(error);
        const data = JSON.parse(body);
        const users = data.map(user => ({ id: user.ID, name: `${user.FirstName} ${user.LastName}`, age: user.Age }));
        res.status(200).send(users);
    });
};

exports.getUserDetails = (req, res) => {
    request(options, (error, response, body) => {
        if (error) return res.status(500).send(error);
        const data = JSON.parse(body);
        const user = data.find(user => user.ID === req.params.id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        const heartRates = user.HeartRate.split(';').map(Number);
        const bmi = user.Weight / ((user.Height / 100) ** 2);

        const heartRateData = heartRates.map((rate, index) => {
            let status = 'sleeping';
            if (rate >= 70 && rate < 90) status = 'awake';
            if (rate >= 90) status = 'workout';
            return { minute: index + 1, rate, status };
        });

        const averageHeartRate = heartRates.reduce((sum, rate) => sum + rate, 0) / heartRates.length;

        res.status(200).send({ user, bmi, heartRateData, averageHeartRate });
    });
};
