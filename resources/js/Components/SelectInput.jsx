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
            className={'block w-full py-3 text-gray-700 dark:text-gray-100 bg-white border border-gray-300 rounded-lg pr-11 pl-5 dark:bg-slate-800 border border-gray-300 dark:border-slate-500 focus:border-blue-95 focus:border-blue-900 dark:focus:border-blue-300 focus:ring-0 focus:outline-none peer disabled:bg-gray-100 dark:disabled:bg-slate-700 ' +
                (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600' : '') +
                className
            }
            ref={input}
        >
            {children}
        </select>
        {label && (
            <label htmlFor={props.id}
                   className={`absolute text-sm cursor-text select-none text-gray-500 dark:text-slate-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-top-right bg-white dark:bg-slate-800 rounded px-2 peer-focus:text-blue-900 dark:peer-focus:text-blue-300 right-[2.5rem] peer-disabled:bg-gray-100 dark:peer-disabled:bg-slate-700 ` +
                       (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600' : '')
                   }>
                {label}
            </label>
        )}
        </div>
    );
});
