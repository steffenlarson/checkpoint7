import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NoteService {
  async getNotesForBug(query) {
    return await dbContext.Notes.find(query).populate('creator', 'name id')
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }

  async deleteNote(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Note Identifier is invalid or you are not the creator')
    }
    return 'Successfully Delorted'
  }
}

export const noteService = new NoteService()
