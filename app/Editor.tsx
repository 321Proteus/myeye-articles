import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css"
import useEditorContext from "./Context";

function Editor() {

    const editorRef = useRef<HTMLTextAreaElement | null>(null);
    const sliderRef = useRef<HTMLInputElement | null>(null);

    const docWidth = document.documentElement.clientWidth

    const [editorWidth, setEditorWidth] = useState(docWidth * .4)
    const { text } = useEditorContext();

    useEffect(() => {

        const textarea = editorRef.current!
        const slider = sliderRef.current!

        textarea.oninput = () => {
            text.current = textarea.value;
        }
        slider.oninput = () => {
            textarea.style.width = slider.value;
            console.log(parseInt(slider.value));
            setEditorWidth(docWidth * parseInt(slider.value) / 100);
        }
    })

    return (
        <div className={styles.editor}>

            <div className={styles.heading}>Edytor</div>
            <input
                ref={sliderRef}
                width={editorWidth}
                type="range"
                className={styles["width-picker"]}
            ></input>

            <textarea
                ref={editorRef}
                className={styles.textarea}
            >

            </textarea>
        </div>
    )
}

export default Editor;