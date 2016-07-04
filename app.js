const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;

let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else {
    url = trump(url, "?");
    fs.readFile('.' + url, function (err, data) {
      if (err) {
        fs.readFile('./index.html', function (err, data) {
          if (err) {
            res.writeHead(404);
            res.end('Not found');
          } else {
            let ext = 'html';
            res.setHeader('Content-Type', contentTypes[ext]);
            res.setHeader('Cache-Control', 'no-cache, no-store');
            res.end(data);
          }
        });
      } else {
        let ext = path.extname(url).slice(1);
        if (contentTypes[ext]) {
          res.setHeader('Content-Type', contentTypes[ext]);
        }
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});

function trump(str, pattern) {
  let trumped = "";  // default return for invalid string and pattern

  if (str && str.length) {
    trumped = str;
    if (pattern && pattern.length) {
      let idx = str.indexOf(pattern);

      if (idx != -1) {
        trumped = str.substring(0, idx);
      }
    }
  }
  return (trumped);
}

const nodePort = env.NODE_PORT || 3000;
const nodeIp = env.NODE_IP || 'localhost';

server.listen(nodePort, nodeIp, function () {
  console.log(`Application worker ${process.pid} started...`);
  console.log(`IP: ${nodeIp} PORT: ${nodePort}`);
});
