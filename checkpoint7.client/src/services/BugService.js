import { AppState } from '../AppState'
import router from '../router'
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
    // REVIEW help here I do not understand how to set up the router.push    router.push()
    // NOTE looked at the router links and the router.push to figure this out.
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
    return res.data.id
  }

  async editBug(bug) {
    // REVIEW this bug should be coming through as an object with all the stuff on it that I need.
    // The id, description, and the title.
    // this should only do the editing if the closed attribute is false. If it is true it wont send a request.
    logger.log('this is the edit bug', bug)
    await api.put('api/bugs/' + bug.id, bug)
    // REVIEW I should be passing everything that this edit needs and I do not know why it is not working.
    // NOTE SOLUTION: Need to use the '+' to append the id onto the url. then place a ',' to add the body.
  }

  // REVIEW need a delete function (really an edit) to run to flip the bool of closed on button press. Put it insied of a display popup message box

  // FIXME do I need a body for this delete route? Because the delete route actually does an edit.
  // I need to asign the closed attribute to true with this function. Reasign here.
  async closeBug(bug) {
    if (confirm('Are you sure?') === true) {
      await api.delete('api/bugs/' + bug)
    }
  }
}
export const bugService = new BugService()
