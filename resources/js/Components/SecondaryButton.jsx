export default function SecondaryButton({ link = false, className = '', disabled = false, children, ...props }) {
    return (
        (link ? (
            <a
                {...props}
                className={
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-gray-500 dark:bg-gray-600 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50 ${
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
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-gray-500 dark:bg-gray-600 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50 ${
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
