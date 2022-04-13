import reducer, {
  KeyboardState,
  initAlphabet,
  resetKeyboard,
  keyboardSubmit,
} from "../redux/features/keyboard/keyboardSlice";

describe("init state", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({
      keyboard: initAlphabet(),
    });
  });
});

describe("reset state", () => {
  it("should reset the initial state", () => {
    const previouState: KeyboardState = {
      keyboard: initAlphabet(),
    };
    previouState.keyboard.a = "success";
    expect(reducer(previouState, resetKeyboard())).toEqual({
      keyboard: initAlphabet(),
    });
  });
});

describe("submit guess", () => {
  it("all characters should be green with wordle: 'hello' and curGuess: 'hello'", () => {
    const previouState: KeyboardState = {
      keyboard: initAlphabet(),
    };
    expect(
      reducer(
        previouState,
        keyboardSubmit({ wordle: "hello", curGuess: "hello" })
      )
    ).toEqual({
      keyboard: {
        ...initAlphabet(),
        h: "success",
        e: "success",
        l: "success",
        o: "success",
      },
    });
  });
  it("some yellow and some black with wordle: 'abcde' and curGuess: 'bzzzz'", () => {
    const previouState: KeyboardState = {
      keyboard: initAlphabet(),
    };
    expect(
      reducer(
        previouState,
        keyboardSubmit({ wordle: "abcde", curGuess: "bzzzzz" })
      )
    ).toEqual({
      keyboard: {
        ...initAlphabet(),
        b: "almost",
        z: "never",
      },
    });
  });
});
