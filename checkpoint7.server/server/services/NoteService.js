import { dbContext } from '../db/DbContext'
class NoteService {
  async getNotesForBug(query) {
    return await dbContext.Notes.find(query).populate('creator', 'name id')
  }

  async createNote(body) {
    return await dbContext.Notes.create(body)
  }
}

export const noteService = new NoteService()
