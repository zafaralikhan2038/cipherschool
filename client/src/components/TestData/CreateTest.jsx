import React, { useState } from 'react';
import axios from 'axios';

const CreateTest = () => {
  const [testName, setTestName] = useState('');
  const [desc, setDesc] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: 0, marks: 1 }]);

  const handleCreateTest = async () => {
    try {
      const newTest = { name: testName, desc, questions };
      await axios.post('/api/v1/test/generate-test', newTest);
      setTestName('');
      setDesc('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctOption: 0, marks: 1 }]);
    } catch (error) {
      console.error('Failed to create test', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: 0, marks: 1 }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'question') newQuestions[index].question = value;
    if (field === 'marks') newQuestions[index].marks = value;
    if (field.startsWith('option')) newQuestions[index].options[parseInt(field.split('-')[1])] = value;
    if (field === 'correctOption') newQuestions[index].correctOption = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Create a New Test</h2>
      <input
        type="text"
        placeholder="Test Name"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Questions:</h3>
        {questions.map((ques, index) => (
          <div key={index} className="mb-4 border p-4">
            <input
              type="text"
              placeholder="Question Text"
              value={ques.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            {ques.options.map((option, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={option}
                onChange={(e) => handleQuestionChange(index, `option-${i}`, e.target.value)}
                className="border p-2 mb-2 w-full"
              />
            ))}
            <input
              type="number"
              placeholder="Correct Option (index)"
              value={ques.correctOption}
              onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Marks"
              value={ques.marks}
              onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          </div>
        ))}
        <button onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2">
          Add Question
        </button>
      </div>
      <button onClick={handleCreateTest} className="bg-green-500 text-white px-4 py-2">
        Create Test
      </button>
    </div>
  );
};

export default CreateTest;
