import React from 'react'
import './PersonEditor.css'
import PeopleStore from './PeopleStore'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

import { withRouter } from 'react-router-dom'

class PersonEditor extends React.Component {
  constructor () {
    super()

    this.state = {
      people: [],
      isAddDialogVisible: false,
      isNewRecord: true,
      person: {
        name: '',
        age: ''
      }
    }

    this.store = PeopleStore

    this.addPerson = (person) => {
      this.store.addOne(person)
    }

    this.deletePerson = (id) => {
      this.store.deleteOne(id)
    }

    this.savePerson = (id, person) => {
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

    this.add = () => {
      this.showAddDialog()
      this.setState({
        isNewRecord: true
      })
    }

    this.save = () => {
      if (this.state.isNewRecord) {
        this.addPerson(this.state.person)
      } else {
        this.savePerson(this.state.person.id, this.state.person)
      }
      this.hideAddDialog()
    }

    this.tableFooter = (
      <div className='table-footer'>
        <Button className='p-button-rounded p-button-success' icon='pi pi-plus' onClick={this.add} />
      </div>
    )

    this.dialogFooter = (
      <div className='table-footer'>
        <Button className='p-button-rounded p-button-success' label='save' icon='pi pi-save' onClick={this.save} />
      </div>
    )

    this.edit = (rowData) => {
      this.setState({
        isAddDialogVisible: true,
        isNewRecord: false,
        person: rowData
      })
    }

    this.delete = (id) => {
      this.store.deleteOne(id)
    }

    this.handleChange = (evt) => {
      const person = this.state.person
      person[evt.target.name] = evt.target.value
      this.setState({
        person
      })
    }

    this.select = (rowData) => {
      this.props.history.push(`/persons/${rowData.id}`)
    }

    this.opsTemplate = (rowData) => {
      return (
        <div className='ops-container'>
          <span className='ops-button'>
            <Button className='p-button-rounded p-button-danger' icon='pi pi-trash' onClick={() => this.deletePerson(rowData.id)} />
          </span>
          <span className='ops-button'>
            <Button className='p-button-rounded p-button-info' icon='pi pi-pencil' onClick={() => this.edit(rowData)} />
          </span>
          <span className='ops-button'>
            <Button className='p-button-rounded p-button-info' icon='pi pi-search-plus' onClick={() => this.select(rowData)} />
          </span>
        </div>
      )
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
    return (
      <div className='person-editor'>
        <DataTable value={this.state.people} header='List of owners' footer={this.tableFooter} >
          <Column header='Name' field='name' />
          <Column header='Age' field='age' />
          <Column body={this.opsTemplate} />
        </DataTable>
        <Dialog header='Add a car owner' visible={this.state.isAddDialogVisible} onHide={this.hideAddDialog} footer={this.dialogFooter} className='p-fluid'>
          <div className='p-field'>
            <label htmlFor='name'>Name</label>
            <InputText onChange={this.updatePerson} name='name' id='name' value={this.state.person.name} onChange={this.handleChange} />
          </div>
          <div className='p-field'>
            <label htmlFor='age'>Age</label>
            <InputText onChange={this.updatePerson} name='age' id='age' value={this.state.person.age} onChange={this.handleChange} />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(PersonEditor)
