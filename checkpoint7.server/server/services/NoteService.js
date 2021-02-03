import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NoteService {
  async getNotesForBug(query) {
    return await dbContext.Notes.find(query).populate('creator', 'name id')
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(body) {
    // FIXME how do I lock this down? I thought that I did with the object being passed. But I think I can delete other peoples comments.
    const note = await dbContext.Notes.findOneAndDelete({ _id: body.id, creatorId: body.creatorId })
    if (!note) {
      throw new BadRequest('Note Identifier is invalid or you are not the creator')
    }
    return 'Successfully Delorted'
  }
}

export const noteService = new NoteService()
