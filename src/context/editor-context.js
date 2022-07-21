import {
  createContext, useContext, useState, useMemo, createRef,
} from 'react';

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [text, setText] = useState('');
  const [substitutionsMap, setSubstitutionsMap] = useState([]);
  const inputRef = createRef();

  const value = useMemo(() => ({
    text,
    setText,
    substitutionsMap,
    setSubstitutionsMap,
    inputRef,
  }), [text, substitutionsMap, inputRef]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
