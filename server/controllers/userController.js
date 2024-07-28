const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'your_secret_key';
const users = [{ username: 'myUser', password: bcrypt.hashSync('myPass', 8) }];
let loginAttempts = 0;
let lockUntil = null;

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (lockUntil && lockUntil > Date.now()) {
        return res.status(403).send({ message: 'Login is locked. Try again later.' });
    }

    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        loginAttempts++;
        if (loginAttempts >= 3) {
            lockUntil = Date.now() + 60 * 1000;
            loginAttempts = 0;
            return res.status(403).send({ message: 'Login is locked for 1 minute.' });
        }
        return res.status(401).send({ message: 'Invalid credentials' });
    }

    loginAttempts = 0;
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
};

exports.logout = (req, res) => {
    res.status(200).send({ message: 'Logged out successfully' });
};
