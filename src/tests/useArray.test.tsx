import {act, renderHook} from '@testing-library/react-hooks'
import useArray from '../hooks/useArray';

describe("Initialize generic type array", () => {
  it('should generate string array', () => {
    const { result } = renderHook(() => useArray<string>(['a']))
    expect(result.current.data).toEqual(['a'])
  })
  it('should generate number array', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    expect(result.current.data).toEqual([1, 2, 3])
  })
  it('should generate boolean array', () => {
    const { result } = renderHook(() => useArray<boolean>([false, true]))
    expect(result.current.data).toEqual([false, true])
  })
})

describe("Test isEmpty", () => {
  it('should return true for empty', () => {
    const { result } = renderHook(() => useArray<string>([]))
    expect(result.current.isEmpty()).toBe(true)
  })
  it('should return false for not empty', () => {
    const { result } = renderHook(() => useArray<string>(['a']))
    expect(result.current.isEmpty()).toBe(false)
  })
})

describe("Test push", () => {
  it('should push 2 and 3', () => {
    const { result } = renderHook(() => useArray<number>([]))
    act(() => {
      result.current.push(2)
    })
    act(() => {
      result.current.push(3)
    })
    expect(result.current.data).toEqual([2, 3])
  })
})

describe("Test remove index", () => {
  it('should remove first item at index 0', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    act(() => {
      result.current.remove(0)
    })
    expect(result.current.data).toEqual([2, 3])
  })
  it('should remove last item at index 2', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    act(() => {
      result.current.remove(2)
    })
    expect(result.current.data).toEqual([1, 2])
  })
  it('should remove nonexistent index -1', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    act(() => {
      result.current.remove(-1)
    })
    expect(result.current.data).toEqual([1, 2, 3])
  })
  it('should remove empty array', () => {
    const { result } = renderHook(() => useArray<number>([]))
    act(() => {
      result.current.remove(0)
    })
    expect(result.current.data).toEqual([])
  })
})

describe("Reset array", () => {
  it('should reset the array to empty', () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]))
    act(() => {
      result.current.reset()
    })
    expect(result.current.data).toEqual([])
  })
})