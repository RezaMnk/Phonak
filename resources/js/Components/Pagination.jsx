import {Link, router} from "@inertiajs/react";
import {useEffect, useState} from "react";
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function Pagination({ data, search = '' }) {
    const { links, from, to, total } = data

    const [page, setPage] = useState('1');
    const [defaultPage, setDefaultPage] = useState('');
    const [url, setUrl] = useState('');

    const firstRender = useFirstRender();

    useEffect(() => {
        if (firstRender)
        {
            const href = new URL(location.href);
            if (href.searchParams.get('page'))
            {
                setPage(href.searchParams.get('page'))
                setDefaultPage(href.searchParams.get('page'))
            } else {
                setPage('1')
                setDefaultPage('1')
            }
        }

        else {
            if (page !== defaultPage)
            {
                const delayDebounceFn = setTimeout( () => {
                    const href = new URL(url);
                    href.searchParams.set('page', page.toString());
                    let data = {};
                    if (search)
                        data.search = search;
                    router.get(href.toString(), data)
                }, 1000)

                return () => clearTimeout(delayDebounceFn)
            }

        }
    }, [page])

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
                <div className="flex flex-wrap gap-2 mt-2">
                    {links.map((link, key) => {
                        const is_prev_next = () => [0, Object.keys(links).length-1].includes(key);

                        if (! url)
                            if (link.url)
                                setUrl(link.url)

                        return (
                            <div key={key}>
                                {
                                    link.url === null ?
                                        (
                                            <>
                                                <div
                                                    className={`${is_prev_next() ? 'px-4 flex' : 'w-8 hidden xl:flex'} h-8 cursor-default items-center justify-center text-sm leading-4 bg-gray-200 dark:bg-slate-900 text-gray-400 dark:text-slate-500 rounded`}
                                                >
                                                    {link.label}
                                                </div>
                                                <div className={`${is_prev_next() ? 'hidden' : 'block xl:hidden'} h-8 w-[2px] bg-gray-200 dark:bg-slate-900 rounded-lg`}></div>
                                            </>
                                        ) : link.active ? (
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className="w-16 h-8 text-center flex items-center justify-center text-sm leading-4 bg-white dark:bg-slate-900 rounded text-gray-700 dark:text-slate-300"
                                                value={page}
                                                onChange={(e) => setPage(e.target.value)}
                                            />
                                        ) : (
                                            <Link
                                                className={`${is_prev_next() ? 'px-4' : 'w-8'} h-8 flex items-center justify-center text-sm leading-4 bg-white dark:bg-slate-700 dark:text-slate-100 rounded hover:bg-gray-200/70 dark:hover:bg-slate-600 focus:outline-none focus:ring-sky-500 focus:ring-2`}
                                                href={search ? link.url + '&search=' + search : link.url}
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
