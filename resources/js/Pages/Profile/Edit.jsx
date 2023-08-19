import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import FileInput from "@/Components/FileInput.jsx";
import {useState} from "react";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function Edit({ user }) {
    const {data, setData, reset, patch, processing, errors} = useForm({
        password: '',
        new_password: '',
        confirm_password: '',
        name: user.name,
        national_code: user.national_code,
        grad_year: user.grad_year,
        med_number: user.med_number,
        grade: user.grade,
        university: user.university,
        state: user.state,
        city: user.city,
        info: {
            phone: user.info.phone,
            landline: user.info.landline,
            whatsapp_phone: user.info.whatsapp_phone,
            referral_name: user.info.referral_name,
            referral_phone: user.info.referral_phone,
            second_referral_name: user.info.second_referral_name,
            second_referral_phone: user.info.second_referral_phone,
            history_description: user.info.history_description,
            conditions_description: user.info.conditions_description,
            id_card_image: user.info.id_card_image,
            med_card_image: user.info.med_card_image,
            license_image: user.info.license_image,
        },
        address: {
            home_post_code: user.address.home_post_code,
            home_phone: user.address.home_phone,
            home_address: user.address.home_address,
            work_post_code: user.address.work_post_code,
            work_phone: user.address.work_phone,
            work_address: user.address.work_address,
            second_work_post_code: user.address.second_work_post_code,
            second_work_phone: user.address.second_work_phone,
            second_work_address: user.address.second_work_address,
            mail_address: user.address.mail_address,
            has_second: !!user.address.second_work_address,
        },
    });

    const [ hasSecondAddress, setHasSecondAddress ] = useState(!!user.address.second_work_address)
    const [ showAddAddressBtn, setShowAddAddressBtn ] = useState(!user.address.second_work_address)

    function has_second_address(value)
    {
        setHasSecondAddress(value)
        setShowAddAddressBtn(!value)

        if (!value)
            setData((data) => ({
                ...data,
                address: {
                    ...data.address,
                    second_work_post_code: '',
                    second_work_phone: '',
                    second_work_address: '',
                    has_second: value,
                }
            }))
        else
            setData((data) => ({
                ...data,
                address: {
                    ...data.address,
                    has_second: value,
                }
            }))
    }

    const update_data = (main_key, key, e) => {
        setData((prevData) => ({
            ...prevData,
            [main_key]: {
                ...prevData[main_key],
                [key]: e.target.value
            },
        }))
    };


    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => reset('password', 'confirm_password')
        });
    };

    const render = () => (
        <div className="flex flex-col sm:justify-center items-center">
            <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                <form className="w-full" onSubmit={submit}>
                    <div className="text-gray-700 dark:text-slate-200">
                        <h5>
                            اطلاعات فردی
                        </h5>
                        <hr className="dark:border-slate-600"/>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6 mb-5">
                        <div className="w-full md:w-4/12 ml-5">
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                label="نام و نام خانوادگی"
                                svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                               d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                            />

                            <InputError message={errors.name} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-3/12 ml-5">
                            <TextInput
                                id="national_code"
                                type="number"
                                name="national_code"
                                label="کد ملی"
                                value={data.national_code}
                                svgIcon={<path
                                    d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => setData('national_code', e.target.value)}
                                error={errors.national_code}
                            />

                            <InputError message={errors.national_code} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-2/12 ml-5">
                            <TextInput
                                id="grad_year"
                                type="number"
                                name="grad_year"
                                value={data.grad_year}
                                label="سال فارغ التحصیلی"
                                svgIcon={(<path strokeLinecap="round" strokeLinejoin="round"
                                                d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"/>)}
                                onChange={(e) => setData('grad_year', e.target.value)}
                                error={errors.grad_year}
                            />

                            <InputError message={errors.grad_year} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-3/12">
                            <TextInput
                                id="med_number"
                                type="number"
                                name="med_number"
                                label="شماره نظام پزشکی"
                                value={data.med_number}
                                svgIcon={<path d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>}
                                onChange={(e) => setData('med_number', e.target.value)}
                                error={errors.med_number}
                            />

                            <InputError message={errors.med_number} className="mt-2"/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-3">
                        <div className="w-full md:w-1/4 ml-5">
                            <SelectInput
                                id="grade"
                                name="grade"
                                value={data.grade}
                                label="مقطع تحصیلی"
                                onChange={(e) => setData('grade', e.target.value)}
                                error={errors.grade}
                            >
                                <option value="کارشناسی">کارشناسی</option>
                                <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                                <option value="دکتری">دکتری</option>
                                <option value="سایر">سایر</option>
                            </SelectInput>

                            <InputError message={errors.grade} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4 ml-5">
                            <TextInput
                                id="university"
                                name="university"
                                value={data.university}
                                label="دانشگاه"
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
                                autoComplete="university"
                                onChange={(e) => setData('university', e.target.value)}
                                error={errors.university}
                            />

                            <InputError message={errors.university} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4 ml-5">
                            <SelectInput
                                id="state"
                                name="state"
                                value={data.state}
                                label="استان اقامت"
                                onChange={(e) => setData('state', e.target.value)}
                                error={errors.state}
                            >
                                <IranStatesOptions />
                            </SelectInput>

                            <InputError message={errors.state} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4">
                            <SelectInput
                                id="city"
                                name="name"
                                value={data.city}
                                label="شهر محل اقامت"
                                onChange={(e) => setData('city', e.target.value)}
                                error={errors.city}
                            >
                                <Cities state={data.state} />
                            </SelectInput>

                            <InputError message={errors.city} className="mt-2"/>
                        </div>
                    </div>

                    <div className="mt-12 text-gray-700 dark:text-slate-200">
                        <div className="flex justify-between">
                            <h5>
                                آدرس های همکار
                            </h5>
                            {showAddAddressBtn ? (
                                <PrimaryButton className="mb-1 text-xs !px-2 !py-1"
                                              onClick={() => has_second_address(true)}
                                              type="button"
                                >
                                    افزودن محل کار دوم
                                </PrimaryButton>
                            ) : (
                                <DangerButton className="mb-1 text-xs !px-2 !py-1"
                                              onClick={() => has_second_address(false)}
                                              type="button"
                                >
                                    حذف محل کار دوم
                                </DangerButton>
                            )}
                        </div>
                        <hr className="dark:border-slate-600"/>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6 mb-5">
                        <div className="w-full md:w-2/12 ml-5">
                            <TextInput
                                id="home_post_code"
                                name="address.home_post_code"
                                value={data.address.home_post_code}
                                label="کد پستی منزل"
                                svgIcon={(
                                    <g>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                    </g>
                                )}
                                autoComplete="address.home_post_code"
                                onChange={(e) => setData('address.home_post_code', e.target.value)}
                                error={errors.address?.home_post_code}
                            />

                            <InputError message={errors.address?.home_post_code} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-2/12 ml-5">
                            <TextInput
                                id="home_phone"
                                type="number"
                                name="address.home_phone"
                                label="تلفن منزل"
                                value={data.address.home_phone}
                                svgIcon={<path
                                    d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => setData('address.home_phone', e.target.value)}
                                error={errors.address?.home_phone}
                            />

                            <InputError message={errors.address?.home_phone} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-8/12">
                            <TextInput
                                id="home_address"
                                name="address.home_address"
                                value={data.address.home_address}
                                label="آدرس منزل"
                                svgIcon={<path
                                    d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => setData('address.home_address', e.target.value)}
                                error={errors.address?.home_address}
                            />

                            <InputError message={errors.address?.home_address} className="mt-2"/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6 mb-5">
                        <div className="w-full md:w-2/12 ml-5">
                            <TextInput
                                id="work_post_code"
                                name="address.work_post_code"
                                value={data.address.work_post_code}
                                label="کد پستی محل کار"
                                svgIcon={(
                                    <g>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                        <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                    </g>
                                )}
                                autoComplete="address.work_post_code"
                                onChange={(e) => setData('address.work_post_code', e.target.value)}
                                error={errors.address?.work_post_code}
                                required
                            />

                            <InputError message={errors.address?.work_post_code} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-2/12 ml-5">
                            <TextInput
                                id="work_phone"
                                type="number"
                                name="address.work_phone"
                                label="تلفن محل کار"
                                value={data.address.work_phone}
                                svgIcon={<path
                                    d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => setData('address.work_phone', e.target.value)}
                                error={errors.address?.work_phone}
                                required
                            />

                            <InputError message={errors.address?.work_phone} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-8/12">
                            <TextInput
                                id="work_address"
                                name="address.work_address"
                                value={data.address.work_address}
                                label="آدرس محل کار"
                                svgIcon={<path
                                    d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => setData('address.work_address', e.target.value)}
                                error={errors.address?.work_address}
                                required
                            />

                            <InputError message={errors.address?.work_address} className="mt-2"/>
                        </div>
                    </div>
                    {hasSecondAddress && (
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6 mb-5">
                            <div className="w-full md:w-2/12 ml-5">
                                <TextInput
                                    id="second_work_post_code"
                                    name="address.second_work_post_code"
                                    value={data.address.second_work_post_code}
                                    label="کد پستی محل کار دوم"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="address.second_work_post_code"
                                    onChange={(e) => setData('address.second_work_post_code', e.target.value)}
                                    error={errors.address?.second_work_post_code}
                                    required
                                />

                                <InputError message={errors.address?.second_work_post_code} className="mt-2"/>
                            </div>
                            <div className="w-full md:w-2/12 ml-5">
                                <TextInput
                                    id="second_work_phone"
                                    type="number"
                                    name="address.second_work_phone"
                                    label="تلفن محل کار دوم"
                                    value={data.address.second_work_phone}
                                    svgIcon={<path
                                        d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    onChange={(e) => setData('address.second_work_phone', e.target.value)}
                                    error={errors.address?.second_work_phone}
                                    required
                                />

                                <InputError message={errors.address?.second_work_phone} className="mt-2"/>
                            </div>
                            <div className="w-full md:w-8/12">
                                <TextInput
                                    id="second_work_address"
                                    name="address.second_work_address"
                                    value={data.address.second_work_address}
                                    label="آدرس محل کار دوم"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    onChange={(e) => setData('address.second_work_address', e.target.value)}
                                    error={errors.address?.second_work_address}
                                    required
                                />

                                <InputError message={errors.address?.second_work_address} className="mt-2"/>
                            </div>
                        </div>
                    )}
                    <div className="flex mt-5">
                        <div className="w-full ml-5 text-gray-700 dark:text-slate-200">
                            <p>
                                مرسولات شما به کدام آدرس ارسال شوند؟
                            </p>

                            <InputError message={errors.address?.mail_address} className="mt-2"/>

                            <div className="mb-5 mt-2">
                                <div className="inline-block ml-8">
                                    <RadioInput
                                        id="mail_address_work"
                                        name="address.mail_address"
                                        checked={data.address.mail_address === 'work'}
                                        onChange={() => setData((data) => ({...data, address: {...data.address, mail_address: 'work'}}))}
                                        required
                                    />

                                    <InputLabel
                                        htmlFor="mail_address_work"
                                        value="محل کار"
                                        className="mr-2"
                                    />
                                </div>
                                {hasSecondAddress && (
                                    <div className="inline-block ml-8">
                                        <RadioInput
                                            id="second_mail_address_work"
                                            name="address.mail_address"
                                            checked={data.address.mail_address === 'second_work'}
                                            onChange={() => setData((data) => ({...data, address: {...data.address, mail_address: 'second_work'}}))}
                                            required
                                        />

                                        <InputLabel
                                            htmlFor="second_mail_address_work"
                                            value="محل کار دوم"
                                            className="mr-2"
                                        />
                                    </div>
                                )}
                                <div className="inline-block">
                                    <RadioInput
                                        id="mail_address_home"
                                        name="address.mail_address"
                                        checked={data.address.mail_address === 'home'}
                                        onChange={() => setData((data) => ({...data, address: {...data.address, mail_address: 'home'}}))}
                                        required
                                    />

                                    <InputLabel
                                        htmlFor="mail_address_home"
                                        value="محل اقامت"
                                        className="mr-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-gray-700 dark:text-slate-200">
                        <h5>
                            اطلاعات تکمیلی
                        </h5>
                        <hr className="dark:border-slate-600"/>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-3">
                        <div className="w-full md:w-1/3 ml-5">
                            <TextInput
                                id="phone"
                                type="number"
                                name="info.phone"
                                value={data.info.phone}
                                label="شماره تلفن همراه"
                                svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                onChange={(e) => update_data('info', 'phone', e)}
                                error={errors.info?.phone}
                                required
                            />

                            <InputError message={errors.info?.phone} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/3 ml-5">
                            <TextInput
                                id="landline"
                                type="number"
                                name="info.landline"
                                value={data.info.landline}
                                label="شماره تلفن ثابت"
                                svgIcon={<path
                                    d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                onChange={(e) => update_data('info', 'landline', e)}
                                error={errors.info?.landline}
                                required
                            />

                            <InputError message={errors.info?.landline} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/3">
                            <TextInput
                                id="whatsapp_phone"
                                type="number"
                                name="info.whatsapp_phone"
                                value={data.info.whatsapp_phone}
                                label="شماره تلفن واتساپ"
                                svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                onChange={(e) => update_data('info', 'whatsapp_phone', e)}
                                error={errors.info?.whatsapp_phone}
                                required
                            />

                            <InputError message={errors.info?.whatsapp_phone} className="mt-2"/>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5">
                        <div className="w-full md:w-1/4 ml-5">
                            <TextInput
                                id="referral_name"
                                name="info.referral_name"
                                value={data.info.referral_name}
                                label="نام معرف اول"
                                svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                autoComplete="info.referral_name"
                                onChange={(e) => update_data('info', 'referral_name', e)}
                                error={errors.info?.referral_name}
                            />

                            <InputError message={errors.info?.referral_name} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4 ml-5">
                            <TextInput
                                id="referral_phone"
                                type="number"
                                name="info.referral_phone"
                                value={data.info.referral_phone}
                                label="شماره تلفن معرف اول"
                                svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                autoComplete="info.referral_phone"
                                onChange={(e) => update_data('info', 'referral_phone', e)}
                                error={errors.info?.referral_phone}
                            />

                            <InputError message={errors.info?.referral_phone} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4 ml-5">
                            <TextInput
                                id="second_referral_name"
                                name="info.second_referral_name"
                                value={data.info.second_referral_name}
                                label="نام معرف دوم"
                                svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                autoComplete="info.second_referral_name"
                                onChange={(e) => update_data('info', 'second_referral_name', e)}
                                error={errors.info?.second_referral_name}
                            />

                            <InputError message={errors.info?.second_referral_name} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/4">
                            <TextInput
                                id="second_referral_phone"
                                type="number"
                                name="info.second_referral_phone"
                                value={data.info.second_referral_phone}
                                label="شماره تلفن معرف دوم"
                                svgIcon={<path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/>}
                                autoComplete="info.second_referral_phone"
                                onChange={(e) => update_data('info', 'second_referral_phone', e)}
                                error={errors.info?.second_referral_phone}
                            />

                            <InputError message={errors.info?.second_referral_phone} className="mt-2"/>
                        </div>
                    </div>
                    {user.info.history_description && (
                        <div className="flex mt-5">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="history_description"
                                    value="در صورتیکه سابقه همکاری با فوناک را داشته اید، ‌لطفا شرح مختصری از آن بنویسید"
                                    className="text-gray-500 dark:text-slate-400"
                                />

                                <TextAreaInput
                                    id="history_description"
                                    name="info.history_description"
                                    value={data.info.history_description}
                                    rows="3"
                                    onChange={(e) => update_data('info', 'history_description', e)}
                                    error={errors.info?.history_description}
                                />

                                <InputError message={errors.info?.history_description} className="mt-2"/>
                            </div>
                        </div>
                    )}
                    {user.info.conditions_description && (
                        <div className="flex mt-5">
                            <div className="w-full">
                                <InputLabel
                                    htmlFor="history_description"
                                    value="چنانچه مرکز شما دارای شرایط خاصی است که نیاز به توضیح دارد،‌خیلی مختصر اینجا مرقوم بفرمایید"
                                    className="text-gray-500 dark:text-slate-400"
                                />

                                <TextAreaInput
                                    id="conditions_description"
                                    name="info.conditions_description"
                                    value={data.info.conditions_description}
                                    rows="3"
                                    onChange={(e) => update_data('info', 'conditions_description', e)}
                                    error={errors.info?.conditions_description}
                                />

                                <InputError message={errors.info?.conditions_description} className="mt-2"/>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 text-gray-700 dark:text-slate-200">
                        <h5>
                            تغییر کلمه عبور
                        </h5>
                        <hr className="dark:border-slate-600"/>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5">
                        <div className="w-full md:w-1/3 ml-5">
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                label="کلمه عبور فعلی"
                                svgIcon={(
                                    <>
                                        <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"/>
                                        <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"/>
                                        <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"/>
                                        <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"/>
                                    </>
                                )}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/3 ml-5">
                            <TextInput
                                id="new_password"
                                type="password"
                                name="new_password"
                                value={data.new_password}
                                label="کلمه عبور جدید"
                                svgIcon={(
                                    <>
                                        <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"/>
                                        <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"/>
                                        <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"/>
                                        <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"/>
                                    </>
                                )}
                                autoComplete="new-new_password"
                                onChange={(e) => setData('new_password', e.target.value)}
                                error={errors.new_password}
                            />

                            <InputError message={errors.new_password} className="mt-2"/>
                        </div>
                        <div className="w-full md:w-1/3">
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
                            مدارک
                        </h5>
                        <hr className="dark:border-slate-600"/>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-3">
                        <div className="w-full md:w-1/3 ml-5">
                            <FileInput
                                className="!p-4 h-36"
                                name="id_card_image"
                                viewLink={user.info.id_card_image && user.info.id_card_image_url}
                                fileName={data.id_card_image}
                                label="تصویر واضح کارت ملی جدید (یا قدیم به همراه رسید تعویض)"
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('id_card_image', e.target.files[0])}
                                error={errors.id_card_image}
                            />
                        </div>
                        <div className="w-full md:w-1/3 ml-5">
                            <FileInput
                                className="!p-4 h-36"
                                name="med_card_image"
                                viewLink={user.info.med_card_image && user.info.med_card_image_url}
                                fileName={data.med_card_image}
                                label="تصویر واضح کارت نظام پزشکی"
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('med_card_image', e.target.files[0])}
                                error={errors.med_card_image}
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <FileInput
                                className="!p-4 h-36"
                                name="license_image"
                                viewLink={user.info.license_image && user.info.license_image_url}
                                fileName={data.license_image}
                                label="تصویر واضح مجوز فعالیت با تاریخ معتبر که هم نام دو مدرك اول باشد."
                                accept=".jpg, .jpeg"
                                setData={(e) => setData('license_image', e.target.files[0])}
                                error={errors.license_image}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <DangerButton
                            className="!px-4 !py-2"
                            link={true}
                            href={route('dashboard')}
                        >
                            لغو
                        </DangerButton>
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
    )

    return user.verified ? (
        <AuthenticatedLayout
            header={(
                <>
                    ویرایش پروفایل
                </>
            )}
            breadcrumbs={
                {
                    'پروفایل': route('dashboard'),
                    'ویرایش': "#"
                }
            }
        >
            <Head title="ویرایش پروفایل" />

            {render()}

        </AuthenticatedLayout>
    ) : (
        <GuestLayout className="!max-w-7xl" name="ویرایش پروفایل">
            <Head title="ویرایش پروفایل"/>

            {render()}

        </GuestLayout>
    );
}
