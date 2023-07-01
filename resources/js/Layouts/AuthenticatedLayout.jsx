import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import TextInput from "@/Components/TextInput.jsx";
import {ToastContainer} from "react-toastify";
import "../../css/toastify/main.scss"
import useMemorable from "@/Hooks/useMemorable.js";
import {useEffect} from "react";
import {usePage} from "@inertiajs/react";
import {toast as toastify} from "react-toastify";
import Icon from "@/Components/Icon.jsx";

export default function Authenticated({ header, breadcrumbs, headerButton = <></>, children }) {
    const [minimize, setMinimize] = useMemorable(false, 'minimize');
    const [dark, setDark] = useMemorable(true, 'dark');

    const { toast } = usePage().props;

    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [dark])

    useEffect(() => {
        console.log(toast)
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
        <div className={dark ? 'dark' : undefined}>
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
                <aside
                    className={`fixed hide-scrollbar flex flex-col transition-all ${minimize ? 'w-24' : 'w-52'} h-screen px-8 py-6 overflow-y-auto bg-white border-l dark:bg-slate-800 dark:border-slate-900`}>
                    <a href="#" className="-mx-2">
                        <ApplicationLogo dark={dark} className={`transition-all ${minimize ? 'w-12' : 'w-16'}`} />
                    </a>

                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav className={`-mx-3 flex flex-col justify-between ${minimize ? 'items-center' : undefined} flex-1`}>
                            <div className={! minimize ? 'space-y-8' : undefined}>
                                <NavLink
                                    className=""
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    icon={
                                        <Icon viewBox="0 0 24 24" type="stroke">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"/>
                                        </Icon>
                                    }
                                    name="داشبورد"
                                    minimize={minimize}
                                />
                                <div className="space-y-3">
                                    <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                        <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>بیماران</span>
                                        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                                    </div>

                                    <NavLink
                                        href={route('patients.index')}
                                        active={route().current('patients.index')}
                                        icon={
                                            <Icon viewBox="0 0 24 24" type="stroke" width={"2"}>
                                                <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"/>
                                            </Icon>
                                        }
                                        name="همه بیماران"
                                        minimize={minimize}
                                    />

                                    <NavLink
                                        href={route('patients.create')}
                                        active={route().current('patients.create')}
                                        icon={
                                            <Icon viewBox="0 0 24 24" type="stroke" width={"2"}>
                                                <path d="M7,5H3M5,7V3" />
                                                <path d="M11,3.41A5.11,5.11,0,0,1,13,3a5,5,0,1,1-4.59,7" />
                                                <path d="M12,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1v0A7,7,0,0,1,12,13Z" />
                                            </Icon>
                                        }
                                        name="افزودن بیمار"
                                        minimize={minimize}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                        <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>پرونده ها</span>
                                        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                                    </div>
                                    <NavLink
                                        href={route('records.index')}
                                        active={route().current('records.index')}
                                        icon={
                                            <Icon viewBox="0 0 24 24" type="stroke">
                                                <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                                            </Icon>
                                        }
                                        name="همه پرونده ها"
                                        minimize={minimize}
                                    />

                                    <NavLink
                                        href={route('records.create')}
                                        active={route().current('records.create')}
                                        icon={
                                            <Icon viewBox="0 0 24 24" type="stroke">
                                                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                            </Icon>
                                        }
                                        name="ایجاد پرونده"
                                        minimize={minimize}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                        <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>محصولات</span>
                                        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                                    </div>
                                    <NavLink
                                        href="#"
                                        // active={route().current('dashboard')}
                                        icon={
                                            <Icon viewBox="0 0 24 24" type="stroke">
                                                <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" />
                                                <path d="M12 12V21" />
                                                <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" />
                                                <path d="M8.5 4.5L16 9" />
                                            </Icon>
                                        }
                                        name="همه محصولات"
                                        minimize={minimize}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3 mt-6">
                                <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                <span
                                    className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>
                                    حساب کاربری
                                </span>
                                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                                </div>

                                <NavLink
                                    href="#"
                                    icon={
                                        <Icon viewBox="0 0 24 24" width="2" type="stroke">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>
                                        </Icon>
                                    }
                                    name="پروفایل"
                                    minimize={minimize}
                                />

                                <NavLink
                                    href="#"
                                    icon={
                                        <Icon viewBox="0 0 24 24" type="stroke" width="2">
                                            <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </Icon>
                                    }
                                    name="تنظیمات"
                                    minimize={minimize}
                                />

                                <NavLink
                                    className="!mt-5"
                                    role="button"
                                    icon={
                                        <Icon viewBox="0 0 24 24" type="stroke" width="2">
                                            <polyline points="9 3 9 9 3 9"/>
                                            <polyline points="15 21 15 15 21 15"/>
                                            <polyline points="3 15 9 15 9 21"/>
                                            <polyline points="21 9 15 9 15 3"/>
                                        </Icon>
                                    }
                                    name="بستن منو"
                                    minimize={minimize}
                                    onClick={changeMinimize}
                                />
                            </div>
                        </nav>
                    </div>
                </aside>

                {header && (
                    <header className={`bg-white dark:bg-slate-900 transition-all ${minimize ? 'mr-24' : 'mr-52'}`}>
                        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between">
                                <h1 className="font-semibold text-xl text-gray-800 dark:text-slate-200 align-middle py-2">{header}</h1>
                                <button className="flex mr-auto bg-gray-100 dark:bg-slate-800 rounded-full w-10 h-10 ml-4 items-center justify-center" onClick={toggleDarkMode}>

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
                                <div className="relative">
                                    <TextInput
                                        id="search"
                                        className="py-2 text-sm"
                                        label="جستجو"
                                        svgIcon={<path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"></path>}
                                        size="1"
                                    />
                                    <div className="absolute z-10 top-12 left-0 hidden w-full bg-white rounded-lg p-4 border border-gray-200 text-sm">
                                        <p className="text-gray-700 border-b border-gray-300 text-xs pb-1">
                                            پرونده ها
                                        </p>
                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">
                                            <p>#11</p>
                                            <p>رضا نداف</p>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-800 ring-1 ring-inset ring-green-600/20">تکمیل</span>
                                        </div>
                                        <hr/>
                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">
                                            <p>#11</p>
                                            <p>رضا نداف</p>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-800 ring-1 ring-inset ring-green-600/20">تکمیل</span>
                                        </div>
                                        <hr/>
                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">
                                            <p>#11</p>
                                            <p>رضا نداف</p>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-800 ring-1 ring-inset ring-green-600/20">تکمیل</span>
                                        </div>

                                        <p className="text-gray-700 border-b border-gray-300 text-xs mt-4 pb-1">
                                            بیماران
                                        </p>
                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">
                                            <p>#11</p>
                                            <p>رضا نداف</p>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-800 ring-1 ring-inset ring-green-600/20">تکمیل</span>
                                        </div>
                                        <hr/>
                                        <div className="flex flex-row justify-between space-x-reverse py-4 px-2 m-1 rounded-lg items-center transition hover:bg-gray-100">
                                            <p>#11</p>
                                            <p>رضا نداف</p>
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs text-green-800 ring-1 ring-inset ring-green-600/20">تکمیل</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(breadcrumbs || headerButton) && (
                            <>
                                <hr className="w-fulll border-gray-300 dark:border-slate-600"/>
                                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between py-4 overflow-x-auto whitespace-nowrap">
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
                                                        <a href={breadcrumbs[sectionName]} className={`${keys[keys.length-1] === sectionName ? 'text-green-500 font-semibold' : 'text-gray-600 dark:text-slate-200'} hover:underline`}>
                                                            {sectionName}
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                    {headerButton && (
                                        headerButton
                                    )}
                                </div>
                            </>
                        )}

                    </header>
                )}

                <div className={`transition-all ${minimize ? 'mr-24' : 'mr-52'}`}>
                    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 xl:py-12">{children}</main>
                </div>
            </div>
        </div>
    );
}
