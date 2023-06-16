const http = require('http');
const fs = require('fs')
const url = require('url')


let html = fs.readFileSync('./src/views/index.html', 'utf-8')

const server = http.createServer((request, response) => {
    let { pathname, query } = url.parse(request.url, true);
    // console.log(pathname, query)
    if (request.url == '/' || pathname == '/home') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        })
        response.end(html.replace('{{%content%}}', 'You are in home page!'));
    }
    // response.end(html);
});

server.listen('8000', '127.0.0.1', () => {
    console.log('server has started');
})