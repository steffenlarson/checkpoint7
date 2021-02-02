import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

// NOTE add import for BadRequest later
class BugService {
  async getAllBugs() {
    // REVIEW do I want to use the find here? Or is there a better method for getting all of them?
    // Will I want to put a querry here?
    return await dbContext.Bugs.find().populate('creator', 'name id')
    // REVIEW why am I using the name id in the populate? What is that doing? Is that specifying what gets added on the populate?
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

  async editBug(bugId, body) {
    const newBug = await dbContext.Bugs.findOneAndUpdate({ _id: bugId, creatorId: body.creatorId, closed: false }, body, { new: true })
    if (!newBug) {
      throw new BadRequest('No Bug Exists with this Identifier, or you are not the author')
    }
    return newBug
  }

  async deleteBug(body) {
    // NOTE Vaue to check after, go to dbContext the Bugs find the one where the id==the id passed, the creatorId is the passed creatorId, and
    // the closed attribute==false.  Pass the whole body, and since its an update new: true to return the item.
    const newBug = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId, closed: false }, body, { new: true })
    if (!newBug) {
      throw new BadRequest('No Bug Exists with this Identifier, or you are not the author')
    }
    return 'Successfully Delorted'
  }
}

export const bugService = new BugService()
