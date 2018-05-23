import mongoose, { Schema } from 'mongoose';

const surveyPageSchema = new Schema({
  title: {
    type: String,
    index: true,
    trim: true,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
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

const model = mongoose.model('SurveyPage', surveyPageSchema);

export const { schema } = model;
export default model;
