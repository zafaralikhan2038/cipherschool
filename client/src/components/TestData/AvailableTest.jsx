import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestCard from './TestCard';
import TestCardDetails from './TestCardDetails';

const AvailableTests = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/api/v1/test/get-tests');
      setTests(data.data || []);
    } catch (error) {
      setError('Failed to fetch tests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  /*

  const fetchTestDetails = async (testId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/v1/test/get-tests/${testId}`);
      if (data && data.data) {
        setSelectedTest(data.data);
      } else {
        setError('Test data is not available');
      }
    } catch (error) {
      setError('Failed to fetch test details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  */

  const fetchTestDetails = async (testId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/v1/test/get-tests/${testId}`);
      console.log("Test Data: ", data);
      if (data && data.data) {
        setSelectedTest(data.data);
        console.log("Selected Test: ", selectedTest(data.data));
      } else {
        setError('Test data is not available');
      }
    } catch (error) {
      setError('Failed to fetch test details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Existing Tests</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {selectedTest ? (
        <TestCardDetails test={selectedTest} onBack={() => setSelectedTest(null)} />
      ) : (
        tests.length > 0 ? (
          <div className='grid-flow-col'>
            {tests.map((test) => (
              <TestCard
                key={test._id}
                test={test}
                onClick={() => fetchTestDetails(test._id)}
              />
            ))}
          </div>
        ) : (
          <p>No tests available.</p>
        )
      )}
    </div>
  );
};

export default AvailableTests;
