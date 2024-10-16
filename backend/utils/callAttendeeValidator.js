import { body } from "express-validator";
import CallAttendee from "../modules/CRM/models/callAttendeeModel";

export const validateCreateCallAttendee = [
  body("callId")
    .notEmpty()
    .withMessage("Call ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid Call ID");
      }
      const Call = mongoose.model("Call");
      const callExists = await Call.exists({ _id: value });
      if (!callExists) {
        // 18/09/2024 - Bosco Sabu John - Changed the error message
        throw new Error("Call not found!!");
      }
      return true;
    }),
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid User ID");
      }
      const User = mongoose.model("User");
      const userExists = await User.exists({ _id: value });
      if (!userExists) {
        throw new Error("User not found");
      }
      return true;
    }),
  body("requirement").optional().trim(),
];

export const validateUpdateCallAttendee = [
  body("requirement").optional().trim(),
];
