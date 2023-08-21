import React, {ReactNode} from 'react';
import {useMediaQuery} from "../hooks/useMediaQuery";

interface MediaQueryProps{
    orientation?: 'portrait' | 'landscape';
    minResolution?: number | `${number}dppx`;
    maxResolution?: number | `${number}dppx`;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    children: ReactNode | ((matches: boolean) => ReactNode);
}

const MediaQuery = ({orientation, minResolution, maxResolution, minWidth, maxWidth, minHeight, maxHeight, children}
                        : MediaQueryProps) => {

    function mediaQueryString(): string {
        const params = {
            orientation,
            "min-resolution": minResolution,
            "max-resolution": maxResolution,
            "min-width": minWidth,
            "max-width": maxWidth,
            "min-height": minHeight,
            "max-height": maxHeight
        };
        return Object.entries(params)
            .filter(([key, value]) => !!value)
            .map(([key, value]) => {
                if (typeof value === 'number') {
                    return (`${key}: ${value}dppx`);
                } else {
                    return (`${key}: ${value}`);
                }
            })
            .join(',');
    }

    const matches = useMediaQuery({query: mediaQueryString()});

    return <>{typeof children === 'function' ? children(matches) :  <>{children}</>}</>;
};

export default MediaQuery;