import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { newGame } from "../redux/thunkActions/toolbarActions";

const useFetchWords = () => {
  const dispatch = useAppDispatch();
  const answers = useRef<string[]>([]);
  const words = useRef<Set<string>>(new Set());
  const searchParams = useSearchParams()[0];

  // Function to read my text file from the 'public' folder on load
  useEffect(() => {
    // Ignore this useEffect run if answers/words are already populated
    if (answers.current.length) return;

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
      words.current = new Set([...wordsArr, ...answersArr]); // All possible words include answers + normal words
    };

    // Pick a random wordle after fetching our answers + all words
    fetchWords().then(() => {
      let challengeWord;
      try {
        challengeWord = window.atob(searchParams.get("word") || "");
      } catch (e) {
        console.log(
          "Error decoding base64 Wordle: a random Wordle will be chosen instead"
        );
      }
      if (challengeWord && answers.current.includes(challengeWord)) {
        dispatch(newGame(answers.current, true, challengeWord));
      } else {
        dispatch(newGame(answers.current, true));
      }
    });
  }, [dispatch, searchParams]);

  return {
    answers,
    words,
  } as const;
};

export default useFetchWords;
