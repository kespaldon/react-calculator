import React from 'react'

export default function Keys(props) {
  const inputs = [
    ['AC', '+/-', '%', '/'],
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=']
  ]

  const inputComponents = inputs.map(row => {
    return row.map(r => {
      const buttonClass = r === 0 ? 'w-50' : 'w-25'
      const classes = [buttonClass]

      if (isNaN(parseInt(r))) {
        classes.push('accent')
      }

      return (
        <button
          key={r}
          className={`input-button ${classes.join(' ')}`}
          onClick={props.handleKeyClick}
          value={r}
        >
          {r}
        </button>
      )
    })
  })
  return (
    <section className="input-collection">
      {inputComponents}
    </section>
  )
}
