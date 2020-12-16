import React from 'react'

class AddCarForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      maker: '',
      series: '',
      type: ''
    }

    this.add = (evt) => {
      this.props.onAdd({
        maker: this.state.maker,
        series: this.state.series,
        type: this.state.type
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
        <label htmlFor='maker'>maker</label>
        <input type='text' name='maker' id='maker' onChange={this.handleChange} valiue={this.state.maker} />
        <label htmlFor='series'>series</label>
        <input type='text' name='series' id='series' onChange={this.handleChange} value={this.state.series} />
        <label htmlFor='type'>type</label>
        <input type='text' name='type' id='type' onChange={this.handleChange} value={this.state.type} />
        <input type='button' value='add' onClick={this.add} />
      </div>
    )
  }
}

export default AddCarForm