import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Bug = new Schema({
  closed: { type: Boolean, requreed: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorId: { type: String, required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

Bug.virtual('author', {
  localField: 'authorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Bug
