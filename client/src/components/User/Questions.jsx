import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Question from "./Question.jsx";
import { handleAnswerChange, submitAnswers } from "../../features/testsSlice.js";

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tests, answers, selectedTestId } = useSelector((state) => state.tests);

  // Find the selected test based on selectedTestId
  const selectedTest = tests.find(test => test._id === selectedTestId);

  const onAnswerChange = (questionId, answer) => {
    dispatch(handleAnswerChange({ questionId, answer }));
  };

  const onSubmit = () => {
    dispatch(submitAnswers(answers))
      .then(() => {
        navigate('/results'); // Navigate to results or another route
      })
      .catch((error) => {
        console.error('Failed to submit answers:', error);
      });
  };

  if (!selectedTest) {
    return <p>No test selected or available.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{selectedTest.name}</h1>
      <p>{selectedTest.description}</p>
      <div className="mt-4">
        {selectedTest.questions && selectedTest.questions.length > 0 ? (
          selectedTest.questions.map((questionId) => (
            <Question 
              key={questionId}
              questionId={questionId}
              onAnswerChange={onAnswerChange}
            />
          ))
        ) : (
          <p>No questions available.</p>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
          onClick={onSubmit}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default Questions;
