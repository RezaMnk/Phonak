import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import WarningButton from "@/Components/WarningButton.jsx";
import {useEffect, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import {toast as toastify} from "react-toastify";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";


export default function Edit({ user }) {
    const {data, setData, reset, put, processing, errors} = useForm({
        role: user.role,
        password: '',
        confirm_password: '',
        group: user.group,
        status: user.status,
        creditor: user.creditor,
        creditor_image: user.creditor_image,
    });

    const [submitVerify, setSubmitVerify] = useState(false);

    useEffect(() => {
        if (submitVerify)
            put(route('users.update', user), {
                onSuccess: () => reset('password', 'confirm_password')
            });
        return setSubmitVerify(false)
    }, [submitVerify])


    const [modalShow, setModalShow] = useState(false);
    const {post: modal_post, data: modal_data, setData: modal_setData, errors: modal_errors} = useForm();

    const closeModal = () => {
        setModalShow(false)
    }
    const disapprove = (e) => {
        e.preventDefault();

        modal_post(route('users.disapprove', user), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('users.update', user), {
            onSuccess: () => reset('password', 'confirm_pthxlassword')
        });
    };

    const submit_verified = (e) => {
        e.preventDefault();
        setData('status', 'approved');

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
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                            <div className="w-full xl:w-4/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.name}
                                    label="نام و نام خانوادگی همکار"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-3/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.national_code}
                                    label="کد ملی همکار"
                                    svgIcon={<path
                                        d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-full xl:w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.grad_year}
                                    label="سال فارغ التحصیلی"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-3/12">
                                <TextInput
                                    disabled
                                    id="med_number"
                                    value={user.med_number}
                                    label="شماره نظام پزشکی"
                                    svgIcon={(<path d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.grade}
                                    label="مقطع تحصیلی"
                                    svgIcon={(
                                        <>
                                            <path d="M11.5655 4.24138L3.64286 8.64286C3.36266 8.79852 3.36266 9.20148 3.64286 9.35714L11.5655 13.7586C11.8357 13.9087 12.1643 13.9087 12.4345 13.7586L20.5706 9.23853C20.7578 9.13456 20.7578 8.86544 20.5706 8.76147L12.4345 4.24138C12.1643 4.09126 11.8357 4.09126 11.5655 4.24138Z"/>
                                            <path d="M5.5 10.5L5.13149 15.2906C5.05583 16.2742 5.70934 17.1639 6.66043 17.426C7.28355 17.5976 7.96876 17.8017 8.5 18C9.26467 18.2854 10.1126 18.7657 10.7824 19.1841C11.5227 19.6465 12.4773 19.6465 13.2177 19.184C13.8874 18.7657 14.7354 18.2854 15.5 18C16.0312 17.8017 16.7165 17.5976 17.3396 17.4259C18.2907 17.1639 18.9442 16.2742 18.8686 15.2906L18.5 10.5"/>
                                            <path d="M11.5 10.5L9.00772 11.9242C8.38457 12.2802 8 12.9429 8 13.6606V20"/>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.university}
                                    label="دانشگاه فارغ التحصیلی"
                                    svgIcon={(
                                        <g>
                                            <path d="M3 21H21"/>
                                            <path d="M19 21V15V7C19 5.11438 19 4.17157 18.4142 3.58579C17.8284 3 16.8856 3 15 3H12H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V15V21"/>
                                            <path d="M9 8L10 8"/>
                                            <path d="M9 12L10 12"/>
                                            <path d="M9 16L10 16"/>
                                            <path d="M14 8L15 8"/>
                                            <path d="M14 12L15 12"/>
                                            <path d="M14 16L15 16"/>
                                        </g>
                                    )}
                                />
                            </div>
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.state}
                                    label="استان محل اقامت"
                                    svgIcon={(
                                        <>
                                            <path d="M3 22V12C3 10.1144 3 9.17157 3.58579 8.58579C4.17157 8 5.11438 8 7 8C8.88562 8 9.82843 8 10.4142 8.58579C11 9.17157 11 10.1144 11 12"/>
                                            <path d="M17 22V16C17 14.1144 17 13.1716 16.4142 12.5858C15.8284 12 14.8856 12 13 12H11C9.11438 12 8.17157 12 7.58579 12.5858C7 13.1716 7 14.1144 7 16V22"/>
                                            <path d="M21 21.9999V7.77195C21 6.4311 21 5.76068 20.6439 5.24676C20.2877 4.73283 19.66 4.49743 18.4045 4.02663C15.9492 3.10591 14.7216 2.64555 13.8608 3.2421C13 3.83864 13 5.14974 13 7.77195V11.9999"/>
                                            <path d="M4 8V6.5C4 5.55719 4 5.08579 4.29289 4.79289C4.58579 4.5 5.05719 4.5 6 4.5H8C8.94281 4.5 9.41421 4.5 9.70711 4.79289C10 5.08579 10 5.55719 10 6.5V8"/>
                                            <path d="M7 4V2"/>
                                            <path d="M22 22L2 22"/>
                                            <path d="M10 15H14"/>
                                            <path d="M10 18H14"/>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    disabled
                                    value={user.city}
                                    label="شهر محل اقامت"
                                    svgIcon={(
                                        <>
                                            <path d="M3 22V12C3 10.1144 3 9.17157 3.58579 8.58579C4.17157 8 5.11438 8 7 8C8.88562 8 9.82843 8 10.4142 8.58579C11 9.17157 11 10.1144 11 12"/>
                                            <path d="M17 22V16C17 14.1144 17 13.1716 16.4142 12.5858C15.8284 12 14.8856 12 13 12H11C9.11438 12 8.17157 12 7.58579 12.5858C7 13.1716 7 14.1144 7 16V22"/>
                                            <path d="M21 21.9999V7.77195C21 6.4311 21 5.76068 20.6439 5.24676C20.2877 4.73283 19.66 4.49743 18.4045 4.02663C15.9492 3.10591 14.7216 2.64555 13.8608 3.2421C13 3.83864 13 5.14974 13 7.77195V11.9999"/>
                                            <path d="M4 8V6.5C4 5.55719 4 5.08579 4.29289 4.79289C4.58579 4.5 5.05719 4.5 6 4.5H8C8.94281 4.5 9.41421 4.5 9.70711 4.79289C10 5.08579 10 5.55719 10 6.5V8"/>
                                            <path d="M7 4V2"/>
                                            <path d="M22 22L2 22"/>
                                            <path d="M10 15H14"/>
                                            <path d="M10 18H14"/>
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                آدرس های همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                            <div className="w-full xl:w-2/12 ml-5">
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
                            <div className="w-full xl:w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.home_phone}
                                    label="تلفن منزل (با کد شهر)"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-full xl:w-8/12">
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
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                            <div className="w-full xl:w-2/12 ml-5">
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
                            <div className="w-full xl:w-2/12 ml-5">
                                <TextInput
                                    disabled
                                    value={user.address.work_phone}
                                    label="تلفن محل کار"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-full xl:w-8/12">
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
                            <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                                <div className="w-full xl:w-2/12 ml-5">
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
                                <div className="w-full xl:w-2/12 ml-5">
                                    <TextInput
                                        disabled
                                        value={user.address.second_work_phone}
                                        label="تلفن محل کار دوم"
                                        svgIcon={<path
                                            d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                    />
                                </div>
                                <div className="w-full xl:w-8/12">
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
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                            <div className="w-full xl:w-1/3 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.phone}
                                    label="شماره تلفن همراه"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-1/3 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.landline}
                                    label="شماره تلفن ثابت (با کد شهر)"
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                />
                            </div>
                            <div className="w-full xl:w-1/3">
                                <TextInput
                                    disabled
                                    value={user.info.whatsapp_phone}
                                    label="شماره تلفن واتساپ"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.referral_name}
                                    label="نام معرف اول"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.referral_phone}
                                    label="شماره تلفن معرف اول"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-1/4 ml-5">
                                <TextInput
                                    disabled
                                    value={user.info.second_referral_name}
                                    label="نام معرف دوم"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                />
                            </div>
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    disabled
                                    value={user.info.second_referral_phone}
                                    label="شماره تلفن معرف دوم"
                                    svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                />
                            </div>
                        </div>
                        {user.info.history_description && (
                            <div className="flex mt-5">
                                <TextAreaInput
                                    disabled
                                    label="توضیحات سابقه همکاری با فوناک"
                                    value={user.info.history_description}
                                />
                            </div>
                        )}
                        {user.info.conditions_description && (
                            <div className="flex mt-5">
                                <TextAreaInput
                                    disabled
                                    label="توضیحات شرایط خاصی مرکز"
                                    value={user.info.conditions_description}
                                />
                            </div>
                        )}

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات امنیتی همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                            <div className="w-full xl:w-2/12 ml-5">
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
                            <div className="w-full xl:w-2/12 ml-5">
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
                            <div className="w-full xl:w-2/12 ml-5">
                                <SelectInput
                                    className={data.status === 'approved' ? '!bg-green-50 dark:!bg-green-900/50' : data.status === 'waiting' ? '!bg-yellow-50 dark:!bg-yellow-900/50' : '!bg-red-50 dark:!bg-red-900/50'}
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    label="وضعیت تایید"
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    required
                                >
                                    <option value="approved" className="bg-white dark:bg-slate-800">تایید شده</option>
                                    <option value="waiting" className="bg-white dark:bg-slate-800">در انتظار بررسی</option>
                                    <option value="unapproved" className="bg-white dark:bg-slate-800">عدم تایید</option>
                                </SelectInput>

                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-3/12 ml-5">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    label="کلمه عبور جدید"
                                    svgIcon={(
                                        <>
                                            <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"/>
                                            <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"/>
                                            <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"/>
                                            <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"/>
                                        </>
                                    )}
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                />

                                <InputError message={errors.password} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-3/12">
                                <TextInput
                                    id="confirm_password"
                                    type="password"
                                    name="confirm_password"
                                    value={data.confirm_password}
                                    label="تایید کلمه عبور جدید"
                                    svgIcon={(
                                        <>
                                            <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"/>
                                            <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"/>
                                            <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"/>
                                            <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"/>
                                        </>
                                    )}
                                    onChange={(e) => setData('confirm_password', e.target.value)}
                                    error={errors.confirm_password}
                                />

                                <InputError message={errors.confirm_password} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                            <div className="w-full xl:w-3/12 !mt-8 xl:!mt-0 flex items-center">
                                <CheckboxInput
                                    id="creditor"
                                    name="creditor"
                                    checked={data.creditor}
                                    onChange={(e) => setData('creditor', e.target.checked)}
                                />

                                <InputLabel
                                    htmlFor="creditor"
                                    value="وضعیت بستانکار"
                                    className="mr-2"
                                />
                            </div>
                            {!!data.creditor && (<div className="w-full xl:w-3/12 !mt-8 xl:!mt-0 flex items-center">
                                <CheckboxInput
                                    id="creditor_image"
                                    name="creditor_image"
                                    checked={data.creditor_image}
                                    onChange={(e) => setData('creditor_image', e.target.checked)}
                                />

                                <InputLabel
                                    htmlFor="creditor_image"
                                    value="نامه تاییدیه بستانکاری"
                                    className="mr-2"
                                />
                            </div>)}
                        </div>

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                مدارک همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 gap-5 mt-3">
                            <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 text-gray-700 dark:text-slate-200 rounded-lg p-3">
                                <p className="text-xs flex items-center">
                                    تصویر کارت ملی جدید
                                </p>
                                {user.info.id_card_image ? (
                                    <a href={user.info.id_card_image ? user.info.id_card_image_url : 'javascript:void(0)'}
                                       target={user.info.id_card_image && "_blank"}
                                       onClick={! user.info.id_card_image && (() => {
                                           toastify('مدرک برای همکار ثبت نشده است', {
                                               type: 'error'
                                           });
                                       })}
                                       className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={user.info.id_card_image_url} alt="تصویر کارت ملی جدید"/>
                                        </div>
                                    </a>
                                ) : (
                                    <p className="mt-5 font-semibold">
                                        تصویر ثبت نشده!
                                    </p>
                                )}
                            </div>
                            <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 text-gray-700 dark:text-slate-200 rounded-lg p-3">
                                <p className="text-xs flex items-center">
                                    تصویر کارت نظام پزشکی
                                </p>
                                {user.info.med_card_image ? (
                                    <a href={user.info.med_card_image ? user.info.med_card_image_url : 'javascript:void(0)'}
                                       target={user.info.med_card_image && "_blank"}
                                       onClick={! user.info.med_card_image && (() => {
                                           toastify('مدرک برای همکار ثبت نشده است', {
                                               type: 'error'
                                           });
                                       })}
                                       className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={user.info.med_card_image_url} alt="تصویر کارت نظام پزشکی"/>
                                        </div>
                                    </a>
                                ) : (
                                    <p className="mt-5 font-semibold">
                                        تصویر ثبت نشده!
                                    </p>
                                )}
                            </div>

                            <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 text-gray-700 dark:text-slate-200 rounded-lg p-3">
                                <p className="text-xs flex items-center">
                                    تصویر مجوز فعالیت
                                </p>
                                {user.info.license_image ? (
                                    <a href={user.info.license_image ? user.info.license_image_url : 'javascript:void(0)'}
                                       target={user.info.license_image && "_blank"}
                                       onClick={! user.info.license_image && (() => {
                                           toastify('مدرک برای همکار ثبت نشده است', {
                                               type: 'error'
                                           });
                                       })}
                                       className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={user.info.license_image_url} alt="تصویر کارت ملی جدید"/>
                                        </div>
                                    </a>
                                ) : (
                                    <p className="mt-5 font-semibold">
                                        تصویر ثبت نشده!
                                    </p>
                                )}
                            </div>
                        </div>

                        {(user.status === 'unapproved' && user.disapprove) && (
                            <>
                                <div className="mt-12 text-gray-700 dark:text-slate-200">
                                    <h5>
                                        دلیل عدم تایید کاربر
                                    </h5>
                                    <hr className="dark:border-slate-600"/>
                                </div>
                                <div className="flex mt-3 text-gray-700 dark:text-slate-200">
                                    <span className="ml-2 font-semibold">
                                        پیام مدیریت:
                                    </span>
                                    {user.disapprove}
                                </div>
                            </>
                        )}
                        <div className="flex justify-between mt-8 block xl:hidden">
                            {user.status !== 'approved' && (
                                <>
                                    <DangerButton
                                        type="button"
                                        onClick={() => {
                                            setModalShow(true);
                                        }}
                                        className="!px-4 !py-2 ml-5"
                                    >
                                        عدم تایید
                                    </DangerButton>
                                    <WarningButton
                                        className="!px-4 !py-2"
                                        disabled={processing}
                                        type="button"
                                        onClick={submit_verified}
                                    >
                                        تایید همکار و ثبت تغییرات
                                    </WarningButton>
                                </>

                            )}
                        </div>
                        <div className="flex justify-between mt-3 xl:mt-8">
                            <DangerButton
                                className="!px-4 !py-2"
                                link={true}
                                href={route('users.index')}
                            >
                                لغو
                            </DangerButton>
                            {user.status !== 'approved' && (
                                <>
                                    <DangerButton
                                        type="button"
                                        onClick={() => {
                                        setModalShow(true);
                                    }}
                                        className="!px-4 !py-2 ml-5 mr-auto hidden xl:inline-flex"
                                    >
                                        عدم تایید
                                    </DangerButton>
                                    <WarningButton
                                        className="!px-4 !py-2 ml-5 hidden xl:inline-flex"
                                        disabled={processing}
                                        type="button"
                                        onClick={submit_verified}
                                    >
                                        تایید همکار و ثبت تغییرات
                                    </WarningButton>
                                </>

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

            <Modal show={modalShow} onClose={closeModal} maxWidth="lg">
                <form onSubmit={disapprove} className="p-6">
                    <h2 className="mb-5 text-lg font-semibold text-gray-700 dark:text-slate-200">
                        عدم تایید همکار
                    </h2>
                    <TextAreaInput
                        id="disapprove"
                        name="disapprove"
                        value={modal_data.disapprove}
                        rows="3"
                        label="دلیل عدم تایید همکار"
                        onChange={(e) => modal_setData('disapprove', e.target.value)}
                        error={modal_errors.disapprove}
                        isFocused={true}
                    />

                    <InputError message={modal_errors.disapprove} className="mt-2"/>
                    <div className="mt-6 flex justify-between">
                        <DangerButton className="!px-4 !py-2 text-xs" type="button" onClick={(closeModal)}>
                            لغو
                        </DangerButton>

                        <PrimaryButton className="mr-3 !px-4 !py-2 text-xs" disabled={processing}>
                            ثبت
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}
