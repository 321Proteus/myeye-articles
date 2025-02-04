import { useRef, useState } from "react";
import styles from "./page.module.css";
import useEditorContext from "./Context";

function Editor() {
    const editorRef = useRef<HTMLTextAreaElement | null>(null);
    const sliderRef = useRef<HTMLInputElement | null>(null);

    const docWidth = document.documentElement.clientWidth;
    const [editorWidth, setEditorWidth] = useState(docWidth * .4);
    const { text, update } = useEditorContext();

    const handleSliderInput = () => {
        const sliderValue = parseInt(sliderRef.current!.value);
        editorRef.current!.style.width = sliderValue + "px";
        setEditorWidth(docWidth * sliderValue / 100 * .45);
    }

    const handleEditorInput = () => {
        text.current = editorRef.current!.value;
        update();
    }

    return (
        <div className={styles.editor}>
            <div className={styles.heading}>Edytor</div>
            <input
                ref={sliderRef} type="range"
                min="0" max="100"
                className={styles["width-picker"]}
                onInput={handleSliderInput}
            />
            <textarea
                ref={editorRef}
                className={styles.textarea}
                style={{ width: editorWidth + "px" }}
                onInput={handleEditorInput}
            />
        </div>
    );
}

export default Editor;
