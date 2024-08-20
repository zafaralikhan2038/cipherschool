import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    correctOption: {
      type: Number,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
