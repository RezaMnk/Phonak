import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link} from '@inertiajs/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import ArrowLink from "@/Components/ArrowLink.jsx";


export default function Admin({ users, records, data }) {

    data.charts.reverse()

    return (
        <AuthenticatedLayout
            header="داشبورد"
            breadcrumbs={
                {
                    'داشبورد': "#"
                }
            }
        >
            <Head title="داشبورد" />

            <div className="grid grid-cols-1 gap-8 xl:gap-16 md:grid-cols-2 xl:grid-cols-3 mb-16">
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-red-900 dark:text-red-400">
                            {data.users.all} همکار
                        </p>
                        <span className="font-semibold text-sm text-red-900/50 dark:text-red-400/60">
                            {data.users.verified} همکار تایید شده
                        </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-red-50 dark:bg-red-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-red-800/50 dark:text-red-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-orange-900 dark:text-orange-400">
                            {data.records.all} سفارش
                        </p>
                        <span className="font-semibold text-sm text-orange-900/50 dark:text-orange-400/60">
                            {data.records.paid} سفارش پرداخت شده
                            </span>
                    </div>
                    <div className="flex items-center w-14 h-14 bg-orange-50 dark:bg-orange-700/10 rounded-full transition ease-in group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="m-auto w-7 h-7 text-orange-800/50 dark:text-orange-300/70"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-lg p-6 group">
                    <div className="flex flex-col space-y-2 mr-5">
                        <p className="font-semibold text-purple-900 dark:text-purple-400">
                            {data.products.all} محصول
                        </p>
                        <span className="font-semibold text-sm text-purple-900/50 dark:text-purple-400/60">
                            {data.products.out_of_inventory} محصول بدون ظرفیت انبار
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
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-8 xl:gap-16 xl:grid-cols-3 mb-16">
                <div className="col-span-2 flex flex-col bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                سفارشات
                            </h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                لیست آخرین سفارشات ثبت شده
                            </p>
                        </div>
                        <div className="inline-flex">
                            <ArrowLink
                                href={route('admin.records')}
                                name="مشاهده همه"
                            />
                        </div>
                    </div>
                    <div className="relative overflow-x-auto rounded-lg mt-12">
                        <table className="w-full text-right text-gray-500 dark:text-slate-400">
                            <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    شماره سفارش
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    کاربر
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    برند
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    وضعیت
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(records).map((record) => {
                                const is_last = records[Object.keys(records)[Object.keys(records).length-1]] === record;
                                return (
                                    <tr key={record.id} className={`bg-white dark:bg-slate-800 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                        <th scope="row"
                                            className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                            {record.id}
                                        </th>
                                        <td className="px-6 py-4 text-sm">
                                            {record.patient.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {record.brand}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {record.status === 'paid' ? (
                                                <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                                    پرداخت شده
                                                </span>
                                            ) : (
                                                <span className="inline-flex whitespace-nowrap items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                                    در انتظار پرداخت
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-col bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                                همکاران
                            </h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                لیست آخرین همکاران در جریان
                            </p>
                        </div>
                        <div className="inline-flex">
                            <ArrowLink
                                href={route('users.index')}
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
                                    شماره نظام پزشکی
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    وضعیت
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.values(users).map((user) => {
                                const is_last = users[Object.keys(users)[Object.keys(users).length-1]] === user;
                                return (
                                    <tr key={user.id} className={`bg-white dark:bg-slate-800 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                        <th scope="row"
                                            className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                            <Link href={route('users.edit', user.id)}>
                                                {user.name}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4 text-sm">
                                            {user.med_number}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.status === 'approved' ? (
                                                <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                                    تایید شده
                                                </span>
                                            ) : (
                                                <span className="inline-flex whitespace-nowrap items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                                    در انتظار تایید
                                                </span>
                                            )}
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
                            مجموع سفارشات: {data.charts_data.records} ریال
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
                                data={data.charts}
                            >
                                <Area type="monotone" dataKey="record_price_avg" stroke="#16a34a" strokeWidth="1.5" fill="#16a34a30" />
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
                            مجموع محصولات: {data.charts_data.products} عدد
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
                                data={data.charts}
                            >
                                <Area type="monotone" dataKey="product_avg" stroke="#9333ea" strokeWidth="1.5" fill="#9333ea30" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-6">
                    <div className="flex flex-col space-y-4">
                        <p className="text-gray-700 dark:text-slate-200 font-semibold">
                            <span className="inline-block ml-3 mr-1 rounded-full bg-yellow-600/50 dark:bg-yellow-300 h-2.5 w-2.5 ring-1 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-yellow-600 dark:ring-yellow-400"></span>
                            همکاران هفته اخیر
                        </p>
                        <p className="text-sm text-gray-700 dark:text-slate-300">
                            تعداد همکاران جدید: {data.charts_data.users} نفر
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
                                data={data.charts}
                            >
                                <Area type="monotone" dataKey="user_avg" stroke="#ca8a04" strokeWidth="1.5" fill="#ca8a0430" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
