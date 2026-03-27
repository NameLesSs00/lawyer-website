const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('info/Layer website requirements.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error formatting PDF: ", err);
});
