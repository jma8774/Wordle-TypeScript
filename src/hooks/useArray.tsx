import { useState } from 'react';

// Purpose of this hook is to mimic normal arrays, this allows us to 'mutate' our state which we otherwise wouldn't be able to in React
export const useArray = <T extends any>(initial: T[] = []) => {
  const [data, setData] = useState(initial)

  // Can push to the data like normally when not using React
  const push = (element: T) => {
    setData([...data, element])
  };

  // Can remove from index of the data like normally when not using React
  const remove = (index: number) => {
    setData(data.filter((_, i) => i !== index))
  };

  const isEmpty = (): boolean => data.length === 0;

  const reset = (): void => setData([]);

  return { data, useArray, push, remove, reset, isEmpty } as const
}