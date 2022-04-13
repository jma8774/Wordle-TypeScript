import { act, renderHook } from "@testing-library/react-hooks";
import useWindowSize from "../hooks/useWindowSize";

describe("Initialize hook", () => {
  it("should return initial windowSize", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.height).toBe(global.innerHeight);
    expect(result.current.width).toBe(document.body.clientWidth);
  });
});

describe("React to Window resize", () => {
  it("should return initial windowSize", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.height).toBe(global.innerHeight);
    act(() => {
      global.innerHeight = 999;
      global.dispatchEvent(new Event("resize"));
    });
    expect(result.current.height).toBe(global.innerHeight);
  });
});
