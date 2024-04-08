import Image from "next/image";
import styles from "./project-item.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type Props = {
  imageUrl: string;
  title: string;
};

gsap.registerPlugin(useGSAP);

export const ProjectItem = ({ imageUrl, title }: Props) => {
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

    console.log(title, positionX, positionY);

    gsap.to(ref.current || {}, {
      duration: 0.15,
      x: 0,
      y: 0,
      top: `${positionY}%`,
      left: `${positionX}%`,
    });
  });

  return (
    <div ref={ref} style={{ position: "absolute" }}>
      <Image
        src={imageUrl}
        width={200}
        height={200}
        alt={title}
        className={styles["project-item"]}
      />
    </div>
  );
};
