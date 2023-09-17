import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function CheckboxInput({ className = '', isFocused = false, svgIcon = <></>, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
            <input
                {...props}
                type="checkbox"
                className={
                    'rounded w-4 h-4 text-sky-600 bg-gray-10 border-gray-300 focus:ring-sky-500 focus:ring-2 ' +
                    className
                }
                ref={input}
            />
    );
});
