const http = require('http');
const fs = require('fs')
const url = require('url')
const replaceHtml = require('./Modules/replaceHtml')


let html = fs.readFileSync('./src/views/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./src/views/products.html', 'utf-8');
let productDetailHtml = fs.readFileSync('./src/views/product_details.html', 'utf-8');

const server = http.createServer();

server.on('request', (request, response) => {
    let { pathname, query } = url.parse(request.url, true);
    console.log(pathname, query)
    if (request.url == '/' || pathname == '/home') {
        response.writeHead(200, {
            'Content-Type': 'text/html',
        })
        response.end(html.replace('{{%CONTENT%}}', 'You are in home page!'));
    } else if (request.url == '/products' || pathname == '/products') {
        if (!query.id) {
            let productHtmlArray = products.map((prod) => {
                return replaceHtml(productListHtml, prod);
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(productResponseHtml);
        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml));
        }

    } else {
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'Hellow, world'
        });
        response.end(html.replace('{{%CONTENT%}}', 'Error 404: Page not found!'));
    }
});

server.listen('8000', '127.0.0.1', () => {
    console.log('server has started');
})