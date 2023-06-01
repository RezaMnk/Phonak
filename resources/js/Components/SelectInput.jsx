import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function SelectInput({type = 'text', className = '', label = '', isFocused = false, children, error, ...props}, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative">
        <select
            {...props}
            className={'block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg pr-11 pl-5 focus:border-blue-95 focus:border-blue-900 focus:ring-0 focus:outline-none peer ' +
                (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600' : '') +
                className
            }
            ref={input}
        >
            {children}
        </select>
        {label && (
            <label htmlFor={props.id}
                   className={`absolute text-sm cursor-text select-none text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-top-right bg-white rounded px-2 peer-focus:text-blue-900 right-[2.5rem] ` +
                       (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600' : '')
                   }>
                {label}
            </label>
        )}
        </div>
    );
});
