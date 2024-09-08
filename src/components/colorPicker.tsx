import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoChevronDown } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setColorPickerSelection } from '../redux/toolbar/toolbar.slice';
import { colorArray } from '../constants/colorList';
import { FaCheck } from 'react-icons/fa6';

const ColorPicker = () => {
    const dispatch = useDispatch();
    const { colorPickerSelection } = useSelector(
        (state: RootState) => state.toolbar
    );

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-teal-800 px-3 py-2 text-sm font-semibold text-teal-500 shadow-sm ring-inset ring-0 hover:bg-teal-700">
                    {colorPickerSelection ?? 'Options'}
                    <IoChevronDown
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-teal-500"
                    />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-teal-800 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in h-80 overflow-auto"
            >
                <div className="py-1">
                    {colorArray.map((item, index) => {
                        return (
                            <MenuItem key={`colorpicker-${item.name}-${index}`}>
                                <a
                                    href="#"
                                    className="flex justify-between px-4 py-2 text-teal-500 data-[focus]:bg-teal-700 data-[focus]:text-teal-500"
                                    onClick={() =>
                                        dispatch(
                                            setColorPickerSelection(item.name)
                                        )
                                    }
                                >
                                    <div className="flex justify-start items-center">
                                        <FaCheck
                                            className="mr-2"
                                            style={{
                                                visibility:
                                                    item.name ===
                                                    colorPickerSelection
                                                        ? 'visible'
                                                        : 'hidden',
                                            }}
                                        />

                                        {item.name}
                                    </div>
                                    <div
                                        className="w-20 rounded-full p-2 flex justify-between items-center"
                                        style={{
                                            backgroundColor: item.color.bg,
                                        }}
                                    >
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.primary,
                                            }}
                                        ></span>
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.secondary,
                                            }}
                                        ></span>
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.tertiary,
                                            }}
                                        ></span>
                                    </div>
                                </a>
                            </MenuItem>
                        );
                    })}
                </div>
            </MenuItems>
        </Menu>
    );
};
export default ColorPicker;
