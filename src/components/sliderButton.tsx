import { useDispatch } from 'react-redux';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Switch } from '@headlessui/react';

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

            <Switch
                checked={checkedStatus}
                onChange={() => dispatch(changeFunction())}
                className="group relative flex justify-between items-center h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
                {checkedStatus ? (
                    <span className="absolute left-2.5 text-sm text-active-color flex items-center w-full h-full font-semibold">
                        On
                    </span>
                ) : (
                    <span className="absolute left-7 text-sm text-active-color flex items-center w-full h-full font-semibold">
                        Off
                    </span>
                )}
            </Switch>
            {children}
            {/* <span className="ms-3 text-sm font-medium text-teal-600 dark:text-gray-300">
                
            </span> */}
        </label>
    );
};

export { SliderButton };
