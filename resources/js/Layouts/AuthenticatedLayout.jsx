import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, breadcrumbs, children }) {
    const [minimize, setMinimize] = useState(false);

    const changeMinimize = (e) => {
        e.preventDefault();
        setMinimize(! minimize)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <aside
                className={`fixed flex flex-col transition-all ${minimize ? 'w-24' : 'w-52'} h-screen px-8 py-8 overflow-y-auto bg-white border-l dark:bg-gray-900 dark:border-gray-700`}>
                <a href="#">
                    <ApplicationLogo className={`transition-all ${minimize ? 'w-12' : 'w-16'}`} />
                </a>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 flex flex-col justify-between items-center flex-1">
                        <div className={! minimize && 'space-y-8'}>
                            <NavLink
                                className=""
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                               d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"/>}
                                name="داشبورد"
                                minimize={minimize}
                            />
                            <div className="space-y-3">
                                <div className={`flex items-center ${minimize ? 'my-5' : ''}`}>
                                    <span className={`px-3 text-xs text-gray-500 ${minimize && 'hidden'}`}>بیماران</span>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>

                                <NavLink
                                    href={route('patients')}
                                    active={route().current('patients')}
                                    svgIcon={<path id="Vector"
                                                   d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                                                   strokeWidth="2" strokeLinecap="round"
                                                   strokeLinejoin="round"/>}
                                    name="همه بیماران"
                                        minimize={minimize}
                                />

                                <NavLink
                                    href="#"
                                    // active={route().current('dashboard')}
                                    svgIcon={(
                                        <>
                                            <path d="M7,5H3M5,7V3" />
                                            <path d="M11,3.41A5.11,5.11,0,0,1,13,3a5,5,0,1,1-4.59,7" />
                                            <path d="M12,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1v0A7,7,0,0,1,12,13Z" />
                                        </>
                                    )}
                                    iconWidth="2"
                                    name="افزودن بیمار"
                                    minimize={minimize}
                                />
                            </div>

                            <div className="space-y-3">
                                <div className={`flex items-center ${minimize ? 'my-5' : ''}`}>
                                    <span className={`px-3 text-xs text-gray-500 ${minimize && 'hidden'}`}>پرونده ها</span>
                                    <div className="flex-grow h-px bg-gray-300"></div>
                                </div>
                                <NavLink
                                    href="#"
                                    // active={route().current('dashboard')}
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>}
                                    name="همه پرونده ها"
                                    minimize={minimize}
                                />

                                <NavLink
                                    href="#"
                                    // active={route().current('dashboard')}
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>}
                                    name="ایجاد پرونده"
                                    minimize={minimize}
                                />
                            </div>
                        </div>
                        <div className="space-y-3 mt-6">
                            <div className={`flex items-center ${minimize ? 'my-5' : ''}`}>
                                <span
                                    className={`px-3 text-xs text-gray-500 ${minimize && 'hidden'}`}>
                                    حساب کاربری
                                </span>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>

                            <NavLink
                                href="#"
                                svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                               d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                iconWidth="2"
                                name="پروفایل"
                                minimize={minimize}
                            />

                            <NavLink
                                href="#"
                                svgIcon={(
                                    <>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </>
                                )}
                                iconWidth="2"
                                name="تنظیمات"
                                minimize={minimize}
                            />

                            <NavLink
                                className="!mt-5"
                                role="button"
                                svgIcon={(
                                    <>
                                        <polyline xmlns="http://www.w3.org/2000/svg" points="9 3 9 9 3 9"/>
                                        <polyline xmlns="http://www.w3.org/2000/svg" points="15 21 15 15 21 15"/>
                                        <polyline xmlns="http://www.w3.org/2000/svg" points="3 15 9 15 9 21"/>
                                        <polyline xmlns="http://www.w3.org/2000/svg" points="21 9 15 9 15 3"/>
                                    </>
                                )}
                                iconWidth="2"
                                name="بستن منو"
                                minimize={minimize}
                                onClick={changeMinimize}
                            />
                        </div>
                    </nav>
                </div>
            </aside>

            {header && (
                <header className={`bg-white transition-all ${minimize ? 'mr-24' : 'mr-52'}`}>
                    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>

                    {breadcrumbs && (
                        <div className="container mx-auto border-t py-6 px-4 sm:px-6 lg:px-8 flex items-center py-4 overflow-x-auto whitespace-nowrap">

                            <a href={route('dashboard')} className="text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                            </a>

                            {Object.keys(breadcrumbs).map((sectionName, i) => {
                                const keys = Object.keys(breadcrumbs);
                                return (
                                    <>
                                        <span className="mx-5 text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" stroke="currentColor" fill="currentColor">
                                                <path
                                                    d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                                                />
                                            </svg>
                                        </span>

                                        <a href={breadcrumbs[sectionName]} className={`${keys[keys.length-1] === sectionName ? 'text-green-500 font-semibold' : 'text-gray-600'} hover:underline`}>
                                            {sectionName}
                                        </a>
                                    </>
                                )
                            })}

                        </div>
                    )}

                </header>
            )}

            <div className={`transition-all ${minimize ? 'mr-24' : 'mr-52'}`}>
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 py-12">{children}</main>
            </div>
        </div>
    );
}
