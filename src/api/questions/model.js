import mongoose, { Schema } from 'mongoose';

const questionTypes = ['single', 'multi', 'text', 'file', 'star', 'bar'];

const questionSchema = new Schema({
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
  page: {
    type: Schema.Types.ObjectId,
    ref: 'SurveyPage',
    required: true,
  },
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  type: {
    type: String,
    enum: questionTypes,
    required: true,
  },
  variants: {
    type: Array,
  },
  required: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

const model = mongoose.model('Question', questionSchema);

export const { schema } = model;
export default model;
