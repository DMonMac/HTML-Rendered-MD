//Dependencies
var express = require('express');
var router = express.Router();
var marked = require('marked');
//var markdownToHTML = require('markdown-to-html');
//Controllers



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MD to HTML Package Tester',
    output: 'This will output the converted MD with the selected package'
  });
});

router.post('/', function(req, res){
  // For Marked NPM Package
  console.log("Converting to HTML")
  let HTMLoutput = marked(req.body.mdInput)
  res.render('index', {
    title: 'Marked NPM',
    output: HTMLoutput
  });
})

module.exports = router;
