import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Pagination from "@/Components/Pagination.jsx";

export default function Index({ accessories }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [modalAccessory, setModalAccessory] = useState({});

    const data_accessories = accessories.data

    const {
        delete: destroy,
        processing,
    } = useForm();

    const deleteAccessory = (e) => {
        e.preventDefault();

        destroy(route('accessories.destroy', modalAccessory), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

    return (
        <AuthenticatedLayout
            header="سفارشات لوازم جانبی"
            breadcrumbs={
                {
                    'سفارشات لوازم جانبی': route('accessories.index')
                }
            }
            headerExtra={
                <PrimaryButton
                    link={true}
                    href={route('accessories.create')}
                    className="!px-4 !py-2 text-xs"
                >
                    سفارش جدید
                </PrimaryButton>
            }
        >
            <Head title="سفارشات لوازم جانبی" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                شماره سفارش
                            </th>
                            <th scope="col" className="px-6 py-3">
                                محصول
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
                    {Object.keys(data_accessories).length ? Object.values(data_accessories).map((accessory) => {
                        const is_last = data_accessories[Object.keys(data_accessories).length-1] === accessory;
                        return (
                            <tr key={accessory.id} className={`bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 hidden xl:table-cell">
                                    {accessory.id}
                                </th>
                                <td className="px-6 py-4">
                                    {accessory.product.name}
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
                                    {! ['completed', 'paid', 'approved'].includes(accessory.status) && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-red-50 dark:bg-red-500/30 px-2 py-1 text-sm font-medium text-red-800 dark:text-red-300/70 ring-1 ring-inset ring-red-600/20">
                                            در انتظار تکمیل
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {accessory.status === 'completed' && (
                                        <a href={route('accessories.pay', [accessory.id])}
                                           className="inline-flex px-2 py-1 text-xs text-center text-green-900 dark:text-green-200 transition-colors duration-300 bg-green-100 dark:bg-green-600/50 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-200 dark:hover:bg-green-600 focus:outline-none focus:ring-0 focus:border-green-500"
                                           target="_blank"
                                        >
                                            پرداخت سفارش
                                        </a>
                                    )}

                                    {['paid', 'approved'].includes(accessory.status) ? (
                                        <Link href={route('accessories.show', [accessory.id])}
                                              className="inline-flex px-2 py-1 text-xs text-center text-sky-900 dark:text-sky-200 transition-colors duration-300 bg-sky-100 dark:bg-sky-600/50 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-600 focus:outline-none focus:ring-0 focus:border-sky-500"
                                        >
                                            نمایش
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={route('accessories.edit', [accessory.id])}
                                                  className="inline-flex mr-2 px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                            >
                                                ویرایش
                                            </Link>
                                            <button type="button" onClick={() => {
                                                setDeleteModalShow(true);
                                                setModalAccessory(accessory)
                                            }}
                                                    className="inline-flex mr-2 px-2 py-1 text-xs text-center text-red-900 dark:text-red-200 transition-colors duration-300 bg-red-100 dark:bg-red-600/50 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-200 dark:hover:bg-red-600 focus:outline-none focus:ring-0 focus:border-red-500"
                                            >
                                                حذف
                                            </button>
                                        </>
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
                                <Link href={route('accessories.create')}
                                    className="mr-2 text-sky-500 text-base"
                                >
                                    ایجاد اولین سفارش
                                </Link>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={accessories}/>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deleteAccessory} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        آیا از حذف سفارش مطمئن هستید؟
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-slate-300">
                        با حذف سفارش، اطلاعات ثبت شده حذف خواهند شد و غیرقابل برگشت خواهند بود!
                    </p>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" type="button" onClick={(closeModal)}>
                            لغو
                        </SecondaryButton>

                        <DangerButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            تایید حذف سفارش
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
