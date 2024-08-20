import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tests: [],
  selectedTestId: null,
  testDetails: null,
  answers: {},
  loading: false,
  error: null,
};

// Thunk to fetch all tests
export const fetchTests = createAsyncThunk(
  "tests/fetchTests",
  async () => {
    const response = await axios.get("/api/v1/test/user-tests");
    return response.data.data;
  }
);

// Thunk to fetch test details
export const fetchTestDetails = createAsyncThunk(
  "tests/fetchTestDetails",
  async (testId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/test/test-details/${testId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to submit answers
export const submitAnswers = createAsyncThunk(
  "tests/submitAnswers",
  async ({ testId, answers }, { rejectWithValue }) => {
    try {
      // Transform answers into the required format
      const selections = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const response = await axios.post("/api/v1/test/submit-test", { testId, selections });
      return response.data; // Return the response data on successful submission
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    selectTestId: (state, action) => {
      state.selectedTestId = action.payload;
    },
    clearTestId: (state) => {
      state.selectedTestId = null;
      state.testDetails = null;
      state.answers = {};
    },
    handleAnswerChange: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTestDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestDetails.fulfilled, (state, action) => {
        state.testDetails = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTestDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(submitAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = {}; // Clear answers after successful submission
        // Optionally, handle the response data here if needed
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { selectTestId, clearTestId, handleAnswerChange } = testSlice.actions;

export default testSlice.reducer;
