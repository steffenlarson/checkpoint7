import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/', this.createNote)
  }

  async createNote(req, res, next) {
    try {
      // REVIEW this should somehow pass the Bug Id with the body so that the note knows to what bug it belongs... how though?
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }
}
