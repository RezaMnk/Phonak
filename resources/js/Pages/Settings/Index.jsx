import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import {useEffect, useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function Index({ settings }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [modalProduct, setModalProduct] = useState({});

    const [search, setSearch] = useState((new URLSearchParams(window.location.search).get('search')) || '')

    const firstRender = useFirstRender();

    const data_settings = settings.data

    const {
        delete: destroy,
        processing,
    } = useForm();

    useEffect(() => {
        if (! firstRender)
        {
            const delayDebounceFn = setTimeout( () => {
                router.get(route('settings.index'), {
                    search: search
                })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    const deleteSetting = (e) => {
        e.preventDefault();

        destroy(route('settings.destroy', modalProduct), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

    return (
        <AuthenticatedLayout
            header="تنظیمات"
            breadcrumbs={
                {
                    'تنظیمات': route('settings.index')
                }
            }
            headerExtra={
                <div className="flex flex-col flex-col-reverse md:flex-row gap-2">
                    <form id="search">
                        <TextInput
                            id="search-input"
                            name="search"
                            value={search}
                            label="شماره گروه..."
                            className="!py-2 !px-4"
                            autoComplete="name"
                            onChange={(e) => setSearch(e.target.value)}
                            isFocused={!! search}
                        />
                    </form>
                    <PrimaryButton
                        link={true}
                        href={route('settings.create')}
                        className="!px-4 !py-2 text-xs"
                    >
                        تنظیم گروه بندی جدید
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="تنظیمات" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400 xl:table-fixed">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                گروه مورد تنظیم
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تعداد سفارش سمعک
                            </th>
                            <th scope="col" className="px-6 py-3">
                                تعداد سفارش لوازم جانبی
                            </th>
                            <th scope="col" className="px-6 py-3">
                                زمانبندی سفارش
                            </th>
                            <th scope="col" className="px-6 py-3">
                                عملیات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data_settings).length ? Object.values(data_settings).map((setting) => {
                        const is_last = data_settings[Object.keys(data_settings).length-1] === setting;
                        return (
                            <tr key={setting.id} className={`bg-white dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300">
                                    {setting.group}
                                </th>
                                <td className="px-6 py-4">
                                    <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                        {setting.max_record_order}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                        {setting.max_accessory_order}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {setting.start_time_readable +' الی '+ setting.end_time_readable}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={route('settings.edit', [setting.id])}
                                        className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                    >
                                        ویرایش
                                    </Link>
                                    <button type="button" onClick={() => {
                                        setDeleteModalShow(true);
                                        setModalProduct(setting)
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
                                colSpan="5"
                                className="text-lg px-6 py-6">
                                هیچ تنظیماتی یافت نشد!
                                <Link href={route('settings.create')}
                                      className="mr-2 text-sky-500 text-base"
                                >
                                    ایجاد اولین تنظیم گروه بندی
                                </Link>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={settings} search={search}/>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deleteSetting} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        آیا از حذف تنظیم مطمئن هستید؟
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-slate-300">
                        با حذف تنظیم، ممکن است در روند سفارش گذاری تداخل ایجاد شود!
                    </p>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" type="button" onClick={(closeModal)}>
                            لغو
                        </SecondaryButton>

                        <DangerButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            تایید حذف تنظیم
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
