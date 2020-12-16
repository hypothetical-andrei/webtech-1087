import React from 'react'
import './PersonEditor.css'
import PeopleStore from './PeopleStore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

class PersonEditor extends React.Component {
  constructor () {
    super()

    this.state = {
      people: [],
      isAddDialogVisible: false,
      person: {
        name: '',
        age: ''
      }
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
    
    this.hideAddDialog = () => {
      this.setState({
        isAddDialogVisible: false
      })
    }

    this.showAddDialog = () => {
      this.setState({
        isAddDialogVisible: true
      })
    }

    this.tableFooter = (
      <div className='table-footer'>
        <Button className='p-button-rounded p-button-success' icon='pi pi-plus' onClick={this.showAddDialog} />
      </div>
    )

    this.dialogFooter = (
      <div className='table-footer'>
        <Button className='p-button-rounded p-button-success' label='save' icon='pi pi-save' />
      </div>
    )

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
    return (
      <div className='person-editor'>
        <DataTable value={this.state.people} header='List of owners' footer={this.tableFooter} >
          <Column header='Name' field='name' />
          <Column header='Age' field='age' />
        </DataTable>
        <Dialog header='Add a car owner' visible={this.state.isAddDialogVisible} onHide={this.hideAddDialog} footer={this.dialogFooter} className='p-fluid'>
          <div className='p-field'>
            <label htmlFor='name'>Name</label>
            <InputText onChange={this.updatePerson} name='name' id='name' value={this.state.person.name} />
          </div>
          <div className='p-field'>
            <label htmlFor='age'>Age</label>
            <InputText onChange={this.updatePerson} name='age' id='age' value={this.state.person.age} />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default PersonEditor
