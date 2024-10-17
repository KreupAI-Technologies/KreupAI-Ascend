// Author : Bosco Sabu John
// Date : 17/09/2024
// Version : v1.1
// Description : Task Model

import mongoose from "mongoose";

// backend/models/task.model.js

const taskSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    priorityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Priority ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Priority ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'PRIORITY'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "PRIORITY";
          },
          message: 'Priority must belong to "Priority" status group',
        },
      ],
    },
    collectionTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Collection Type is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Collection Type ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'COLLECTIONS'
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
    dueDate: {
      type: Date,
      required: [true, "Due Date is required"],
    },
    reminder: {
      type: Date,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid User ID",
      },
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Status ID is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Status ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'TASK STATUS'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "TASK STATUS";
          },
          message: 'Status must belong to "Task Status" status group',
        },
      ],
    },
    repeat: {
      type: Boolean,
      default: false,
    },
    repeatTenure: {
      type: String,
      trim: true,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
      required: function () {
        return this.repeat;
      },
      message: "Repeat Tenure is required when repeat is true",
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
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Modified By User ID",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Polymorphic reference validation
taskSchema.pre("save", async function (next) {
  const task = this;

  // Validate collectionId exists in the specified collection
  const Status = mongoose.model("Status");
  const status = await Status.findById(task.collectionTypeId);
  if (!status || status.statusGroup !== "COLLECTIONS") {
    return next(
      new Error('Collection Type must belong to "Collections" status group')
    );
  }

  const collectionName = status.statusDescription; // Assuming the status 'state description' field contains the collection name
  const Model = mongoose.model(collectionName);
  const exists = await Model.exists({ _id: task.collectionId });

  if (!exists) {
    return next(
      new Error(`Referenced document not found in ${collectionName} collection`)
    );
  }

  next();
});

// Export the Task model
const Task = mongoose.model("Task", taskSchema);

export default Task;
