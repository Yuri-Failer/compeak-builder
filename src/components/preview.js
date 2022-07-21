import React from 'react';
import { useDataContext } from '../context/editor-context';

export default function Preview() {
  const { text, substitutionsMap } = useDataContext();
  // const map = {"[Country]": "israel", "[First Name]": "Ben" }
  const replaced = text.length > 0 && text.replace(/\[(?:\[??[^[]*?\])/g, (match) => (substitutionsMap[match]));
  return (
    <div className="my-2">
      <h3 className="text-blue-300 font-bold text-left">Preview</h3>
      <div className="whitespace-pre-wrap bg-blue-300 rounded-tl-none rounded-2xl min-h-[200px] p-4 text-white text-left font-semibold text-lg">{replaced}</div>
    </div>
  );
}
