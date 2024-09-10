import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Pagination from "@/Components/Pagination.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function Index({ records }) {

    const { user } = usePage().props.auth

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [paymentModalShow, setPaymentModalShow] = useState(false);

    const [modalRecord, setModalRecord] = useState({});
    const [paymentModalRecord, setPaymentModalRecord] = useState({});

    const data_records = records.data

    const {
        delete: destroy,
        processing,
    } = useForm();

    const {
        data,
        setData,
        get,
        processing: paymentProcessing,
    } = useForm({
        gateway: 'zarinpal'
    });

    const deleteRecord = (e) => {
        e.preventDefault();

        destroy(route('records.destroy', modalRecord), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const payRecord = (e, record = false) => {
        e.preventDefault();

        record = record || paymentModalRecord;
        console.log(route('records.pay', {record: record, ...data}))
        window.open(route('records.pay', {record: record, ...data}), '_blank').focus();
        // get(route('records.pay', record), {
        //     preserveScroll: true,
        //     onSuccess: () => closePaymentModal(),
        // });
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

    const closePaymentModal = () => {
        setPaymentModalShow(false)
    }

    return (
        <AuthenticatedLayout
            header="سفارشات سمعک"
            breadcrumbs={
                {
                    'سفارشات سمعک': route('records.index')
                }
            }
            headerExtra={
                <PrimaryButton
                    link={true}
                    href={route('records.create')}
                    className="!px-4 !py-2 text-xs"
                >
                    سفارش جدید
                </PrimaryButton>
            }
        >
            <Head title="سفارشات سمعک" />

            <div className="mb-8 p-4 text-sm font-semibold bg-teal-200 dark:bg-teal-700 text-teal-700 dark:text-teal-100 rounded-lg">
                لطفا پس از پرداخت منتظر هدایت شدن به وبسایت بمانید.
            </div>

            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                شماره سفارش
                            </th>
                            <th scope="col" className="px-6 py-3">
                                کاربر
                            </th>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                برند
                            </th>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
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
                            <tr key={record.id} className={`bg-white text-gray-700 dark:text-slate-300 dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 hidden xl:table-cell">
                                    {record.id}
                                </th>
                                <td className="px-6 py-4 font-medium">
                                    <Link href={route('patients.edit', record.patient.id)}
                                        className="hover:text-gray-600 dark:hover:text-slate-400"
                                    >
                                        {record.patient.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    {record.brand}
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    {record.type}
                                </td>
                                <td className="px-6 py-4">
                                    {record.status === 'completed' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            در انتظار پرداخت
                                        </span>
                                    )}
                                    {record.status === 'paid' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                            پرداخت شده
                                        </span>
                                    )}
                                    {record.status === 'approved' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            تایید شده
                                        </span>
                                    )}
                                    {record.status === 'canceled' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-stone-50 dark:bg-stone-500/30 px-2 py-1 text-sm font-medium text-stone-800 dark:text-stone-300/70 ring-1 ring-inset ring-stone-600/20">
                                            لغو شده
                                        </span>
                                    )}
                                    {! ['completed', 'canceled', 'paid', 'approved'].includes(record.status) && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-red-50 dark:bg-red-500/30 px-2 py-1 text-sm font-medium text-red-800 dark:text-red-300/70 ring-1 ring-inset ring-red-600/20">
                                            در انتظار تکمیل
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record.status === 'completed' && (
                                        <button type="button" onClick={(e) => {
                                            setPaymentModalRecord(record);
                                            if (!! user.creditor)
                                            {
                                                payRecord(e, record)
                                            }
                                            else {
                                                setPaymentModalShow(true);
                                            }
                                        }}
                                                className="inline-flex px-2 py-1 text-xs text-center text-green-900 dark:text-green-200 transition-colors duration-300 bg-green-100 dark:bg-green-600/50 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-200 dark:hover:bg-green-600 focus:outline-none focus:ring-0 focus:border-green-500"
                                        >
                                            پرداخت سفارش
                                        </button>
                                )}
                                {['paid', 'approved', 'canceled'].includes(record.status) ? (
                                        <Link href={route('records.show', [record.id])}
                                              className="inline-flex px-2 py-1 text-xs text-center text-sky-900 dark:text-sky-200 transition-colors duration-300 bg-sky-100 dark:bg-sky-600/50 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-600 focus:outline-none focus:ring-0 focus:border-sky-500"
                                        >
                                            نمایش
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={route('records.edit', [record.id])}
                                                  className="inline-flex mr-2 px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
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
                                <Link href={route('records.create')}
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

            <Pagination data={records}/>

            <Modal show={paymentModalShow} onClose={closePaymentModal} maxWidth="md">
                <form onSubmit={payRecord} target="_blank" className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        درگاه پرداخت را انتخاب نمایید
                    </h2>
                    <div className="w-full flex justify-center gap-8 my-5">
                        <div className="inline-block">
                            <RadioInput
                                id="zarinpal"
                                className="hidden peer"
                                name="gateway"
                                checked={data.gateway === 'zarinpal'}
                                onChange={() => setData('gateway', 'zarinpal')}
                            />

                            <InputLabel
                                htmlFor="zarinpal"
                                className="bg-gray-100 dark:bg-slate-700 peer-checked:bg-yellow-50 peer-checked:dark:bg-yellow-700/10 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-yellow-400"
                            >
                                <div className="p-2">
                                    <img src="/storage/gateways/zarinpal.png" alt="درگاه پرداخت زرین پال"
                                         className="w-24 h-24 object-contain"/>
                                    <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                    <p className="text-center">
                                        زرین پال
                                    </p>
                                </div>
                            </InputLabel>
                        </div>
                        <div className="inline-block">
                            <RadioInput
                                id="parsian"
                                className="hidden peer"
                                name="gateway"
                                checked={data.gateway === 'parsian'}
                                onChange={() => setData('gateway', 'parsian')}
                            />

                            <InputLabel
                                htmlFor="parsian"
                                className="bg-gray-100 dark:bg-slate-700 peer-checked:bg-red-50 peer-checked:dark:bg-red-700/10 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-red-400"
                            >
                                <div className="p-2">
                                    <img src="/storage/gateways/parsian.png" alt="درگاه پرداخت پارسیان"
                                         className="w-24 h-24 object-contain"/>
                                    <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                    <p className="text-center">
                                        پارسیان
                                    </p>
                                </div>
                            </InputLabel>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" type="button" onClick={(closePaymentModal)}>
                            لغو
                        </SecondaryButton>

                        <PrimaryButton className="mr-3 !px-4 !py-2 text-xs" disabled={paymentProcessing}>
                            پرداخت سفارش
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deleteRecord} className="p-6">
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
