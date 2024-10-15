// backend/models/attachment.model.js
import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    collectionTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Collection Type ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Collection Type ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'Collections'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "COLLECTIONS";
          },
          message: 'Collection Type must belong to "Collections" status group',
        },
      ],
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Collection ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Collection ID",
      },
    },
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created By is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Created By User ID",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Polymorphic reference validation
attachmentSchema.pre("save", async function (next) {
  const attachment = this;
  const Status = mongoose.model("Status");
  const status = await Status.findById(attachment.collectionTypeId);
  if (!status || status.statusGroup !== "COLLECTIONS") {
    return next(
      new Error('Collection Type must belong to "Collections" status group')
    );
  }

  const collectionName = status.statusDescription; // Assuming the status 'name' field contains the collection name
  const Model = mongoose.model(collectionName);
  const exists = await Model.exists({ _id: attachment.collectionId });

  if (!exists) {
    return next(
      new Error(`Referenced document not found in ${collectionName} collection`)
    );
  }

  next();
});

// Export the Attachment model
const Attachment = mongoose.model("Attachment", attachmentSchema);

export default Attachment;
