const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Ensure this includes the user's `id`
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
};

module.exports = { authenticate };