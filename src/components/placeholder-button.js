import React, { memo } from 'react';
import PropTypes from 'prop-types';

function PlaceholderButton({ name, itemKey, onClickHandler }) {
  const handleClick = () => onClickHandler(itemKey);
  return (
    <li onClick={handleClick} className="inline-block bg-gray-200 rounded-xl p-2 mx-1 uppercase text-sm font-semibold">{name}</li>
  );
}

PlaceholderButton.propTypes = {
  name: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};
const PlaceholderButtonMemo = memo(PlaceholderButton);
export default PlaceholderButtonMemo;
