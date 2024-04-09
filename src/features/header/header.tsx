import Link from "next/link"
import styles from './header.module.css';

export const Header = ({pageTitle}: {pageTitle: string}) => {
  return (
    <header className={styles['header']}>
      <h1 className={styles['logo']}>
        <Link className={styles['logo-link']} href="/">
          викатэ
        </Link>
      </h1>
      <h2 className={styles['page-title']}>{pageTitle}</h2>
    </header>
  );
}