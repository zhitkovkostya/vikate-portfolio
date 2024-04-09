import Image from "next/image";
import styles from "./project-item.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/dist/Draggable";
import { useRef } from "react";
import Link from "next/link";
import { Sticker } from "../sticker";

type Props = {
  imageUrl: string;
  title: string;
  path?: string;
};

gsap.registerPlugin(useGSAP, Draggable);

export const ProjectItem = ({ imageUrl, title, path }: Props) => {
  return <Sticker imageUrl={imageUrl} title={title} path={path} />;
};
