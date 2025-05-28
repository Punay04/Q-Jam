import mongoose from "mongoose";

const nowPlayingSchema = new mongoose.Schema({
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const NowPlaying = mongoose.model("NowPlaying", nowPlayingSchema);

nowPlayingSchema.index({}, { unique: true });
export default NowPlaying;
