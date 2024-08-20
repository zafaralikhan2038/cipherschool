import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", testSchema);
