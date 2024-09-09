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
        <label className="inline-flex items-center cursor-pointer text-color ">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={() => dispatch(changeFunction())}
                checked={checkedStatus}
            />
            <div className="relative shadow-slider w-11 h-6 primary-color rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:tertiary-color after:border after:rounded-full after:h-5 after:w-5 after:transition-all  hover:underline hover:underline-offset-8">
                {checkedStatus ? (
                    <span className="text-lg text-active-color flex justify-start items-center w-full h-full">
                        <IoEye />
                    </span>
                ) : (
                    <span className="text-lg text-active-color flex justify-end items-center w-full h-full">
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
