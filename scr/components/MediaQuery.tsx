import React, {Fragment} from 'react';
import {ReactNode} from 'react';
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
        let query = '';
        if (orientation){
            query += (`(orientation: ${orientation}), `);
        }
        if(typeof minResolution === 'number'){
            query += (`(min-resolution: ${minResolution}dppx), `);
        } else{
            query += (`(min-resolution: ${minResolution}), `);
        }
        if(typeof maxResolution === 'number'){
            query += (`(max-resolution: ${maxResolution}dppx), `);
        }else{
            query += (`(max-resolution: ${maxResolution}), `);
        }
        if (minWidth) {
            query += (`(min-width: ${minWidth}px), `);
        }
        if (maxWidth) {
            query += (`(max-width: ${maxWidth}px), `);
        }
        if (minHeight) {
            query += (`(min-height: ${minHeight}px), `);
        }
        if (maxHeight) {
            query += (`(max-height: ${maxHeight}px), `);
        }

        return query.slice(0, -2);
    }

    const matches = useMediaQuery({query: mediaQueryString()});

    return <>{typeof children === 'function' ? children(matches) :  <>{children}</>}</>;
};

export default MediaQuery;