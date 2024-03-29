import {Link} from "@inertiajs/react";

export default function WarningButton({ bordered = false, link = false, className = '', disabled = false, children, ...props }) {

    const class_name = `inline-flex items-center justify-center px-6 py-3 text-sm font-bold ${bordered ? 'text-orange-500 dark:text-orange-600 hover:!text-white' : 'text-white'} transition-colors duration-300 ${bordered ? 'bg-transparent border border-2 box-border border-orange-500 dark:border-orange-600' : 'bg-orange-500 dark:bg-orange-600'} rounded-lg hover:bg-orange-400 dark:hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50 ${
        disabled && 'opacity-25'
    } ` + className

    return (
        (link ? 'target' in props ? (
            <a
                {...props}
                className={class_name}
            >
                {children}
            </a>
        ) : (
            <Link
                {...props}
                className={class_name}
            >
                {children}
            </Link>
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
