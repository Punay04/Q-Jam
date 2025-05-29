import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  voteType: {
    type: String,
    enum: ["upvote", "downvote"],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

voteSchema.index({ user: 1, track: 1 }, { unique: true });

const Vote = mongoose.models.Vote || mongoose.model("Vote", voteSchema);
export default Vote;
