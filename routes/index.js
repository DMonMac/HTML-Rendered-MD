//Dependencies
const express = require('express');
const router = express.Router();
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

const upload = multer({
  dest: path.join(__dirname, '../public/mdFiles/temp')
});

//Controllers

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MD to HTML Package Tester',
    output: '<p>This will output the converted MD with the selected package</p>'
  });
});

router.get('/mdfile/upload', (req, res) => {
  let path = __dirname + '/../public/mdFiles/README.md';
  let file = fs.readFileSync(path, 'utf8');
  res.send("This is a sample output: " + marked(file.toString()));
});

router.post('/mdfile/upload', upload.single('markdown'), (req, res) => {
  console.log(req.file)
  let fileLoc = req.file.path;
  let fileToRender = fs.readFileSync(fileLoc);
  let fileHTMLstring = marked(fileToRender.toString());
  res.render('index', {
    title: 'Marked NPM',
    output: fileHTMLstring
  });
  //res.send(marked(fileToRender.toString()));
});

router.post('/marked', function(req, res){
  // For Marked NPM Package
  console.log("Converting to HTML")
  let HTMLoutput = marked(req.body.mdInput)
  res.render('index', {
    title: 'Marked NPM',
    output: HTMLoutput
  });
})

module.exports = router;
