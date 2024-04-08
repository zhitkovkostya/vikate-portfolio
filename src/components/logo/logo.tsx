import Image from "next/image";
import logoImage from "@/assets/images/logo2.png";
import styles from "./logo.module.css";

export const Logo = () => (
  <Image
    src={logoImage}
    alt="Logo image"
    width={640}
    height={164}
    className={styles.logo}
  />
);
