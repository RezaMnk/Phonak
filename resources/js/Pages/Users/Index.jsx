import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import {useEffect, useState} from "react";
import TextInput from "@/Components/TextInput.jsx";
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function Index({ users }) {

    const [usersData, setUsersData] = useState(users)

    const [search, setSearch] = useState((new URLSearchParams(window.location.search).get('search')) || '')

    const firstRender = useFirstRender();


    useEffect(() => {
        if (! firstRender)
        {
            const delayDebounceFn = setTimeout( () => {
                router.get(route(users.status === 'unapproved' ? 'users.not_verified' : 'users.index'), {
                    search: search
                })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    return (
        <AuthenticatedLayout
            header="همکاران"
            breadcrumbs={
                {
                    'همکاران': route('users.index')
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
                    />
                </form>
            }
        >
            <Head title="همکاران" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                نام و نام خانوادگی
                            </th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                شماره نظام پزشکی
                            </th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                موقعیت
                            </th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                شماره گروه
                            </th>
                            <th scope="col" className="px-6 py-3">
                                وضعیت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(usersData.data).length ? Object.values(usersData.data).map((user) => {
                        const is_last = usersData.data[Object.keys(usersData.data).length-1] === user;
                        return (
                            <tr key={user.id} className={`bg-white dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    {user.med_number}
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    {user.state} - {user.city}
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    {user.group === 0 ? 'گروه بندی نشده' : user.group}
                                </td>
                                <td className="px-6 py-4">
                                    {user.status === 'approved' ? (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                            تایید شده
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار تایید
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={route('users.edit', [user.id])}
                                        className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                    >
                                        ویرایش
                                    </Link>
                                </td>
                            </tr>
                        )
                    }) : (
                        <tr className="bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900">
                            <th scope="row"
                                colSpan="6"
                                className="text-lg px-6 py-6">
                                هیچ همکاری یافت نشد!
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={usersData} search={search}/>

        </AuthenticatedLayout>
    );
}
