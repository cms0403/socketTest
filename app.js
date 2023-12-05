const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/router');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

module.exports = app;