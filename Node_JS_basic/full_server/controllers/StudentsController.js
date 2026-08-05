import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const dbPath = process.argv[2];

    readDatabase(dbPath)
      .then((fields) => {
        let output = 'This is the list of our students';
        const sortedFields = Object.keys(fields).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        for (const field of sortedFields) {
          const names = fields[field];
          output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
        }

        return response.status(200).send(output);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }

    const dbPath = process.argv[2];

    return readDatabase(dbPath)
      .then((fields) => {
        const names = fields[major] || [];
        return response.status(200).send(`List: ${names.join(', ')}`);
      })
      .catch(() => response.status(500).send('Cannot load the database'));
  }
}

export default StudentsController;
