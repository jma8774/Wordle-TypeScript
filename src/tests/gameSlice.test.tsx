import reducer, {
  GameState,
  resetGame,
  changeStatus,
  updateWordle,
} from "../redux/features/game/gameSlice";

const initState = {
  status: "ongoing",
  wordle: "",
  hintGiven: false,
};

describe("init state", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual(initState);
  });
});

describe("reset state", () => {
  it("should return the initial state (status = 'win')", () => {
    const previousState: GameState = {
      status: "win",
      wordle: "hello",
      hintGiven: false,
    };
    expect(reducer(previousState, resetGame())).toEqual(initState);
  });
  it("should return the initial state (status = 'ongoing')", () => {
    const previousState: GameState = {
      status: "ongoing",
      wordle: "hello",
      hintGiven: false,
    };
    expect(reducer(previousState, resetGame())).toEqual(initState);
  });
  it("should return the initial state (status = 'lose')", () => {
    const previousState: GameState = {
      status: "lose",
      wordle: "hello",
      hintGiven: false,
    };
    expect(reducer(previousState, resetGame())).toEqual(initState);
  });
});

describe("update wordle", () => {
  it("wordle should be books", () => {
    const previousState: GameState = {
      status: "ongoing",
      wordle: "",
      hintGiven: false,
    };
    expect(reducer(previousState, updateWordle("books"))).toEqual({
      ...previousState,
      wordle: "books",
    });
  });
  it("wordle should be trees", () => {
    const previousState: GameState = {
      status: "lose",
      wordle: "hello",
      hintGiven: false,
    };
    expect(reducer(previousState, updateWordle("trees"))).toEqual({
      ...previousState,
      wordle: "trees",
    });
  });
});

describe("update status", () => {
  const previousState: GameState = {
    status: "ongoing",
    wordle: "",
    hintGiven: false,
  };
  it("status should be ongoing", () => {
    expect(reducer(previousState, changeStatus("ongoing"))).toEqual({
      ...previousState,
      status: "ongoing",
    });
  });
  it("status should be win", () => {
    expect(reducer(previousState, changeStatus("win"))).toEqual({
      ...previousState,
      status: "win",
    });
  });
  it("status should be lose", () => {
    expect(reducer(previousState, changeStatus("lose"))).toEqual({
      ...previousState,
      status: "lose",
    });
  });
});
