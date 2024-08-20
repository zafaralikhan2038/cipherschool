import cron from "node-cron";
import { Submission } from "../models/submission.model.js";
import { evaluateTest } from "../controllers/testController.js";

cron.schedule("0 * * * *", async () => {
  console.log("Running Test Evaluation Cron Job");

  const submissions = await Submission.find({ score: 0 }).populate('user test');

  for (const submission of submissions) {
    await evaluateTest(submission);
  }

  console.log("Test evaluation completed");
});
