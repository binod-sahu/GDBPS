const express = require("express");
const app = express();
const path = require('path')
const port = process.env.PORT || 3000;

const posts = require('./server/posts')

app.use(express.static(path.join(__dirname, '/dist/BPDTS-TEST')));

app.use('/posts', posts);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, (req, res) => console.log('Running ....'))