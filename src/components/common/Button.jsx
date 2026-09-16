import { Link } from 'react-router-dom'

export default function Button({ href, to, children, variant = 'primary', className = '', ...props }) {
  const cls = `btn btn-${variant} ${className}`.trim()
  const dest = to || href

  if (dest) {
    const isExternal = /^https?:\/\//.test(dest)
    if (isExternal) {
      return (
        <a href={dest} className={cls} target="_blank" rel="noreferrer" {...props}>
          <span>{children}</span>
        </a>
      )
    }
    return (
      <Link to={dest} className={cls} {...props}>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button className={cls} {...props}>
      <span>{children}</span>
    </button>
  )
}
