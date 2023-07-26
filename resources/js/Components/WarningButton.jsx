export default function WarningButton({ link = false, className = '', disabled = false, children, ...props }) {
    return (
        (link ? (
            <a
                {...props}
                className={
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-orange-500 dark:bg-orange-600 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-600 focus:ring-opacity-50 ${
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
                    `inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-colors duration-300 bg-orange-500 dark:bg-orange-600 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-600 focus:ring-opacity-50 ${
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
