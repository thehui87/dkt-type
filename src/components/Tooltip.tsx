interface Props {
    children?: React.ReactNode;
    message?: string;
    position?: string;
}

export default function Tooltip({
    message,
    children,
    position = 'bottom',
}: Props) {
    return (
        <div className="group relative flex">
            {position === 'top' && (
                <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                    {message}
                </span>
            )}
            {children}
            {position === 'bottom' && (
                <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                    {message}
                </span>
            )}
        </div>
    );
}
