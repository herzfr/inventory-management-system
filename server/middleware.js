const jwt = require('jsonwebtoken');
const db = require('./db.js');

const APP_SECRET = '__INVENTORY_MANAGEMENT_SYSTEM__';
const USERS = db.users;

const mappings = {
    get: [
        '/api/inventories', 
        '/inventories',
        '/supplier',
        '/sales',
    ],
  };
  

function requiresAuth(method, url) {
    console.log('method ', method.toLowerCase())
    console.log('mappings', mappings)
    console.log('url', url)
  return (mappings[method.toLowerCase()] || []).some(p => {
    console.log('p ', p)
    return url.startsWith(p)
  });
}

module.exports = (req, res, next) => {
  if (req.url.endsWith('login') && req.method === 'POST') {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
      const userData = {
        username: user.username,
        roles: user.roles,
        name: user.name,
      };

      const token = jwt.sign({ data: userData }, APP_SECRET, { expiresIn: '1h' });
      res.json({ status: '00', message: 'Login success', data: { token, user: userData } });
    } else {
      res.json({ status: '99', message: 'Incorrect username or password', data: null });
    }
    return;
  }

  if (requiresAuth(req.method, req.url)) {
    let token = req.headers['authorization'] || '';
    console.log('token ', token)
    console.log('token.startsWith("Bearer ") ', token.startsWith('Bearer '))
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
      try {
        jwt.verify(token, APP_SECRET);
        console.log('jwt.verify(token, APP_SECRET); ', jwt.verify(token, APP_SECRET));
        next();
        return;
      } catch (err) {
        res.status(401).json({ status: '99', message: 'Invalid token' });
        return;
      }
    } else {
      res.status(401).json({ status: '99', message: 'No token provided' });
      return;
    }
  }

  next();
};
