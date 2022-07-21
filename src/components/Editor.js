import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDataContext } from '../context/editor-context';

function Editor() {
  const { text, setText, inputRef } = useDataContext();
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleEmpty = () => { setText(''); };
  return (
    <div className="my-2">
      <div className="w-1/4 p-1 text-blue-500 text-lg rounded-t-md bg-gray-100 border-gray-300 border-t-2 border-r-2 border-l-2">Variant 1</div>
      <div className="relative">
        <button type="button" className="absolute right-4 top-4" onClick={handleEmpty}>
          <FaRegTrashAlt />
        </button>
        <textarea ref={inputRef} className="w-full p-4 border-2 border-gray-350 rounded-b-md" rows="6" onChange={handleChange} value={text}>Hello</textarea>
      </div>

      <div className="text-gray-500 font-semibold text-left">length: {text?.length || 0} chars</div>
    </div>
  );
}

export default Editor;
