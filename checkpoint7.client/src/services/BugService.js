import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOneBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    // logger.log('This is the get one', AppState.activeBug)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs/', bug)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async editBug(bug) {
    // REVIEW this bug should be coming through as an object with all the stuff on it that I need.
    // The id, description, and the title.
    // if (bug.closed === false) {
    // REVIEW this should only do the editing if the closed attribute is false. If it is true it wont send a request.
    debugger
    logger.log('this is the edit bug', bug)
    await api.put('api/bugs/' + bug.id, bug)
    // REVIEW I should be passing everything that this edit needs and I do not know why it is not working.
    // }
  }

  // REVIEW need a delete function (really an edit) to run to flip the bool of closed on button press. Put it insied of a display popup message box
}
export const bugService = new BugService()
