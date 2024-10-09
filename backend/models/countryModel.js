  import mongoose from "mongoose";

  // Define the Country schema
  const countrySchema = new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        match: /^[A-Z]{3}$/, // Exactly 3 uppercase letters
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      currency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
      },
      description: {
        type: String,
        default: '',
        trim: true,
      },
    },
    {
      timestamps: true, // Adds createdAt and updatedAt timestamps
    }
  );

  // Create indexes on code and name
  countrySchema.index({ code: 1 });
  countrySchema.index({ name: 1 });

  // Create the Country model
  const Country = mongoose.model('Countries', countrySchema);

  // Export the model
  export default Country;