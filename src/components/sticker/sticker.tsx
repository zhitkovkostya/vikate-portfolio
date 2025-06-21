import { useRef } from "react";
import Link from "next/link";
import { useDraggable } from "./hooks";
import styles from "./sticker.module.css";
import { Props } from "./types";

export const Sticker = ({ imageUrl, title, path }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onClick } = useDraggable(ref);

  return (
    <div ref={ref} className={styles["sticker"]}>
      {
        path ? 
        <Link href={path} className={styles['sticker-link']}>
          <img
            src={imageUrl}
            alt={title}
            className={styles['image']}
          />
        </Link>
        : 
          <button className={styles['sticker-link']} onClick={onClick}>
            <img
              src={imageUrl}
              alt={title}
              className={styles['image']}
            />
          </button>
      }
    </div>
  );
};
