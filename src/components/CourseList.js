//CourseList and functions called
import React, { useState} from 'react';
import {getCourseTerm} from '../utilities/times.js';
import {TermSelector} from '../App.js';
import Course from './Course.js';

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      {
        termCourses.map(course =>
          <Course key={ course.id } course={ course }
            selected={selected} setSelected={ setSelected }
          />)
      }
      </div>
    </>
  );
};

export default CourseList;
