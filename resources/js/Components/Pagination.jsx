import {Link} from "@inertiajs/react";

export default function Pagination({ data }) {
    const { links, from, to, total } = data

    return (
        links.length > 3 && (
            <div className="mb-4 mt-8">
                <p className="text-xs text-gray-500 dark:text-slate-300">
                    نمایش
                    <span className="mx-1">
                        {from}
                    </span>
                    تا
                    <span className="mx-1">
                        {to}
                    </span>
                    از
                    <span className="mx-1">
                        {total}
                    </span>
                </p>
                <div className="flex space-x-2 space-x-reverse mt-2">
                    {links.map((link, key) => {
                        const is_prev_next = () => [0, Object.keys(links).length-1].includes(key);
                        return (
                            <div key={key}>
                                {
                                    link.url === null ?
                                        (
                                            <div
                                                className={`${is_prev_next() ? 'px-4' : 'w-8'} h-8 cursor-default flex items-center justify-center text-sm leading-4 bg-gray-200 dark:bg-slate-900 text-gray-400 dark:text-slate-500 rounded`}
                                            >
                                                {link.label}
                                            </div>
                                        ) : link.active ? (
                                            <div
                                                className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer leading-4 bg-green-500 dark:bg-green-700 rounded text-white"
                                            >
                                                {link.label}
                                            </div>
                                        ) : (
                                            <Link
                                                className={`${is_prev_next() ? 'px-4' : 'w-8'} h-8 flex items-center justify-center text-sm leading-4 bg-white dark:bg-slate-700 dark:text-slate-100 rounded hover:bg-gray-200/70 dark:hover:bg-slate-600 focus:outline-none focus:ring-green-500 focus:ring-2`}
                                                href={link.url}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    );
}
