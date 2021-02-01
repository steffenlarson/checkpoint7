import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
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
}
export const bugService = new BugService()
