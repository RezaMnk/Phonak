export default function SecondaryButton({ bordered = false, link = false, className = '', disabled = false, children, ...props }) {

    const class_name = `inline-flex justify-center px-6 py-3 text-sm font-bold ${bordered ? 'text-gray-500 dark:text-gray-600 hover:!text-white' : 'text-white'} transition-colors duration-300 ${bordered ? 'bg-transparent border border-2 box-border border-gray-500 dark:border-gray-600' : 'bg-gray-500 dark:bg-gray-600'} rounded-lg hover:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50 ${
        disabled && 'opacity-25'
    } ` + className

    return (
        (link ? (
            <a
                {...props}
                className={class_name}
            >
                {children}
            </a>
        ) : (
            <button
                {...props}
                className={class_name}
                disabled={disabled}
            >
                {children}
            </button>
        ))
    );
}
