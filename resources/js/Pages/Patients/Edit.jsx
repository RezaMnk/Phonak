import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Edit({ patient }) {
    const {data, setData, put, processing, errors} = useForm({
        name: patient.name,
        eng_name: patient.eng_name,
        national_code: patient.national_code,
        insurance: patient.insurance,
        state: patient.state,
        city: patient.city,
        address: patient.address,
        post_code: patient.post_code,
        phone: patient.phone,
        birth_year: patient.birth_year,
    });


    const submit = (e) => {
        e.preventDefault();
        put(route('patients.update', patient));
    };

    return (
        <AuthenticatedLayout
            header={(
                <>
                    ویرایش کاربر:
                    <span className="font-medium mr-2 text-gray-500 dark:text-slate-300">
                        {patient.name}
                    </span>
                </>
            )}
            breadcrumbs={
                {
                    'کاربران': route('patients.index'),
                    'ویرایش کاربر': "#"
                }
            }
        >
            <Head title="ویرایش کاربر" />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <form className="w-full" onSubmit={submit}>
                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات کاربر
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-5 mt-6 mb-5">
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    label="نام و نام خانوادگی کاربر"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                />

                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/6">
                                <TextInput
                                    id="national_code"
                                    name="national_code"
                                    type="number"
                                    value={data.national_code}
                                    label="کد ملی کاربر"
                                    svgIcon={<path
                                        d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    onChange={(e) => setData('national_code', e.target.value)}
                                    error={errors.national_code}
                                />

                                <InputError message={errors.national_code} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-[12%]">
                                <TextInput
                                    id="birth_year"
                                    name="birth_year"
                                    type="number"
                                    value={data.birth_year}
                                    label="سال تولد"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    onChange={(e) => setData('birth_year', e.target.value)}
                                    error={errors.birth_year}
                                />

                                <InputError message={errors.birth_year} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    value={data.phone}
                                    label="تلفن همراه کاربر"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    error={errors.phone}
                                />

                                <InputError message={errors.phone} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    id="eng_name"
                                    name="eng_name"
                                    value={data.eng_name}
                                    label="نام و نام خانوادگی کاربر به لاتین"
                                    svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                   d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                    onChange={(e) => setData('eng_name', e.target.value)}
                                    error={errors.eng_name}
                                />

                                <InputError message={errors.eng_name} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-5 mt-3">
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    id="insurance"
                                    name="insurance"
                                    value={data.insurance}
                                    label="نوع بیمه"
                                    svgIcon={<path d="M9 14H15M12 11V17M8 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H16M8 7V6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V7M8 7H16"/>}
                                    onChange={(e) => setData('insurance', e.target.value)}
                                    error={errors.insurance}
                                />

                                <InputError message={errors.insurance} className="mt-2"/>
                            </div>
                            <div className="w-full xl:w-1/4">
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
                            <div className="w-full xl:w-1/4">
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
                            <div className="w-full xl:w-1/4">
                                <TextInput
                                    id="post_code"
                                    name="post_code"
                                    value={data.post_code}
                                    label="کد پستی"
                                    svgIcon={(
                                        <g>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                            <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                        </g>
                                    )}
                                    autoComplete="post_code"
                                    onChange={(e) => setData('post_code', e.target.value)}
                                    error={errors.post_code}
                                />

                                <InputError message={errors.post_code} className="mt-2"/>
                            </div>
                        </div>

                        <div className="mt-12 text-gray-700 dark:text-slate-200">
                            <h5>
                                مشخصات محل اقامت کاربر
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-3">
                            <TextAreaInput
                                id="address"
                                name="address"
                                value={data.address}
                                rows="4"
                                label="آدرس کامل محل اقامت"
                                svgIcon={<path
                                    d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                    strokeLinecap="round" strokeLinejoin="round"/>}
                                autoComplete="address"
                                onChange={(e) => setData('address', e.target.value)}
                                error={errors.address}
                                required
                            />

                            <InputError message={errors.address} className="mt-2"/>
                        </div>
                        <div className="flex justify-between mt-8">
                            <PrimaryButton
                                className="!px-4 !py-2"
                                disabled={processing}
                            >
                                ثبت تغییرات
                            </PrimaryButton>
                            <DangerButton
                                className="!px-4 !py-2"
                                link={true}
                                href={route('patients.index')}
                            >
                                لغو
                            </DangerButton>
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
