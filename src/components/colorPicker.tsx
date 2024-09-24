import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoChevronUp } from 'react-icons/io5'; //IoChevronDown
import { useSelector } from 'react-redux'; //useDispatch
import { RootState } from '../redux/store';

import { colorArray } from '../constants/colorList';
import { FaCheck } from 'react-icons/fa6';
// import { Fragment, useEffect } from 'react';
import { useThemeContext } from '../context/themeContext';
import { IoColorPaletteSharp } from 'react-icons/io5';

const ColorPicker = () => {
    const { colorPickerSelection } = useSelector(
        (state: RootState) => state.toolbar
    );
    const { changeThemeColor } = useThemeContext();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-component-color px-3 py-2 text-sm font-semibold text-active-color shadow-sm ring-inset ring-0 hover:caret-color">
                    <IoColorPaletteSharp />
                    {colorPickerSelection ?? 'Options'}
                    <IoChevronUp
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-active-color"
                    />
                    {/* {({ active }) =>
                        active ? (
                            <IoChevronDown
                                aria-hidden="true"
                                className="-mr-1 h-5 w-5 text-active-color"
                            />
                        ) : (
                            <IoChevronUp
                                aria-hidden="true"
                                className="-mr-1 h-5 w-5 text-active-color"
                            />
                        )
                    } */}
                    {/* {({ active }) =>
                        
                    } */}
                </MenuButton>
            </div>
            {/* bottom-16 */}
            <MenuItems
                transition
                anchor="top end"
                className="z-10 mt-2 w-80 origin-top-right rounded-md bg-component-color shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in h-80 overflow-auto"
            >
                <div className="py-1">
                    {colorArray.map((item, index) => {
                        return (
                            <MenuItem key={`colorpicker-${item.name}-${index}`}>
                                <a
                                    href="#"
                                    className="flex justify-between px-4 py-2 text-active-color data-[focus]:foreground-color data-[focus]:text-active-color hover:bg-slate-50 hover:bg-opacity-20"
                                    onClick={() => changeThemeColor(item.name)}
                                    onMouseOver={() =>
                                        changeThemeColor(item.name, true)
                                    }
                                    onMouseOut={() =>
                                        changeThemeColor(colorPickerSelection)
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
                                        className="w-20 h-8 rounded-full p-2 flex justify-between items-center"
                                        style={{
                                            backgroundColor: item.color.bg,
                                        }}
                                    >
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.bgComponent,
                                            }}
                                        ></span>
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.text,
                                            }}
                                        ></span>
                                        <span
                                            className="w-4 h-4 block rounded-full"
                                            style={{
                                                backgroundColor:
                                                    item.color.caret,
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
