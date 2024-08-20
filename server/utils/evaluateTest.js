import asyncHandler from "express-async-handler";
import cron from "node-cron";
import { Submission } from "../models/submission.model.js";
import { Question } from "../models/question.model.js";

const evaluateTest = asyncHandler(async (submission) => {
  let score = 0;

  for (const selection of submission.selections) {
    const ques = await Question.findById(selection.questionId);
    if (ques.correctOption === selection.answer) {
      score += ques.marks;
    }
  }

  submission.score = score;
  await submission.save();
});

cron.schedule("0 * * * *", async () => {
  console.log("Running Test Evaluation Cron Job");

  const submissions = await Submission.find({ score: 0 });

  for (const submisson of submissions) {
    await evaluateTest(submisson);
  }

  console.log("Test evaluation completed");
});
