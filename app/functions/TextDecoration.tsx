type Decoration = {
    begin: string,
    end?: string,
    replacement: (text: string, index: number) => React.JSX.Element
}

const decorations: Array<Decoration> = [
    {
        begin: "**",
        replacement: (text, key) => (<b key={key}>{text}</b>)
    },
    {
        begin: "*",
        replacement: (text, key) => (<i key={key}>{text}</i>)
    },
    {
        begin: "~~",
        replacement: (text, key) => (<del key={key}>{text}</del>)
    },
    {
        begin: "__",
        replacement: (text, key) => (<ins key={key}>{text}</ins>)
    }
]

function decorateLine(text: string) {
    const elements: React.JSX.Element[] = [];
    let index = 0;

    while (index < text.length) {
        let foundDecoration = false;

        for (const el of decorations) {

            const start = text.indexOf(el.begin, index);

            if (start != -1) {
                const end = text.indexOf(el.begin, start + el.begin.length);

                if (end != -1) {

                    if (index < start) {
                    elements.push(<span key={index}>{text.substring(index, start)}</span>);
                    }

                    const decoratedText = text.substring(start + el.begin.length, end);

                    elements.push(el.replacement(decoratedText, index));
                    index = end + el.begin.length;
                    foundDecoration = true;

                    break;
                }
            }
        }

        if (!foundDecoration) {
            elements.push(<span key={index}>{text.substring(index)}</span>);
            break;
        }
    }

    return <>{elements}</>

}

export default decorateLine;