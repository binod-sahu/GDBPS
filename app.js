const express = require("express");
const http = require('http')
const path = require('path')
const app = express();
const port = 3000;
const _app_folder = 'dist/application';

app.use(express.static(__dirname + '/dist/BPDTS-TEST'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app)

server.listen(port, () => console.log('Running ....'))