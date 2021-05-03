/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrayStrings = [...arr];
  if (param === 'asc') {
    return arrayStrings.sort((a, b) => a.localeCompare(b, 'ru-RU-u-kf-upper'))
  }
  return arrayStrings.sort((a, b) => a.localeCompare(b, 'ru-RU-u-kf-upper')).reverse()
}
