import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import {useEffect, useState} from "react";
import {useFirstRender} from "@/Hooks/useFirstRender.js";
import TextInput from "@/Components/TextInput.jsx";

export default function Index({ accessories }) {

    const [search, setSearch] = useState((new URLSearchParams(window.location.search).get('search')) || '')

    const firstRender = useFirstRender();


    useEffect(() => {
        if (! firstRender)
        {
            const delayDebounceFn = setTimeout( () => {
                router.get(route('admin.accessories'), {
                    search: search
                })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    return (
        <AuthenticatedLayout
            header="سفارشات لوازم جانبی"
            breadcrumbs={
                {
                    'سفارشات لوازم جانبی': route('admin.accessories')
                }
            }
            headerExtra={
                <form id="search">
                    <TextInput
                        id="search-input"
                        name="search"
                        value={search}
                        label="جستوجو..."
                        className="!py-2 !px-4"
                        autoComplete="name"
                        onChange={(e) => setSearch(e.target.value)}
                        isFocused={!! search}
                    />
                </form>
            }
        >
            <Head title="سفارشات لوازم جانبی" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                شماره سفارش
                            </th>
                            <th scope="col" className="px-6 py-3">
                                همکار
                            </th>
                            <th scope="col" className="px-6 py-3">
                                برند
                            </th>
                            <th scope="col" className="px-6 py-3">
                                نوع سفارش
                            </th>
                            <th scope="col" className="px-6 py-3">
                                وضعیت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                شناسه پرداخت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تاریخ پرداخت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(accessories.data).length ? Object.values(accessories.data).map((accessory) => {
                        const is_last = accessories.data[Object.keys(accessories.data).length-1] === accessory;
                        return (
                            <tr key={accessory.id} className={`bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4">
                                    {accessory.id}
                                </th>
                                <td className="px-6 py-4 font-medium">
                                    {accessory.user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {accessory.brand}
                                </td>
                                <td className="px-6 py-4">
                                    {accessory.type}
                                </td>
                                <td className="px-6 py-4">
                                    {accessory.status === 'completed' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار پرداخت
                                        </span>
                                    )}
                                    {accessory.status === 'paid' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                            پرداخت شده
                                        </span>
                                    )}
                                    {accessory.status === 'approved' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            تایید شده
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {accessory.status !== 'completed' ? accessory.payment?.transaction_id_short ? <>{accessory.payment?.transaction_id_short} ({accessory.payment.gateway_name})</> : 'بدون پرداخت' : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    {accessory.status !== 'completed' ? accessory.payment?.transaction_id_short ? accessory.payment?.created_date : 'بدون پرداخت' : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    {/*{accessory.status === 'paid' && (*/}
                                        <Link href={route('accessories.show', [accessory.id])}
                                              className="inline-flex px-2 py-1 text-xs text-center text-sky-900 dark:text-sky-200 transition-colors duration-300 bg-sky-100 dark:bg-sky-600/50 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-600 focus:outline-none focus:ring-0 focus:border-sky-500"
                                        >
                                            نمایش
                                        </Link>
                                    {/*)}*/}
                                </td>
                            </tr>
                        )
                    }) : (
                        <tr className="bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900">
                            <th scope="row"
                                colSpan="8"
                                className="text-lg px-6 py-6">
                                هیچ سفارشی یافت نشد!
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={accessories}/>

        </AuthenticatedLayout>
    );
}
