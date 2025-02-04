import styles from "./page.module.css"
import useEditorContext from "./Context";

function Preview() {

    const { text } = useEditorContext();

    function formatText(text: string) {

        const m = text.split('\n').map((word, idx) => {
            let i=0; while(word[i++]=='*');
            return(
                <div key={idx}
                    style={{ fontSize: 10*i + "px" }}
                >{word.substring(i ? i-1 : 0)}</div>
            )
        });

        return ( <div>{m}</div> )

    }

    return (
        <div className={styles.preview}>
            <div className={styles.heading}>Podgląd</div>
                {formatText(text.current)}
        </div>
    )
}

export default Preview;