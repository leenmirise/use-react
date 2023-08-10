import {useState, useEffect, useRef} from "react";

export interface useDocumentVisibilityHook {
    visible: true;
    count: number;
    onVisibilityChange: (listener: (isVisible: boolean) => void) => () => void;
}

export const useDocumentVisibility = () => {
    const [visible, setVisible] = useState(!document.hidden);
    const [count, setCount] = useState(0);
    const listeners = useRef<Array<(isVisible: boolean) => void>>([]);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            setCount((prevCount) => prevCount + 1);
        }
        setVisible(!document.hidden);
        listeners.current.forEach((listener) => listener(!document.hidden));
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleVisibilityChange]);

    const onVisibilityChange = (listener: (isVisible: boolean) => void) => {
        listeners.current = [...listeners.current, listener]
        return () => {
            listeners.current = listeners.current.filter((l) => l !== listener);
        }
    }

    return {visible, count, onVisibilityChange};
}