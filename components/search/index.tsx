import OriginSearch from './search'
import Option from './option'
export * from './interface'

export type SearchProps = typeof OriginSearch & {
  Option: typeof Option
}

const Search = OriginSearch as SearchProps
Search.Option = Option

export default Search
