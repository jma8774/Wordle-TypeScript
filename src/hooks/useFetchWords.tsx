import { useEffect, useRef } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateWordle } from "../redux/features/game/gameSlice";
import { randomInt } from "../utils/helper";

// Purpose of this hook is to mimic normal arrays, this allows us to 'mutate' our state which we otherwise wouldn't be able to in React
const useFetchWords = () => {
  const dispatch = useAppDispatch();
  const answers = useRef<string[]>([]);
  const words = useRef<Set<string>>(new Set());

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
      dispatch(updateWordle(answers.current[index]));
    });
  }, [dispatch]);

  return {
    answers,
    words,
  } as const;
};

export default useFetchWords;
