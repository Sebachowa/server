'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  name: String,
  owner: String
});

const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
