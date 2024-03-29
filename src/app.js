const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      try {
        const { num1, num2 } = JSON.parse(body);

        // Validating inputs
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Both numbers must be integers');
          return;
        }
        if (num1 <= 0) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('The operation cannot be performed');
          return;
        }
        if (num2 < 0) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('num2 must be a non-negative integer');
          return;
        }

        // Calculating exponentiation
        const result = Math.pow(num1, num2);

        // Sending successful response
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`The result is ${result}`);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON input');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

module.exports = server;
