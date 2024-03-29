import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput({type = 'text', className = '', label = '', size = '3', isFocused = false, svgIcon, error, ...props}, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (<div className="relative flex items-center">
        {svgIcon && (<label htmlFor={props.id} className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={'w-6 h-6 mx-3 text-gray-300 dark:text-slate-500' + (error ? ' text-red-300' : '')}
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        {svgIcon}
                    </svg>
                </label>)}
            <>
                <input
                    {...props}
                    placeholder={label ? " " : props.placeholder}
                    type={type}
                    className={`block w-full py-${size} text-gray-700 dark:text-gray-100 bg-white dark:bg-slate-800 dark:[color-scheme:dark] border border-gray-300 dark:border-slate-500 rounded-lg ${svgIcon ? 'pr-11' : 'pr-5'} pl-5 focus:border-blue-900 dark:focus:border-blue-300 focus:ring-0 focus:outline-none disabled:bg-gray-100 dark:disabled:bg-slate-700 ` +
                        (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600 dark:!border-red-600 dark:focus:!border-red-600 dark:focus:!ring-red-700 dark:focus:!ring-opacity-40 dark:!text-red-400 ' : '') +
                        (label && 'peer ') +
                        className
                    }
                    ref={input}
                />
                {label && (
                    <label htmlFor={props.id}
                           className={`absolute text-sm cursor-text select-none text-gray-500 dark:text-slate-400 transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-top-right bg-white dark:bg-slate-800 rounded px-2 peer-focus:px-2 peer-focus:text-blue-900 dark:peer-focus:text-blue-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${svgIcon ? 'right-[2.5rem]' : 'right-[1rem]'} peer-disabled:bg-gray-100 dark:peer-disabled:bg-slate-700 peer-disabled:cursor-default ` +
                               (error ? 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 text-red-600' : '')
                    }>
                        {label}
                    </label>
                )}
            </>
    </div>);
});
