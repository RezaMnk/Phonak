import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Icon from "@/Components/Icon.jsx";
import {useState} from "react";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function CreateOrEdit({ product }) {
    const {data, setData, patch, post, processing, errors} = useForm({
        name: product?.name || '',
        category: product?.category || '',
        brand: product?.brand || '',
        expire_date: product?.expire_date || '',
        price: product?.price || '',
        inventory: product?.inventory || '',
        has_count: product?.has_count || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (product)
            patch(route('products.update', product.id));
        else
            post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={product ? (
                <>
                    ویرایش محصول:
                    <span className="font-medium mr-2 text-gray-500 dark:text-slate-300">
                        {product.name}
                    </span>
                </>
            ) : (
                <>
                    محصول جدید
                </>
            )}
            breadcrumbs={
                {
                    'محصولات': route('products.index'),
                    [product ? 'ویرایش محصول' : 'محصول جدید']: "#"
                }
            }
        >
            <Head title={product ? 'ویرایش محصول' : 'محصول جدید'} />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <form className="w-full" onSubmit={submit}>
                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات محصول
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col space-y-5 mt-6 mb-5">
                            <div className="w-full flex space-x-5 space-x-reverse">
                                <div className="w-6/12">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        label="نام محصول"
                                        svgIcon={
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        }
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="w-3/12">
                                    <SelectInput
                                        id="brand"
                                        name="brand"
                                        value={data.brand}
                                        label="برند"
                                        onChange={(e) => setData('brand', e.target.value)}
                                        error={errors.brand}
                                        required
                                    >
                                        <option value="" disabled="disabled">انتخاب کنید</option>
                                        <option value="phonak">فوناک</option>
                                        <option value="hansaton">هنزاتون</option>
                                        <option value="unitron">یونیترون</option>
                                    </SelectInput>

                                    <InputError message={errors.brand} className="mt-2"/>
                                </div>
                                <div className="w-3/12">
                                    <SelectInput
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        label="دسته بندی"
                                        onChange={(e) => setData('category', e.target.value)}
                                        error={errors.category}
                                        required
                                    >
                                        <option value="" disabled="disabled">انتخاب کنید</option>
                                        <option value="CIC">CIC (داخل گوشی با باتری 10)</option>
                                        <option value="ITC">ITC (داخل گوشی با باتری 312)</option>
                                        <option value="BTE mold">BTE با/بدون قالب</option>
                                        <option value="BTE tube">BTE با اسلیم تیوب</option>
                                        <option value="RIC">RIC</option>
                                        <option value="accessories">لوازم جانبی</option>
                                    </SelectInput>

                                    <InputError message={errors.category} className="mt-2"/>
                                </div>
                            </div>

                            <div className="w-full flex space-x-5 space-x-reverse">
                                <div className="w-2/12">
                                    <TextInput
                                        id="inventory"
                                        name="inventory"
                                        type="number"
                                        value={data.inventory}
                                        label="موجودی انبار"
                                        svgIcon={
                                            <path d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                        }
                                        onChange={(e) => setData('inventory', e.target.value)}
                                        error={errors.inventory}
                                        required
                                    />

                                    <InputError message={errors.inventory} className="mt-2"/>
                                </div>
                                <div className="w-4/12">
                                    <TextInput
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={data.price}
                                        label="قیمت"
                                        svgIcon={
                                            <>
                                                <circle cx="12" cy="12" r="10"/>
                                                <path d="M12 17V17.5V18"/>
                                                <path d="M12 6V6.5V7"/>
                                                <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"/>
                                            </>
                                        }
                                        onChange={(e) => setData('price', e.target.value)}
                                        error={errors.price}
                                        required
                                    />

                                    <InputError message={errors.price} className="mt-2"/>
                                </div>
                                {data.category === 'accessories' && (
                                    <>
                                        <div className="w-3/12">
                                            <TextInput
                                                id="expire_date"
                                                name="expire_date"
                                                type="date"
                                                value={data.expire_date}
                                                label="تاریخ انقضا (در صورت وجود)"
                                                onChange={(e) => setData('expire_date', e.target.value)}
                                                error={errors.expire_date}
                                            />

                                            <InputError message={errors.expire_date} className="mt-2"/>
                                        </div>
                                        <div className="w-2/12 !mr-10 flex items-center">
                                            <CheckboxInput
                                                id="has_count"
                                                name="has_count"
                                                checked={data.has_count}
                                                onChange={(e) => setData('has_count', e.target.checked)}
                                            />

                                            <InputLabel
                                                htmlFor="has_count"
                                                value="امکان انتخاب تعداد سفارش"
                                                className="mr-2"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <DangerButton
                                className="!px-4 !py-2"
                                link={true}
                                href={route('products.index')}
                            >
                                لغو
                            </DangerButton>
                            <PrimaryButton
                                className="!px-4 !py-2"
                                disabled={processing}
                            >
                                {product ? 'ثبت تغییرات' : 'ذخیره محصول'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
