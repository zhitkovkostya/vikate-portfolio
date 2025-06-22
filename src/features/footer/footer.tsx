import Link from "next/link"
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <span className={styles['social']}>
        <Link className={styles['social-link']} href="https://vikatkacheva.notion.site/74e073d752d84cda979922c8aa03a9d4" target="_blank">
          cv
        </Link>
      </span>
      <span className={styles['social']}>
        <Link className={styles['social-link']} href="https://www.behance.net/tkchv" target="_blank">
          беханс
        </Link>
      </span>
      <span className={styles['social']}>
        <Link className={styles['social-link']} href="https://t.me/tkchv" target="_blank">
          телеграм
        </Link>
      </span>
      <span className={styles['social']}>
        <Link className={styles['social-link']} href="mailto:tkchv@bk.ru" target="_blank">
          почта
        </Link>
      </span>
    </footer>
  );
}