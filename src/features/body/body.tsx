import { PropsWithChildren } from "react";
import styles from './body.module.css';

export const Body = ({children}: PropsWithChildren) => (<main className={styles['body']}>{children}</main>)