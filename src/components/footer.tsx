import ColorPicker from './colorPicker';

const MyFooter = () => {
    return (
        <div className="bg-component-color border-t-2 border-teal-600 py-2 absolute bottom-0 w-full font-semibold text-color text-center">
            Dwarf Knight Technologies
            <ColorPicker />
        </div>
    );
};

export default MyFooter;
