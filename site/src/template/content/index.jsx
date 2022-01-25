import collect from 'bisheng/collect'
import Main from './main'

export default collect(async (nextProps) => {
  const { pathname } = nextProps.location
  const pageDataPath = pathname.split('/')
  const pageData = nextProps.utils.get(nextProps.data, pageDataPath)
  if (!pageData) {
    // eslint-disable-next-line no-throw-literal
    throw 404
  }
  const pageDataPromise = typeof pageData === 'function' ? pageData() : pageData.index()
  const demosFetcher = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo'])
  if (demosFetcher) {
    const [localizedPageData, demos] = await Promise.all([pageDataPromise, demosFetcher()])
    return { localizedPageData, demos }
  }
  return { localizedPageData: await pageDataPromise }
})(Main)
