import React, { Component } from 'react'
import Keys from './Keys'
import History from './History'

export default class Calculator extends Component {
  initialState = {
    isDecimal: false,
    display: '0.',
    operation: null,
    memory: null,
  }

  state = {
    ...this.initialState,
    history: []
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    const { key } = e

    console.log('key', key)

    if (!isNaN(key)) {
      this.setNumber(key)
    } else if (key === 'Backspace') {
      const { display, isDecimal } = this.state
      const displaySplit = display.split('.')
      let numerals = displaySplit[0]
      let decimals = displaySplit[1]

      if (isNaN(parseFloat(display))) {
        this.setClear()
        return
      }

      if (isDecimal === true || decimals.length > 0) {
        if (decimals.length === 0) {
          this.setState({ isDecimal: false })
        }
        decimals = decimals.substring(0, decimals.length - 1)
      } else {
        numerals = (numerals.length > 1)
          ? numerals.substring(0, numerals.length - 1)
          : 0
      }

      this.setState({ display: `${numerals}.${decimals}` })
    } else if (key === '.') {
      this.setState({ isDecimal: true })
    } else if (['+', '-', '/', 'x'].indexOf(key) > -1) {
      this.setOperation(key)
    } else if (key === 'Enter') {
      this.handleOperation()
    } else if (key === 'Escape') {
      this.setClear()
    }
  }

  operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '/': (a, b) => (a / b)
  }

  handleOperation = () => {
    let { memory, display, operation } = this.state
    this.logHistory(memory, display, operation)

    if (memory === null || operation === null) {
      return
    }

    memory = parseFloat(memory)
    display = parseFloat(display)

    const result = this.operations[operation](memory, display)

    const output = result % 1 === 0 ? `${result}.` : result.toFixed(2)

    this.setState({
      display: output,
      isDecimal: false,
      operation: null,
      memory: null
    })


    return
  }

  setDecimal = () => this.setState({ isDecimal: true })

  setClear = () => this.setState(this.initialState)

  setOperation = (operation) => {
    const { display } = this.state
    this.setState({
      ...this.initialState,
      operation: operation,
      memory: parseFloat(display)
    })
    return
  }

  setNumber = (value) => {
    const { display, isDecimal } = this.state
    const displaySplit = display.split('.')
    let numerals = displaySplit[0]
    let decimals = displaySplit[1]

    if (isDecimal) {
      decimals = decimals + value
    } else {
      numerals = (parseInt(numerals) === 0) ? value : numerals + value
    }

    this.setState({ display: `${numerals}.${decimals}` })
    return
  }

  setPosNeg = () => {
    let { display } = this.state
    display = parseFloat(display) * -1

    this.setState({
      display: display % 1 === 0 ? `${display}.` : display
    })

    return
  }

  handleKeyClick = (e) => {
    const { value } = e.target

    if (value === '.') {
      this.setDecimal()
    } else if (value === 'AC') {
      this.setClear()
    } else if (['+', '-', '/', 'x'].indexOf(value) > -1) {
      this.setOperation(value)
    } else if (value === '+/-') {
      this.setPosNeg()
    } else if (value === '=') {
      this.handleOperation()
      return
    } else {
      this.setNumber(value)
    }
  }

  logHistory = (a, b, op) => {
    const { history } = this.state

    history.push(`${parseFloat(a)}${op}${parseFloat(b)}`)
  }

  render() {
    return (
      <main>
        <section>
          <div className="calc-display">
            {this.state.display}
          </div>
          <Keys handleKeyClick={this.handleKeyClick} />
        </section>
        <section>
          <History logs={this.state.history} />
        </section>
      </main>
    )
  }
}
