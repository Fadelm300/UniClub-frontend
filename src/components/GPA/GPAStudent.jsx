import React, { useState } from "react";
import './GPAStudent.css'; // You can style it later

const GPAStudent = () => {
  const [courses, setCourses] = useState([{ courseName: '', grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(null);

  const gradePoints = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0,
  };

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { courseName: '', grade: '', credit: '' }]);
  };

  const handleCalculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      const grade = gradePoints[course.grade];
      const credit = parseFloat(course.credit);

      if (!isNaN(grade) && !isNaN(credit)) {
        totalCredits += credit;
        totalPoints += grade * credit;
      }
    });

    const calculatedGPA = totalPoints / totalCredits;
    setGpa(calculatedGPA.toFixed(2));
  };

  return (
    <div className="gpa-calculator">
      <h2>GPA Calculator</h2>
      {courses.map((course, index) => (
        <div key={index} className="course-input">
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            placeholder="Course Name"
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            name="grade"
            value={course.grade}
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
          <select
            name="credit"
            value={course.credit}
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">Select Credits</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      ))}
      <button onClick={handleAddCourse} className="add-course-button">Add Course</button>
      <button onClick={handleCalculateGPA} className="calculate-gpa-button">Calculate GPA</button>
      {gpa && <p>Your GPA is: {gpa}</p>}
    </div>
  );
};

export default GPAStudent;
