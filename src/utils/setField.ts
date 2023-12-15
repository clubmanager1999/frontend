import { Dispatch, SetStateAction } from 'react';

export function useSetField<T>(setter: Dispatch<SetStateAction<T>>) {
  return (key: keyof T, value: unknown) =>
    setter((obj) => ({ ...obj, ...{ [key]: value } }));
}
