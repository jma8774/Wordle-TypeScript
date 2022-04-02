export const MAX_GUESSES = 6;
export const WORDLE_LEN = 5;
// set of letters from 'a' to 'z'
export const KEYS = new Set();
for (let i = 0; i < 26; i++) {
  KEYS.add(String.fromCharCode("a".charCodeAt(0) + i));
}
