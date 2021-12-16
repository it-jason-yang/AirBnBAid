const { LegalTestResults, Sequelize } = require('../../models');
const createError = require('http-errors');
const sanitizeHtml = require('sanitize-html');
const Op = Sequelize.Op;