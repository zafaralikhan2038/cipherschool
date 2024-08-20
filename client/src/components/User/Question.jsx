// Question.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestDetails, handleAnswerChange } from '../../features/testsSlice.js';

const Question = () => {
  const dispatch = useDispatch();
  const { testDetails, selectedTestId, loading, error } = useSelector((state) => state.tests);

  useEffect(() => {
    if (selectedTestId) {
      dispatch(fetchTestDetails(selectedTestId));
    }
  }, [dispatch, selectedTestId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!testDetails) return <p>No test details available</p>;

  const handleChange = (questionId, event) => {
    dispatch(handleAnswerChange({ questionId, answer: event.target.value }));
  };

  return (
    <div>
      <h2>{testDetails.name}</h2>
      <p>{testDetails.description}</p>
      {testDetails.questions.map((question) => (
        <div key={question.id}>
          <h3>{question.text}</h3>
          <input
            type="text"
            value={testDetails.answers[question.id] || ''}
            onChange={(e) => handleChange(question.id, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default Question;
