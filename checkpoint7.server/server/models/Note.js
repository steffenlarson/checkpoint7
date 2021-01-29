import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: ObjectId, ref: 'Bug', required: true },
  flagged: { type: String, enum: ['pending', 'completed', 'rejected'] },
  creatorId: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Note
