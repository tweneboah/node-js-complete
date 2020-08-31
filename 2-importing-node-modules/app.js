const fs = require('fs');

fs.writeFileSync('notes.txt', 'This is from node js');

// Append files to the created files
fs.appendFileSync('notes.txt', 'I love node js');
