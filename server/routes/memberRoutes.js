import express from "express";
import {
  addMember,
  getAllMembers,
  updateMember,
  deleteMember,
  getMemberById,
} from "../controllers/memberController.js";

import { body } from "express-validator";
import { validateRequest } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("birthDate").isISO8601(),
    body("country").notEmpty(),
    body("city").notEmpty(),
  ],
  validateRequest,
  addMember
);

router.get("/", getAllMembers);
router.get("/:id", getMemberById);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;
