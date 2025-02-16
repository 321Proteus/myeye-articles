import styles from "../components/page.module.css"
import decorateLine from "./TextDecoration";

export function formatText(text: string) {

    const m = text.split('\n').map((word, idx) => {

        let el;

        let i=0; while(word[i++]=='#'); i--;
        const linia = word[word.length - 1] == '\\';

        const sformatowany = word.substring(0, linia ? word.length - 1 : word.length)

        if (!i) {
            el = (
                <span key={idx}
                className={styles["preview-text"]}
            >   
                {decorateLine(sformatowany)}
                {linia && <br />}
            </span>
        )
        } else {
            el = (
                <span key={idx}
                    className={styles["preview-text"]}
                    style={{ fontSize: 12*(4-i) + "px" }}
                >
                    {word.substring(i)}
                    <br />
                </span>
            )
        }

        return el;

    });

    return ( <div>{m}</div> )

}