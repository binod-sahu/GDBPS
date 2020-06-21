const express = require('express');
const router = express.Router();
const axios = require('axios');

const api = 'https://bpdts-test-app-v3.herokuapp.com'
const city = 'London'

router.get('/', (req, res) => {
  axios.get(`${api}/users`).then(posts => {
    res.status(200).json(posts.data)
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

router.get('/city', (req, res) => {
  axios.get(`${api}/city/${city}/users`).then(posts => {
    res.status(200).json(posts.data)
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

module.exports = router;