import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDraggable, useExpand, useRandomPosition } from "./hooks";
import styles from "./sticker.module.css";
import { Props } from "./types";

export const Sticker = ({ imageUrl, title, path, width, height }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useRandomPosition(ref, { skip: !isLoaded });
  useDraggable(ref);
  const { onClick } = useExpand(ref);

  return (
    <div ref={ref} className={styles["sticker"]}>
      {
        path ? 
        <Link href={path} className={styles['sticker-link']}>
          <Image
            src={imageUrl}
            alt={title}
            className={styles['image']}
            width={width}
            height={height}
            placeholder="blur"
            blurDataURL={`/_next/image?url=${imageUrl}&w=16&q=10`}
            onLoad={() => {
              setIsLoaded(true);
            }}
          />
        </Link>
        : 
          <button className={styles['sticker-link']} onClick={onClick}>
            <Image
              src={imageUrl}
              alt={title}
              className={styles['image']}
              width={width}
              height={height}
              placeholder="blur"
              blurDataURL={`/_next/image?url=${imageUrl}&w=16&q=10`}
              onLoad={() => {
                setIsLoaded(true);
              }}
            />
          </button>
      }
    </div>
  );
};
