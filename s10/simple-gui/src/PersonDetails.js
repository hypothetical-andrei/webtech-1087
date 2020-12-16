import React from 'react'
import CarStore from './CarStore'
import Car from './Car'
import AddCarForm from './AddCarForm'

class PersonDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      cars: []
    }

    this.cancel = () => {
      this.props.onCancel()
    }

    this.store = new CarStore(this.props.item)

    this.add = (car) => {
      this.store.addOne(car)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }
  }

  componentDidMount () {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        cars: this.store.data
      })
    })
  }

  render () {
    return (
      <div>
        i am the details page for {this.props.item}
        <div>
          {
            this.state.cars.map(e => <Car item={e} key={e.id} onDelete={this.delete} />)
          }
        </div>
        <AddCarForm onAdd={this.add} />
        <input type='button' value='back' onClick={this.cancel} />
      </div>
    )
  }
}

export default PersonDetails