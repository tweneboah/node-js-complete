const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');
const { Donor } = require('./models/donor');

const { initializePayment, verifyPayment } = require('./config/paystack')(
  request
);
