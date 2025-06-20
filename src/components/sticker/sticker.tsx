import { useRef, useState } from "react";
import Link from "next/link";
import { useDraggable, useExpand, useRandomPosition } from "./hooks";
import styles from "./sticker.module.css";
import { Props } from "./types";

export const Sticker = ({ imageUrl, title, path }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useRandomPosition(ref);
  useDraggable(ref);
  const { expand, collapse } = useExpand(ref);

  const onClick = () => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }

    setExpanded(currentValue => !currentValue);
  }

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
