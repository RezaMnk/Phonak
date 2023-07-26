export default function PrimaryButton({ link = false, className = '', disabled = false, children, ...props }) {
    return (
        (link ? (
            <a
                {...props}
                className={
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-sky-500 dark:bg-sky-700 rounded-lg hover:bg-sky-400 dark:hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50 ${
                        disabled && 'opacity-25'
                    } ` + className
                }
            >
                {children}
            </a>
        ) : (
            <button
                {...props}
                className={
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-sky-500 dark:bg-sky-700 rounded-lg hover:bg-sky-400 dark:hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50 ${
                        disabled && 'opacity-25'
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </button>
        ))
    );
}
