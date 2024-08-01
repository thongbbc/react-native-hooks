import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

function useAppState(
  callback: (status: AppStateStatus, isMount?: boolean) => void
) {
  const savedCallback =
    useRef<(status: AppStateStatus, isMount?: boolean) => void>();
  const appState = useRef<AppStateStatus>('active');
  const isMount = useRef<boolean>(true);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function onAppStateChange(nextAppState: AppStateStatus) {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        isMount.current = true;
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive/)
      ) {
        isMount.current = false;
      }
      appState.current = nextAppState;
      savedCallback.current &&
        savedCallback.current(nextAppState, isMount.current);
    }
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);
}

export default useAppState;
