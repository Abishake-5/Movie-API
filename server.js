const http = require('http'),
url = require('url'),
fs = require('fs');

let server = http.createServer((request, response)=>{
    let addr = request.url;
    q = url.parse(addr, true),
    filePath = '';
    if (q.pathname.includes('documentation')) {
        // checks for the keyword "documentation" in url
    filePath = (__dirname + '/documentation.html');
    
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end("Documentation Page")
  console.log('Documentation Page')


  }else{
      // directs to index.html
       filePath = 'index.html';
      console.log('Index page')
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end("Index Page")
  }
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    // logs timeStaps to log.txt once localhost:8080 has been searched in
    if (err) {
        // checks for an error
      console.log(err);
    } else {
        // passes if there is no error
      console.log('Added to log.');
    }
  });
   fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

  });
});
console.log('My test server is running on Port 8080');
server.listen(8080)