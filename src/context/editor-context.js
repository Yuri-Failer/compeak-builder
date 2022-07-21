import {
  createContext, useContext, useState, useMemo, useCallback, useRef,
} from 'react';

export function splitText(text, index, addText) {
  const textArray = text.split('');
  textArray.splice(index, 0, addText);
  return textArray.join('');
}
export const DataContext = createContext(null);
export const ActionsContext = createContext(null);

export function DataProvider({ children }) {
  const [text, setText] = useState('');
  const [substitutionsMap, setSubstitutionsMap] = useState([]);
  const [length, setLength] = useState(0);
  const inputRef = useRef();

  function insertPlaceholder(addText) {
    const index = inputRef.current?.selectionStart || 0;
    const { value } = inputRef.current;
    setText(splitText(value, index, addText));
    // return focus to input.
    inputRef.current.focus();
  }
  const insertPlaceholderCB = useCallback(insertPlaceholder, [inputRef]);

  const actions = useMemo(() => ({
    insertPlaceholder: insertPlaceholderCB,
    setSubstitutionsMap,
  }), [insertPlaceholderCB]);
  const value = useMemo(() => ({
    text,
    setText,
    substitutionsMap,
    inputRef,
    length,
    setLength,
  }), [text, substitutionsMap, length]);
  return (
    <DataContext.Provider value={value}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
export const useActionContext = () => useContext(ActionsContext);
