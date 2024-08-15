import { useEffect, useState } from 'react';
import { HeadingTag } from '../components/headingTag';
const textBlock =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt asperiores, dolorem nisi praesentium eligendi est consectetur ipsum veritatis fuga similique dolor magni obcaecati aut id, aperiam iure doloribus reprehenderit officia.';

// interface textData {
//     username: string;
//     password: string;
//     prevState: null;
// }

const Home = () => {
    // const [textArray, setTextArray] = useState<Array<string>>([]);
    const [wordArray, setWordArray] = useState<Array<string>>([]);
    // split by ''
    // create a container until it finds a space

    useEffect(() => {
        // setTextArray([...textBlock.split('')]);
        setWordArray([...textBlock.split(' ')]);
        // for(let i = 0; i < textArray.length; i++) {

        // }
        // let textComponent = textArray.map((letter) => {
        //     if (letter != ' ') {
        //         return <span>{letter}</span>;
        //     }
        // });
    }, []);

    // useEffect(() => {
    //     // console.log(textArray);

    //     // let textComponent = textArray.map((letter) => {
    //     //     if (letter != ' ') {
    //     //         return <span>{letter}</span>;
    //     //     }
    //     //     // else {
    //     //     //   return </div><div>;
    //     //     // }
    //     // });
    //       for(let i = 0; i < textArray.length; i++) {
    //         if()
    //       }
    //     console.log(textComponent);
    // }, [textArray]);
    return (
        <div>
            <HeadingTag>Home</HeadingTag>
            {/* <div className="h-full flex items-center absolute top-0 w-full pointer-events-none">
                <div className="rounded-lg bg-teal-950 text-3xl mx-36 max-sm:mx-10 text-teal-600 min-h-40 max-h-40 overflow-hidden px-0.5 py-2 leading-12 tracking-wider text-left">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Incidunt asperiores, dolorem nisi praesentium eligendi est
                    consectetur ipsum veritatis fuga similique dolor magni
                    obcaecati aut id, aperiam iure doloribus reprehenderit
                    officia.
                </div>
            </div> */}

            <div className="h-full flex items-center absolute top-0 w-full">
                {/* pointer-events-none */}
                <div className="rounded-lg bg-teal-950 text-3xl mx-36 max-sm:mx-10 text-teal-600 min-h-40 max-h-40 overflow-hidden px-0.5 py-2 leading-12 tracking-wider text-left relative">
                    <div id="caret" className="bg-orange-400"></div>
                    <input className="opacity-20 absolute w-full h-full left-0 top-0" />
                    {wordArray.map((word: string, index: number) => (
                        <div
                            key={index}
                            style={{
                                // border: '1px solid #ccc',
                                padding: '0px 8px',
                                // borderRadius: '5px',
                                // backgroundColor: '#f0f0f0',
                                display: 'inline-block',
                            }}
                        >
                            {word
                                .split('')
                                .map((letter: string, indexLetter: number) => (
                                    <span
                                        key={indexLetter}
                                        style={{
                                            // border: '1px solid #ccc',
                                            // padding: '5px',
                                            // borderRadius: '5px',
                                            // backgroundColor: '#e0e0e0',
                                            width: '20px',
                                            textAlign: 'center',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
