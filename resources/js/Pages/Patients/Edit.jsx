import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";

export default function Edit({ auth, patient }) {
    const {data, setData, post, processing, errors} = useForm({
        name: patient.name,
        eng_name: patient.eng_name,
        national_code: patient.national_code,
        state: patient.state,
        city: patient.city,
        address: patient.address,
        post_code: patient.post_code,
        phone: patient.phone,
        age: patient.age,
    });


    const submit = (e) => {
        e.preventDefault();

        console.log(data)
        post(route('patient.update'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 align-middle py-2">
                        ویرایش بیمار:
                        <span className="font-medium mr-2 text-gray-500">
                        {patient.name}
                    </span>
                    </h2>
                    <div>
                        <Link
                            href={route('patients')}
                            disabled={processing}
                            className="w-fit ml-2 px-4 py-2 text-sm font-bold text-white transition-colors duration-300 bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50 "
                            form="edit-user"
                        >
                            لغو
                        </Link>
                        <PrimaryButton
                            disabled={processing}
                            className="w-fit !px-4 !py-2"
                            form="edit-user"
                        >
                            ثبت تغییرات
                        </PrimaryButton>
                    </div>
                </div>
            )}
            breadcrumbs={
                {
                    'بیماران': route('patients'),
                    'ویرایش کاربر': "#"
                }
            }
        >
            <Head title="ویرایش کاربر" />

            <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full mt-6 px-6 py-4 bg-white sm:rounded-lg">
                    <form id="edit-user" className="w-full" onSubmit={submit}>
                        <div className="mt-5">
                            <h5>
                                اطلاعات بیمار
                            </h5>
                            <hr/>
                        </div>
                        <div className="flex mt-6">
                            <div className="w-1/4 ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        label="نام بیمار"
                                        svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                       d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-1/6 ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="national_code"
                                        name="national_code"
                                        type="number"
                                        value={data.national_code}
                                        label="کد ملی بیمار"
                                        svgIcon={<path
                                            d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                        onChange={(e) => setData('national_code', e.target.value)}
                                        error={errors.national_code}
                                        required
                                    />

                                    <InputError message={errors.national_code} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-[12%] ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={data.age}
                                        label="سن بیمار"
                                        svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                       d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                        onChange={(e) => setData('age', e.target.value)}
                                        error={errors.age}
                                        required
                                    />

                                    <InputError message={errors.age} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-1/4 ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        value={data.phone}
                                        label="شماره تلفن بیمار"
                                        svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                       d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        error={errors.phone}
                                        required
                                    />

                                    <InputError message={errors.phone} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="mb-5">
                                    <TextInput
                                        id="eng_name"
                                        name="eng_name"
                                        value={data.eng_name}
                                        label="نام بیمار به انگلیسی"
                                        svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                                       d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                                        onChange={(e) => setData('eng_name', e.target.value)}
                                        error={errors.eng_name}
                                        required
                                    />

                                    <InputError message={errors.eng_name} className="mt-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/4 ml-5">
                                <div className="mb-5">
                                    <SelectInput
                                        id="state"
                                        name="state"
                                        value={data.state}
                                        label="استان اقامت"
                                        onChange={(e) => setData('state', e.target.value)}
                                        error={errors.state}
                                        required
                                    >
                                        <IranStatesOptions />
                                    </SelectInput>

                                    <InputError message={errors.state} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-1/4 ml-5">
                                <div className="mb-5">
                                    <SelectInput
                                        id="city"
                                        name="name"
                                        value={data.city}
                                        label="شهر محل اقامت"
                                        onChange={(e) => setData('city', e.target.value)}
                                        error={errors.city}
                                        required
                                    >
                                        <Cities state={data.state} />
                                    </SelectInput>

                                    <InputError message={errors.city} className="mt-2"/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h5>
                                مشخصات محل کار
                            </h5>
                            <hr/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/2 ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="work_post_code"
                                        name="work_post_code"
                                        value={data.work_post_code}
                                        label="کد پستی محل کار"
                                        svgIcon={(
                                            <g>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                            </g>
                                        )}
                                        autoComplete="work_post_code"
                                        onChange={(e) => setData('work_post_code', e.target.value)}
                                        error={errors.work_post_code}
                                        required
                                    />

                                    <InputError message={errors.work_post_code} className="mt-2"/>
                                </div>

                                <div>
                                    <TextInput
                                        className={errors.work_phone && 'border-red-400 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40'}
                                        id="work_phone"
                                        type="number"
                                        name="work_phone"
                                        label="تلفن محل کار"
                                        value={data.work_phone}
                                        svgIcon={<path
                                            d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                        onChange={(e) => setData('work_phone', e.target.value)}
                                        error={errors.work_phone}
                                        required
                                    />

                                    <InputError message={errors.work_phone} className="mt-2"/>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <TextAreaInput
                                    id="work_address"
                                    name="work_address"
                                    value={data.work_address}
                                    rows="4"
                                    label="آدرس محل کار"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    autoComplete="username"
                                    onChange={(e) => setData('work_address', e.target.value)}
                                    error={errors.work_address}
                                    required
                                />

                                <InputError message={errors.work_address} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex mt-8">
                            <div className="w-1/2 ml-5">
                                <p>
                                    مرسولات شما به کدام آدرس ارسال شوند؟
                                </p>

                                <InputError message={errors.mail_address} className="mt-2"/>

                                <div className="mb-5">
                                    <div className="inline-block ml-8 mt-2">
                                        <RadioInput
                                            id="mail_address_work"
                                            name="mail_address"
                                            checked={data.mail_address === 'work'}
                                            onChange={() => setData('mail_address', 'work')}
                                            required
                                        />

                                        <InputLabel
                                            htmlFor="mail_address_work"
                                            value="محل کار"
                                            className="mr-2"
                                        />
                                    </div>
                                    <div className="inline-block ml-8 mt-2">
                                        <RadioInput
                                            id="mail_address_home"
                                            name="mail_address"
                                            checked={data.mail_address === 'home'}
                                            onChange={() => setData('mail_address', 'home')}
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
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
