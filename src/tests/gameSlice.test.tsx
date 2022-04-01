import reducer, {
  GameState,
  resetGame,
  changeStatus,
  updateWordle,
} from "../redux/features/game/gameSlice";

describe("init state", () => {
  it("should return the initial state", () => {
    expect(
      reducer(undefined, {
        type: undefined,
      })
    ).toEqual({
      status: "ongoing",
      wordle: "",
    });
  });
});

describe("reset state", () => {
  it("should return the initial state (status = 'win')", () => {
    const previousState: GameState = {
      status: "win",
      wordle: "hello",
    };
    expect(reducer(previousState, resetGame())).toEqual({
      status: "ongoing",
      wordle: "",
    });
  });
  it("should return the initial state (status = 'ongoing')", () => {
    const previousState: GameState = {
      status: "ongoing",
      wordle: "hello",
    };
    expect(reducer(previousState, resetGame())).toEqual({
      status: "ongoing",
      wordle: "",
    });
  });
  it("should return the initial state (status = 'lose')", () => {
    const previousState: GameState = {
      status: "lose",
      wordle: "hello",
    };
    expect(reducer(previousState, resetGame())).toEqual({
      status: "ongoing",
      wordle: "",
    });
  });
});

describe("update wordle", () => {
  it("wordle should be books", () => {
    const previousState: GameState = {
      status: "ongoing",
      wordle: "",
    };
    expect(reducer(previousState, updateWordle("books"))).toEqual({
      status: "ongoing",
      wordle: "books",
    });
  });
  it("wordle should be trees", () => {
    const previousState: GameState = {
      status: "lose",
      wordle: "hello",
    };
    expect(reducer(previousState, updateWordle("trees"))).toEqual({
      status: "lose",
      wordle: "trees",
    });
  });
});

describe("update status", () => {
  const previousState: GameState = {
    status: "ongoing",
    wordle: "",
  };
  it("status should be ongoing", () => {
    expect(reducer(previousState, changeStatus("ongoing"))).toEqual({
      status: "ongoing",
      wordle: "",
    });
  });
  it("status should be win", () => {
    expect(reducer(previousState, changeStatus("win"))).toEqual({
      status: "win",
      wordle: "",
    });
  });
  it("status should be lose", () => {
    expect(reducer(previousState, changeStatus("lose"))).toEqual({
      status: "lose",
      wordle: "",
    });
  });
});
