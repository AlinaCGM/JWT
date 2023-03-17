import { Router } from "express";
import {
  createUserController,
  updateUserController,
  getUserByIdController,
  logInWithPasswordController,
} from "../controllers/users";
import passport from "passport";

const router = Router();

router.post("/", createUserController);
router.post("/login", logInWithPasswordController);
router.get(
  "/:userId",
  // passport.authenticate("jwt", { session: false }),
  getUserByIdController
);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);

export default router;
