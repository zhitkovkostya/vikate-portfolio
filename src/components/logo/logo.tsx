import Image from "next/image";
import logoImage from "@/assets/images/logo.png";
import styles from "./logo.module.css";

export const Logo = () => (
  <Image
    src={logoImage}
    alt="Logo image"
    width={640 / 2}
    height={252 / 2}
    className={styles.logo}
  />
);
