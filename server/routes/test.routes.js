import { Router } from "express";
import {
  createTest,
  deleteTest,
  getAllSingleTest,
  getAllTests,
  getQuestion,
  getTestWithQuestions,
} from "../controllers/test.controller.js";
import { submitTest } from "../controllers/submission.controller.js";

import { verifyJWT, verifyUserRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/generate-test").post(verifyUserRole(["ADMIN"]), createTest);
router
  .route("/get-tests")
  .get(verifyUserRole(["ADMIN"]), getAllTests)
  .delete(deleteTest);
router.route("/get-tests/:testId").get(getAllSingleTest);

router.route("/user-tests").get(verifyUserRole(["USER"]), getAllTests);

router.route("/test-details/:testId").get(getTestWithQuestions);

router.route("/question/:questionId").get(getQuestion);

router.route("/submit-test").post(submitTest);

export default router;
