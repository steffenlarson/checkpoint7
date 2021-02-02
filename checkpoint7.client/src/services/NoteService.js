import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
    // logger.log('this should be the notes for the indv bug', AppState.notes)
  }

  async createNote(note) {
    // logger.log('this is what is getting passed', note)

    const res = await api.post('api/notes/', note)
    AppState.notes.push(res.data)
    return res.send
  }

  async deleteNote(id) {
    if (confirm('Are you sure?') === true) {
      await api.delete('api/notes/' + id)
      const noteInd = AppState.notes.findIndex(note => note.id === id)
      AppState.notes.splice(noteInd, 1)
    }
  }
}

export const noteService = new NoteService()
