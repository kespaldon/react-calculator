import React, { Component } from 'react'
import Keys from './Keys'
export default class Calculator extends Component {
  initialState = {
    isDecimal: false,
    display: '0.',
    operation: null,
    memory: null,
  }

  state = this.initialState

  handleOperation() {
    let { memory, display, operation } = this.state

    const operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      'x': (a, b) => a * b,
      '/': (a, b) => (a / b).toFixed(4)
    }

    memory = parseFloat(memory)
    display = parseFloat(display)

    const result = operations[operation](memory, display)

    return result % 1 === 0 ? `${result}.` : result.toFixed(2)
  }

  handleKeyClick = (e) => {
    const { display, isDecimal } = this.state
    const { value } = e.target

    const displaySplit = display.split('.')
    let numerals = displaySplit[0]
    let decimals = displaySplit[1]

    // handle non-numeric inputs
    if (value === '.') {
      this.setState({ isDecimal: true })
      return
    }

    if (value === 'AC') {
      this.setState(this.initialState)
      return
    }

    if (['+', '-', '/', 'x'].indexOf(value) > -1) {
      const { display } = this.state
      this.setState({
        ...this.initialState,
        operation: value,
        memory: parseFloat(display)
      })
      return
    }

    if (value === '+/-') {
      let { display } = this.state
      display = parseFloat(display)

      display = display * -1

      this.setState({
        display: display % 1 === 0 ? `${display}.` : display
      })

      return
    }

    // handle operations
    if (value === '=') {
      this.setState({
        display: this.handleOperation(),
        isDecimal: false,
        operation: null,
        memory: null
      })
      return
    }

    if (isDecimal) {
      decimals = decimals + value
    } else {
      numerals = (parseInt(numerals) === 0) ? value : numerals + value
    }

    this.setState({ display: `${numerals}.${decimals}` })

    return
  }

  render() {
    return (
      <main>
        <section className="calc-display">
          {this.state.display}
        </section>
        <Keys handleKeyClick={this.handleKeyClick} />
      </main>
    )
  }
}
