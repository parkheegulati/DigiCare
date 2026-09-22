const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};
