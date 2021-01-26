const proxy = require('express-http-proxy');
const express = require('express');
const cfg = require('../../pkg/config');
const path = require('path');

const app = express();

app.use('/api/v1/auth', proxy(
  'http://localhost:10001',
  { proxyReqPathResolver: (req) => `http://localhost:10001/api/v1/auth${req.url}` }
));

app.use('/api/v1/storage', proxy(
  'http://localhost:10002',
  { proxyReqPathResolver: (req) => `http://localhost:10002/api/v1/storage${req.url}` }
));

app.use('/api/v1/users', proxy(
  'http://localhost:10003',
  { proxyReqPathResolver: (req) => `http://localhost:10003/api/v1/users${req.url}` }
));

app.use('/', express.static(path.join(__dirname, '/../../public/build')));

const PORT = process.env.PORT || cfg.get('services').proxy.port;

app.listen(PORT, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Server started on port ${PORT}`);
});




//                          users (8083)       \
//                        /                     \
//                       /
// browser -> proxy (80) -- auth (8081)          -   DB
//                       \
//                        \                      /
//                          storage (8082)      /



// /api/v1/auth/... -> auth (8081)
// /api/v1/storage/... -> storage (8082)
// /api/v1/users/... -> users (8083)
// ...

// // git bash