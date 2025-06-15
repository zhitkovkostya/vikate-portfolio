import { useEffect, useRef, useState } from "react";
import Link from "next/link"
import { useRouter } from "next/router";
import styles from './header.module.css';
import { Props } from "./types";
import { useOnClickOutside } from "./hooks";

export const Header = ({siteTitle, pageTitle, menuItems}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  const handleClick = () => setIsMenuOpen(currentState => !currentState);
  
  const handleClickOutside = () => setIsMenuOpen(false);
  
  useOnClickOutside(navRef, handleClickOutside);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router])

  return (
    <header className={`${styles['header']} ${isMenuOpen ? styles['header--with-menu'] : ''}`}>
      <h1 className={styles['logo']}>
        <Link className={styles['logo-link']} href="/">
          {siteTitle}
        </Link>
      </h1>
      <div>
      <h2 className={styles['page-title']}>{pageTitle}</h2>
      </div>
      <nav ref={navRef} role="navigation" aria-label="Main menu" className={styles['menu']}>
        <button
          className={styles['menu-button']}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          onClick={handleClick}
        >
          <span className={styles['menu-label']}>
            {isMenuOpen ? 'закрыть' : 'меню'}
          </span>
          <svg
            className={styles['menu-icon']}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
          </svg>
        </button>
        <ul className={`${styles['menu-list']} ${isMenuOpen ? styles['menu-list--open'] : ''}`}>
          {menuItems.map((menuItem, index) => (
            <li className={styles['menu-item']} key={index}>
              <Link href={menuItem.path} className={styles['menu-link']}>{menuItem.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}