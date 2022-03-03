import { useState, useEffect, useRef } from 'react';
import { useArray } from './useArray';
import { useAlphabet } from './useAlphabet';
import { useLog } from './useLog';

// Returns random integer from [a, b]
const randomInt = (start: number, end: number): number => {
  return start + Math.floor(Math.random() * (end - start + 1))
}

interface CharColor {
  ch: string
  color: string
}

export const useGame = () => {
  const [guesses, setGuesses] = useState<number>(6)
  const [wordle, setWordle] = useState<string>('')
  const alphabet = useAlphabet()
  const history = useArray<CharColor[]>([])
  const [status, setStatus] = useState<string>('ongoing')
  const answers = useRef<string[]>([])
  const words = useRef<Set<string>>(new Set())

  useLog('history: ', history.data)

  useEffect(() => {
    // Function to read my text file from the 'public' folder
    const parseTextFile = (filename: string): Promise<string[]> => {
      return fetch(`${process.env.PUBLIC_URL}/${filename}`)
      .then((res) => res.text())
      .then((text) => {
        return text.split('\n')
      })
    }

    // Parse 2 textfiles for possible answers + possible word guesses
    const fetchWords = async (): Promise<void> => {
      const answersArr = await parseTextFile('answers.txt')
      const wordsArr = await parseTextFile('words.txt')
      answers.current = answersArr
      words.current = new Set(wordsArr.concat(answersArr))
      newGame()
    }

    fetchWords()
  }, [])
  
  const newGame = (): void => {
    console.log("New game")
    setGuesses(6)
    const index = randomInt(0, answers.current.length)
    setWordle(answers.current[index])
  }

  const guessWord = (word: string): void => {
    if(!words.current.has(word) || status !== 'ongoing')
      return
    history.push(updateCharColors(word))
    setGuesses(guesses - 1)
    if(word === wordle) {
      setStatus('win')
    }
    else if(guesses-1 === 0) {
      setStatus('lose')
    }
  }

  // Input is the current guess
  // Will update the alphabet with green/yellow/black colors and display the new word after
  const updateCharColors = (word: string): CharColor[] => {
    let wordColors: CharColor[] = []
    let wordleSet = new Set(wordle)
    for(let i = 0; i < word.length; i ++) {
      const ch: string = word[i]
      if(ch === wordle[i]) {
        wordColors.push( { ch: ch, color: 'success' } )
        alphabet.updateSuccess(ch)
      }
      else if(wordleSet.has(ch)) {
        wordColors.push( { ch: ch, color: 'almost' } )
        alphabet.updateAlmost(ch)
      }
      else {
        wordColors.push( { ch: ch, color: 'never' } )
        alphabet.updateNever(ch)
      }
    }
    return wordColors
  }

  return { guesses, wordle, history, alphabet, status, newGame, guessWord } as const
}