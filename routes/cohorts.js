'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cohort = require('../models/cohort');

/* GET cohort */
router.get('/', (req, res, next) => {
  Cohort.find()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (!req.body.name || !req.body.pictureUrl) {
    res.status(422).json({ code: 'incorrect parameters' });
    return;
  }

  const data = {
    name: req.body.name,
    pictureUrl: req.body.pictureUrl
  };
  const newCohort = new Cohort(data);
  newCohort.save()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
    return;
  }
  Cohort.findById(req.params.id)
    .then((result) => {
      if (!result) {
        next();
        return;
      }
      res.json(result);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    next();
    return;
  }
  if (!req.body.name || !req.body.pictureUrl) {
    res.status(422).json({ code: 'incorrect parameters' });
    return;
  }
  const data = {
    name: req.body.name,
    pictureUrl: req.body.pictureUrl
  };
  Cohort.findByIdAndUpdate(req.params.id, data)
    .then((result) => {
      if (!result) {
        next();
        return;
      }
      res.status(204).json();
    })
    .catch(next);
});

module.exports = router;
