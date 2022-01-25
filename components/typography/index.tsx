import OriginTypography from './typography'
import Title from './title'
import Text from './text'
import Paragraph from './paragraph'
// export * from './typography'
export type TypographyProps = typeof OriginTypography & {
  Title: typeof Title
  Text: typeof Text
  Paragraph: typeof Paragraph
}
const Typography = OriginTypography as TypographyProps
Typography.Title = Title
Typography.Text = Text
Typography.Paragraph = Paragraph

// export { Title }'
export default Typography
