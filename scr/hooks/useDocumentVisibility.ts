import {useState, useEffect, useRef, useCallback} from "react";

export const useDocumentVisibility = () => {
    const [visible, setVisible] = useState(!document.hidden);
    const [count, setCount] = useState(0);
    const listeners = useRef<Array<(isVisible: boolean) => void>>([]);

    const handleVisibilityChange = useCallback(() => {
        const currentVisibility = !document.hidden;
        if (!currentVisibility) {
            setCount((prevCount) => prevCount + 1);
        }
        setVisible(currentVisibility);
        listeners.current.forEach((listener) => listener(currentVisibility));
    }, []);

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleVisibilityChange]);

    const onVisibilityChange = useCallback((listener: (isVisible: boolean) => void) => {
        listeners.current = [...listeners.current, listener]
        return () => {
            listeners.current = listeners.current.filter((l) => l !== listener);
        }
    }, []);

    return {visible, count, onVisibilityChange};
}