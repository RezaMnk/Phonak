import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import FileInput from "@/Components/FileInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

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
        <GuestLayout className="!max-w-7xl" name="اطلاعات تکمیلی">
            <Head title="اطلاعات تکمیلی"/>

            <form className="w-full h-1/2" onSubmit={submit}>
                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0">
                    <div className="w-full xl:w-3/4 ml-12">
                        <div className="text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات تماس
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                            <div className="w-full xl:w-1/3 ml-5">
                                <TextInput
                                    id="phone"
                                    type="number"
                                    name="phone"
                                    value={data.phone}
                                    label="شماره تلفن همراه"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                    autoComplete="phone"
                                    isFocused={true}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />

                                <InputError message={errors.phone} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/3 ml-5">
                                <TextInput
                                    id="landline"
                                    type="number"
                                    name="landline"
                                    value={data.landline}
                                    label="شماره تلفن ثابت (با کد شهر)"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    autoComplete="landline"
                                    onChange={(e) => setData('landline', e.target.value)}
                                    error={errors.landline}
                                />

                                <InputError message={errors.landline} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/3">
                                <TextInput
                                    id="whatsapp_phone"
                                    type="number"
                                    name="whatsapp_phone"
                                    value={data.whatsapp_phone}
                                    label="شماره تلفن واتساپ"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                    autoComplete="whatsapp_phone"
                                    onChange={(e) => setData('whatsapp_phone', e.target.value)}
                                    error={errors.whatsapp_phone}
                                />

                                <InputError message={errors.whatsapp_phone} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-16 text-gray-700 dark:text-slate-200">
                            <h5>
                                مشخصات معرف ها
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                            <div className="w-full xl:w-1/2 ml-5">
                                <TextInput
                                    id="referral_name"
                                    name="referral_name"
                                    value={data.referral_name}
                                    label="نام معرف اول"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    autoComplete="referral_name"
                                    onChange={(e) => setData('referral_name', e.target.value)}
                                    error={errors.referral_name}
                                />

                                <InputError message={errors.referral_name} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <TextInput
                                    id="referral_phone"
                                    type="number"
                                    name="referral_phone"
                                    value={data.referral_phone}
                                    label="شماره تلفن معرف اول"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                    autoComplete="referral_phone"
                                    onChange={(e) => setData('referral_phone', e.target.value)}
                                    error={errors.referral_phone}
                                />

                                <InputError message={errors.referral_phone} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                            <div className="w-full xl:w-1/2 ml-5">
                                <TextInput
                                    id="second_referral_name"
                                    name="second_referral_name"
                                    value={data.second_referral_name}
                                    label="نام معرف دوم"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    autoComplete="second_referral_name"
                                    onChange={(e) => setData('second_referral_name', e.target.value)}
                                    error={errors.second_referral_name}
                                />

                                <InputError message={errors.second_referral_name} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <TextInput
                                    id="second_referral_phone"
                                    type="number"
                                    name="second_referral_phone"
                                    value={data.second_referral_phone}
                                    label="شماره تلفن معرف دوم"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                    autoComplete="second_referral_phone"
                                    onChange={(e) => setData('second_referral_phone', e.target.value)}
                                    error={errors.second_referral_phone}
                                />

                                <InputError message={errors.second_referral_phone} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-16 text-gray-700 dark:text-slate-200">
                            <h5>
                                توضیحات
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="history_description"
                                    value="در صورتیکه سابقه همکاری با فوناک را داشته اید، ‌لطفا شرح مختصری از آن بنویسید"
                                    className="text-gray-500 dark:text-slate-400"
                                />

                                <TextAreaInput
                                    id="history_description"
                                    name="history_description"
                                    value={data.history_description}
                                    rows="3"
                                    onChange={(e) => setData('history_description', e.target.value)}
                                    error={errors.history_description}
                                />

                                <InputError message={errors.history_description} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="conditions_description"
                                    value="چنانچه مرکز شما دارای شرایط خاصی است که نیاز به توضیح دارد،‌خیلی مختصر اینجا مرقوم بفرمایید"
                                    className="text-gray-500 dark:text-slate-400"
                                />

                                <TextAreaInput
                                    id="conditions_description"
                                    name="conditions_description"
                                    value={data.conditions_description}
                                    rows="3"
                                    onChange={(e) => setData('conditions_description', e.target.value)}
                                    error={errors.conditions_description}
                                />

                                <InputError message={errors.conditions_description} className="mt-2"/>
                            </div>
                        </div>

                    </div>
                    <div className="w-full xl:w-1/4">
                        <div className="text-gray-700 dark:text-slate-200">
                            <h5>
                                فایل مدارک
                            </h5>
                            <hr className="border-gray-300 dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3 w-full [&>div]:w-full">
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
                        <div className="flex mt-3 w-full [&>div]:w-full">
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
                        <div className="flex mt-3 w-full [&>div]:w-full">
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
                        ثبت مشخصات
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
