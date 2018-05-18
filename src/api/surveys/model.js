import mongoose, { Schema } from 'mongoose';

const surveySchema = new Schema({
  title: {
    type: String,
    index: true,
    trim: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

const model = mongoose.model('Survey', surveySchema);

export const { schema } = model;
export default model;
