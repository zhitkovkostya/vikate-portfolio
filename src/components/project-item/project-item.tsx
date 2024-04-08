import Image from "next/image";
import styles from "./project-item.module.css";
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

export const ProjectItem = ({ imageUrl, title, path }: Props) => {
  const ref = useRef(null);

  useGSAP(() => {
    const imageWidth = 300;
    const imageHeight = 300;
    const containerWidth = 1000;
    const containerHeight = 1000;

    const maxX = ((containerWidth - imageWidth) / containerWidth) * 100;
    const maxY = ((containerHeight - imageHeight) / containerHeight) * 100;

    const positionX = gsap.utils.random(0, maxX);
    const positionY = gsap.utils.random(0, maxY);

    gsap.to(ref.current || {}, {
      duration: 0.15,
      x: 0,
      y: 0,
      top: `${positionY}%`,
      left: `${positionX}%`,
    });

    Draggable.create(ref.current, {
      inertia: false,
      bounds: "#main",
      activeCursor: "grab",
      allowContextMenu: true,
      dragResistance: 0.1,
    });
  });

  return (
    <Link
      ref={ref}
      href={path}
      style={{ position: "absolute" }}
      className={styles["project-item"]}
    >
      <Image src={imageUrl} width={200} height={200} alt={title} />
    </Link>
  );
};
