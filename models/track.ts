import { create } from "domain";
import mongoose from "mongoose";
import { title } from "process";

const trackSchema = new mongoose.Schema({
  youtubeId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist : String,
  addedBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  votes : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Vote",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Track = mongoose.model("Track", trackSchema);
export default Track;
         