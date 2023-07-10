import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavLink from "@/Components/NavLink.jsx";
import Icon from "@/Components/Icon.jsx";

export default function UserSidebar({ minimize, changeMinimize, dark }) {
    return (
        <aside
            className={`fixed hide-scrollbar flex flex-col transition-all ${minimize ? 'w-24' : 'w-60'} h-screen px-8 py-6 overflow-y-auto bg-white border-l dark:bg-slate-800 dark:border-slate-900`}>
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
                                <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>کاربران</span>
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
                                name="همه کاربران"
                                minimize={minimize}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>سفارشات</span>
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
                                name="همه سفارشات"
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
                                name="ایجاد سفارش"
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
    );
}
