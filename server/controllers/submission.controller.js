import asyncHandler from "express-async-handler";
import { Submission } from "../models/submission.model.js";
import { Test } from "../models/test.model.js";
import { Question } from "../models/question.model.js";
import { sendTestSubmissionDetails } from "../utils/email.js"; // Update with the correct path

const submitTest = asyncHandler(async (req, res) => {
  const { testId, selections } = req.body;
  const userId = req.user._id;

  const test = await Test.findById(testId);

  if (!test) {
    return res.status(404).json({ success: false, message: "Test not found" });
  }

  let score = 0;
  for (const sel of selections) {
    const ques = await Question.findById(sel.questionId);

    if (!ques) {
      return res.status(404).json({
        success: false,
        message: `Question not found for ID ${sel.questionId}`,
      });
    }

    // Check if the selected answer matches the correct option
    const selectedOptionIndex = ques.options.indexOf(sel.answer);
    if (selectedOptionIndex === ques.correctOption) {
      score += ques.marks; // Add the marks assigned to the question
    }
  }

  const submission = await Submission.create({
    testId,
    userId,
    selections,
    score,
    endAt: Date.now(),
  });

  if (!submission) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Failed to submit",
    });
  }

  // Sending the test submission details via email
  try {
    await sendTestSubmissionDetails(req.user, test.name, score);
    console.log("Test submission email sent successfully");
  } catch (error) {
    console.error("Failed to send test submission email:", error);
  }

  res.status(201).json({
    success: true,
    message: "Test submitted successfully",
    data: submission,
  });
});

export { submitTest };