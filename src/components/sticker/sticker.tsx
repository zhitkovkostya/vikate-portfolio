import Image from "next/image";
import styles from "./sticker.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useRef } from "react";
import Link from "next/link";

type Props = {
  imageUrl: string;
  title: string;
  path: string;
};

gsap.registerPlugin(useGSAP, Draggable);

export const Sticker = ({ imageUrl, title, path }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (ref.current) {
      const imageWidth = ref.current.clientWidth;
      const imageHeight = ref.current.clientHeight;
      const containerWidth = window.screen.width;
      const containerHeight = window.screen.height;

      const maxX = ((containerWidth - imageWidth) / containerWidth) * 100;
      const maxY = ((containerHeight - imageHeight) / containerHeight) * 100;

      const positionX = gsap.utils.random(0, maxX);
      const positionY = gsap.utils.random(0, maxY);

      gsap.to(ref.current, {
        duration: 0.15,
        x: 0,
        y: 0,
        top: `${positionY}%`,
        left: `${positionX}%`,
      });

      Draggable.create(ref.current, {
        inertia: true,
        bounds: '#main',
        allowContextMenu: true,
        dragResistance: 0.1,
      });
    }
  });

  return (
    <div ref={ref} className={styles["project-item"]}>
      <Link href={path}>
        <img
          src={imageUrl}
          alt={title}
          style={{ maxWidth: 300, maxHeight: 300 }}
        />
      </Link>
    </div>
  );
};
