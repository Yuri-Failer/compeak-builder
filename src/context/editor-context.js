import {
  createContext, useContext, useState, useMemo,
} from 'react';

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [text, setText] = useState([]);
  const [substitutionsMap, setSubstitutionsMap] = useState([]);

  // todo: add memoization.
  const appender = useMemo(() => (appendText) => {
    setText(`${text} ${appendText}`);
  }, [text]);
  const value = useMemo(() => ({
    text,
    setText,
    appender,
    substitutionsMap,
    setSubstitutionsMap,
  }), [text, appender, substitutionsMap]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
