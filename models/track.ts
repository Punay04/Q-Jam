import mongoose from "mongoose";

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
  artist: String,
  addedBy: {
    type: String,
    required: true,
  },
  votes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vote",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Track = mongoose.models.Track || mongoose.model("Track", trackSchema);
export default Track;
