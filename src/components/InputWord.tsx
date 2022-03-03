import React, { useState } from 'react'

interface Props {
  handleSubmit(e: React.FormEvent, input: string): void 
}

export default React.memo(({ handleSubmit }: Props) => {
  const [input, setInput] = useState<string>('')
  return (
    <form onSubmit={(e) => {handleSubmit(e, input)}}>
      <input onChange={(e) => setInput(e.target.value)} value={input}/>
      <button> guess </button>
    </form>
  )
})