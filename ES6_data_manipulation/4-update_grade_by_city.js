export default function updateStudentGradeByCity(students, city, newGrades) {
  if (!Array.isArray(students)) {
    return [];
  }
  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const gradeObj = Array.isArray(newGrades)
        ? newGrades.find((grade) => grade.studentId === student.id)
        : null;
      return {
        ...student,
        grade: gradeObj ? gradeObj.grade : 'N/A',
      };
    });
}
