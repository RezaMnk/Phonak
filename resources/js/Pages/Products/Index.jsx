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

export default function Index({ products }) {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [modalProduct, setModalProduct] = useState({});

    const [search, setSearch] = useState((new URLSearchParams(window.location.search).get('search')) || '')

    const firstRender = useFirstRender();

    const data_products = products.data

    const [productInventories, setProductInventories] = useState(
        data_products.reduce((acc, product) => ({ ...acc, [product.id]: product.inventory }), {})
    );

    const {
        delete: destroy,
        processing,
    } = useForm();

    useEffect(() => {
        if (! firstRender)
        {
            const delayDebounceFn = setTimeout( () => {
                router.get(route('products.index'), {
                    search: search
                })
            }, 1500)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    const deletePatient = (e) => {
        e.preventDefault();

        destroy(route('products.destroy', modalProduct), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const updateInventory = (product_id, event) => {
        let value = parseInt(event.target.value)
        setProductInventories((prev) => {
            return {
                ...prev,
                [product_id]: value
            }
        })
    };

    const submitInventory = (product_id, value) => {

        router.post(route('products.update_inventory', product_id), {
            inventory: value
        },{
            preserveScroll: true
        })
    };

    const closeModal = () => {
        setDeleteModalShow(false)
    }

    return (
        <AuthenticatedLayout
            header="محصولات"
            breadcrumbs={
                {
                    'محصولات': route('products.index')
                }
            }
            headerExtra={
                <div className="flex flex-col flex-col-reverse md:flex-row gap-2">
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
                    <PrimaryButton
                        link={true}
                        href={route('products.create')}
                        className="!px-4 !py-2 text-xs"
                    >
                        افزون محصول
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="محصولات" />


            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-right text-gray-500 dark:text-slate-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                تصویر محصول
                            </th>
                            <th scope="col" className="px-6 py-3">
                                نام محصول
                            </th>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                برند
                            </th>
                            <th scope="col" className="px-6 py-3">
                                دسته بندی
                            </th>
                            <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                                موجودی
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
                    {Object.keys(data_products).length ? Object.values(data_products).map((product) => {
                        const is_last = data_products[Object.keys(data_products).length-1] === product;

                        return (
                            <tr key={product.id} className={`bg-white dark:bg-slate-900 ${! is_last ? 'border-b' : ''} border-gray-200 dark:border-slate-600`}>
                                <td className="px-6 py-2 hidden xl:table-cell">
                                    <img src={product.image_url} alt={product.name} className="w-14 h-14 rounded-lg object-cover bg-gray-100 dark:bg-slate-800 p-1"/>
                                </td>
                                <th scope="row"
                                    className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    {product.brand === 'phonak' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            {product.brand}
                                        </span>
                                    )}
                                    {product.brand === 'hansaton' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-gray-50 dark:bg-gray-500/30 px-2 py-1 text-sm font-medium text-gray-800 dark:text-gray-300/70 ring-1 ring-inset ring-gray-600/20">
                                            {product.brand}
                                        </span>
                                    )}
                                    {product.brand === 'unitron' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-blue-50 dark:bg-blue-500/30 px-2 py-1 text-sm font-medium text-blue-800 dark:text-blue-300/70 ring-1 ring-inset ring-blue-600/20">
                                            {product.brand}
                                        </span>
                                    )}
                                    {product.brand === 'rayovac' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-red-50 dark:bg-red-500/30 px-2 py-1 text-sm font-medium text-red-800 dark:text-red-300/70 ring-1 ring-inset ring-red-600/20">
                                            {product.brand}
                                        </span>
                                    )}
                                    {product.brand === 'detax' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-stone-50 dark:bg-stone-500/30 px-2 py-1 text-sm font-medium text-stone-800 dark:text-stone-300/70 ring-1 ring-inset ring-stone-600/20">
                                            {product.brand}
                                        </span>
                                    )}
                                    {product.brand === 'etc' && (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-pink-50 dark:bg-pink-500/30 px-2 py-1 text-sm font-medium text-pink-800 dark:text-pink-300/70 ring-1 ring-inset ring-pink-600/20">
                                            سایر
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4 hidden xl:table-cell">
                                    <TextInput
                                        className="!w-20 !p-1 text-center"
                                        size="1"
                                        type="number"
                                        value={productInventories[product.id]}
                                        onBlur={(e) => submitInventory(product.id, e.target.value)}
                                        onChange={(e) => updateInventory(product.id, e)}
                                        />
                                </td>
                                <td className="px-6 py-4">
                                    {product.group_products.length ? (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-green-50 dark:bg-green-500/30 px-2 py-1 text-sm font-medium text-green-800 dark:text-green-300/70 ring-1 ring-inset ring-green-600/20">
                                            گروهبندی شده
                                        </span>
                                    ) : (
                                        <span className="inline-flex whitespace-nowrap items-center rounded-md bg-red-50 dark:bg-red-500/30 px-2 py-1 text-sm font-medium text-red-800 dark:text-red-300/70 ring-1 ring-inset ring-red-600/20">
                                            گروهبندی نشده
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={route('products.edit', [product.id])}
                                        className="inline-flex px-2 py-1 text-xs text-center text-yellow-900 dark:text-yellow-200 transition-colors duration-300 bg-yellow-100 dark:bg-yellow-600/50 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:border-yellow-500"
                                    >
                                        ویرایش
                                    </Link>
                                    <button type="button" onClick={() => {
                                        setDeleteModalShow(true);
                                        setModalProduct(product)
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
                                colSpan="7"
                                className="text-lg px-6 py-6">
                                هیچ محصولی یافت نشد!
                                <Link href={route('products.create')}
                                      className="mr-2 text-sky-500 text-base"
                                >
                                    ایجاد اولین محصول
                                </Link>
                            </th>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination data={products} search={search}/>

            <Modal show={deleteModalShow} onClose={closeModal} maxWidth="sm">
                <form onSubmit={deletePatient} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-200">
                        آیا از حذف محصول مطمئن هستید؟
                    </h2>
                    <p className="mt-5 text-gray-600 dark:text-slate-300">
                        با حذف محصول، سفارشاتی که با این محصول انجام شده باشند دچار مشکل خواهند شد!
                    </p>
                    <div className="mt-6 flex justify-between">
                        <SecondaryButton className="!px-4 !py-2 text-xs" type="button" onClick={(closeModal)}>
                            لغو
                        </SecondaryButton>

                        <DangerButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            تایید حذف محصول
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
