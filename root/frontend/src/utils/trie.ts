// Trie DS for efficient word searches (used in Challenge.tsx)
// We could use classes here instead, but I want to learn/use "closures"
// Unlike other languges where memory is deallocated after a function call,
// in JS, functions can create it's own lexical scope and persist it's state

const NUM_SUGGESTIONS = 7;

interface TrieNodeType {
  children: Map<string, TrieNodeType>;
  isWord: boolean;
  suggestions: string[];
  insertSuggestion: (word: string) => void;
}

const TrieNode = () => {
  const children = new Map<string, TrieNodeType>();
  const isWord = false;
  const suggestions: string[] = [];

  const insertSuggestion = (word: string) => {
    if (suggestions.length < NUM_SUGGESTIONS) suggestions.push(word);
  };

  return {
    children,
    isWord,
    suggestions,
    insertSuggestion,
  };
};

const Trie = (words: string[] = []) => {
  // Insert a word to the Trie
  const insert = (word: string): void => {
    word = word.toLowerCase();
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) {
        node.children.set(word[i], TrieNode());
      }
      node = node.children.get(word[i])!;
      node.insertSuggestion(word);
    }
    length += 1;
    node.isWord = true;
  };

  // Check if a word exists in the Trie
  const has = (word: string): boolean => {
    word = word.toLowerCase();
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) return false;
      // Asserts TS that this will never be null with ! operator
      node = node.children.get(word[i])!;
    }
    return node.isWord;
  };

  // Get suggestions for a subword (eg. "he" may give "hello", "heart", "heros")
  const getSuggestions = (subword: string): string[] => {
    subword = subword.toLowerCase();
    let node = root;
    for (let i = 0; i < subword.length; i++) {
      // Can't find any suggestions, just return empty array
      if (!node.children.has(subword[i])) return [];
      // Keep traversing the Trie until we cover the subword
      node = node.children.get(subword[i])!;
    }
    return node.suggestions;
  };

  const getLength = (): number => length;

  // Constructor: Initialize Trie with default words if any
  const root = TrieNode();
  let length = 0;
  words.forEach((word) => insert(word));

  return {
    insert,
    has,
    getLength,
    getSuggestions,
  };
};

export { Trie };
