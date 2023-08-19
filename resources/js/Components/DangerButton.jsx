import {Link} from "@inertiajs/react";

export default function DangerButton({ bordered = false, link = false, className = '', disabled = false, children, ...props }) {
    const class_name = `inline-flex justify-center px-6 py-3 text-sm font-bold ${bordered ? 'text-red-500 dark:text-red-600 hover:!text-white' : 'text-white'} transition-colors duration-300 ${bordered ? 'bg-transparent border border-2 box-border border-red-500 dark:border-red-600' : 'bg-red-500 dark:bg-red-600'} rounded-lg hover:bg-red-600 dark:hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-600 focus:ring-opacity-50 ${
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
