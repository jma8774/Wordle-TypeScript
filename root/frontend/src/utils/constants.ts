const MAX_GUESSES = 6;
const WORDLE_LEN = 5;
// set of letters from 'a' to 'z'
const KEYS = new Set<string>();
for (let i = 0; i < 26; i++) {
  KEYS.add(String.fromCharCode("A".charCodeAt(0) + i));
}

export { MAX_GUESSES, WORDLE_LEN, KEYS };
