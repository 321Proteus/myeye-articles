import { createContext, useContext, useRef, useState } from "react";

type EditorData = {
    text: React.RefObject<string>,
    images: string[],
    addImage: (a: string) => void,
    update: () => void
}

const EditorContext = createContext<EditorData | undefined>(undefined);

const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("brak kontekstu");
    }
    return context;
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const text = useRef("");
    const [images, setImages] = useState<string[]>([]);
    const [, setRenderTrigger] = useState(0);

    const addImage = (a: string) => {
        setImages([...images, a])
    }

    const update = () => {
        setRenderTrigger(prev => prev + 1);
    };
    
    return (
        <EditorContext.Provider value={{ text, images, addImage, update }}>
            {children}
        </EditorContext.Provider>
    );
};

export default useEditorContext;