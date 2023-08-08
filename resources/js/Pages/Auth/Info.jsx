import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import FileInput from "@/Components/FileInput.jsx";

export default function Info() {
    const {data, setData, post, processing, errors} = useForm({
        phone: '',
        landline: '',
        whatsapp_phone: '',
        referral_name: '',
        referral_phone: '',
        second_referral_name: '',
        second_referral_phone: '',
        history_description: '',
        conditions_description: '',
        id_card_image: '',
        med_card_image: '',
        license_image: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('info'));
    };

    return (
        <GuestLayout className="!max-w-5xl" name="اطلاعات تکمیلی">
            <Head title="اطلاعات تکمیلی"/>

            <form className="w-full h-1/2" onSubmit={submit}>
                <div className="flex">
                    <div className="w-3/4 ml-12">
                        <div className="text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات تماس
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/3 ml-5">
                                <TextInput
                                    id="phone"
                                    type="number"
                                    name="phone"
                                    value={data.phone}
                                    label="شماره تلفن همراه"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="phone"
                                    isFocused={true}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />

                                <InputError message={errors.phone} className="mt-2"/>
                            </div>
                            <div className="w-1/3 ml-5">
                                <TextInput
                                    id="landline"
                                    type="number"
                                    name="landline"
                                    value={data.landline}
                                    label="شماره تلفن ثابت"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="landline"
                                    onChange={(e) => setData('landline', e.target.value)}
                                    error={errors.landline}
                                />

                                <InputError message={errors.landline} className="mt-2"/>
                            </div>
                            <div className="w-1/3">
                                <TextInput
                                    id="whatsapp_phone"
                                    type="number"
                                    name="whatsapp_phone"
                                    value={data.whatsapp_phone}
                                    label="شماره تلفن واتساپ"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="whatsapp_phone"
                                    onChange={(e) => setData('whatsapp_phone', e.target.value)}
                                    error={errors.whatsapp_phone}
                                />

                                <InputError message={errors.whatsapp_phone} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-8 text-gray-700 dark:text-slate-200">
                            <h5>
                                مشخصات معرف ها
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/2 ml-5">
                                <TextInput
                                    id="referral_name"
                                    name="referral_name"
                                    value={data.referral_name}
                                    label="نام معرف اول"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="referral_name"
                                    onChange={(e) => setData('referral_name', e.target.value)}
                                    error={errors.referral_name}
                                />

                                <InputError message={errors.referral_name} className="mt-2"/>
                            </div>
                            <div className="w-1/2">
                                <TextInput
                                    id="referral_phone"
                                    type="number"
                                    name="referral_phone"
                                    value={data.referral_phone}
                                    label="شماره تلفن معرف اول"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="referral_phone"
                                    onChange={(e) => setData('referral_phone', e.target.value)}
                                    error={errors.referral_phone}
                                />

                                <InputError message={errors.referral_phone} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/2 ml-5">
                                <TextInput
                                    id="second_referral_name"
                                    name="second_referral_name"
                                    value={data.second_referral_name}
                                    label="نام معرف دوم"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="second_referral_name"
                                    onChange={(e) => setData('second_referral_name', e.target.value)}
                                    error={errors.second_referral_name}
                                />

                                <InputError message={errors.second_referral_name} className="mt-2"/>
                            </div>
                            <div className="w-1/2">
                                <TextInput
                                    id="second_referral_phone"
                                    type="number"
                                    name="second_referral_phone"
                                    value={data.second_referral_phone}
                                    label="شماره تلفن معرف دوم"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="second_referral_phone"
                                    onChange={(e) => setData('second_referral_phone', e.target.value)}
                                    error={errors.second_referral_phone}
                                />

                                <InputError message={errors.second_referral_phone} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-8 text-gray-700 dark:text-slate-200">
                            <h5>
                                توضیحات
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <TextAreaInput
                                    id="history_description"
                                    name="history_description"
                                    value={data.history_description}
                                    rows="3"
                                    label="در صورتیکه سابقه همکاری با فوناک را داشته اید، ‌لطفا شرح مختصری از آن بنویسید"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    onChange={(e) => setData('history_description', e.target.value)}
                                    error={errors.history_description}
                                />

                                <InputError message={errors.history_description} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <TextAreaInput
                                    id="conditions_description"
                                    name="conditions_description"
                                    value={data.conditions_description}
                                    rows="3"
                                    label="چنانچه مرکز شما دارای شرایط خاصی است که نیاز به توضیح دارد،‌خیلی مختصر اینجا مرقوم بفرمایید"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    onChange={(e) => setData('conditions_description', e.target.value)}
                                    error={errors.conditions_description}
                                />

                                <InputError message={errors.conditions_description} className="mt-2"/>
                            </div>
                        </div>

                    </div>
                    <div className="w-1/4">
                        <div className="text-gray-700 dark:text-slate-200">
                            <h5>
                                فایل مدارک
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <FileInput
                                className="!p-4"
                                name="id_card_image"
                                fileName={data.id_card_image}
                                label="تصویر واضح کارت ملی جدید (یا قدیم به همراه رسید تعویض)"
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('id_card_image', e.target.files[0])}
                                error={errors.id_card_image}
                            />
                        </div>
                        <div className="flex mt-3">
                            <FileInput
                                className="!p-4"
                                name="med_card_image"
                                fileName={data.med_card_image}
                                label="تصویر واضح کارت نظام پزشکی"
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('med_card_image', e.target.files[0])}
                                error={errors.med_card_image}
                            />
                        </div>
                        <div className="flex mt-3">
                            <FileInput
                                className="!p-4"
                                name="license_image"
                                fileName={data.license_image}
                                label="تصویر واضح مجوز فعالیت با تاریخ معتبر که هم نام دو مدرك اول باشد."
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('license_image', e.target.files[0])}
                                error={errors.license_image}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        ثبت آدرس
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
