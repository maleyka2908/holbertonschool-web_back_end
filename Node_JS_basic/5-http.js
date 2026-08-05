const http = require('http');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');

      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const students = lines.slice(1);
      let output = `Number of students: ${students.length}\n`;

      const fields = {};

      for (const student of students) {
        const values = student.split(',');
        const firstname = values[0].trim();
        const field = values[3].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }

      const fieldEntries = Object.entries(fields);
      fieldEntries.forEach(([field, names], index) => {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        if (index < fieldEntries.length - 1) {
          output += '\n';
        }
      });

      resolve(output);
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const dbPath = process.argv[2];
    res.write('This is the list of our students\n');
    countStudents(dbPath)
      .then((data) => {
        res.end(data);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.end();
  }
});

app.listen(1245);

module.exports = app;
