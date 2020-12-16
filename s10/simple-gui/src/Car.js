import React from 'react'

class Car extends React.Component {
  constructor (props) {
    super(props)


    this.state = {
      isEditing: false,
      maker: this.props.item.maker,
      series: this.props.item.series,
      type: this.props.item.type   
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

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    this.save = () => {
      this.props.onSave(this.props.item.id, {
        maker: this.state.maker,
        series: this.state.series,
        type: this.state.type
      })
      this.setState({
        isEditing: false
      })
    }

  }
  render () {
    const { item } = this.props
    return (
      <div>
        {
          this.state.isEditing ? 
          <>
            <input type='text' name='maker' id='maker' onChange={this.handleChange} value={this.state.maker} />
            <input type='text' name='series' id='series' onChange={this.handleChange} value={this.state.series} />
            <input type='text' name='type' id='type' onChange={this.handleChange} value={this.state.type} />
            <input type='button' value='cancel' onClick={this.cancel} />
            <input type='button' value='save' onClick={this.save} />

          </>
            :
          <>
            <span>{item.maker}</span>
            <span>{item.series}</span>
            <span>{item.type}</span>
            <span>
              <input type='button' value='delete' onClick={this.delete} />
              <input type='button' value='edit' onClick={this.edit} />
            </span>
          </>
        }
      </div>
    )
  }
}

export default Car