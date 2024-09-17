import React from 'react';
// { useState, useEffect }
// import { useDispatch } from "react-redux";

interface Props {
    children?: React.ReactNode;
    size?: string;
}

const HeadingTag = ({ size = 'text-lg', children }: Props) => {
    // const [headingSize, setHeadingSize] = useState(size);

    // useEffect(() => {
    //     setHeadingSize(`text-${size}`);
    // }, [size]);
    return <div className={`${size} font-bold text-color`}>{children}</div>;
};

export { HeadingTag };
