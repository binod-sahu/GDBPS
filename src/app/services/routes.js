const express = require('express');
const functions = require('./location.service.ts');
// const functions = require('./functions');

const router = new express.Router();

router.get('/:city', functions.getUsers);

module.exports = router;