const express = require('express');
const http = require('http');
const app = express();
const path = require('path');

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(8080, () => {
  console.log('server started on port 8080');
});
