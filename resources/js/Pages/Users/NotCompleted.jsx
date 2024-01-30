import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, useForm} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import {useEffect, useState} from "react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function NotCompleted({ users }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [modalUser, setModalUser] = useState({});

    const [search, setSearch] = useState((new URLSearchParams(window.location.search).get('search')) || '')

    const firstRender = useFirstRender();

    const {
        delete: destroy,
        processing,
    } = useForm();

    useEffect(() => {
        if (! firstRender)
        {
            const delayDebounceFn = setTimeout( () => {
                router.get(route('users.not_completed'), {
                    search: search
                })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('users.destroy', modalUser), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

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
                        isFocused={!! search}
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
                            <th scope="col" className="px-6 py-3">
                                کدملی
                            </th>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                شماره نظام پزشکی
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
                    {Object.keys(users.data).length ? Object.values(users.data).map((user) => {
                        const is_last = users.data[Object.keys(users.data).length-1] === user;
                        return (
                            <tr key={user.id} className={`bg-white dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <th scope="row"
                                    className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    {user.national_code}
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    {user.med_number}
                                </td>
                                <td className="px-6 py-4">
                                    {(user.user_info !== null && user.address === null) ? (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-sky-50 dark:bg-sky-500/30 px-2 py-1 text-sm font-medium text-sky-800 dark:text-sky-300/70 ring-1 ring-inset ring-sky-600/20">
                                            تکمیل اطلاعات فردی
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-500/30 px-2 py-1 text-sm font-medium text-yellow-800 dark:text-yellow-300/70 ring-1 ring-inset ring-yellow-600/20">
                                            ثبت نام اولیه
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button type="button" onClick={() => {
                                        setDeleteModalShow(true);
                                        setModalUser(user)
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
                                هیچ همکاری یافت نشد!
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={users} search={search}/>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        آیا از حذف همکار مطمئن هستید؟
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-slate-300">
                        با حذف همکار، اطلاعات ثبت نام شده ایشان حذف و نیاز به ثبت نام مجدد می باشد!
                    </p>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" type="button" onClick={(closeModal)}>
                            لغو
                        </SecondaryButton>

                        <DangerButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            تایید حذف همکار
                        </DangerButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}
