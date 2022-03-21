import { useState } from "react";

interface Alphabet {
  [key: string]: string;
}

const initializeAlphabet = (): Alphabet => {
  let alphabet: Alphabet = {};
  const start = "a".charCodeAt(0);
  for (let i = start; i < start + 26; i++) {
    alphabet[String.fromCharCode(i)] = "init";
  }
  return alphabet;
};

const useAlphabet = () => {
  const [alphabet, setAlphabet] = useState<Alphabet>(initializeAlphabet());

  // Helper function to use 'setAlphabet' to prevent DRY
  const update = (ch: string, status: string): void => {
    if (alphabet[ch] === status) return;
    setAlphabet((prevState: Alphabet) => ({ ...prevState, [ch]: status }));
  };

  // Updates a character to 'never'
  const updateNever = (ch: string): void => {
    if (
      alphabet?.[ch] === undefined ||
      alphabet?.[ch] === "never" ||
      alphabet?.[ch] === "almost" ||
      alphabet?.[ch] === "success"
    )
      return;
    update(ch, "never");
  };

  // Updates a character to 'almost'
  const updateAlmost = (ch: string): void => {
    if (
      alphabet?.[ch] === undefined ||
      alphabet?.[ch] === "almost" ||
      alphabet?.[ch] === "success"
    )
      return;
    update(ch, "almost");
  };

  // Updates a character to 'success'
  const updateSuccess = (ch: string): void => {
    if (alphabet?.[ch] === undefined || alphabet?.[ch] === "success") return;
    update(ch, "success");
  };

  const applyChanges = (guess: string, wordle: string): void => {
    const wordleSet = new Set(wordle);
    const alphabetChanges: Alphabet = { ...alphabet };

    for (let i = 0; i < guess.length; i++) {
      const ch = guess[i];
      const color = alphabetChanges?.[ch];
      if (ch === wordle[i]) {
        alphabetChanges[ch] = "success";
      } else if (color !== "success") {
        alphabetChanges[ch] = wordleSet.has(ch) ? "almost" : "never";
      }
    }

    setAlphabet(alphabetChanges);
  };

  const hint = () => {
    alert("Hint icon clicked");
    console.log("hint");
  };

  // Reset alphabet to default
  const reset = (): void => {
    setAlphabet(initializeAlphabet());
  };

  return {
    alphabet,
    updateNever,
    updateAlmost,
    updateSuccess,
    applyChanges,
    hint,
    reset,
  } as const;
};

export default useAlphabet;
