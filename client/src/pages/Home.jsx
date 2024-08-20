import React from 'react';
import "./home.css"

const Home = () => {
  return (
    <section className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg text-center text-white max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Online Exam Portal</h1>
        <p className="text-lg mb-6">
          Your ultimate destination for secure and reliable online examinations. Whether you're a student or an administrator, our platform provides a seamless experience for managing exams and assessments.
        </p>
        <p className="text-lg">
          Start preparing for your exams with our user-friendly interface, real-time progress tracking, and comprehensive resources designed to help you succeed.
        </p>
      </div>
    </section>
  );
}

export default Home;
