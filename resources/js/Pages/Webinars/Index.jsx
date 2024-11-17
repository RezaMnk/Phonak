import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {useEffect, useState} from "react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function Index({ webinarRegisters }) {

    return (
        <AuthenticatedLayout
            header="ثبت نامی های وبینار"
            breadcrumbs={
                {
                    'ثبت نامی های وبینار': route('webinars.index')
                }
            }
        >
            <Head title="ثبت نامی های وبینار"/>


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400 xl:table-fixed">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            شناسه
                        </th>
                        <th scope="col" className="px-6 py-3">
                                نام
                            </th>
                            <th scope="col" className="px-6 py-3">
                                کد ملی
                            </th>
                            <th scope="col" className="px-6 py-3">
                                موقعیت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                شماره تلفن همراه
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تحصیلات
                            </th>
                            <th scope="col" className="px-6 py-3">
                                شناسه پرداخت
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تاریخ پرداخت
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(webinarRegisters.data).length ? Object.values(webinarRegisters.data).map((webinarRegister) => {
                        const is_last = webinarRegisters.data[Object.keys(webinarRegisters.data).length-1] === webinarRegister;
                        return (
                            <tr key={webinarRegister.id} className={`bg-white dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300">
                                    {webinarRegister.id}
                                </th>
                                <td className="px-6 py-4">
                                    {webinarRegister.first_name +' '+ webinarRegister.last_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {webinarRegister.national_code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {webinarRegister.state} ،{webinarRegister.city}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {webinarRegister.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {webinarRegister.grade} {webinarRegister.education_year && (" - " + webinarRegister.education_year)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {webinarRegister.transaction_id_short}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {webinarRegister.created_ago}
                                </td>
                            </tr>
                        )
                    }) : (
                        <tr className="bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900">
                            <th scope="row"
                                colSpan="9"
                                className="text-lg px-6 py-6">
                                هیچ ثبت نامی یافت نشد!
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={webinarRegisters}/>

        </AuthenticatedLayout>
    );
}
