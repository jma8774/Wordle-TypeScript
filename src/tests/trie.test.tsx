import { Trie } from "../utils/trie";

describe("init Trie", () => {
  it("should return an empty Trie", () => {
    const trie = Trie();
    expect(trie.getLength()).toBe(0);
  });
});

describe("insert word", () => {
  it("should return length 1 after insert", () => {
    const trie = Trie();
    trie.insert("hello");
    expect(trie.getLength()).toBe(1);
  });
});

describe("has word", () => {
  const trie = Trie();
  trie.insert("hello");
  it("should return true 'hello' exist", () => {
    expect(trie.has("hello")).toBe(true);
  });
  it("should return false 'hell' does not exist", () => {
    expect(trie.has("hell")).toBe(false);
  });
  it("should return false '' does not exist", () => {
    expect(trie.has("")).toBe(false);
  });
  it("should return false 'heart' does not exist", () => {
    expect(trie.has("heart")).toBe(false);
  });
});

describe("has suggestions", () => {
  const trie = Trie();
  trie.insert("hello");
  trie.insert("heart");
  trie.insert("heros");
  trie.insert("youth");
  it("should return suggestions for 'h'", () => {
    expect(trie.getSuggestions("h")).toEqual(["hello", "heart", "heros"]);
  });
  it("should return suggestions for 'hell'", () => {
    expect(trie.getSuggestions("hell")).toEqual(["hello"]);
  });
  it("should return suggestions for ''", () => {
    expect(trie.getSuggestions("")).toEqual([]);
  });
  it("should return suggestions for 'you'", () => {
    expect(trie.getSuggestions("you")).toEqual(["youth"]);
  });
});
