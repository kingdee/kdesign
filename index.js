/* eslint no-console:0 */

function camelCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase())
}

const req = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.tsx?$/)
req.keys().forEach((mod) => {
  let v = req(mod)
  if (v && v.default) {
    v = v.default
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/)
  if (match && match[1]) {
    if (['message', 'notification', 'virtual-list'].includes(match[1])) {
      // need nextUI modify
      // message & notification should not be capitalized
      exports[match[1]] = v
    } else {
      exports[camelCase(match[1])] = v
    }
  }
})

module.exports = require('./components')
