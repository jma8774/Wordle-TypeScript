import React, { useState, FC } from 'react';
import { useGame } from './hooks/useGame'

const statusColor: Record<string, string> = {
  success: 'green',
  almost: 'orange',
  never: 'black'
}

const App:FC = () => {
  const [input, setInput] = useState<string>('')
  const game = useGame()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    game.guessWord(input)
    setInput('')
  }

  return(
    <div> 
      {game.status}
      <br/>
      {game.guesses}
      <br/>
      {game.wordle} 
      <br/>
      <button onClick={game.newGame}> restart </button>
      <br/>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setInput(e.target.value)} value={input}/>
        <button> guess </button>
      </form>
      {
        game.history.data.map((guess, index) => 
          <div key={index} >
            {
              guess.map((pair, index) => <span style={{ color: statusColor[pair.color] }} key={`${pair.ch}${index}`}>{pair.ch}</span>)
            }
          </div>
        )
      }
    </div>
  ) 
}

export default App;
