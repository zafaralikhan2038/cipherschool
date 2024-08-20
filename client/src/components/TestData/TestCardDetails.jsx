/*
import React from 'react';



const TestCardDetails = ({ test, onBack }) => {
  const { name, description, questions = [] } = test;
  console.log("Name: ", name);
  console.log("Description: ", description);
  console.log("Questions: ", questions);

  return (
    <div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{description}</p>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <li key={index} className="mb-2">
              <p className="font-bold">Q{index + 1}: {question.question}</p>
              <ul className="ml-4">
                {question.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p>Correct Option: {question.correctOption + 1}</p>
              <p>Marks: {question.marks}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this test.</p>
      )}
      <button
        onClick={onBack}
        className="mt-4 bg-blue-500 text-white px-4 py-2"
      >
        Back to Tests
      </button>
    </div>
  );
};


export default TestCardDetails;
*/

import PropTypes from 'prop-types';

const TestCardDetails = ({ test, onBack }) => {
  const { name, description, questions = [] } = test;

  return (
    <div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>{description}</p>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <li key={index} className="mb-2">
              <p className="font-bold">Q{index + 1}: {question.question}</p>
              <ul className="ml-4">
                {question.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p>Correct Option: {question.correctOption + 1}</p>
              <p>Marks: {question.marks}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for this test.</p>
      )}
      <button
        onClick={onBack}
        className="mt-4 bg-blue-500 text-white px-4 py-2"
      >
        Back to Tests
      </button>
    </div>
  );
};

TestCardDetails.propTypes = {
  test: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctOption: PropTypes.number.isRequired,
        marks: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired
};

export default TestCardDetails;
