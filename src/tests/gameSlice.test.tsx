import reducer, {
  initialState as initState,
  GameState,
  resetGame,
  changeStatus,
  updateDefinition,
} from "../redux/features/game/gameSlice";

beforeEach(() => {
  jest.useFakeTimers();
});

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
  it("should return the initial state", () => {
    const previousState: GameState = {
      ...initState,
      status: "win",
      wordle: "hello",
      definition: "hello world",
      hintGiven: false,
    };
    expect(reducer(previousState, resetGame(""))).toEqual({
      ...initState,
      timeStart: new Date().getTime(),
    });
  });
});

describe("update status", () => {
  const previousState: GameState = {
    ...initState,
    status: "ongoing",
    wordle: "",
    definition: "",
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

describe("update definition", () => {
  const previousState: GameState = {
    ...initState,
    definition: "hello world",
  };
  it("definition should be bye world", () => {
    expect(reducer(previousState, updateDefinition("bye world"))).toEqual({
      ...previousState,
      definition: "bye world",
    });
  });
});
