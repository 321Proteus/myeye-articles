'use client'

import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { ContextProvider } from "./components/Context";
import styles from "./components/page.module.css";

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
