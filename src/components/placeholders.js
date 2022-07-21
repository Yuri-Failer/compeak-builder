import React, {
  useEffect, useState,
} from 'react';
import Loader from './loader';
import { getPlaceholders } from '../server/data';
import PlaceholderButton from './placeholder-button';
import { useDataContext } from '../context/editor-context';

function createSubstituitionMap(items) {
  const result = {};
  Object.values(items).forEach((value) => {
    result[`[${value.name}]`] = value.example;
  });
  return { ...result };
}

export function splitText(text, index, addText) {
  const textArray = text.split('');
  textArray.splice(index, 0, addText);
  return textArray.join('');
}

function Placeholders() {
  const {
    text, setText, setSubstitutionsMap, inputRef,
  } = useDataContext();
  const [items, setItems] = useState({});
  useEffect(() => {
    const fetchPlaceholders = async () => {
      try {
        const placeholders = await getPlaceholders();
        setItems(placeholders);
        const subsMap = createSubstituitionMap(placeholders);
        setSubstitutionsMap(subsMap);
      } catch (e) {
        console.error('I caught fetch error from the fictional server', { e });
      }
    };
    fetchPlaceholders();
  }, [setSubstitutionsMap]);

  const onClickHandler = (key) => {
    if (Object.keys(items).length > 0) {
      const index = inputRef.current?.selectionStart || 0;
      setText(splitText(text, index, `[${items[key].name}]`));
      // return focus to input.
      inputRef.current.focus();
    }
  };
  return (
    <ul className="my-4">
      {Object.keys(items).length > 0
        ? Object.keys(items).map((key) => (<PlaceholderButton key={key} itemKey={key} name={items[key].name} onClickHandler={onClickHandler} />))
        : <Loader />}
    </ul>
  );
}

export default Placeholders;
