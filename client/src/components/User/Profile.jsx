import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  // Access the Redux state
  const user = useSelector((state) => state.auth.user);

  // Fallback if no user is found
  if (!user) {
    return <p>No user data available</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="text-center mb-4">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={`https://i.pravatar.cc/150?img=3`}
          alt="User avatar"
        />
        <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-700">
          <span className="font-semibold">Role:</span>
          <span>{user.role}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
