import React, { useState } from 'react';
import { useGame } from './hooks/useGame'
import Node from './components/Node'
import InputWord from './components/InputWord'

const App = () => {
  console.log("render app")
  const { guesses, wordle, history, alphabet, status, newGame, guessWord } = useGame()  

  const handleSubmit = (e: React.FormEvent, input: string): void => {
    e.preventDefault()
    guessWord(input)
  }

  return(
    <div> 
      {`status: ${status}`}
      <br/>
      {`guesses left: ${guesses}`}
      <br/>
      {`wordle: ${wordle}`} 
      <br/>
      <button onClick={newGame}> restart </button>
      <br/>
      <InputWord handleSubmit={handleSubmit}/>
      {
        history.data.map((guess, index) => 
          <div key={index} >
            {`guess #${index+1}: `}
            {
              guess.map((pair, index) => <Node key={`${pair.ch}${index}`} pair={pair} />)
            }
          </div>
        )
      }
    </div>
  ) 
}

export default App;
