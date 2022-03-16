import React, { useState } from "react";
import { useGame } from "./hooks/useGame";
import Guesses from "./components/Guesses";
import Keyboard from "./components/Keyboard";
import InputWord from "./components/InputWord";

const App = () => {
  console.log("render app");
  const { row, wordle, history, alphabet, status, newGame, submitGuess } =
    useGame();

  const handleSubmit = (e: React.FormEvent, input: string): void => {
    e.preventDefault();
    submitGuess(input);
  };

  return (
    <div>
      <div><strong> WIP 😂 </strong></div>
      {`status: ${status}`}
      <br />
      {`guesses: ${row}`}
      <br />
      {`wordle: ${wordle}`}
      <br />
      <button onClick={newGame}> restart </button>
      <br />
      <InputWord handleSubmit={handleSubmit} />
      <br />
      <Guesses guesses={history.data} />
      <br />
      <Keyboard alphabet={alphabet.alphabet} />
    </div>
  );
};

export default App;
