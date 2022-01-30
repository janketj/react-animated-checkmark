import React, {Component} from 'react'
import {render} from 'react-dom'

import AnimatedCheckmark, { MODES } from '../../src'

export default class Demo extends Component {
  constructor() {
    super()
    this.state = {
      mode: MODES.LOADING,
    }
  }

  handleClick = () => {
    if (this.state.mode === MODES.LOADING) {
      this.setState({ mode: MODES.SUCCESS })
    } else {
      this.setState({ mode: MODES.LOADING })
    }
  }

  render() {
    const { mode } = this.state
    return <div onClick={this.handleClick}>
      <h1>react-animated-checkmark Demo</h1>
      <AnimatedCheckmark size={256} collapseFactor={0.8} mode={mode} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
