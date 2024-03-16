import React, { useState } from 'react';

function Feedback() {
  const [feedbackData, setFeedbackData] = useState({
    FirstName: '',
    programName: '',
    feedback: '',
    additionalComments: ''
  });

  const handleChange = (e) => {
    const { FirstName, value } = e.target;
    setFeedbackData({ ...feedbackData, FirstNamee: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Trainer Name:</label>
        <input
          type="text"
          name="FirstName"
          value={feedbackData.FirstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Program Name:</label>
        <input
          type="text"
          name="programName"
          value={feedbackData.programName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Feedback:</label>
        <textarea
          name="feedback"
          value={feedbackData.feedback}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Additional Comments or Suggestions for Improvement:</label>
        <textarea
          name="additionalComments"
          value={feedbackData.additionalComments}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default Feedback;
