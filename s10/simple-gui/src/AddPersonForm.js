import React from 'react'

class AddPersonForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      age: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        name: this.state.name,
        age: this.state.age
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

  }

  render () {
    return (
      <div>
        <label htmlFor='name'>name</label>
        <input type='text' name='name' id='name' onChange={this.handleChange} valiue={this.state.name} />
        <label htmlFor='age'>age</label>
        <input type='text' name='age' id='age' onChange={this.handleChange} value={this.state.age} />
        <input type='button' value='add' onClick={this.add} />
      </div>
    )
  }
}

export default AddPersonForm