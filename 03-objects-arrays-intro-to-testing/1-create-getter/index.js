/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const arrayPath = path.split('.');
  
  return function(obj) {
    let i = 0;
    
    function getPropertyObject(obj, key) {
      if (typeof obj[key] === 'undefined') return;
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        return obj[key];
      } else {
        i++;
        return getPropertyObject(obj[key], arrayPath[i])
      }
      
    }
    return getPropertyObject(obj, arrayPath[i]);
  }; 
}
