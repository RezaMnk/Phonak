import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import Icon from "@/Components/Icon.jsx";

export default function Register() {
    const {data, setData, post, processing, errors} = useForm({
        state: 'تهران',
        city: 'تهران',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout className="!max-w-2xl" name="ثبت نام">
            <Head title="ثبت نام" />

            <div className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-slate-400">
                <span className="text-base font-semibold text-red-400 dark:text-red-700 animate-pulse">
                    توجه:
                </span>
                <p>
                    ثبت نام شما به عنوان همکار شنوایی شناس انجام خواهد شد. شما برای ثبت نام نیازمند موارد زیر خواهید بود:
                </p>
                <p>
                    کارت نظام پزشکی، مجوز فعالیت و کارت ملی جدید (یا قدیم به همراه رسید تعویض)
                </p>
            </div>
            <form onSubmit={submit}>
                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                    <div className="w-full xl:w-1/2 ml-5">
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
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="w-full xl:w-1/2">
                        <TextInput
                            id="national_code"
                            type="number"
                            name="national_code"
                            label="کد ملی"
                            value={data.national_code}
                            svgIcon={<path
                                d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                strokeLinecap="round" strokeLinejoin="round"/>}
                            autoComplete="national_code"
                            onChange={(e) => setData('national_code', e.target.value)}
                            error={errors.national_code}
                        />

                        <InputError message={errors.national_code} className="mt-2"/>
                    </div>
                </div>

                <div className="flex mt-5">
                    <div className="w-full ">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            label="ایمیل"
                            value={data.email}
                            svgIcon={<path d="M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"/>}
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                        />

                        <InputError message={errors.email} className="mt-2"/>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                    <div className="w-full xl:w-2/5 ml-5">
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

                    <div className="w-full xl:w-3/5">
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

                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                    <div className="w-full xl:w-3/5 ml-5">
                        <SelectInput
                            id="state"
                            name="state"
                            value={data.state}
                            label="استان محل اقامت"
                            onChange={(e) => setData('state', e.target.value)}
                            error={errors.state}
                        >
                            <IranStatesOptions />
                        </SelectInput>

                        <InputError message={errors.state} className="mt-2"/>
                    </div>
                    <div className="w-full xl:w-2/5">
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

                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                    <div className="w-full xl:w-1/2 ml-5">
                        <SelectInput
                            id="grade"
                            name="grade"
                            autoComplete="grade"
                            value={data.grade}
                            label="مقطع تحصیلی"
                            onChange={(e) => setData('grade', e.target.value)}
                            error={errors.grade}
                        >
                            <option value="" selected disabled>انتخاب کنید</option>
                            <option value="کارشناسی">کارشناسی</option>
                            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                            <option value="دکتری">دکتری</option>
                            <option value="سایر">سایر</option>
                        </SelectInput>

                        <InputError message={errors.grade} className="mt-2"/>
                    </div>

                    <div className="w-full xl:w-1/2">
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
                </div>

                <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5">
                    <div className="w-full xl:w-1/2 ml-5">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            label="کلمه عبور"
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

                    <div className="w-full xl:w-1/2">
                        <TextInput
                            id="confirm_password"
                            type="password"
                            name="confirm_password"
                            label="تکرار کلمه عبور"
                            value={data.confirm_password}
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

                <div className="mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        ثبت نام
                    </PrimaryButton>

                    <div className="mt-6 text-center">
                        <Link
                            href={route('login')}
                            className="text-sm text-blue-950 dark:text-blue-300 hover:underline"
                        >
                            حساب کاربری دارید؟
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
