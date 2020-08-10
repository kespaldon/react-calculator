import React, { Component } from 'react'

export default class Calculator extends Component {
  state = {
    input: 0,
  }

  render() {
    return (
      <main>
        <section className="calc-display">
          {this.state.input}
        </section>
      </main>
    )
  }
}
