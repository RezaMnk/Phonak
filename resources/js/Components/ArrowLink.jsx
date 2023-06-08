import {Link} from "@inertiajs/react";

export default function ArrowLink({className = '', name = '', ...props}) {
    return (
        <Link
            {...props}
            className={"flex group items-center px-3 py-2 text-gray-500 dark:text-gray-300 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-slate-600 dark:hover:text-gray-100 "
                + className
        }
            >
            <span className="mx-2 text-sm">
                {name}
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth="2" stroke="currentColor" className="w-5 h-5 transition ease-in-out group-hover:-translate-x-1">
                <path d="M8 12L16 12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Link>
    );
}
