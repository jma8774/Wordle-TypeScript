import React, { useState, FC } from 'react';
import { useGame } from './hooks/useGame'

const App:FC = () => {
  const [input, setInput] = useState<string>('')
  const game = useGame()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    game.guessWord(input)
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
        <input onChange={(e) => setInput(e.target.value)}></input>
        <button> guess </button>
      </form>
      {game.history.data.map((word, index) => 
        <div key={`${word}${index}`}> {word} </div>
      )}
    </div>
  ) 
}

export default App;
