import Link from "next/link"
import styles from './header.module.css';

export const Header = ({siteTitle, pageTitle}: {siteTitle: string, pageTitle: string}) => {
  return (
    <header className={styles['header']}>
      <h1 className={styles['logo']}>
        <Link className={styles['logo-link']} href="/">
          {siteTitle}
        </Link>
      </h1>
      <h2 className={styles['page-title']}>{pageTitle}</h2>
    </header>
  );
}