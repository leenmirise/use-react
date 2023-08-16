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
        let query: string[] = [];
        switch (true){
            case !!orientation:
                query.push(`(orientation: ${orientation})`);
            case typeof minResolution === 'number':
                query.push(`(min-resolution: ${minResolution}dppx)`);
            case typeof minResolution === 'string':
                query.push(`(min-resolution: ${minResolution})`);
            case typeof maxResolution === 'number':
                query.push(`(max-resolution: ${maxResolution}dppx)`);
            case typeof maxResolution === 'string':
                query.push(`(max-resolution: ${maxResolution})`);
            case !!minWidth:
                query.push(`(min-width: ${minWidth}px)`);
            case !!maxWidth:
                query.push(`(max-width: ${maxWidth}px)`);
            case !!minHeight:
                query.push(`(min-height: ${minHeight}px)`);
            case !!maxHeight:
                query.push(`(max-height: ${maxHeight}px)`);
            default:
                break;

        }

        return query.join(',');
    }

    const matches = useMediaQuery({query: mediaQueryString()});

    return <>{typeof children === 'function' ? children(matches) :  <>{children}</>}</>;
};

export default MediaQuery;