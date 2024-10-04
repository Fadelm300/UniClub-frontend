import React, { useState } from "react";
import './GPAStudent.css'; 

const GPAStudent = () => {
  const [courses, setCourses] = useState([{ courseName: '', grade: '', credit: '' }]);
  const [gpa, setGpa] = useState(null);
  const [previousGPA, setPreviousGPA] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [isCumulative, setIsCumulative] = useState(false);
  const [language, setLanguage] = useState('en'); // Language state
  const [errors, setErrors] = useState({}); 

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

  const validateInputs = () => {
    const newErrors = {};
    const prevGPAFloat = parseFloat(previousGPA);
    const totalCredits = courses.reduce((sum, course) => sum + (parseFloat(course.credit) || 0), 0);
    
    if (prevGPAFloat > 5 || prevGPAFloat < 0) {
      newErrors.previousGPA = "Previous GPA must be between 0 and 5.0.";
    }
    
    if (totalCredits > 200) {
      newErrors.totalCredits = "Total credits cannot exceed 200.";
    }
    
    if (!courses.every(course => course.courseName && course.grade && course.credit)) {
      newErrors.courseDetails = "All course details must be filled out before adding more courses.";
    }
    
    return newErrors;
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
    const floatValue = parseFloat(value);
    if ((floatValue <= 5 && floatValue >= 0) || value === '') {
      setPreviousGPA(value);
      setErrors((prev) => ({ ...prev, previousGPA: '' })); // Clear previous GPA error
    } else {
      setErrors((prev) => ({ ...prev, previousGPA: "Previous GPA must be between 0 and 5.0." }));
    }
  };

  const handlePreviousCreditsChange = (event) => {
    const value = event.target.value;
    const intValue = parseInt(value);
    if ((intValue <= 200 && intValue >= 0) || value === '') {
      setPreviousCredits(value);
      setErrors((prev) => ({ ...prev, totalCredits: '' })); // Clear previous credits error
    } else {
      setErrors((prev) => ({ ...prev, totalCredits: "Total credits cannot exceed 200." }));
    }
  };

  const handleAddCourse = () => {
    const validationErrors = validateInputs();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

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
    setErrors({});
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

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  return (
    <div className={`gpa-calculator4 ${language}`}>
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === 'ar' ? ' English' : ' العربية'}
      </button>
      
      <h2 className={`gpa-title4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        {language === 'ar' ? 'حساب المعدل الفصلي' : 'GPA Calculator'}
      </h2>

      {courses.map((course, index) => (
        <div key={index} className="course-input4">
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            placeholder={language === 'ar' ? "رمز المقرر (اختياري)" : "Course Code (Optional)"}
            className="course-name4"
            onChange={(event) => handleInputChange(index, event)}
          />
          <select
            name="grade"
            value={course.grade}
            className="course-grade4"
            onChange={(event) => handleInputChange(index, event)}
          >
            <option value="">{language === 'ar' ? "درجة المقرر" : "Course Grade"}</option>
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
            <option value="">{language === 'ar' ? "عدد ساعات المقرر" : "Credits"}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      ))}

      <div className={`button-row4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <button onClick={handleAddCourse} className="add-course-button4">
          {language === 'ar' ? "إضافة مقرر" : "Add Course"}
        </button>
        <button onClick={handleCalculateGPA} className="calculate-gpa-button4">
          {language === 'ar' ? "احسب المعدل الفصلي" : "Calculate GPA"}
        </button>
      </div>

      {errors.courseDetails && <p className="error-message">{errors.courseDetails}</p>}
      {gpa && (
        <p className="gpa-result4">
          {isCumulative ? 
            (language === 'ar' ? `معدلك التراكمي هو: ${gpa}` : `Your cumulative GPA is: ${gpa}`) : 
            (language === 'ar' ? `معدلك الفصلي هو: ${gpa}` : `Your semester GPA is: ${gpa}`)}
        </p>
      )}

      <div className="previous-inputs4">
      <h2 className={`cumulative-title4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {language === 'ar' ? "حساب المعدل التراكمي" : "Cumulative GPA Calculation"}
        </h2>
        <input
          type="text"
          value={previousGPA}
          onChange={handleGPAChange} 
          placeholder={language === 'ar' ? "ادخل معدلك السابق" : "Enter your previous GPA"}
          className="previous-gpa4 bottom-input4"
        />
        {errors.previousGPA && <p className="error-message">{errors.previousGPA}</p>}
        <input
          type="text"
          value={previousCredits}
          onChange={handlePreviousCreditsChange} 
          placeholder={language === 'ar' ? "مجموع الساعات التي أنهيتها قبل هذا الفصل؟" : "Total credits completed before this semester?"}
          className="previous-credits4 bottom-input4"
        />
        {errors.totalCredits && <p className="error-message">{errors.totalCredits}</p>}
      </div>

      <div className={`button-row4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <button onClick={handleClearData} className="clear-data-button4">
          {language === 'ar' ? "مسح البيانات" : "Clear Data"}
        </button>
        <button onClick={handleCalculateCumulativeGPA} className="calculate-cumulative-gpa-button4">
          {language === 'ar' ? "احسب المعدل التراكمي" : "Calculate Cumulative GPA"}
        </button>
      </div>
    </div>
  );
};

export default GPAStudent;
