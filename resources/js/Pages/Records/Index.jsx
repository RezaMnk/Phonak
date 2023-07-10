import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Index({ records }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [modalRecord, setModalRecord] = useState({});

    const data_records = records.data

    const {
        delete: destroy,
        processing,
    } = useForm();

    const deletePatient = (e) => {
        e.preventDefault();

        destroy(route('records.destroy', modalRecord), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

    return (
        <AuthenticatedLayout
            header="سفارشات"
            breadcrumbs={
                {
                    'سفارشات': route('records.index')
                }
            }
            headerButton={
                <PrimaryButton
                    link={true}
                    href={route('records.create')}
                    className="!px-4 !py-2 text-xs"
                >
                    سفارش جدید
                </PrimaryButton>
            }
        >
            <Head title="سفارشات" />


            <div className="relative overflow-x-auto rounded-lg">
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
                            <th scope="col" className="px-6 py-3">
                                نوع سفارش
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
                    {Object.keys(data_records).length ? Object.values(data_records).map((record) => {
                        const is_last = data_records[Object.keys(data_records).length-1] === record;
                        return (
                            <tr key={record.id} className={`bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900 ${! is_last ? 'border-b' : undefined} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4">
                                    {record.id}
                                </th>
                                <td className="px-6 py-4 font-medium">
                                    <Link href={route('patients.edit', record.patient.id)}
                                        className="hover:text-gray-600 dark:hover:text-slate-400"
                                    >
                                        {record.patient.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    {record.brand === 'phonak' ? 'فوناک' : 'هنزاتون'}
                                </td>
                                <td className="px-6 py-4">
                                    {record.type}
                                </td>
                                <td className="px-6 py-4">
                                    {record.status === 'completed' ? (
                                        <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            تکمیل شده
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار تکمیل
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={route('records.edit', [record.id])}
                                        className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                    >
                                        ویرایش
                                    </Link>
                                    <button type="button" onClick={() => {
                                        setDeleteModalShow(true);
                                        setModalRecord(record)
                                    }}
                                        className="inline-flex mr-2 px-2 py-1 text-xs text-center text-red-900 dark:text-red-200 transition-colors duration-300 bg-red-100 dark:bg-red-600/50 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-200 dark:hover:bg-red-600 focus:outline-none focus:ring-0 focus:border-red-500"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        )
                    }) : (
                        <tr className="bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900">
                            <th scope="row"
                                colSpan="6"
                                className="text-lg px-6 py-6">
                                هیچ سفارشی یافت نشد!
                                <Link href={route('records.create')}
                                    className="mr-2 text-green-500 text-base"
                                >
                                    ایجاد اولین سفارش
                                </Link>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={records}/>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deletePatient} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        آیا از حذف کاربر مطمئن هستید؟
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-slate-300">
                        با حذف بیمار، اطلاعات و سفارشات ثبت شده کاربر نیز حذف خواهند شد!
                    </p>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" onClick={(closeModal)}>
                            لغو
                        </SecondaryButton>

                        <DangerButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            تایید حذف کاربر
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
