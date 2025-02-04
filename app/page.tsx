'use client'

import Editor from "./Editor";
import Preview from "./Preview";
import { ContextProvider } from "./Context";
import styles from "./page.module.css";

export default function CanvasSpace() {

  return (
    <ContextProvider>
      <div className={styles.page}>
        <Editor />
        <Preview />
      </div>
    </ContextProvider>

  );
}
