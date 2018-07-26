'use strict';

const express = require('express');
const router = express.Router();

const Cohort = require('../models/cohort');

/* GET cohorts */
router.get('/', (req, res, next) => {
  Cohort.find()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
