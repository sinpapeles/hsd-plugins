import { useLocalStorage } from 'react-use';

const STORAGE_KEY = 'preferences';

interface Preferences {
  currency: string;
}

const defaultPreferences: Preferences = {
  currency: 'USD',
};

type SetPref = (key: keyof Preferences, value: string) => void;

export const usePreferences = (): [Preferences, SetPref] => {
  const [pref, setPref] = useLocalStorage<Preferences>(
    STORAGE_KEY,
    defaultPreferences
  );

  const set: SetPref = (key, value) => {
    const newPref = { ...pref!, [key]: value };
    setPref(newPref);
  };

  return [pref!, set];
};
