/* eslint-disable react-hooks/exhaustive-deps */
import { debounce, type DebounceSettings } from 'lodash';
import { type DependencyList, useCallback } from 'react';
import useSavedCallback from './useSavedCallback';

type Func = (args: any) => any;
export default function useDebounceCallback<T extends Func>(
  func: T,
  dep: DependencyList = [],
  options?: DebounceSettings & { wait?: number }
) {
  const callback = useSavedCallback(func);
  return useCallback(
    debounce((args: any) => callback.current(args), options?.wait ?? 500, {
      trailing: true,
      ...options,
    }),
    dep
  );
}
