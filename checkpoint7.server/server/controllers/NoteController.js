import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
// import { BadRequest } from '../utils/Errors'

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
      // NOTE assigning the req.body.creatorId to the user info.id creates that on the req.body object
      req.body.creatorId = req.userInfo.id
      res.send(await noteService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      // REVIEW Need to check here if the user is the same as the creator. To ensure that creators are the only ones allowed to delete their notes.
      // check identity if statement user id === creator id/ Maybe throw new Bad Request in the else statement?
      // need help or have questions here how do I make sure that the user is the creator? I think I am on the right track...
      // NOTE see the service for the actual checks. One line checks it. We pass what we need by assigning things here.
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await noteService.deleteNote(req.body))
    } catch (error) {
      next(error)
    }
  }
}
