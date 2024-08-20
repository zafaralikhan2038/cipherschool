import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Test } from "../models/test.model.js";
import { Question } from "../models/question.model.js";

const createTest = asyncHandler(async (req, res) => {
  const { name, desc, questions } = req.body;

  if (!(name && desc && questions && questions.length > 0)) {
    res.status(400);
    throw new Error(
      "All fields are required, and there must be at least one question!"
    );
  }

  const existedTest = await Test.findOne({ name });

  if (existedTest) {
    res.status(400);
    throw new Error(`Test - ${name} already exists`);
  }

  // First, create the test document
  const test = await Test.create({
    name,
    description: desc,
  });

  if (!test) {
    res.status(500);
    throw new Error("Failed to create test");
  }

  // Next, create the questions and associate them with the created test
  const savedQuestions = await Promise.all(
    questions.map(async (ques) => {
      const { question, options, correctOption, marks } = ques;

      if (
        !(
          question &&
          options &&
          correctOption !== undefined &&
          marks !== undefined
        )
      ) {
        res.status(400);
        throw new Error(
          "Each question must have a question text, options, correctOption, and marks"
        );
      }

      const newQues = await Question.create({
        question,
        options,
        correctOption,
        marks,
        testId: test._id, // Associate this question with the test
      });

      if (!newQues) {
        res.status(500);
        throw new Error("Failed to create a question");
      }

      return newQues._id;
    })
  );

  // Update the test document with the created questions' IDs
  test.questions = savedQuestions;
  await test.save();

  res.status(201).json({
    success: true,
    message: "Test and questions created successfully",
    data: test,
  });
});

const getAllTests = asyncHandler(async (req, res) => {
  const testLists = await Test.find({});

  if (!testLists) {
    res.status(404).json({ success: false, message: "Test not found" });
  }

  res.status(200).json({
    success: true,
    message: "Test found successfully",
    data: testLists,
  });
});

const getAllSingleTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const test = await Test.findById(testId);

  if (!test) {
    res.status(404).json({ success: false, message: "Test not found" });
  }

  res.status(200).json({
    success: true,
    message: "Test found successfully",
    data: test,
  });
});

/*
const getTestWithQuestions = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  if (!testId) {
    res.status(400);
    throw new Error("Name is required");
  }

  const testDetails = await Test.aggregate([
    {
      $match: { _id: testId },
    },
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "testId",
        as: "questions",
      },
    },
    {
      $unwind: {
        path: "$questions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        isEnabled: 1,
        questions: {
          question: 1,
          options: 1,
          correctOption: 1,
          marks: 1,
        },
      },
    },
  ]);

  if (testDetails.length === 0) {
    res.status(404);
    throw new Error("Test not found");
  }

  res.status(200).json({
    success: true,
    message: "Test found successfully",
    data: testDetails,
  });
});
*/

const getTestWithQuestions = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  if (!testId) {
    return res.status(400).json({
      success: false,
      message: "Test ID is required",
    });
  }

  // Validate the testId format
  if (!mongoose.Types.ObjectId.isValid(testId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Test ID format",
    });
  }

  // Corrected: Ensure the `ObjectId` is instantiated properly
  const objectId = new mongoose.Types.ObjectId(testId);

  // Aggregation pipeline to get the test with associated questions
  const testDetails = await Test.aggregate([
    {
      $match: { _id: objectId },
    },
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "testId",
        as: "questions",
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        isEnabled: 1,
        questions: {
          question: 1,
          options: 1,
          correctOption: 1,
          marks: 1,
        },
      },
    },
  ]);

  if (testDetails.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Test not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Test found successfully",
    data: testDetails[0], // Since `testDetails` is an array, take the first element
  });
});

const deleteTest = asyncHandler(async (req, res) => {
  const { name } = req.query;

  if (!name) {
    res.status(400);
    throw new Error("Test name is required");
  }

  // Find the test by name
  const test = await Test.findOne({ name });

  if (!test) {
    res.status(404);
    throw new Error("Test not found");
  }

  // Delete all questions associated with this test
  await Question.deleteMany({ testId: test._id });

  // Delete the test itself
  await Test.findByIdAndDelete(test._id);

  res.status(200).json({
    success: true,
    message: "Test and associated questions deleted successfully",
  });
});

const getQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  if (!questionId) {
    res.status(400);
    throw new Error("Question Id is required");
  }

  const question = await Question.findById(questionId);

  if (!question) {
    res.status(404).json({ success: false, message: "Question not found" });
  }

  res
    .status(200)
    .json({
      success: true,
      message: "Question found successfully",
      data: question,
    });
});

export {
  createTest,
  getAllTests,
  getAllSingleTest,
  getTestWithQuestions,
  deleteTest,
  getQuestion,
};
