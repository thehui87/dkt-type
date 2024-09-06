import { useDispatch } from 'react-redux';
import { IoEye, IoEyeOff } from 'react-icons/io5';

interface SliderButtonProps {
    checkedStatus: boolean;
    changeFunction: Function;
    children?: any;
}

const SliderButton = ({
    checkedStatus,
    changeFunction,
    children,
}: SliderButtonProps) => {
    const dispatch = useDispatch();
    return (
        <label className="inline-flex items-center cursor-pointer ">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={() => dispatch(changeFunction())}
                checked={checkedStatus}
            />
            <div className="relative shadow-slider w-11 h-6 bg-teal-900 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-900 dark:peer-focus:ring-teal-900 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-teal-700 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-teal-700 after:border-teal-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-900 hover:text-teal-500 hover:underline hover:underline-offset-8">
                {checkedStatus ? (
                    <span className="text-lg text-teal-200 flex justify-start items-center w-full h-full">
                        <IoEye />
                    </span>
                ) : (
                    <span className="text-lg text-teal-200 flex justify-end items-center w-full h-full">
                        <IoEyeOff />
                    </span>
                )}
            </div>
            {children}
            {/* <span className="ms-3 text-sm font-medium text-teal-600 dark:text-gray-300">
                
            </span> */}
        </label>
    );
};

export { SliderButton };
