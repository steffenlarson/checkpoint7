import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createNote)
      .delete('/:id', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      // REVIEW this should somehow pass the Bug Id with the body so that the note knows to what bug it belongs... how though?
      // Or is this something that I just need to make sure to pass on the front end for this?
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      // TODO Need to check here if the user is the same as the creator. To ensure that creators are the only ones allowed to delete their notes.
      res.send(await noteService.deleteNote(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
