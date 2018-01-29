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

// Reusable constants
const samplePath = __dirname + '/../README.md';
const sampleFile = fs.readFileSync(samplePath, 'utf8');

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

// Imported Controllers

// Routes
/* '/' HTTP methods */
router.get('/', function(req, res, next) {
  deleteLastUpload();
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: '<h3>This will show the markdown rendered into the HTML</h3>',
    sample: sampleFile.toString()
  });
});

router.post('/', function(req, res){
  console.log("Converting to HTML...")
  let HTMLoutput = marked(req.body.mdInput)
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: HTMLoutput,
    sample: null
  });
})

/* '/mdfile/upload' HTTP methods */
router.get('/mdfile/upload', (req, res) => {
  deleteLastUpload();
  res.render('index', {
    title: 'Marked MD to HTML Renderer',
    output: marked(sampleFile.toString()),
    sample: null
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
    output: fileHTMLstring,
    sample: null
  });
});

module.exports = router;
