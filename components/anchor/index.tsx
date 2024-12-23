import OriginAnchor, { AnchorProps } from './anchor'
import AnchorLink, { AnchorLinkProps } from './anchor-link'

export type OriginAnchorProps = typeof OriginAnchor & {
  Link: typeof AnchorLink
}
const Anchor = OriginAnchor as OriginAnchorProps
Anchor.Link = AnchorLink
export default Anchor
export { AnchorProps, AnchorLinkProps }
