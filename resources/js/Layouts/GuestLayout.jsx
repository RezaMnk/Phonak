import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import useMemorable from "@/Hooks/useMemorable.js";
import {useEffect} from "react";

export default function Guest({ children, name = '', className = '' }) {
    const [dark] = useMemorable(false, 'dark');

    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [dark])

    return (
        <div className="min-h-screen flex flex-col p-5 justify-center items-center xl:py-12 sm:py-0 bg-gray-100/50 dark:bg-slate-700/95">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-28" dark={dark} />
                </Link>
            </div>
            <div className={`w-full sm:max-w-xl mt-6 px-6 py-4 bg-white dark:bg-slate-800 overflow-hidden rounded-lg ` + className}>
                {name && (
                    <div className="mb-5 flex items-center">
                        <div className="flex-grow h-px bg-gray-400 dark:bg-slate-600"></div>
                        <h3 className="px-5 text-lg font-semibold text-center text-gray-700 dark:text-slate-300">
                            {name}
                        </h3>
                        <div className="flex-grow h-px bg-gray-400 dark:bg-slate-600"></div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
