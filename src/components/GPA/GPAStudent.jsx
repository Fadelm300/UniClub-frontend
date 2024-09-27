import React, { useState } from "react";
import './GPAStudent.css';

const GPAStudent = () => {
  const [courses, setCourses] = useState([{ courseName: '', grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(null);
  const [previousGPA, setPreviousGPA] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [isCumulative, setIsCumulative] = useState(false);

  const gradePoints = {
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'F': 0.0,
  };

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
  };

  const handleCreditChange = (index, event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) || value === '') {
      handleInputChange(index, event);
    }
  };

  const handleGPAChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setPreviousGPA(value);
    }
  };

  const handlePreviousCreditsChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setPreviousCredits(value);
    }
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

    const calculatedGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setGpa(calculatedGPA);
    setIsCumulative(false);
  };

  const handleClearData = () => {
    setCourses([{ courseName: '', grade: '', credit: '' }]);
    setGpa(null);
    setPreviousGPA('');
    setPreviousCredits('');
    setIsCumulative(false);
  };

  const handleCalculateCumulativeGPA = () => {
    const totalCreditsBefore = parseFloat(previousCredits);
    const totalGPA = parseFloat(previousGPA);
    let totalPointsBefore = totalCreditsBefore * totalGPA;

    let totalCredits = totalCreditsBefore;
    let totalPoints = totalPointsBefore;

    courses.forEach(course => {
      const grade = gradePoints[course.grade];
      const credit = parseFloat(course.credit);

      if (!isNaN(grade) && !isNaN(credit)) {
        totalCredits += credit;
        totalPoints += grade * credit;
      }
    });

    const calculatedCumulativeGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    setGpa(calculatedCumulativeGPA);
    setIsCumulative(true);
  };

  return (
    <div className="gpa-calculator4">
      <h2 className="gpa-title4">حساب المعدل الفصلي</h2>

      {courses.map((course, index) => (
        <div key={index} className="course-input4">
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            placeholder="رمز المقرر (اختياري)"
            className="course-name4"
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            name="grade"
            value={course.grade}
            className="course-grade4"
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">درجة المقرر</option>
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
            className="course-credit4"
            onChange={(event) => handleCreditChange(index, event)} 
          >
            <option value="">عدد ساعات المقرر</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      ))}

      <div className="button-row4">
        <button onClick={handleAddCourse} className="add-course-button4">إضافة مقرر</button>
        <button onClick={handleCalculateGPA} className="calculate-gpa-button4">احسب المعدل الفصلي</button>
      </div>

      {gpa && (
        <p className="gpa-result4">
          {isCumulative ? `معدلك التراكمي هو: ${gpa}` : `معدلك الفصلي هو: ${gpa}`}
        </p>
      )}

      <div className="previous-gpa-inputs4">
        <h2 className="cumulative-title4">حساب المعدل التراكمي</h2>
        <input
          type="text"
          value={previousGPA}
          onChange={handleGPAChange} 
          placeholder="اكتب معدلك التراكمي قبل هذا الفصل"
          className="previous-gpa4 bottom-input4"
        />
        <input
          type="text"
          value={previousCredits}
          onChange={handlePreviousCreditsChange} 
          placeholder="مجموع الساعات التي أنهيتها قبل هذا الفصل؟"
          className="previous-credits4 bottom-input4"
        />
      </div>

      <div className="button-row4">
        <button onClick={handleClearData} className="clear-data-button4">مسح البيانات</button>
        <button onClick={handleCalculateCumulativeGPA} className="calculate-cumulative-gpa-button4">احسب المعدل التراكمي</button>
      </div>
    </div>
  );
};

export default GPAStudent;
