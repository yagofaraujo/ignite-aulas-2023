import styles from './Avatar.module.css'

export function Avatar({hasBorder = true, src}) {
  return (
    <img 
      className={hasBorder !== false ? styles.avatarWithBorder : styles.avatar}
      src={src}
    />
  )
}