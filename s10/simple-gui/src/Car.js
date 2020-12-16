import React from 'react'

class Car extends React.Component {
  constructor (props) {
    super(props)

    this.delete = () => {
      this.props.onDelete(this.props.item.id)
    }
  }
  render () {
    const { item } = this.props
    return (
      <div>
        <span>{item.maker}</span>
        <span>{item.series}</span>
        <span>{item.type}</span>
        <span>
          <input type='button' value='delete' onClick={this.delete} />
        </span>
      </div>
    )
  }
}

export default Car