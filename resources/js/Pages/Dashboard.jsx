import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ArrowLink from "@/Components/ArrowLink.jsx";


const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

export default function Dashboard({ auth, patients, notifies = {} }) {
    return (
        <AuthenticatedLayout
            notifies={notifies}
            user={auth.user}
            header="داشبورد"
            breadcrumbs={
                {
                    'داشبورد': "#"
                }
            }
        >
            <Head title="داشبورد" />

            <div className="grid grid-cols-1 gap-8 xl:gap-16 md:grid-cols-2 xl:grid-cols-4 mb-16">
                <a href="#" className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-red-900 dark:text-red-400">
                            56 مشتری
                        </p>
                        <span className="font-semibold text-sm text-red-900/50 dark:text-red-400/60">
                            44 دارای پرونده
                        </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-red-50 dark:bg-red-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-red-800/50 dark:text-red-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </a>
                <a href="#" className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-orange-900 dark:text-orange-400">
                            44 پرونده
                        </p>
                        <span className="font-semibold text-sm text-orange-900/50 dark:text-orange-400/60">
                                13 در جریان
                            </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-orange-50 dark:bg-orange-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-orange-800/50 dark:text-orange-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                        </svg>
                    </div>
                </a>
                <a href="#" className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-blue-900 dark:text-blue-400">
                            32 سفارش
                        </p>
                        <span className="font-semibold text-sm text-blue-900/50 dark:text-blue-400/60">
                            28 پرداخت شده
                        </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-blue-50 dark:bg-blue-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-blue-800/50 dark:text-blue-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M14 7H16.3373C16.5818 7 16.7041 7 16.8192 7.02763C16.9213 7.05213 17.0188 7.09253 17.1083 7.14736C17.2092 7.2092 17.2957 7.29568 17.4686 7.46863L21.5314 11.5314C21.7043 11.7043 21.7908 11.7908 21.8526 11.8917C21.9075 11.9812 21.9479 12.0787 21.9724 12.1808C22 12.2959 22 12.4182 22 12.6627V15.5C22 15.9659 22 16.1989 21.9239 16.3827C21.8224 16.6277 21.6277 16.8224 21.3827 16.9239C21.1989 17 20.9659 17 20.5 17M15.5 17H14M14 17V7.2C14 6.0799 14 5.51984 13.782 5.09202C13.5903 4.71569 13.2843 4.40973 12.908 4.21799C12.4802 4 11.9201 4 10.8 4H5.2C4.0799 4 3.51984 4 3.09202 4.21799C2.71569 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.0799 2 7.2V15C2 16.1046 2.89543 17 4 17M14 17H10M10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17M10 17C10 15.3431 8.65685 14 7 14C5.34315 14 4 15.3431 4 17M20.5 17.5C20.5 18.8807 19.3807 20 18 20C16.6193 20 15.5 18.8807 15.5 17.5C15.5 16.1193 16.6193 15 18 15C19.3807 15 20.5 16.1193 20.5 17.5Z"/>
                        </svg>
                    </div>
                </a>
                <a href="#" className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-purple-900 dark:text-purple-400">
                            12 محصول
                        </p>
                        <span className="font-semibold text-sm text-purple-900/50 dark:text-purple-400/60">
                            5 محصول بدون ظرفیت انبار
                        </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-purple-50 dark:bg-purple-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-purple-800/50 dark:text-purple-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978"/>
                            <path d="M12 12V21"/>
                            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z"/>
                            <path d="M8.5 4.5L16 9"/>
                        </svg>
                    </div>
                </a>
            </div>
            <div className="grid grid-cols-1 gap-8 xl:gap-16 xl:grid-cols-3 mb-16">
                <div className="col-span-2 flex flex-col bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                پرونده ها
                            </h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                لیست آخرین پرونده های ثبت شده
                            </p>
                        </div>
                        <div className="inline-flex">
                            <ArrowLink
                                href={route('patients')}
                                name="مشاهده همه"
                            />
                        </div>
                    </div>
                    <div className="relative overflow-x-auto rounded-lg mt-12">
                        <table className="w-full text-right text-gray-500 dark:text-slate-400">
                            <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">شماره پرونده</th>
                                    <th scope="col" className="px-6 py-3">بیمار</th>
                                    <th scope="col" className="px-6 py-3">برند سمعک</th>
                                    <th scope="col" className="px-6 py-3">نوع سفارش</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-600">
                                    <th scope="row"
                                        className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                        519
                                    </th>
                                    <td className="px-6 py-4 text-sm">
                                        رضا نداف
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        فوناک
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        CIC
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            تکمیل
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                        href="#">
                                            ویرایش
                                        </a>
                                        <a className="inline-flex mr-3 px-2 py-1 text-xs text-center text-green-900 dark:text-green-200 transition-colors duration-300 bg-green-100 dark:bg-green-600/50 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-200 dark:hover:bg-green-600 focus:outline-none focus:ring-0 focus:border-green-500"
                                        href="#">
                                            مشاهده
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-slate-800">
                                    <th scope="row"
                                        className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                        518
                                    </th>
                                    <td className="px-6 py-4 text-sm">
                                        علی حسین خانی
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        هنزاتون
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        BTE
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار تکمیل
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                        href="#">
                                            ویرایش
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/*<table className="w-full text-right text-gray-500">*/}
                        {/*    <thead className="text-xs text-gray-700 bg-gray-50">*/}
                        {/*    <tr>*/}
                        {/*        <th scope="col" className="px-6 py-3">*/}
                        {/*            نام و نام خانوادگی*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-6 py-3">*/}
                        {/*            کد ملی*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-6 py-3">*/}
                        {/*            سن*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-6 py-3">*/}
                        {/*            شماره تماس*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-6 py-3">*/}
                        {/*            محل سکونت*/}
                        {/*        </th>*/}
                        {/*        <th scope="col" className="px-6 py-3 text-center">*/}
                        {/*            عملیات*/}
                        {/*        </th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {Object.values(patients).map((patient) => {*/}
                        {/*        return (*/}
                        {/*            <tr key={patient.id} className="bg-white border-b">*/}
                        {/*                <th scope="row"*/}
                        {/*                    className="px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">*/}
                        {/*                    {patient.name}*/}
                        {/*                </th>*/}
                        {/*                <td className="px-6 py-4 text-sm">*/}
                        {/*                    {patient.national_code}*/}
                        {/*                </td>*/}
                        {/*                <td className="px-6 py-4 text-sm">*/}
                        {/*            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-800 ring-1 ring-inset ring-green-600/20">*/}
                        {/*                {patient.age}*/}
                        {/*            </span>*/}
                        {/*                </td>*/}
                        {/*                <td className="px-6 py-4 text-sm">*/}
                        {/*                    {patient.phone}*/}
                        {/*                </td>*/}
                        {/*                <td className="px-6 py-4 text-sm">*/}
                        {/*                    {patient.state} - {patient.city}*/}
                        {/*                </td>*/}
                        {/*                <td className="px-6 py-4 text-center">*/}
                        {/*                    <Link href={route('patients.edit', [patient.id])}*/}
                        {/*                          className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 transition-colors duration-300 bg-yellow-100 border border-yellow-200 rounded-lg hover:bg-yellow-200 focus:outline-none focus:ring-0 focus:border-yellow-500"*/}
                        {/*                    >*/}
                        {/*                        ویرایش*/}
                        {/*                    </Link>*/}
                        {/*                    <Link href={route('patients.edit', [patient.id])}*/}
                        {/*                          className="inline-flex mr-3 px-2 py-1 text-xs text-center text-red-900 transition-colors duration-300 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-0 focus:border-red-500"*/}
                        {/*                    >*/}
                        {/*                        حذف*/}
                        {/*                    </Link>*/}
                        {/*                </td>*/}
                        {/*            </tr>*/}
                        {/*        )*/}
                        {/*    })}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </div>
                </div>
                <div className="flex flex-col bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                بیماران
                            </h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                لیست آخرین بیماران در جریان
                            </p>
                        </div>
                        <div className="inline-flex">
                            <ArrowLink
                                href={route('patients')}
                                name="مشاهده همه"
                            />
                        </div>
                    </div>
                    <div className="relative overflow-x-auto rounded-lg mt-12">
                        <table className="w-full text-right text-gray-500 dark:text-slate-400">
                            <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    نام و نام خانوادگی
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    کد ملی
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    عملیات
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(patients).map((patient) => {
                                const is_last = patients[Object.keys(patients).length-1] === patient;
                                return (
                                    <tr key={patient.id} className={`bg-white dark:bg-slate-800 ${! is_last ? 'border-b' : undefined} border-gray-200 dark:border-slate-600`}>
                                        <th scope="row"
                                            className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                            {patient.name}
                                        </th>
                                        <td className="px-6 py-4 text-sm">
                                            {patient.national_code}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={route('patients.edit', [patient.id])}
                                                  className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                            >
                                                ویرایش
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-3 mb-16">
                <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex flex-col space-y-4">
                        <p className="text-gray-700 dark:text-slate-200 font-semibold">
                            <span className="inline-block ml-3 mr-1 rounded-full bg-green-600/50 dark:bg-green-300 h-2.5 w-2.5 ring-1 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-green-600 dark:ring-green-400"></span>
                            سفارشات هفته اخیر
                        </p>
                        <p className="text-sm text-gray-700 dark:text-slate-300">
                            مجموعه سفارشات: 5,300,500 تومان
                            <span
                                className="inline-flex mr-2 text-[.7rem] rounded-md bg-green-50 dark:bg-green-500/30 px-1 py-0.5 text-green-800 dark:text-green-300 ring-1 ring-green-600/20">
                                تسویه شده
                            </span>
                        </p>
                    </div>
                    <div className="h-24 mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={800}
                                data={data}
                            >
                                <Area type="monotone" dataKey="uv" stroke="#16a34a" strokeWidth="1.5" fill="#16a34a30" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex flex-col space-y-4">
                        <p className="text-gray-700 dark:text-slate-200 font-semibold">
                            <span className="inline-block ml-3 mr-1 rounded-full bg-purple-600/50 dark:bg-purple-300 h-2.5 w-2.5 ring-1 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-purple-600 dark:ring-purple-400"></span>
                             محصولات فروخته شده هفته اخیر
                        </p>
                        <p className="text-sm text-gray-700 dark:text-slate-300">
                            مجموع محصولات: 431 عدد
                            <span
                                className="inline-flex mr-2 text-[.7rem] rounded-md bg-purple-50 dark:bg-purple-500/30 px-1 py-0.5 text-purple-800 dark:text-purple-300 ring-1 ring-purple-600/20">
                                بروزرسانی شده
                            </span>
                        </p>
                    </div>
                    <div className="h-24 mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={800}
                                data={data}
                            >
                                <Area type="monotone" dataKey="pv" stroke="#9333ea" strokeWidth="1.5" fill="#9333ea30" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex flex-col space-y-4">
                        <p className="text-gray-700 dark:text-slate-200 font-semibold">
                            <span className="inline-block ml-3 mr-1 rounded-full bg-yellow-600/50 dark:bg-yellow-300 h-2.5 w-2.5 ring-1 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-yellow-600 dark:ring-yellow-400"></span>
                            مشتریان هفته اخیر
                        </p>
                        <p className="text-sm text-gray-700 dark:text-slate-300">
                            تعداد مشتریان جدید: 7 نفر
                            <span
                                className="inline-flex mr-2 text-[.7rem] rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-1 py-0.5 text-yellow-800 dark:text-yellow-300 ring-1 ring-yellow-600/20">
                                بروزرسانی شده
                            </span>
                        </p>
                    </div>
                    <div className="h-24 mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={800}
                                data={data}
                            >
                                <Area type="monotone" dataKey="amt" stroke="#ca8a04" strokeWidth="1.5" fill="#ca8a0430" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
