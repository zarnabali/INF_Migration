const fs = require('fs');
try {
    const data = fs.readFileSync('tsc_errors_3.txt', 'utf16le');
    console.log(data.substring(0, 2000));
} catch (err) {
    console.error(err);
}
