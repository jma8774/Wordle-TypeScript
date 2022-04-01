import { WORDLE_LEN } from "../constants";
import reducer, {
  GuessesState,
  initGuesses,
  resetGuesses,
  handleBackspace,
  handleChar,
  handleSubmit,
} from "../redux/features/guesses/guessesSlice";

describe("init state", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({
      row: 0,
      col: 0,
      guesses: initGuesses(),
    });
  });
});

describe("reset guesses", () => {
  it("should return the initial state (all spaces)", () => {
    const previousState: GuessesState = {
      row: 5,
      col: 5,
      guesses: initGuesses(),
    };
    previousState.guesses[0][0] = { id: 0, ch: "a", color: "success" };
    expect(reducer(previousState, resetGuesses())).toEqual({
      row: 0,
      col: 0,
      guesses: initGuesses(),
    });
  });
});

describe("handle backspace", () => {
  it("delete character at guesses[0][0]", () => {
    const previousState: GuessesState = {
      row: 0,
      col: 1,
      guesses: initGuesses(),
    };
    previousState.guesses[0][0] = { id: 0, ch: "a", color: "init" };
    expect(reducer(previousState, handleBackspace())).toEqual({
      row: 0,
      col: 0,
      guesses: initGuesses(),
    });
  });
  it("should handle delete when no characters (won't downgrade row)", () => {
    const previousState: GuessesState = {
      row: 1,
      col: 0,
      guesses: initGuesses(),
    };
    expect(reducer(previousState, handleBackspace())).toEqual({
      row: 1,
      col: 0,
      guesses: initGuesses(),
    });
  });
  it("should handle delete last character on row", () => {
    const previousState: GuessesState = {
      row: 0,
      col: WORDLE_LEN,
      guesses: initGuesses(),
    };
    previousState.guesses[0][WORDLE_LEN - 1] = {
      id: WORDLE_LEN - 1,
      ch: "z",
      color: "init",
    };
    expect(reducer(previousState, handleBackspace())).toEqual({
      row: 0,
      col: WORDLE_LEN - 1,
      guesses: initGuesses(),
    });
  });
});

describe("handle char", () => {
  it("should inseret chat at [0][0]", () => {
    const previousState: GuessesState = {
      row: 0,
      col: 0,
      guesses: initGuesses(),
    };
    expect(reducer(previousState, handleChar("a"))).toEqual({
      row: 0,
      col: 1,
      guesses: initGuesses().map((row) =>
        row.map((item) =>
          item.id === 0
            ? { id: item.id, ch: "a", color: "init" }
            : { id: item.id, ch: item.ch, color: "init" }
        )
      ),
    });
  });
  it("should handle insert when row is full", () => {
    const previousState: GuessesState = {
      row: 0,
      col: WORDLE_LEN,
      guesses: initGuesses(),
    };
    expect(reducer(previousState, handleChar("a"))).toEqual({
      row: 0,
      col: WORDLE_LEN,
      guesses: initGuesses(),
    });
  });
});

describe("handle submit", () => {
  it("should handle wordle: 'hello', guess: 'hello'", () => {
    const previousState: GuessesState = {
      row: 0,
      col: WORDLE_LEN,
      guesses: initGuesses(),
    };
    previousState.guesses[0][0] = { id: 0, ch: "h", color: "init" };
    previousState.guesses[0][1] = { id: 1, ch: "e", color: "init" };
    previousState.guesses[0][2] = { id: 2, ch: "l", color: "init" };
    previousState.guesses[0][3] = { id: 3, ch: "l", color: "init" };
    previousState.guesses[0][4] = { id: 4, ch: "o", color: "init" };

    const expectedState: GuessesState = {
      row: 1,
      col: 0,
      guesses: initGuesses(),
    };
    expectedState.guesses[0][0] = { id: 0, ch: "h", color: "success" };
    expectedState.guesses[0][1] = { id: 1, ch: "e", color: "success" };
    expectedState.guesses[0][2] = { id: 2, ch: "l", color: "success" };
    expectedState.guesses[0][3] = { id: 3, ch: "l", color: "success" };
    expectedState.guesses[0][4] = { id: 4, ch: "o", color: "success" };
    expect(reducer(previousState, handleSubmit("hello"))).toEqual(
      expectedState
    );
  });

  it("should handle wordle: 'abcde', guess: 'bzzzz'", () => {
    const previousState: GuessesState = {
      row: 0,
      col: WORDLE_LEN,
      guesses: initGuesses(),
    };
    previousState.guesses[0][0] = { id: 0, ch: "b", color: "init" };
    previousState.guesses[0][1] = { id: 1, ch: "z", color: "init" };
    previousState.guesses[0][2] = { id: 2, ch: "z", color: "init" };
    previousState.guesses[0][3] = { id: 3, ch: "z", color: "init" };
    previousState.guesses[0][4] = { id: 4, ch: "z", color: "init" };

    const expectedState: GuessesState = {
      row: 1,
      col: 0,
      guesses: initGuesses(),
    };
    expectedState.guesses[0][0] = { id: 0, ch: "b", color: "almost" };
    expectedState.guesses[0][1] = { id: 1, ch: "z", color: "never" };
    expectedState.guesses[0][2] = { id: 2, ch: "z", color: "never" };
    expectedState.guesses[0][3] = { id: 3, ch: "z", color: "never" };
    expectedState.guesses[0][4] = { id: 4, ch: "z", color: "never" };
    expect(reducer(previousState, handleSubmit("abcde"))).toEqual(
      expectedState
    );
  });
});
