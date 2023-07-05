const http = require('http');
const fs = require('fs');
const path = require('path');

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  /** add other headers as per requirement */
};

/**
 * @param {string} filePath
 * @param {http.ServerResponse} response
 */
const staticFile = (filePath, response) => {

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  const isDirectory = fs.lstatSync(filePath).isDirectory()

  if(isDirectory) {
    fs.readdir(filePath, (error, content)=>{
      const data = []
      content.forEach((file) => {
        const fileName = `${filePath}/${file}`
        const isFile = fs.lstatSync(fileName).isFile()
        if (isFile) {
          data.push(fs.readFileSync(fileName, 'utf-8'))
        }
      })

      const responseData = `[${data.join(',')}]`
      response.writeHead(200, {
        ...headers,
        'Content-Type': 'application/json',
      });
      response.end(responseData, 'utf-8');
    })
  } else {
    fs.readFile(filePath, function (error, content) {
      if (error) {
        if (error.code == 'ENOENT') {
          response.writeHead(404, headers);
          response.end();
          return
        }
        response.writeHead(500, headers);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      } else {
        response.writeHead(200, {
          ...headers,
          'Content-Type': contentType,
        });
        response.end(content, 'utf-8');
      }
    })

  }

}

http.createServer((request, response) => {
  const { url } = request




  const filePath = '.' + url;
  if (!fs.existsSync(filePath)) {
    response.writeHead(404, headers);
    response.end();
    return
  }

  staticFile(filePath, response)

}).listen(8331);
