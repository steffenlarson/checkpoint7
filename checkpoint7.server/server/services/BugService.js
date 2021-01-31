import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

// NOTE add import for BadRequest later
class BugService {
  async getAllBugs() {
    // REVIEW do I want to use the find here? Or is there a better method for getting all of them?
    // Will I want to put a querry here?
    return await dbContext.Bugs.find().populate('creator', 'name id')
    // REVIEW why am I using the name id in the populate? What is that doing?
  }

  async getOneBug(bugId) {
    const Bug = await dbContext.Bugs.findById(bugId)
    if (!Bug) {
      throw new BadRequest('Invalid Bug Identifier')
    }
    return Bug
  }

  async createBug(body) {
    return await dbContext.Bugs.create(body)
  }
}

export const bugService = new BugService()
