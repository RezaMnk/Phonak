import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function Register() {
    const {data, setData, post, processing, errors} = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="ثبت نام"/>

            <form onSubmit={submit}>
                <div className="flex mt-5">
                    <div className="w-1/2 ml-5">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            label="نام و نام خانوادگی"
                            svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                           d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="w-1/2">
                        <TextInput
                            id="national_code"
                            type="number"
                            name="national_code"
                            label="کد ملی"
                            value={data.national_code}
                            svgIcon={<path
                                d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                strokeLinecap="round" strokeLinejoin="round"/>}
                            autoComplete="username"
                            onChange={(e) => setData('national_code', e.target.value)}
                            error={errors.national_code}
                            required
                        />

                        <InputError message={errors.national_code} className="mt-2"/>
                    </div>
                </div>

                <div className="flex mt-5">
                    <div className="w-2/5 ml-5">
                        <TextInput
                            id="grad_year"
                            name="grad_year"
                            value={data.grad_year}
                            label="سال فارغ التحصیلی"
                            svgIcon={(<path strokeLinecap="round" strokeLinejoin="round"
                                            d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z"/>)}
                            onChange={(e) => setData('grad_year', e.target.value)}
                            error={errors.grad_year}
                            required
                        />

                        <InputError message={errors.grad_year} className="mt-2"/>
                    </div>

                    <div className="w-3/5">
                        <TextInput
                            id="med_number"
                            type="number"
                            name="med_number"
                            label="شماره نظام پزشکی"
                            value={data.med_number}
                            svgIcon={<path xmlns="http://www.w3.org/2000/svg" d="M12 8V16M8 12H16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"/>}
                            onChange={(e) => setData('med_number', e.target.value)}
                            error={errors.med_number}
                            required
                        />

                        <InputError message={errors.med_number} className="mt-2"/>
                    </div>
                </div>

                <div className="flex mt-5">
                    <div className="w-1/2 ml-5">
                        <SelectInput
                            id="grade"
                            name="grade"
                            autoComplete="grade"
                            value={data.grade}
                            label="مقطع تحصیلی"
                            onChange={(e) => setData('grade', e.target.value)}
                            error={errors.grade}
                            required
                        >
                            <option value="کارشناسی">کارشناسی</option>
                            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                            <option value="دکتری">دکتری</option>
                        </SelectInput>

                        <InputError message={errors.grade} className="mt-2"/>
                    </div>

                    <div className="w-1/2">
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
                            required
                        />

                        <InputError message={errors.university} className="mt-2"/>
                    </div>
                </div>

                <div className="mt-6">
                    <PrimaryButton disabled={processing}>
                        ثبت نام
                    </PrimaryButton>

                    <div className="mt-6 text-center">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-950 hover:underline"
                        >
                            حساب کاربری دارید؟
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
