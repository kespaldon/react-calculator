import React from 'react'

export default function History(props) {
  const { logs } = props

  const entries = logs.map((l, index) => {
    return (
      <li key={index}>{l}</li>
    )
  })
  return (
    <ul>{entries}</ul>
  )
}
