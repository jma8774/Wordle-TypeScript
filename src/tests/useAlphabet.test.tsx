import {act, renderHook} from '@testing-library/react-hooks'
import { useAlphabet } from '../hooks/useAlphabet';

describe("Initialize alphabet object", () => {
  const { result } = renderHook(() => useAlphabet())
  it('should contain a: init', () => {
    expect(result.current.alphabet['a']).toBe('init')
  })
  it('should contain z: init', () => {
    expect(result.current.alphabet['z']).toBe('init')
  })
  it('has a length of 26', () => {
    expect(Object.keys(result.current.alphabet).length).toBe(26)
  })
})


describe("Update status", () => {
  it('should update a to success', () => {
    const { result } = renderHook(() => useAlphabet())
    act(() => {
      result.current.updateSuccess('a')
    })
    expect(result.current.alphabet['a']).toBe('success')
  })
  it('should update b to almost', () => {
    const { result } = renderHook(() => useAlphabet())
    act(() => {
      result.current.updateAlmost('b')
    })
    expect(result.current.alphabet['b']).toBe('almost')
  })
  it('should update c to never', () => {
    const { result } = renderHook(() => useAlphabet())
    act(() => {
      result.current.updateNever('c')
    })
    expect(result.current.alphabet['c']).toBe('never')
  })
  it('should update d to success then stay success after calling updateAlmost or updateNever', () => {
    const { result } = renderHook(() => useAlphabet())
    act(() => {
      result.current.updateSuccess('d')
    })
    act(() => {
      result.current.updateNever('d')
    })
    act(() => {
      result.current.updateAlmost('d')
    })
    expect(result.current.alphabet['d']).toBe('success')
  })
})