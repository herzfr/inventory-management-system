const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const APP_SECRET = '__INVENTORY_MANAGEMENT_SYSTEM__';
const db = require('./db.json');
const USERS = db.users;

const mappings = {
    get: ['/api/user', '/users'],
};

function requiresAuth(method, url) {
    return (mappings[method.toLowerCase()] || []).some(p => url.startsWith(p));
}

module.exports = (req, res, next) => {
    if (req.url.endsWith("login") && req.method === "POST") {
        const { username, password } = req.body;
        const user = USERS.find(u => u.username === username && u.password === password);

        if (user) {
            const userData = {
                username: user.username,
                roles: user.roles,
                name: user.name // Assuming you have a 'name' field in your user object
            };

            const token = jwt.sign({ data: userData }, APP_SECRET, { expiresIn: '1h' });
            res.json({ status: "00", message: "Login success", data: { token, user: userData } });
        } else {
            res.json({ status: "99", message: "Incorrect username or password", data: null });
        }
        return;
    }

    if (requiresAuth(req.method, req.url)) {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) {
                res.status(401).json({ status: "99", message: "Invalid token" });
                return;
            }
        } else {
            res.status(401).json({ status: "99", message: "No token provided" });
            return;
        }
    }

    next();
};
