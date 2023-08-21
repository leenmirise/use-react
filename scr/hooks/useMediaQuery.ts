import { useEffect, useState } from "react";

interface MediaQueryProps {
    query: string;
}

export const useMediaQuery = ({ query }: MediaQueryProps) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const matchChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener("change", matchChange);

        return () => {
            mediaQuery.removeEventListener("change", matchChange);
        };
    }, [query]);
    return matches;
}