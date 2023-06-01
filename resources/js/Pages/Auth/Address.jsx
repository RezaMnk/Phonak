import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";

export default function Address({ auth }) {
    const {data, setData, post, processing, errors} = useForm({
        mail_address: 'work'
    });


    const submit = (e) => {
        e.preventDefault();

        console.log(data)
        post(route('addresses'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 align-middle py-2">آدرس ها</h2>}
        >
            <Head title="آدرس ها"/>

            <div className="min-h-[75vh] flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-3xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form className="w-full max-w-3xl h-1/2" onSubmit={submit}>
                        <div className="mt-5">
                            <h5>
                                مشخصات محل اقامت
                            </h5>
                            <hr/>
                        </div>
                        <div className="flex mt-3">
                            <div className="w-1/2 ml-5">
                                <div className="mb-5">
                                    <TextInput
                                        id="home_post_code"
                                        name="home_post_code"
                                        value={data.home_post_code}
                                        label="کد پستی منزل"
                                        svgIcon={(
                                            <g>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                                <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                            </g>
                                        )}
                                        autoComplete="home_post_code"
                                        isFocused={true}
                                        onChange={(e) => setData('home_post_code', e.target.value)}
                                        error={errors.home_post_code}
                                        required
                                    />

                                    <InputError message={errors.home_post_code} className="mt-2"/>
                                </div>

                                <div>
                                    <TextInput
                                        id="home_phone"
                                        type="number"
                                        name="home_phone"
                                        label="تلفن منزل"
                                        value={data.home_phone}
                                        svgIcon={<path
                                            d="M20.9995 19.1864V16.4767C21.0105 16.0337 20.858 15.6021 20.5709 15.264C19.7615 14.3106 16.9855 13.7008 15.8851 13.935C15.0274 14.1176 14.4272 14.9788 13.8405 15.5644C11.5747 14.2785 9.69864 12.4062 8.41026 10.1448C8.99696 9.55929 9.85994 8.96036 10.0429 8.10428C10.2772 7.00777 9.66819 4.24949 8.72138 3.43684C8.38835 3.151 7.96253 2.99577 7.52331 3.00009H4.80817C3.77364 3.00106 2.91294 3.92895 3.00713 4.96919C3.00006 13.935 10.0001 21 19.0265 20.9929C20.0723 21.0873 21.0037 20.2223 20.9995 19.1864Z"
                                            strokeLinecap="round" strokeLinejoin="round"/>}
                                        onChange={(e) => setData('home_phone', e.target.value)}
                                        error={errors.home_phone}
                                        required
                                    />

                                    <InputError message={errors.home_phone} className="mt-2"/>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <TextAreaInput
                                    id="home_address"
                                    name="home_address"
                                    value={data.home_address}
                                    rows="4"
                                    label="آدرس منزل"
                                    svgIcon={<path
                                        d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                                        strokeLinecap="round" strokeLinejoin="round"/>}
                                    autoComplete="username"
                                    onChange={(e) => setData('home_address', e.target.value)}
                                    error={errors.home_address}
                                    required
                                />

                                <InputError message={errors.home_address} className="mt-2"/>
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

                        <div className="mt-6">
                            <PrimaryButton disabled={processing}>
                                ثبت آدرس
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
