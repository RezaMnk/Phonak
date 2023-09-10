import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Icon from "@/Components/Icon.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function CreateOrEdit({ product }) {
    const {data, setData, patch, post, processing, errors} = useForm({
        name: product?.name || '',
        category: product?.category || '',
        brand: product?.brand || '',
        expire_date: product?.expire_date || '',
        price: product?.price || '',
        irc: product?.irc || '',
        etc_brand: product?.etc_brand || '',
        inventory: product?.inventory || '',
        has_count: product?.has_count || false,
        min_count: product?.min_count || '',
        max_count: product?.max_count || '',
        groups: product?.groups || []
    });
    const addGroup = () => {
        setData((data) => ({
            ...data,
            groups: [
                ...data.groups,
                {
                    number: '',
                    count: ''
                }
            ]
        }))
    }

    const remGroup = (index) => {
        let new_groups = data.groups

        new_groups.splice(index, 1)
        setData((data) => ({
            ...data,
            groups: new_groups
        }))
    }

    const update_number = (e, index) => {
        let new_groups = data.groups
        new_groups[index].number = e.target.value

        setData((data) => ({
            ...data,
            groups: new_groups
        }))
    }

    const update_count = (e, index) => {
        let new_groups = data.groups
        new_groups[index].count = e.target.value

        setData((data) => ({
            ...data,
            groups: new_groups
        }))
    }

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
                        <div className="text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات محصول
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col space-y-5 mt-6 mb-5">
                            <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 xl:space-x-reverse">
                                <div className={`w-full ${data.brand === 'etc' ? 'xl:w-3/12' : 'xl:w-6/12'}`}>
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
                                    />

                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-3/12">
                                    <SelectInput
                                        id="brand"
                                        name="brand"
                                        value={data.brand}
                                        label="برند"
                                        onChange={(e) => setData('brand', e.target.value)}
                                        error={errors.brand}
                                    >
                                        <option value="" disabled="disabled">انتخاب کنید</option>
                                        <option value="phonak">فوناک</option>
                                        <option value="hansaton">هنزاتون</option>
                                        <option value="unitron">یونیترون</option>
                                        <option value="rayovac">ریوواک</option>
                                        <option value="detax">دیتاکس</option>
                                        <option value="etc">سایر</option>
                                    </SelectInput>

                                    <InputError message={errors.brand} className="mt-2"/>
                                </div>
                                <div className={`w-full xl:w-3/12 ${data.brand === 'etc' ? 'block' : 'hidden'}`}>
                                    <TextInput
                                        id="etc_brand"
                                        name="etc_brand"
                                        value={data.etc_brand}
                                        label="نام برند"
                                        svgIcon={
                                            <g>
                                                <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12"/>
                                                <circle cx="12" cy="12" r="2"/>
                                                <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10"/>
                                            </g>
                                        }
                                        onChange={(e) => setData('etc_brand', e.target.value)}
                                        error={errors.etc_brand}
                                    />

                                    <InputError message={errors.etc_brand} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-3/12">
                                    <SelectInput
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        label="دسته بندی"
                                        onChange={(e) => setData('category', e.target.value)}
                                        error={errors.category}
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

                            <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 xl:space-x-reverse">
                                <div className="w-full xl:w-2/12">
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
                                    />

                                    <InputError message={errors.inventory} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-2/12">
                                    <div className="relative">
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
                                        />

                                        <span className="absolute top-1/2 -translate-y-1/2 left-3 text-sm font-semibold text-gray-700 dark:text-slate-200">
                                            ریال
                                        </span>
                                    </div>

                                    <InputError message={errors.price} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-2/12">
                                    <TextInput
                                        id="irc"
                                        name="irc"
                                        type="number"
                                        value={data.irc}
                                        label="کد IRC"
                                        svgIcon={
                                            <path xmlns="http://www.w3.org/2000/svg" d="M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z"/>                                        }
                                        onChange={(e) => setData('irc', e.target.value)}
                                        error={errors.irc}
                                    />

                                    <InputError message={errors.irc} className="mt-2"/>
                                </div>
                                {data.category === 'accessories' && (
                                    <>
                                        <div className="w-full xl:w-3/12">
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
                                        <div className="w-full xl:w-2/12 !mt-8 xl:!mt-0 xl:!mr-10 flex items-center">
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
                            {(data.category === 'accessories' && data.has_count) && (
                                <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 xl:space-x-reverse">
                                        <div className="w-full xl:w-4/12">
                                            <TextInput
                                                id="min_count"
                                                name="min_count"
                                                type="number"
                                                value={data.min_count}
                                                label="حداقل تعداد خرید"
                                                onChange={(e) => setData('min_count', e.target.value)}
                                                error={errors.min_count}
                                            />

                                            <InputError message={errors.min_count} className="mt-2"/>
                                        </div>
                                        <div className="w-full xl:w-4/12">
                                            <TextInput
                                                id="max_count"
                                                name="max_count"
                                                type="number"
                                                value={data.max_count}
                                                label="حداکثر تعداد خرید"
                                                onChange={(e) => setData('max_count', e.target.value)}
                                                error={errors.max_count}
                                            />

                                            <InputError message={errors.max_count} className="mt-2"/>
                                        </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 text-gray-700 dark:text-slate-200">
                            <div className="flex justify-between">
                                <h5>
                                    گروهبندی محصول
                                </h5>
                                <PrimaryButton className="mb-1 text-xs !px-2 !py-1"
                                               onClick={() => addGroup()}
                                               type="button"
                                >
                                    افزون گروه
                                </PrimaryButton>
                            </div>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col space-y-5 mt-6 mb-5">
                            {Object.values(data.groups).map((group, index) => {
                                const is_last = data.groups[Object.keys(data.groups).length-1] === group;
                                return (
                                    <div className="w-full flex flex-col xl:flex-row xl:space-x-5 xl:space-x-reverse"
                                         key={index}>
                                        <div className="w-full xl:w-5/12">
                                            <TextInput
                                                id={`group-number-` + index}
                                                name={`group-number-` + index}
                                                value={data.groups[index].number}
                                                label="شماره گروه"
                                                onChange={(e) => update_number(e, index)}
                                                error={errors.groups ? errors.groups[index].number : ''}
                                            />
                                            {errors['groups.' + index + '.number'] && (
                                                <InputError message={errors['groups.' + index + '.number']}
                                                            className="mt-2"/>
                                            )}

                                        </div>
                                        <div className="w-full xl:w-7/12 mt-5 xl:mt-0 flex">
                                            <div className="w-full ml-5">
                                                <TextInput
                                                    id={`group-count-` + index}
                                                    name={`group-count-` + index}
                                                    value={data.groups[index].count}
                                                    label="تعداد محصول برای گروه"
                                                    onChange={(e) => update_count(e, index)}
                                                    error={errors.groups ? errors.groups[index].count : ''}
                                                    required
                                                />

                                                {errors['groups.' + index + '.count'] && (
                                                    <InputError message={errors['groups.' + index + '.count']}
                                                                className="mt-2"/>
                                                )}
                                            </div>
                                            <div className="w-fit flex">
                                                <DangerButton
                                                    className="w-full h-full items-center !px-2 xl:!px-4"
                                                    onClick={() => remGroup(index)}
                                                    type="button"
                                                >
                                                    <Icon viewBox="0 0 24 24" type="fill" className="text-white">
                                                        <path
                                                            d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"/>
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"/>
                                                    </Icon>
                                                </DangerButton>
                                            </div>
                                        </div>
                                        {! is_last && (
                                            <hr className="block xl:hidden mt-5 border-gray-200 dark:border-slate-500"/>
                                        )}
                                    </div>
                                )
                            })}
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
