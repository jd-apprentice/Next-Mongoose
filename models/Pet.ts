import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const PetSchema = new mongoose.Schema({
  name: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a name for this pet."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  owner_name: {
    /* The owner of this pet */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  species: {
    /* The species of your pet */

    type: String,
    required: [true, "Please specify the species of your pet."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },
  age: {
    /* Pet's age, if applicable */
    type: Number,
  },
  image_url: {
    /* Url to pet image */
    type: String,
  },
});

export default mongoose.models.Pet || mongoose.model("Pet", PetSchema);
