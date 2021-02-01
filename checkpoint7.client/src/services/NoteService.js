import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NoteService {
  async getNotes(bugId) {
    const res = await api.get('api/bugs/' + bugId + '/notes')
    AppState.notes = res.data
    logger.log('this should be the notes for the indv bug', AppState.notes)
  }
}

export const noteService = new NoteService()
