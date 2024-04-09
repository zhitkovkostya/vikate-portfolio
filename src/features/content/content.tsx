import { PropsWithChildren } from "react";
import styles from './content.module.css';

export const Content = ({children}: PropsWithChildren) => (<div className={styles['content']}>{children}</div>)