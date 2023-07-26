import {Link} from "@inertiajs/react";
import {Children, cloneElement, isValidElement} from "react";

export default function NavLink({className = '', name = '', minimize, icon = <></>, active = false, ...props}) {
    const modifiedIcon = Children.map(icon, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                className: icon.props.className + ` ${active ? 'text-white' : ''}`,
            });
        }
        return child;
    });

    return (
        <Link
            {...props}
            className={"flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg "
                + (active ? "bg-sky-500 text-white text-semi-bold hover:bg-sky-600 hover:text-white font-semibold " : "dark:text-gray-300 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-600 dark:hover:text-gray-100 ")
                + className
        }
            >
            {modifiedIcon}

            <span className={`mx-2 text-sm ${minimize ? 'hidden' : ''}`}>
                {name}
            </span>
        </Link>
    );
}
