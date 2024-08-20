import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestId, fetchTests, fetchTestDetails, submitAnswers, handleAnswerChange } from '../../features/testsSlice.js';

const TestList = () => {
  const dispatch = useDispatch();
  const { tests, loading, error, testDetails, selectedTestId, answers } = useSelector((state) => state.tests);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleSelectTest = (testId) => {
    dispatch(selectTestId(testId));
    dispatch(fetchTestDetails(testId));
    setShowQuestions(false); // Reset the question view
  };

  const handleStartTest = () => {
    setShowQuestions(true);
  };

  const handleAnswerChange = (questionId, option) => {
    dispatch(handleAnswerChange({ questionId, answer: option }));
  };

  const handleSubmit = () => {
    dispatch(submitAnswers(answers));
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tests</h1>
      <ul className="space-y-3 mb-6">
        {tests.map((test) => (
          <li key={test._id}>
            <button
              onClick={() => handleSelectTest(test._id)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {test.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedTestId && testDetails && (
        <div className="mt-6">
          {!showQuestions ? (
            <button
              onClick={handleStartTest}
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Start Test
            </button>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Questions</h2>
              <ul className="space-y-4">
                {testDetails.questions.map((question, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-medium">{index + 1}. {question.question}</p>
                    <ul className="mt-2 space-y-2">
                      {question.options.map((option, idx) => (
                        <li key={idx} className="ml-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={answers[question._id] === option}
                              onChange={() => handleAnswerChange(question._id, option)}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">{option}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Submit Test
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestList;
