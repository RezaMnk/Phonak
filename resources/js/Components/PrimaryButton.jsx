export default function PrimaryButton({ bordered = false,  link = false, className = '', disabled = false, children, ...props }) {

    const class_name = `inline-flex items-center justify-center px-6 py-3 text-sm font-bold ${bordered ? 'text-sky-500 dark:text-sky-600 hover:!text-white' : 'text-white'} transition-colors duration-300 ${bordered ? 'bg-transparent border border-2 box-border border-sky-500 dark:border-sky-600' : 'bg-sky-500 dark:bg-sky-600'} rounded-lg hover:bg-sky-400 dark:hover:bg-sky-600 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-50 ${
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
