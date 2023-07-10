import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Icon from "@/Components/Icon.jsx";
import {useState} from "react";

export default function CreateOrEdit({ product }) {
    const {data, setData, patch, post, processing, errors} = useForm({
        name: product?.name || '',
        category: product?.category || '',
        inventory: product?.inventory || '',
        image: product?.image || '',
    });

    const [imageUrl, setImageUrl] = useState(product?.image_url || '/storage/default.png');

    const submit = (e) => {
        e.preventDefault();
        console.log(data)

        if (product)
            patch(route('products.update', product.id), {
                forceFormData: true,
            });
        else
            post(route('products.store'));
    };

    const handleImageInput = (e) => {
        const [file] = e.target.files
        if (file) {
            setImageUrl(URL.createObjectURL(file))
        }

        setData('image', file)
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
                        <div className="flex mt-6 mb-5">
                            <div className="w-1/3 ml-10 flex flex-col relative cursor-pointer group">
                                <div className="h-full p-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                                    <div className="h-full bg-contain bg-no-repeat bg-center rounded-lg"
                                        style={{
                                            backgroundImage: `url("${imageUrl}")`
                                        }}
                                    >
                                    </div>
                                </div>
                                <div>
                                    <label className="">
                                        <div className="absolute top-0 left-0 w-full h-full rounded-lg cursor-pointer transition opacity-0 group-hover:opacity-100 bg-green-500/20 backdrop-blur-[2px]">
                                        </div>
                                        <span className={"absolute top-2 right-2 px-2 py-1 cursor-pointer text-sm font-semibold text-white rounded-lg bg-green-500/70" +
                                        " transition-all group-hover:px-12 group-hover:py-6 group-hover:top-1/2 group-hover:right-1/2 group-hover:translate-x-1/2 group-hover:-translate-y-1/2 group-hover:px-18 group-hover:bg-green-500/70"}>
                                            <span className="block group-hover:hidden">
                                                تصویر محصول
                                            </span>
                                            <span className="hidden group-hover:flex flex-col items-center">
                                                <Icon type="stroke"
                                                    className="!w-8 !h-8 mb-5 text-white"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </Icon>
                                                ویرایش تصویر محصول
                                            </span>
                                        </span>
                                        <input id="image" type="file" accept="image/*" className="hidden"
                                            onChange={handleImageInput}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="w-2/3 flex flex-col space-y-10">
                                <div className="w-full">
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
                                <div className="w-full">
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
                                        <option value="accessories">سایر لوازم جانبی</option>
                                    </SelectInput>

                                    <InputError message={errors.category} className="mt-2"/>
                                </div>
                                <div className="w-full">
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
