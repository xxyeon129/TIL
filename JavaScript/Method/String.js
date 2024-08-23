// str.indexOf(searchValue[, fromIndex])
'Developer'.indexOf('e'); // 1

/* lastIndexOf(searchString)
lastIndexOf(searchString, position) */
'Developer'.lastIndexOf('e'); // 7

// search(regexp)
'Developer'.search('l'); // 4

// str.charAt(index)
'Developer'.charAt(4); // ls

// charCodeAt(index)
'Developer'.charCodeAt(0); // 68 (Unicode value of 'D)
// codePointAt(index)
'Developer'.codePointAt(0); // 68 (Code point value of 'D')

/* startsWith(searchString)
startsWith(searchString, position) */
'Developer'.startsWith('D'); // true

/* endsWith(searchString)
endsWith(searchString, endPosition) */
'Developer'.endsWith('r'); // true

/* includes(searchString)
includes(searchString, position) */
'Developer'.includes('Dev'); // true

// str.match(regexp)
'Developer'.match(/[A-Z]/g); // ['D']
'Developer'.match(/[a-z]/g); // ['e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']

/* split();
split(separator);
split(separator, limit); */
'Developer'.split(''); // ['D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']

// str.concat(string2, string3[, ..., stringN])
'Developer'.concat('', 'Role'); // DeveloperRole

/* padStart(targetLength)
 padStart(targetLength, padString) */
'Developer'.padStart(10, '?'); // ?Developer
// str.padEnd(targetLength [, padString])
'Developer'.padEnd(12, '!'); // Developer!!!

// str.repeat(count)
'Developer'.repeat(2); // DeveloperDeveloper

// replace(pattern, replacement)
'Developer'.replace('e', 'x'); // Dxveloper

/* slice(indexStart)
slice(indexStart, indexEnd) */
'Developer'.slice(2, 5); // vel

// str.substring(indexStart[, indexEnd])
'Developer'.substring(3, 6); // elo

'Developer'.toLowerCase(); // developer
/* toLocaleLowerCase()
toLocaleLowerCase(locales) */
'Developer'.toLocaleLowerCase(); // developer

'Developer'.toUpperCase(); // DEVELOPER
/* toLocaleUpperCase()
toLocaleUpperCase(locales) */
'Developer'.toLocaleUpperCase(); // DEVELOPER

' Developer '.trim(); // Developer
' Developer '.trimStart(); // "Developer "
' Developer '.trimEnd(); // " Developer"
