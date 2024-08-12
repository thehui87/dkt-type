declare module '*.jpg'
declare module '*.png'
declare module '*.svg' {
    import React from 'react'
    const content: any
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >
}
