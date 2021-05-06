/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  let arrayPath = path.split('.')
  
  return function(obj) {
    
    function recurs(obj, key) {
      if (typeof obj[key] === 'undefined') return undefined;
      if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        return obj[key]
      } else {
        arrayPath.shift()
        return recurs(obj[key], arrayPath[0])
      }
      
    }
    return recurs(obj, arrayPath[0])
  } 
}
