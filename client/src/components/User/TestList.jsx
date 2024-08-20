import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTestId, fetchTests, fetchTestDetails, handleAnswerChange, submitAnswers } from '../../features/testsSlice.js';
import { requestMediaPermissions, releaseMediaPermissions } from '../../utils/mediaPermission.js';

const TestList = () => {
  const dispatch = useDispatch();
  const { tests, loading, error, testDetails, selectedTestId, answers } = useSelector((state) => state.tests);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleSelectTest = async (testId) => {
    try {
      const { granted, error } = await requestMediaPermissions(); // Request media permissions
      if (!granted) {
        alert(`Media permissions error: ${error}`);
        return;
      }
      dispatch(selectTestId(testId));
      dispatch(fetchTestDetails(testId));
      setShowQuestions(false); // Reset the question view
    } catch (err) {
      console.error("Error requesting media permissions:", err);
    }
  };

  const handleStartTest = () => {
    setShowQuestions(true);
  };

  const handleAnswerChangeLocal = (questionId, answer) => {
    console.log(`Updating answer for question ${questionId} to ${answer}`); // Debugging statement
    dispatch(handleAnswerChange({ questionId, answer }));
  };

  const handleSubmit = async () => {
    const selections = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));

    const payload = {
      testId: selectedTestId,
      selections,
    };

    try {
      await dispatch(submitAnswers(payload)).unwrap();
      alert("Test submitted successfully!");
      await releaseMediaPermissions(); // Release media permissions
    } catch (err) {
      alert("Failed to submit test. Please try again.");
    }
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
              className="w-400 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
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
                {testDetails.questions.map((question) => (
                  <li key={question._id} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg font-medium">
                      {question.question}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {question.options.map((option, idx) => (
                        <li key={`${question._id}-option-${idx}`} className="ml-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              value={option}
                              className="form-radio text-blue-600"
                              checked={answers[question._id] === option} // Control the checked state
                              onChange={() => handleAnswerChangeLocal(question._id, option)}
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
