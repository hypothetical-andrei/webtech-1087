import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class PeopleStore {
  constructor() {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/people`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_ERROR')
    }
  }

  async addOne(person) {
    try {
      await fetch(`${SERVER}/people`, {
        method: 'post', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('ADD_ONE_ERROR')
    }
  }

  async deleteOne(id) {
    try {
      await fetch(`${SERVER}/people/${id}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('DELETE_ONE_ERROR')
    }
  }

  async saveOne(id, person) {
    try {
      await fetch(`${SERVER}/people/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('SAVE_ONE_ERROR')
    }
  }

}

const store = new PeopleStore()

export default store
