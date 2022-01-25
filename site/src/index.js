const path = require('path')
const contentTmpl = './template/content/index'
function pickerGenerator(module) {
  const tester = module ? new RegExp(`^docs/${module}`) : new RegExp(`^docs`)
  return (markdownData) => {
    const { filename } = markdownData.meta
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      }
    }
    return null
  }
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true
    }
    return nodePath.endsWith('/demo') // 将demo下的所有md合为一个
  },
  pick: {
    components(markdownData) {
      // 只读取components下部分
      const { filename } = markdownData.meta
      if (!/^components/.test(filename) || /[/\\]demo$/.test(path.dirname(filename))) {
        return null
      }
      return {
        meta: markdownData.meta,
      }
    },
    'docs/guide': pickerGenerator('guide'),
    'docs/design': pickerGenerator('design'),
  },
  plugins: [
    'bisheng-plugin-description', // 抽取markdown文件的中间的description部分
    'bisheng-plugin-toc?maxDepth=2&keepElem', // 产生一个table,和下面的顺序不能换，会报错的！
    path.join(__dirname, '../', 'bisheng-plugin-kdesign'),
  ],
  routes: {
    path: '/',
    component: './template/layout/index',
    indexRoute: {
      component: './template/home/index',
    },
    childRoutes: [
      {
        path: 'components/:children',
        component: contentTmpl,
      },
      {
        path: 'docs/:children',
        component: contentTmpl,
      },
      {
        path: 'docs/design/:children',
        component: contentTmpl,
      },
      {
        path: 'docs/guide/:children',
        component: contentTmpl,
      },
    ],
  },
}
