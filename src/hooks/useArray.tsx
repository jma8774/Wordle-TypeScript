import { useState } from 'react';

// Purpose of this hook is to mimic normal arrays, this allows us to 'mutate' our state which we otherwise wouldn't be able to in React
export const useArray = <T extends any>(initial: T[] = []) => {
  const [data, setData] = useState(initial)

  // Can push to the data like normally when not using React
  const push = (element: T): void => {
    setData([...data, element])
  };

  // Can remove from index of the data like normally when not using React
  const remove = (index: number): void => {
    setData(data.filter((_, i) => i !== index))
  };

  // Update element at index with new element
  const update = (index: number, element: T): void => {
    if(index < 0 || index >= data.length)
      return
    setData((previousData) => 
      [...previousData.slice(0, index), element, ...previousData.slice(index+1, previousData.length)]
    )
  }

  const isEmpty = (): boolean => data.length === 0;

  const reset = (): void => setData([]);

  return { data, setData, useArray, push, remove, update, reset, isEmpty } as const
}