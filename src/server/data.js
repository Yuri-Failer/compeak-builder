import placeholders from './placeholdersData.json';

function withDelay(cb, ms) {
  return new Promise((resolve) => { setTimeout(() => { resolve(cb); }, ms); });
}

export const getPlaceholders = () => withDelay(placeholders, 1000);
