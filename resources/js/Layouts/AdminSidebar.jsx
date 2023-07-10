import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavLink from "@/Components/NavLink.jsx";
import Icon from "@/Components/Icon.jsx";

export default function AdminSidebar({ minimize, changeMinimize, dark }) {
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
                                <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>محصولات</span>
                                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                            </div>

                            <NavLink
                                href={route('products.index')}
                                active={route().current('products.index')}
                                icon={
                                    <Icon viewBox="0 0 24 24" type="fill">
                                        <path d="M19,13 C20.6568542,13 22,14.3431458 22,16 L22,19 C22,20.6568542 20.6568542,22 19,22 L16,22 C14.3431458,22 13,20.6568542 13,19 L13,16 C13,14.3431458 14.3431458,13 16,13 L19,13 Z M8,13 C9.65685425,13 11,14.3431458 11,16 L11,19 C11,20.6568542 9.65685425,22 8,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,16 C2,14.3431458 3.34314575,13 5,13 L8,13 Z M19,15 L16,15 C15.4477153,15 15,15.4477153 15,16 L15,19 C15,19.5522847 15.4477153,20 16,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,16 C20,15.4477153 19.5522847,15 19,15 Z M8,15 L5,15 C4.44771525,15 4,15.4477153 4,16 L4,19 C4,19.5522847 4.44771525,20 5,20 L8,20 C8.55228475,20 9,19.5522847 9,19 L9,16 C9,15.4477153 8.55228475,15 8,15 Z M8,2 C9.65685425,2 11,3.34314575 11,5 L11,8 C11,9.65685425 9.65685425,11 8,11 L5,11 C3.34314575,11 2,9.65685425 2,8 L2,5 C2,3.34314575 3.34314575,2 5,2 L8,2 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,8 C22,9.65685425 20.6568542,11 19,11 L16,11 C14.3431458,11 13,9.65685425 13,8 L13,5 C13,3.34314575 14.3431458,2 16,2 L19,2 Z M8,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,8 C4,8.55228475 4.44771525,9 5,9 L8,9 C8.55228475,9 9,8.55228475 9,8 L9,5 C9,4.44771525 8.55228475,4 8,4 Z M19,4 L16,4 C15.4477153,4 15,4.44771525 15,5 L15,8 C15,8.55228475 15.4477153,9 16,9 L19,9 C19.5522847,9 20,8.55228475 20,8 L20,5 C20,4.44771525 19.5522847,4 19,4 Z"/>
                                    </Icon>
                                }
                                name="همه محصولات"
                                minimize={minimize}
                            />
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
                                name="افزودن محصول"
                                minimize={minimize}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>همکاران</span>
                                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                            </div>
                            <NavLink
                                href="#"
                                // active={route().current('records.index')}
                                icon={
                                    <Icon viewBox="0 0 24 24" type="stroke" width="2">
                                        <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"/>
                                    </Icon>
                                }
                                name="همه همکاران"
                                minimize={minimize}
                            />
                            <NavLink
                                href="#"
                                // active={route().current('records.index')}
                                icon={
                                    <Icon viewBox="0 0 24 24" type="stroke" width="2">
                                        <path xmlns="http://www.w3.org/2000/svg" d="M16 18L18 20L22 16M12 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"/>
                                    </Icon>
                                }
                                name="همکاران تایید نشده"
                                minimize={minimize}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className={`flex items-center ${minimize ? 'my-5' : undefined}`}>
                                <span className={`px-3 text-xs text-gray-500 dark:text-slate-200 ${minimize ? 'hidden' : undefined}`}>سفارشات</span>
                                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-500"></div>
                            </div>
                            <NavLink
                                href="#"
                                // active={route().current('dashboard')}
                                icon={
                                    <Icon viewBox="0 0 24 24" type="fill">
                                        <path d="M6 4C4.89543 4 4 4.89543 4 6V9C4 10.1046 4.89543 11 6 11H9C10.1046 11 11 10.1046 11 9V6C11 4.89543 10.1046 4 9 4H6ZM6 6H9V9H6V6ZM14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8H19C19.5523 8 20 7.55228 20 7C20 6.44772 19.5523 6 19 6H14ZM14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17H19C19.5523 17 20 16.5523 20 16C20 15.4477 19.5523 15 19 15H14ZM4 15C4 13.8954 4.89543 13 6 13H9C10.1046 13 11 13.8954 11 15V18C11 19.1046 10.1046 20 9 20H6C4.89543 20 4 19.1046 4 18V15ZM9 15H6V18H9V15Z"/>
                                    </Icon>
                                }
                                name="همه سفارشات"
                                minimize={minimize}
                            />
                            <NavLink
                                href="#"
                                // active={route().current('dashboard')}
                                icon={
                                    <Icon viewBox="0 0 24 24" type="stroke" width="2">
                                        <rect x="3" y="6" width="18" height="13" rx="2"/>
                                        <path d="M3 10H20.5"/>
                                        <path d="M7 15H9"/>
                                    </Icon>
                                }
                                name="پرداخت ها"
                                minimize={minimize}
                            />
                        </div>
                    </div>
                    <div className="space-y-3 mt-6">
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
