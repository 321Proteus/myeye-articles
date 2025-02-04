import styles from "./page.module.css"
import useEditorContext from "./Context";

function Preview() {

    const { text } = useEditorContext();

    return (
        <div className={styles.preview}>
            <div className={styles.heading}>Podgląd</div>
                {formatText(text.current)}
        </div>
    )
}

export default Preview;