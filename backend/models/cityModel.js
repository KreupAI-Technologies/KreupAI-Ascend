import mongoose from "mongoose";
import State from "./stateModel.js";

const citySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z0-9]{2,5}$/, // Adjust as per city code format
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
      required: true,
      validate: {
        validator: async function (value) {
          const state = await State.findById(value);
          return !!state;
        },
        message: (props) =>
          `State ID ${props.value} does not exist in States collection`,
      },
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes on code, name, and stateId
citySchema.index({ code: 1 });
citySchema.index({ name: 1 });
citySchema.index({ stateId: 1 });

const City = mongoose.model("Cities", citySchema);

export default City;
