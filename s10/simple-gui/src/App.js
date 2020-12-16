import './App.css'
import React from 'react'
import Person from './Person'
import PeopleStore from './PeopleStore'
import AddPersonForm from './AddPersonForm'
import PersonDetails from './PersonDetails'


class App extends React.Component {

  constructor () {
    super()
    this.state = {
      people: [],
      selected: 0
    }

    this.store = PeopleStore

    this.add = (person) => {
      this.store.addOne(person)
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.save = (id, person) => {
      this.store.saveOne(id, person)
    }

    this.select = (id) => {
      this.setState({
        selected: id
      })
    }

    this.cancel = () => {
      this.setState({
        selected: 0
      })
    }
  }

  componentDidMount () {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        people: this.store.data
      })
    })
  }

  render () {
    if (this.state.selected === 0) {
      return (
        <div>
          {
            this.state.people.map(e => <Person item={e} key={e.id} onDelete={this.delete} onSave={this.save} onSelect={this.select} />)
          }
          <div>
            <AddPersonForm onAdd={this.add} />
          </div>
        </div>
      )  
    } else {
      return <PersonDetails item={this.state.selected} onCancel={this.cancel} />
    }
  }
}

export default App

