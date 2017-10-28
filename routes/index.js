var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('channelRoom', { title: 'Express' });
});

router.get('/chatting', function(req, res, next) {
  let room = req.query.room;
  let name = req.query.name;

  res.render('chatRoom', {
    room : room,
    name:name
  });
});

module.exports = router;
