import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

    console.log(req.url);


    // const data = { name: 'john doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'Content-type': 'application/json'  });
    // res.end(JSON.stringify(data));

    if( req.url === '/' ){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200, { 'Content-type': 'text/html'  });
        res.end(htmlFile);
    } else {
        res.writeHead(404, { 'Content-type': 'text/html'  });
        res.end();
    }

});

server.listen(8080,()=> {
    console.log( 'service running on port 8080');
})