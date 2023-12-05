var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'socekt 테스트' });
});

router.get('/test1', function(req, res, next) {
  res.render('test1', { title: 'test1' });
});

router.get('/test2', function(req, res, next) {
  res.render('test2', { title: 'test2' });
});

router.get('/test3', function(req, res, next) {
  res.render('test3', { title: 'test3' });
});


module.exports = router;
