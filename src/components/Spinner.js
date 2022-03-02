import React, { Component } from 'react'
import loading from '../loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="Loading" />
        <h3>Loading...</h3>
      </div>
    )
  }
}

export default Spinner
