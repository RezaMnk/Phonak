import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";

export default function Index({ records }) {

    const data_records = records.data


    return (
        <AuthenticatedLayout
            header="سفارشات سمعک"
            breadcrumbs={
                {
                    'سفارشات سمعک': route('admin.records')
                }
            }
        >
            <Head title="سفارشات سمعک" />


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
                                کاربر
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
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data_records).length ? Object.values(data_records).map((record) => {
                        const is_last = data_records[Object.keys(data_records).length-1] === record;
                        return (
                            <tr key={record.id} className={`bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4">
                                    {record.id}
                                </th>
                                <td className="px-6 py-4 font-medium">
                                    {record.user.name}
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {record.patient.name}
                                </td>
                                <td className="px-6 py-4">
                                    {record.brand}
                                </td>
                                <td className="px-6 py-4">
                                    {record.type}
                                </td>
                                <td className="px-6 py-4">
                                    {record.status === 'completed' ? (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                            تکمیل شده
                                        </span>
                                    ) : (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار تکمیل
                                        </span>
                                    )}
                                </td>
                            </tr>
                        )
                    }) : (
                        <tr className="bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900">
                            <th scope="row"
                                colSpan="6"
                                className="text-lg px-6 py-6">
                                هیچ سفارشی یافت نشد!
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={records}/>

        </AuthenticatedLayout>
    );
}
