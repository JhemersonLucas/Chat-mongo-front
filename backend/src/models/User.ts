import mongoose, { Schema } from 'mongoose';

const dbUser = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', dbUser);
