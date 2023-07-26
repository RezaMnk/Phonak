import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import WarningButton from "@/Components/WarningButton.jsx";
import {useEffect, useState} from "react";

export default function Edit({ user }) {
    const {data, setData, reset, put, processing, errors} = useForm({
        role: user.role,
        password: '',
        confirm_password: '',
        group: user.group,
        verified: user.verified ? 'true' : 'false',
    });

    const [submitVerify, setSubmitVerify] = useState(false);

    useEffect(() => {
        if (submitVerify)
            put(route('users.update', user), {
                onSuccess: () => reset('password', 'confirm_password')
            });
    }, [data.verified])

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user), {
            onSuccess: () => reset('password', 'confirm_password')
        });
    };

    const submit_verified = (e) => {
        e.preventDefault();
        setData('verified', 'true');

        setSubmitVerify(true)
    };

    return (
        <AuthenticatedLayout
            header={(
                <>
                    ویرایش همکار:
                    <span className="font-medium mr-2 text-gray-500 dark:text-slate-300">
                        {user.name}
                    </span>
                </>
            )}
            breadcrumbs={
                {
                    'همکاران': route('users.index'),
                    'ویرایش همکار': "#"
                }
            }
        >
            <Head title="ویرایش همکار" />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <form className="w-full" onSubmit={submit}>
                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-6 mb-5">
                            <div className="w-4/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.name}
                                    label="نام و نام خانوادگی همکار"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-3/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.national_code}
                                    label="کد ملی همکار"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.grad_year}
                                    label="سال فارغ التحصیلی"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-3/12">
                                <TextInput
                                    disabled
                                    id="med_number"
                                    value={user.med_number}
                                    label="شماره نظام پزشکی"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.grade}
                                    label="مقطع تحصیلی"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.university}
                                    label="دانشگاه فارغ التحصیلی"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.state}
                                    label="استان محل اقامت"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4">
                                <TextInput
                                    disabled
                                    value={user.city}
                                    label="شهر محل اقامت"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        </div>

                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                آدرس های همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-6 mb-5">
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.home_post_code}
                                    label="کد پستی منزل"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                />
                            </div>
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.home_phone}
                                    label="تلفن منزل"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-8/12">
                                <TextInput
                                    disabled
                                    value={user.address.home_address}
                                    label="آدرس منزل"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                        </div>
                        <div className="flex mt-6 mb-5">
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.work_post_code}
                                    label="کد پستی محل کار"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                />
                            </div>
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.work_phone}
                                    label="تلفن محل کار"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-8/12">
                                <TextInput
                                    disabled
                                    value={user.address.work_address}
                                    label="آدرس محل کار"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                        </div>
                        {user.address.second_work_address && (
                            <div className="flex mt-6 mb-5">
                                <div className="w-2/12 ml-5">
                                    <TextInput
                                        disabled
                                        value={user.address.second_work_post_code}
                                        label="کد پستی محل کار دوم"
                                        svgIcon={(
                                            <g>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                            </g>
                                        )}
                                    />
                                </div>
                                <div className="w-2/12 ml-5">
                                    <TextInput
                                        disabled
                                        value={user.address.second_work_phone}
                                        label="تلفن محل کار دوم"
                                        svgIcon={<path
                                            d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                    />
                                </div>
                                <div className="w-8/12">
                                    <TextInput
                                        disabled
                                        value={user.address.second_work_address}
                                        label="آدرس محل کار دوم"
                                        svgIcon={<path
                                            d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات تکمیلی همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/3 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.phone}
                                    label="شماره تلفن همراه"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/3 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.landline}
                                    label="شماره تلفن ثابت"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/3">
                                <TextInput
                                    disabled
                                    value={user.info.whatsapp_phone}
                                    label="شماره تلفن واتساپ"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.referral_name}
                                    label="نام معرف اول"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.referral_phone}
                                    label="شماره تلفن معرف اول"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.second_referral_name}
                                    label="نام معرف دوم"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-1/4">
                                <TextInput
                                    disabled
                                    value={user.info.second_referral_phone}
                                    label="شماره تلفن معرف دوم"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        </div>
                        {user.info.history_description && (
                            <div className="flex mt-5">
                                <TextAreaInput
                                    disabled
                                    label="توضیحات سابقه همکاری با فوناک"
                                    value={user.info.history_description}
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        )}
                        {user.info.conditions_description && (
                            <div className="flex mt-5">
                                <TextAreaInput
                                    disabled
                                    label="توضیحات شرایط خاصی مرکز"
                                    value={user.info.conditions_description}
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                        )}

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات امنیتی همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-5">
                            <div className="w-2/12 ml-5">
                                <SelectInput
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    label="نوع همکار"
                                    onChange={(e) => setData('role', e.target.value)}
                                    error={errors.role}
                                    required
                                >
                                    <option value="user">شنوایی شناس</option>
                                    <option value="admin">مدیر</option>
                                </SelectInput>

                                <InputError message={errors.role} className="mt-2"/>
                            </div>
                            <div className="w-2/12 ml-5">
                                <TextInput
                                    id="group"
                                    type="number"
                                    name="group"
                                    value={data.group}
                                    label="شماره گروه"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    onChange={(e) => setData('group', e.target.value)}
                                    error={errors.group}
                                />

                                <InputError message={errors.group} className="mt-2"/>
                            </div>
                            <div className="w-2/12 ml-5">
                                <SelectInput
                                    className={data.verified === 'true' ? '!bg-green-50' : '!bg-yellow-50'}
                                    id="verified"
                                    name="verified"
                                    value={data.verified}
                                    label="وضعیت تایید"
                                    onChange={(e) => setData('verified', e.target.value)}
                                    error={errors.verified}
                                    required
                                >
                                    <option value="true" className="bg-green-100">تایید شده</option>
                                    <option value="false" className="bg-yellow-100">در انتظار بررسی</option>
                                </SelectInput>

                                <InputError message={errors.verified} className="mt-2"/>
                            </div>
                            <div className="w-3/12 ml-5">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    label="کلمه عبور جدید"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                            <div className="w-3/12">
                                <TextInput
                                    id="confirm_password"
                                    type="password"
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    label="تایید کلمه عبور جدید"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    onChange={(e) => setData('confirm_password', e.target.value)}
                                    error={errors.confirm_password}
                                />

                                <InputError message={errors.confirm_password} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                مدارک همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/3 ml-5">
                                <a
                                    href={user.info.id_card_image_url}
                                    target="_blank"
                                    className="inline-flex justify-center rounded-lg w-full font-semibold px-12 py-6 transition-colors duration-300 text-gray-900 dark:text-slate-200 bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 hover:dark:bg-sky-900 border-2 border-sky-500 dark:border-sky-700 border-dashed"
                                >
                                    مشاهده تصویر کارت ملی جدید
                                </a>
                            </div>
                            <div className="w-1/3 ml-5">
                                <a
                                    href={user.info.med_card_image_url}
                                    target="_blank"
                                    className="inline-flex justify-center rounded-lg w-full font-semibold px-12 py-6 transition-colors duration-300 text-gray-900 dark:text-slate-200 bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 hover:dark:bg-sky-900 border-2 border-sky-500 dark:border-sky-700 border-dashed"
                                >
                                    مشاهده تصویر کارت نظام پزشکی
                                </a>
                            </div>
                            <div className="w-1/3">
                                <a
                                    href={user.info.license_image_url}
                                    target="_blank"
                                    className="inline-flex justify-center rounded-lg w-full font-semibold px-12 py-6 transition-colors duration-300 text-gray-900 dark:text-slate-200 bg-sky-100 dark:bg-sky-950 hover:bg-sky-200 hover:dark:bg-sky-900 border-2 border-sky-500 dark:border-sky-700 border-dashed"
                                >
                                    مشاهده تصویر مجوز فعالیت
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-between mt-8">
                            <DangerButton
                                className="!px-4 !py-2"
                                link={true}
                                href={route('users.index')}
                            >
                                لغو
                            </DangerButton>
                            {! user.verified && (
                                <WarningButton
                                    className="!px-4 !py-2 ml-5 mr-auto"
                                    disabled={processing}
                                    type="button"
                                    onClick={submit_verified}
                                >
                                    تایید همکار و ثبت تغییرات
                                </WarningButton>
                            )}
                            <PrimaryButton
                                className="!px-4 !py-2"
                                disabled={processing}
                            >
                                ثبت تغییرات
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
