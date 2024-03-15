import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/feedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Manage Feedbacks</h2>
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.FeedbackID}>
            <p>Trainer ID: {feedback.TrainerID}</p>
            <p>Program ID: {feedback.ProgramID}</p>
            <p>Rating: {feedback.Rating}</p>
            <p>Comments: {feedback.Comments}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFeedbacks;
