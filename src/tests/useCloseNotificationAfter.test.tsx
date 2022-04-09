import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import useCloseNotificationAfter from "../hooks/useCloseNotificationAfter";

describe("Do callback after seconds", () => {
  it("Callback should be called after 500 ms", async () => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((f) => f());
    const mockFn = jest.fn();
    renderHook(() => useCloseNotificationAfter(true, mockFn, 500));
    await new Promise((r) => setTimeout(r, 600));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
