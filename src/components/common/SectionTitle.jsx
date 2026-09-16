export default function SectionTitle({ as: Tag = 'h2', children, style }) {
  return <Tag style={style}>{children}</Tag>
}
