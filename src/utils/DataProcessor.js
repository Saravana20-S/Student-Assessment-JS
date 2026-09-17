// ==================================================
// PHASE 6 - JAVASCRIPT DATA PROCESSING
// ==================================================

// ==================================================
// 1. ARRAY PROCESSING
// ==================================================

function getStudentNames(students) {
  return students.map((student) => student.name);
}

// ==================================================
// 2. FILTER
// ==================================================

function filterStudentsByBatch(students, batch) {
  return students.filter((student) => student.getBatch() === batch);
}

// ==================================================
// 3. FIND
// ==================================================

function findStudentById(students, id) {
  return students.find((student) => student.id === id);
}

// ==================================================
// 4. FIND INDEX
// ==================================================

function findStudentIndex(students, id) {
  return students.findIndex((student) => student.id === id);
}

// ==================================================
// 5. SOME
// ==================================================

function hasStudentInBatch(students, batch) {
  return students.some((student) => student.getBatch() === batch);
}

// ==================================================
// 6. EVERY
// ==================================================

function allStudentsHaveEmails(students) {
  return students.every(
    (student) => student.email && student.email.includes("@"),
  );
}

// ==================================================
// 7. INCLUDES
// ==================================================

function containsBatch(batches, batch) {
  return batches.includes(batch);
}

// ==================================================
// 8. REDUCE
// ==================================================

function calculateTotalScore(results) {
  return results.reduce((total, result) => total + result.getScore(), 0);
}

// ==================================================
// 9. CALCULATE AVERAGE
// ==================================================

function calculateAverageScore(results) {
  if (results.length === 0) {
    return 0;
  }

  const total = calculateTotalScore(results);

  return total / results.length;
}

// ==================================================
// 10. SORT
// ==================================================

function sortResultsByPercentage(results) {
  return [...results].sort((a, b) => b.percentage - a.percentage);
}

// ==================================================
// 11. REVERSE
// ==================================================

function reverseStudents(students) {
  return [...students].reverse();
}

// ==================================================
// 12. SLICE
// ==================================================

function getTopStudents(students, count) {
  return students.slice(0, count);
}

// ==================================================
// 13. SPLICE
// ==================================================

function removeStudentFromArray(students, index) {
  const copy = [...students];

  copy.splice(index, 1);

  return copy;
}

// ==================================================
// 14. CONCAT
// ==================================================

function combineStudentLists(firstList, secondList) {
  return firstList.concat(secondList);
}

// ==================================================
// 15. CALLBACK
// ==================================================

function processStudents(students, callback) {
  students.forEach(callback);
}

// ==================================================
// 16. ARROW FUNCTION
// ==================================================

const getPassedResults = (results) =>
  results.filter((result) => result.status === "PASSED");

// ==================================================
// 17. TYPE CONVERSION
// ==================================================

function convertScoreToNumber(score) {
  return Number(score);
}

// ==================================================
// 18. CLOSURE
// ==================================================

function createScoreCounter() {
  let count = 0;

  return function () {
    count++;

    return count;
  };
}

// ==================================================
// 19. HOISTING DEMONSTRATION
// ==================================================

function hoistingDemo() {
  return calculateValue();
}

function calculateValue() {
  return 100;
}

// ==================================================
// 20. SCOPE
// ==================================================

function scopeDemo() {
  const message = "JavaScript local scope";

  return message;
}

// ==================================================
// EXPORT FUNCTIONS
// ==================================================

module.exports = {
  getStudentNames,

  filterStudentsByBatch,

  findStudentById,

  findStudentIndex,

  hasStudentInBatch,

  allStudentsHaveEmails,

  containsBatch,

  calculateTotalScore,

  calculateAverageScore,

  sortResultsByPercentage,

  reverseStudents,

  getTopStudents,

  removeStudentFromArray,

  combineStudentLists,

  processStudents,

  getPassedResults,

  convertScoreToNumber,

  createScoreCounter,

  hoistingDemo,

  scopeDemo,
};
