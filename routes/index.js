//Dependencies
const express = require('express');
const router = express.Router();
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

// Use dependencies
const upload = multer({
  dest: path.join(__dirname, '../uploads/mdFiles/temp/')
});

// Imported Controllers

// Repeated functions
function deleteLastUpload() { // Delete file/s from a folder
  // Set directory to delete files from
  const directory = path.join(__dirname, '../uploads/mdFiles/temp/');
  // Read the directory
  fs.readdir(directory, (err, files) => {
  if (err) throw err;
    // Remove each file
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

// Routes

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: '<p>This will show the markdown rendered in HTML</p>'
  });
});

router.get('/mdfile/upload', (req, res) => {
  deleteLastUpload();
  let samplePath = __dirname + '/../uploads/mdFiles/Sample.md';
  let file = fs.readFileSync(samplePath, 'utf8');
  sampleFile = marked(file.toString());
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: sampleFile
  });
});

router.post('/mdfile/upload', upload.single('markdown'), (req, res) => {
  deleteLastUpload();
  console.log(req.file)
  let fileLoc = req.file.path;
  let fileToRender = fs.readFileSync(fileLoc);
  let fileHTMLstring = marked(fileToRender.toString());
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: fileHTMLstring
  });
});

router.post('/marked', function(req, res){
  // For Marked NPM Package
  console.log("Converting to HTML")
  let HTMLoutput = marked(req.body.mdInput)
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: HTMLoutput
  });
})

module.exports = router;
