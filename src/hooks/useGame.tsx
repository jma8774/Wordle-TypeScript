import { useState, useEffect, useRef } from 'react';
import { useArray } from './useArray';

// Returns random integer from [a, b]
const randomInt = (start: number, end: number): number => {
  return start + Math.floor(Math.random() * (end - start + 1))
}

export const useGame = () => {
  const [guesses, setGuesses] = useState<number>(5)
  const [wordle, setWordle] = useState<string>('')
  const history = useArray<string>([])
  const [status, setStatus] = useState<string>('ongoing')
  const answers = useRef<string[]>([])
  const words = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Function to read my text file from the 'public' folder
    const fetchWords = (filename: string): Promise<string[]> => {
      return fetch(`${process.env.PUBLIC_URL}/${filename}`)
      .then((res) => res.text())
      .then((text) => {
        return text.split('\n')
      })
    }
    // Fetch words from answers.txt and pick a random one as the wordle after promise is resolved
    fetchWords('answers.txt')
    .then((text) => {
      answers.current = text
      newGame()
    })
    // Fetch words from words.txt
    fetchWords('words.txt')
    .then((text) => {
      words.current = new Set(text.concat(answers.current))
    })
  }, [])
  
  const newGame = (): void => {
    console.log("New game")
    setGuesses(5)
    const index = randomInt(0, answers.current.length)
    setWordle(answers.current[index])
  }

  const guessWord = (word: string): void => {
    if(!words.current.has(word) || status !== 'ongoing')
      return
    history.push(word)
    console.log(word === wordle ? "Correct guess" : "Wrong guess")
    setGuesses(guesses - 1)
    if(word === wordle) {
      setStatus('win')
    }
    else if(guesses-1 === 0) {
      setStatus('lose')
    }
  }

  return { guesses, wordle, history, status, newGame, guessWord } as const
}