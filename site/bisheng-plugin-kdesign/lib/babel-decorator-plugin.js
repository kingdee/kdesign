Object.defineProperty(exports, '__esModule', { value: true })
const plugin_syntax_decorators_1 = require('@babel/plugin-syntax-decorators')
exports.default = () => {
  return {
    name: 'decorators',
    inherits: plugin_syntax_decorators_1.default,
    visitor: {},
  }
}
