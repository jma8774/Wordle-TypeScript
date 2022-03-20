import { useState, useEffect, useRef } from "react";
import useArray from "./useArray";
import useAlphabet from "./useAlphabet";
import useLog from "./useLog";

const MAX_GUESSES = 6;
const WORDLE_LEN = 5;

interface CharColor {
  id: number;
  ch: string;
  color: string;
}

// Returns a 2d array of our initial history array for our game
const initHistory = (): CharColor[][] => {
  let history: CharColor[][] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    history.push([]);
    for (let j = 0; j < WORDLE_LEN; j++) {
      history[i].push({ id: i * WORDLE_LEN + j, ch: " ", color: "init" });
    }
  }
  return history;
};

// Returns random integer from [a, b]
const randomInt = (start: number, end: number): number => {
  return start + Math.floor(Math.random() * (end - start + 1));
};

const useGame = () => {
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);
  const [wordle, setWordle] = useState<string>("");
  const alphabet = useAlphabet();
  const history = useArray<CharColor[]>(initHistory());
  const [status, setStatus] = useState<string>("ongoing");
  const answers = useRef<string[]>([]);
  const words = useRef<Set<string>>(new Set());

  useLog("Log: history: ", history.data);
  useLog("Log: alphabet: ", alphabet.alphabet);

  // Function to read my text file from the 'public' folder on load
  useEffect(() => {
    const parseTextFile = (filename: string): Promise<string[]> => {
      return fetch(`${process.env.PUBLIC_URL}/${filename}`)
        .then((res) => res.text())
        .then((text) => {
          return text.split(/\r?\n/); // Split by /r/n on windows or /n on Unix using regex
        });
    };

    // Parse 2 textfiles for answers + all words
    const fetchWords = async (): Promise<void> => {
      const answersArr = await parseTextFile("answers.txt");
      const wordsArr = await parseTextFile("words.txt");
      answers.current = answersArr;
      words.current = new Set(wordsArr.concat(answersArr)); // All possible words include answers + normal words
    };

    // Pick a random wordle after fetching our answers + all words
    fetchWords().then(() => {
      const index = randomInt(0, answers.current.length);
      setWordle(answers.current[index]);
    });
  }, []);

  // Runs when the user presses space
  const newGame = (): void => {
    console.log("Log: started new game");
    const index = randomInt(0, answers.current.length); // Get a random index
    setWordle(answers.current[index]); // Pick a random wordle
    setCol(0); // Reset col
    setRow(0); // Reset row
    history.setData(initHistory()); // Reset history
    alphabet.reset(); // Reset alphabet
    setStatus("ongoing"); // Reset status
  };

  // Runs when the user presses enter
  const submitGuess = (): void => {
    if (status !== "ongoing") return;
    const curWord = history.data[row].map((x) => x.ch).join("");
    if (words.current.has(curWord)) {
      history.update(row, getCharColors(curWord)); // Update row { guesses } of our history with new guess
      setRow(row + 1); // Increment guess count
      setCol(0); // New row, reset col back to 0
      if (curWord === wordle)
        // Check if game is over
        setStatus("win");
      else if (row + 1 === MAX_GUESSES) setStatus("lose");
    }
  };

  // Runs when the user presses backspace
  const handleBackspace = (): void => {
    if (status !== "ongoing" || col === 0) return;
    const newRow = history.data[row].slice();
    newRow[col - 1] = { ...newRow[col - 1], ch: " ", color: "init" };
    history.update(row, newRow);
    setCol(col - 1);
  };

  // Runs when the user presses an alphabetical character
  const handleChar = (ch: string): void => {
    if (status !== "ongoing" || col >= WORDLE_LEN) return;
    const newRow = history.data[row].slice();
    newRow[col] = { ...newRow[col], ch: ch, color: "init" };
    history.update(row, newRow);
    setCol(col + 1);
  };

  // Will update the alphabet with green/yellow/black colors and return the CharColor[] for this guesss
  const getCharColors = (guess: string): CharColor[] => {
    const newRow = history.data[row].slice();
    const wordleSet = new Set(wordle);

    // Iterate through each character of the guess word
    for (let i = 0; i < guess.length; i++) {
      const ch: string = guess[i];
      if (ch === wordle[i]) {
        // Character at index i of guess is same as character of wordle
        newRow[i] = { ...newRow[i], ch: ch, color: "success" };
        alphabet.updateSuccess(ch);
      } else if (wordleSet.has(ch)) {
        // Otherwise, check if guess char is a char in the wordle
        newRow[i] = { ...newRow[i], ch: ch, color: "almost" };
        alphabet.updateAlmost(ch);
      } else {
        // Otherwise, mark the character as 'never' possible
        newRow[i] = { ...newRow[i], ch: ch, color: "never" };
        alphabet.updateNever(ch);
      }
    }
    return newRow;
  };

  return {
    row,
    wordle,
    history,
    alphabet,
    status,
    newGame,
    submitGuess,
    handleBackspace,
    handleChar,
  } as const;
};

export default useGame;
