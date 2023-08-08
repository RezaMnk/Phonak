import {ToastContainer} from "react-toastify";
import "../../css/toastify/main.scss"
import useMemorable from "@/Hooks/useMemorable.js";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/react";
import {toast as toastify} from "react-toastify";
import UserSidebar from "@/Layouts/UserSidebar.jsx";
import AdminSidebar from "@/Layouts/AdminSidebar.jsx";
import Icon from "@/Components/Icon.jsx";

export default function Authenticated({ header, breadcrumbs, headerExtra, children }) {
    const [minimize, setMinimize] = useMemorable(false, 'minimize');
    const [dark, setDark] = useMemorable(false, 'dark');

    const [hamburgerMenu, setHamburgerMenu] = useState(false)

    const { toast, auth } = usePage().props;

    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [dark])

    useEffect(() => {
        if (toast) {
            const type = Object.keys(toast)[0];
            const message = toast[type];
            toastify(message, {
                type: type
            });
        }
    }, [toast]);


    const toggleDarkMode = () => {
        setDark(! dark);
    };

    const changeMinimize = (e) => {
        e.preventDefault();
        setMinimize(! minimize)
    }

    return (
        <div>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={dark ? "dark" : "light"}
            />
            <div className="min-h-screen bg-gray-100 dark:bg-slate-800">
                <div className={`fixed transition-all duration-100 ${hamburgerMenu ? 'w-full' : 'w-0'} h-full z-40 bg-black/40`} onClick={() => setHamburgerMenu(false)}></div>
                {auth.user.is_admin ? (
                    <AdminSidebar minimize={minimize} changeMinimize={changeMinimize} hamburgerMenu={hamburgerMenu} setHamburgerMenu={setHamburgerMenu} dark={dark} />
                ) : (
                    <UserSidebar minimize={minimize} changeMinimize={changeMinimize} hamburgerMenu={hamburgerMenu} setHamburgerMenu={setHamburgerMenu} dark={dark} />
                )}


                {header && (
                    <header className={`bg-white dark:bg-slate-900 transition-all ${minimize ? 'md:mr-24' : 'md:mr-60'} print:hidden`}>
                        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between">
                                <h1 className="font-semibold text-xl text-gray-800 dark:text-slate-200 align-middle py-2">{header}</h1>
                                <button className="flex mr-auto bg-gray-100 dark:bg-slate-800 rounded-full w-10 h-10 ml-4 md:ml-0 items-center justify-center" onClick={toggleDarkMode}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 dark:text-slate-300" viewBox="0 0 24 24" fill="none">
                                        {dark ? (
                                            <path d="M20 14.12A7.78 7.78 0 019.88 4a7.782 7.782 0 002.9 15A7.782 7.782 0 0020 14.12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        ) : (
                                            <>
                                                <circle cx="12" cy="12" r="4.14113" stroke="currentColor" strokeWidth="1.91129"/>
                                                <path d="M12.9556 3.08065C12.9556 2.55286 12.5277 2.125 12 2.125C11.4722 2.125 11.0443 2.55286 11.0443 3.08065L11.0443 5.64078C11.3561 5.59432 11.6753 5.57024 12 5.57024C12.3247 5.57024 12.6438 5.59431 12.9556 5.64076L12.9556 3.08065ZM12.9556 18.3594C12.6438 18.4059 12.3247 18.4299 12 18.4299C11.6753 18.4299 11.3561 18.4058 11.0443 18.3594L11.0443 20.9194C11.0443 21.4471 11.4722 21.875 12 21.875C12.5277 21.875 12.9556 21.4471 12.9556 20.9194L12.9556 18.3594Z" fill="currentColor"/>
                                                <path d="M20.9194 12.9556C21.4471 12.9556 21.875 12.5277 21.875 12C21.875 11.4722 21.4471 11.0443 20.9194 11.0443L18.3592 11.0443C18.4057 11.3561 18.4298 11.6753 18.4298 12C18.4298 12.3247 18.4057 12.6438 18.3592 12.9556L20.9194 12.9556ZM5.6406 12.9556C5.59415 12.6438 5.57008 12.3247 5.57008 12C5.57008 11.6753 5.59416 11.3561 5.64062 11.0443L3.08064 11.0443C2.55286 11.0443 2.125 11.4722 2.125 12C2.125 12.5277 2.55286 12.9556 3.08064 12.9556L5.6406 12.9556Z" fill="currentColor"/>
                                                <path d="M18.9828 6.36876C19.356 5.99555 19.356 5.39047 18.9828 5.01727C18.6096 4.64407 18.0045 4.64407 17.6313 5.01727L15.8209 6.82764C16.0743 7.01528 16.3169 7.22391 16.5466 7.45354C16.7762 7.68315 16.9848 7.92581 17.1724 8.17912L18.9828 6.36876ZM8.17898 17.1725C7.92567 16.9849 7.68302 16.7763 7.45341 16.5467C7.22378 16.3171 7.01514 16.0744 6.82751 15.8211L5.01742 17.6311C4.64422 18.0043 4.64422 18.6094 5.01742 18.9826C5.39062 19.3558 5.9957 19.3558 6.36891 18.9826L8.17898 17.1725Z" fill="currentColor"/>
                                                <path d="M6.36888 5.01722C5.99568 4.64402 5.3906 4.64402 5.01739 5.01722C4.64419 5.39043 4.64419 5.99551 5.01739 6.36871L6.82776 8.17908C7.0154 7.92574 7.22403 7.68306 7.45366 7.45342C7.68327 7.22381 7.92593 7.0152 8.17924 6.82758L6.36888 5.01722ZM17.1727 15.821C16.9851 16.0743 16.7764 16.317 16.5468 16.5466C16.3172 16.7762 16.0745 16.9849 15.8212 17.1725L17.6313 18.9826C18.0045 19.3558 18.6095 19.3558 18.9828 18.9826C19.356 18.6094 19.356 18.0043 18.9828 17.6311L17.1727 15.821Z" fill="currentColor"/>
                                            </>
                                        )}
                                    </svg>
                                </button>
                                <button className="md:hidden flex bg-gray-100 dark:bg-slate-800 rounded-full w-10 h-10 items-center justify-center" onClick={() => setHamburgerMenu(true)}>
                                    <Icon viewBox="0 0 24 24" type="stroke">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </Icon>
                                </button>
{/*                                <div className="relative">*/}
{/*/!*                                    <TextInput*/}
{/*                                        id="search"*/}
{/*                                        className="py-2 text-sm"*/}
{/*                                        label="جستجو"*/}
{/*                                        svgIcon={<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"></path>}*/}
{/*                                        size="1"*/}
{/*                                    />*!/*/}
{/*                                    <div className="absolute z-10 top-12 left-0 hidden w-full bg-white rounded-lg p-4 border border-gray-200 text-sm">*/}
{/*                                        <p className="text-gray-700 border-b border-gray-300 text-xs pb-1">*/}
{/*                                            سفارشات*/}
{/*                                        </p>*/}
{/*                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">*/}
{/*                                            <p>#11</p>*/}
{/*                                            <p>رضا نداف</p>*/}
{/*                                            <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 px-2 py-1 text-xs text-sky-800 ring-1 ring-inset ring-sky-600/20">تکمیل</span>*/}
{/*                                        </div>*/}
{/*                                        <hr className="border-gray-300 dark:border-slate-600"/>*/}
{/*                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">*/}
{/*                                            <p>#11</p>*/}
{/*                                            <p>رضا نداف</p>*/}
{/*                                            <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 px-2 py-1 text-xs text-sky-800 ring-1 ring-inset ring-sky-600/20">تکمیل</span>*/}
{/*                                        </div>*/}
{/*                                        <hr className="border-gray-300 dark:border-slate-600"/>*/}
{/*                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">*/}
{/*                                            <p>#11</p>*/}
{/*                                            <p>رضا نداف</p>*/}
{/*                                            <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 px-2 py-1 text-xs text-sky-800 ring-1 ring-inset ring-sky-600/20">تکمیل</span>*/}
{/*                                        </div>*/}

{/*                                        <p className="text-gray-700 border-b border-gray-300 text-xs mt-4 pb-1">*/}
{/*                                            کاربران*/}
{/*                                        </p>*/}
{/*                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">*/}
{/*                                            <p>#11</p>*/}
{/*                                            <p>رضا نداف</p>*/}
{/*                                            <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 px-2 py-1 text-xs text-sky-800 ring-1 ring-inset ring-sky-600/20">تکمیل</span>*/}
{/*                                        </div>*/}
{/*                                        <hr className="border-gray-300 dark:border-slate-600"/>*/}
{/*                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">*/}
{/*                                            <p>#11</p>*/}
{/*                                            <p>رضا نداف</p>*/}
{/*                                            <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 px-2 py-1 text-xs text-sky-800 ring-1 ring-inset ring-sky-600/20">تکمیل</span>*/}
{/*                                        </div>*/}
{/*                                    </div>*/}
{/*                                </div>*/}
                            </div>
                        </div>

                        {(breadcrumbs || headerExtra) && (
                            <>
                                <hr className="w-fulll border-gray-300 dark:border-slate-600"/>
                                <div className={`container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex ${(breadcrumbs && headerExtra) ? 'flex-col md:flex-row space-y-5 md:space-y-0' : ''} justify-between py-4 overflow-x-auto whitespace-nowrap`}>
                                    {breadcrumbs && (
                                        <div className="flex items-center">
                                            <a href={route('dashboard')} className="text-gray-600 dark:text-slate-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                                </svg>
                                            </a>

                                            {Object.keys(breadcrumbs).map((sectionName, i) => {
                                                const keys = Object.keys(breadcrumbs);
                                                return (
                                                    <div className="flex items-center" key={i}>
                                                        <span className="mx-5 text-gray-500  dark:text-slate-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" stroke="currentColor" fill="currentColor">
                                                                <path
                                                                    d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <a href={breadcrumbs[sectionName]} className={`${keys[keys.length-1] === sectionName ? 'text-sky-500 font-semibold' : 'text-gray-600 dark:text-slate-200'} hover:underline`}>
                                                            {sectionName}
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                    {headerExtra && (
                                        headerExtra
                                    )}
                                </div>
                            </>
                        )}

                    </header>
                )}

                <div className={`transition-all ${minimize ? 'md:mr-24' : 'md:mr-60'} print:m-auto`}>
                    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 xl:py-12">{children}</main>
                </div>
            </div>
        </div>
    );
}
