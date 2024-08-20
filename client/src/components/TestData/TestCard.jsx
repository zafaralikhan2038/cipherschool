import React from 'react';

const TestCard = ({ test, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border p-4 mb-4 cursor-pointer hover:bg-gray-100 transition"
      style={{ width: '250px', height: '150px' }} // Set fixed width and height
    >
      <h3 className="text-lg font-semibold">{test.name}</h3>
      <p>{test.description}</p>
    </div>
  );
};

export default TestCard;
