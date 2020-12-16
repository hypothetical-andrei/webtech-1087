import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class CarStore {
  constructor(personId) {
    this.personId = personId
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/people/${this.personId}/cars`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_ALL_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_ALL_ERROR')
    }
  }

  async addOne(car) {
    try {
      await fetch(`${SERVER}/people/${this.personId}/cars`, {
        method: 'post', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('ADD_ONE_ERROR')
    }
  }

  async deleteOne(carId) {
    try {
      await fetch(`${SERVER}/people/${this.personId}/cars/${carId}`, {
        method: 'delete'
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('DELETE_ONE_ERROR')
    }
  }

  async saveOne(carId, car) {
    try {
      await fetch(`${SERVER}/people/${this.personId}/cars/${carId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      })
      this.getAll()
    } catch (err) {
      this.emitter.emit('SAVE_ONE_ERROR')
    }
  }

}

export default CarStore
