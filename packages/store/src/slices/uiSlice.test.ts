import { describe, expect, it } from "vitest";
import { toggleFocusMode, uiSlice } from "./uiSlice";

describe("uiSlice", () => {
  it("toggles focus mode", () => {
    const initial = uiSlice.getInitialState();
    const next = uiSlice.reducer(initial, toggleFocusMode());
    expect(next.focusMode).toBe(true);
    const back = uiSlice.reducer(next, toggleFocusMode());
    expect(back.focusMode).toBe(false);
  });
});
