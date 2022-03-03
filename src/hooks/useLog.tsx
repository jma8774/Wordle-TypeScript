import { useEffect } from 'react';

export const useLog = <T extends any>(name: string, data: T) => {
  useEffect(() => {
    console.log(name, data)
  }, [name, data])
}