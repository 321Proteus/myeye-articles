import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import useEditorContext from "./Context";

function Editor() {

    const sliderRef = useRef<HTMLInputElement | null>(null);

    const docWidth = document.documentElement.clientWidth;
    const [editorWidth, setEditorWidth] = useState(docWidth * .4);
    const { editor } = useEditorContext();

    useEffect(() => {
        const textarea = editor.current!;
        const slider = sliderRef.current!;

        // textarea.oninput = () => {
        //     text.current = textarea.value;
        // };

        slider.oninput = () => {
            const sliderValue = parseInt(slider.value);
            textarea.style.width = sliderValue + "px";
            setEditorWidth(docWidth * sliderValue / 100 * .45);
        };
    }, [docWidth, text]);

    return (
        <div className={styles.editor}>
            <div className={styles.heading}>Edytor</div>
            <input
                ref={sliderRef} type="range"
                min="0" max="100"
                className={styles["width-picker"]}
            />
            <textarea
                ref={editorRef}
                className={styles.textarea}
                style={{ width: editorWidth + "px" }}
            />
        </div>
    );
}

export default Editor;
