import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    apiID: {
      type: Number,
      required: true,
    },
    backdrop_path: {
      type: String,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
    episode: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
