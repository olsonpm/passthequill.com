const stringsToIgnore = [
  '/fes/',
  '(<anonymous>)',
  '(module.js:',
  'CallSite',
  'bootstrap_node.js:',
  'webpack:/webpack/bootstrap:',
]

process.on('uncaughtException', error => {
  error.stack = error.stack
    .split('\n')
    .filter(notIncludedInAny(stringsToIgnore))
    .map(removeNoisyFilepathPrefix)
    .join('\n')

  // eslint-disable-next-line no-console
  console.error(error.stack)
})

function removeNoisyFilepathPrefix(line) {
  return line
    .replace(/^.*passthequill.com\/webpack:/, '')
    .replace(/^ +at Object\.<anonymous> \(.*passthequill\.com/, '')
    .replace(/^\//, '  at ')
    .replace(/:1\)$/, '')
}

function notIncludedInAny(arrayOfStrings) {
  return string => {
    for (const testString of arrayOfStrings) {
      if (string.includes(testString)) return false
    }
    return true
  }
}
