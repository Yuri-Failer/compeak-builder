import React, {
  memo, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';
import { getPlaceholders } from '../server/data';
import PlaceholderButton from './placeholder-button';
import { useDataContext } from '../context/editor-context';

Placeholders.propTypes = {

};
function createSubstituitionMap(items) {
  const result = {};
  Object.values(items).forEach((value) => {
    result[`[${value.name}]`] = value.example;
  });
  return { ...result };
}

function Placeholders() {
  const { appender, setSubstitutionsMap } = useDataContext();
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
      const appendText = `[${items[key].name}]`;
      appender(appendText);
    }
  };
  return (
    <ul className="my-4">
      <button onClick={() => createSubstituitionMap(items)}>TEST</button>
      {Object.keys(items).length > 0
        ? Object.keys(items).map((key) => (<PlaceholderButton key={key} itemKey={key} name={items[key].name} onClickHandler={onClickHandler} />))
        : <Loader />}

    </ul>
  );
}

export default Placeholders;
