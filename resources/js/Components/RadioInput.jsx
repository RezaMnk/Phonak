import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function RadioInput({ className = '', isFocused = false, svgIcon = <></>, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
            <input
                {...props}
                type="radio"
                className={
                    'w-4 h-4 text-green-600 bg-gray-10 border-gray-300 focus:ring-green-500 focus:ring-2 ' +
                    className
                }
                ref={input}
            />
    );
});
