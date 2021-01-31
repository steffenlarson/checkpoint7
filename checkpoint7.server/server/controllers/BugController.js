import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/', this.getAllBugs)
      .get('/:bugId', this.getOneBug)
      .post('/', this.createBug)
      .put('/:id', this.editBug)
      // Start with one get and build the whole line of methods
    // get one working, and then once sure it is working move on
  }

  async getAllBugs(req, res, next) {
    try {
      // NOTE I do not need to pass anything here because I am getting every single bug right?
      req.body.creatorId = req.userInfo.id
      const bugs = await bugService.getAllBugs()
      res.send(bugs)

      // res.send(await bugService.getAllBugs())
    } catch (error) {
      next(error)
    }
  }

  async getOneBug(req, res, next) {
    try {
      res.send(await bugService.getOneBug(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await bugService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      res.send(await bugService.editBug(req.params.id, req.body))
    } catch (error) {
      next(error)
    }
  }
}
