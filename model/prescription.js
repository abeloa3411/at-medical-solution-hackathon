import mongoose from "mongoose";

const prescSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
});

const prescModel = mongoose.model("prescModel", prescSchema);

export default prescModel;
