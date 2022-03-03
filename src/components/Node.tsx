import React from 'react'

const statusColor: Record<string, string> = {
  success: 'green',
  almost: 'orange',
  never: 'black'
}

interface CharColor {
  ch: string
  color: string
}

interface Props {
  pair: CharColor
}

export default React.memo(({ pair }: Props) => {
  return (
    <span style={{ color: statusColor[pair.color] }}>{pair.ch}</span>
  )
})