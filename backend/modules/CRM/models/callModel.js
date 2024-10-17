import mongoose from "mongoose";

// backend/models/call.model.js

const callSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    fromTime: {
      type: String,
      required: [true, "From Time is required"],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "From Time must be in HH:mm format",
      },
    },
    toTime: {
      type: String,
      required: [true, "To Time is required"],
      validate: {
        validator: function (value) {
          // Validate time format HH:mm
          return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "To Time must be in HH:mm format",
      },
    },
    callInformation: {
      type: String,
      trim: true,
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
    callTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Call Type is required"],
      validate: [
        {
          validator: function (value) {
            return mongoose.Types.ObjectId.isValid(value);
          },
          message: "Invalid Call Type ID",
        },
        {
          validator: async function (value) {
            // Validate that the statusGroup is 'Meetings'
            const Status = mongoose.model("Status");
            const status = await Status.findById(value);
            return status && status.statusGroup === "MEETINGS";
          },
          message: 'Call Type must belong to "Meetings" status group',
        },
      ],
    },
    salesmanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Salesman ID is required"],
      validate: {
        validator: function (value) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Invalid Salesman ID",
      },
    },
    callAgenda: {
      type: String,
      trim: true,
    },
    callDescription: {
      type: String,
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
  { timestamps: true }
);

// Polymorphic reference validation
callSchema.pre("save", async function (next) {
  const call = this;
  const Status = mongoose.model("Status");
  const status = await Status.findById(call.collectionTypeId);
  if (!status || status.statusGroup !== "COLLECTIONS") {
    return next(
      new Error('Collection Type must belong to "Collections" status group')
    );
  }

  const collectionName = status.statusDescription; // Assuming the status 'name' field contains the collection name
  const Model = mongoose.model(collectionName);
  const exists = await Model.exists({ _id: call.collectionId });

  if (!exists) {
    return next(
      new Error(`Referenced document not found in ${collectionName} collection`)
    );
  }

  next();
});

const Call = mongoose.model("Call", callSchema);
export default Call;
