'use strict';

// ----- Required Packages ----- //
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// ----- Required Routes ----- //
const cohorts = require('./routes/cohorts');

// ----- DB connect ----- //
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/cohort-db', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// ----- Init app ----- //
const app = express();

// ----- Middlewares ----- //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ----- Routes ----- //
app.use('/cohorts', cohorts);

// ----- Error handling ----- //
app.use((req, res, next) => {
  res.status(404).json({ code: 'not-found' });
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
