import { useState } from 'react';

export const useArray = <T extends any>(initial: T[] = []) => {
  const [data, setData] = useState(initial)
  
  const push = (element: T) => {
    setData([...data, element])
  };

  const remove = (index: number) => {
    setData(data.filter((_, i) => i !== index))
  };

  const isEmpty = (): boolean => data.length === 0;

  return { data, useArray, push, remove, isEmpty } as const
}