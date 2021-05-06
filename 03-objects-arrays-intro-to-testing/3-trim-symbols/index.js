/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let pos = 0;
  let result = '';
  
  if (typeof size === 'undefined') {
    return string;
  }
  
  for (let i = 0; i < string.length; i++) {
    if (i !== string.length - 1 && string[i] !== string[i + 1]) {
      if ((i + 1) - pos <= size) {
        result = result + string.slice(pos, i + 1);
        pos = i + 1;
      } else {
        result = result + string.slice(pos, pos + size);
        pos = i + 1;
      }
    }
    
    if (i === string.length - 1) {
      result = result + string.slice(pos, pos + size )
    }
  }
  
  return result;
}
