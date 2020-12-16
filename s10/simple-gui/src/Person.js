import React from 'react'

class Person extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.item.name,
      age: this.props.item.age
    }

    this.delete = (evt) => {
      this.props.onDelete(this.props.item.id)
    }

    this.edit = () => {
      this.setState({
        isEditing: true
      })
    }

    this.cancel = () => {
      this.setState({
        isEditing: false
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        name: this.state.name,
        age: this.state.age
      })

      this.setState({
        isEditing: false
      })
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.select = (evt) => {
      this.props.onSelect(this.props.item.id)
    }
  }

  render() {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ? 
            <>
              <span>
                <input type='text' value={this.state.name} onChange={this.handleChange} name='name' />
              </span>
              <span>
                <input type='text' value={this.state.age} onChange={this.handleChange} name='age' />
              </span>
              <input type='button' value='cancel' onClick={this.cancel} />
              <input type='button' value='save' onClick={this.save} />
            </>
          :
            <>
              <span>{item.name}</span>
              <span>{item.age}</span>
              <span>
                <input type='button' value='delete' onClick={this.delete} />
                <input type='button' value='edit' onClick={this.edit} />
                <input type='button' value='select' onClick={this.select} />
              </span>
            </>
        }
      </div> 
    )
  } 
}

export default Person