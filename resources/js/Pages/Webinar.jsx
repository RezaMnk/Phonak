import {Head, useForm} from '@inertiajs/react';
import Header from "@/Layouts/Components/Header.jsx";
import Footer from "@/Layouts/Components/Footer.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Webinar({ status }) {
    const {data, setData, post, processing, errors} = useForm({
        first_name: '',
        last_name: '',
        national_code: '',
        phone: '',
        state: 'تهران',
        city: 'تهران',
        grade: '',
        education_year: '',
    });

    // const submit = (e) => {
    //     e.preventDefault();
    //
    //     post(route('webinar'));
    // };

    return (
        <>
            <Head title="وبینار" />

            <div className="w-full min-h-screen bg-slate-100">
                <div className="h-full">
                    <Header/>

                    <div className="max-w-5xl mx-5 lg:mx-auto my-36 grid gap-12 place-content-center text-4xl font-bold">
                        <p>
                            مهلت ثبت نام به اتمام رسیده است.
                        </p>
                        <PrimaryButton link href={route('home')}>
                            بازگشت به صفحه اصلی
                        </PrimaryButton>
                    </div>

                    {/*{status ? (*/}
                    {/*    <div className="max-w-5xl mx-5 lg:mx-auto my-36">*/}
                    {/*        {status === 'ok' && (*/}
                    {/*            <div>*/}
                    {/*                <p className="text-3xl font-bold text-slate-700">*/}
                    {/*                    سفارش شما با موفقیت ثبت شد.*/}
                    {/*                </p>*/}
                    {/*                <PrimaryButton link href={route('home')} className="mt-8">*/}
                    {/*                    بازگشت به وبسایت*/}
                    {/*                </PrimaryButton>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*) : (*/}
                    {/*    <form onSubmit={submit} className="max-w-5xl mx-5 lg:mx-auto my-12">*/}
                    {/*        <div className="mb-4 flex items-center gap-5 text-slate-700">*/}
                    {/*            <hr className="grow border-2"/>*/}
                    {/*            <h1 className="text-2xl font-semibold">*/}
                    {/*                ثبت نام وبینار*/}
                    {/*            </h1>*/}
                    {/*            <hr className="grow border-2"/>*/}
                    {/*        </div>*/}
                    {/*        <div className="relative p-8 bg-white rounded-lg">*/}
                    {/*            <div className="grid grid-cols-12 gap-5">*/}
                    {/*                <div className="col-span-full lg:col-span-4">*/}
                    {/*                    <TextInput*/}
                    {/*                        id="first_name"*/}
                    {/*                        name="first_name"*/}
                    {/*                        value={data.first_name}*/}
                    {/*                        label="نام"*/}
                    {/*                        autoComplete="name"*/}
                    {/*                        isFocused={true}*/}
                    {/*                        onChange={(e) => setData('first_name', e.target.value)}*/}
                    {/*                        error={errors.first_name}*/}
                    {/*                    />*/}

                    {/*                    <InputError message={errors.first_name} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-4">*/}
                    {/*                    <TextInput*/}
                    {/*                        id="last_name"*/}
                    {/*                        name="last_name"*/}
                    {/*                        value={data.last_name}*/}
                    {/*                        label="نام خانوادگی"*/}
                    {/*                        autoComplete="name"*/}
                    {/*                        onChange={(e) => setData('last_name', e.target.value)}*/}
                    {/*                        error={errors.last_name}*/}
                    {/*                    />*/}

                    {/*                    <InputError message={errors.last_name} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-4">*/}
                    {/*                    <TextInput*/}
                    {/*                        id="national_code"*/}
                    {/*                        type="number"*/}
                    {/*                        name="national_code"*/}
                    {/*                        label="کد ملی"*/}
                    {/*                        value={data.national_code}*/}
                    {/*                        autoComplete="national_code"*/}
                    {/*                        onChange={(e) => setData('national_code', e.target.value)}*/}
                    {/*                        error={errors.national_code}*/}
                    {/*                    />*/}

                    {/*                    <InputError message={errors.last_name} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-3">*/}
                    {/*                    <SelectInput*/}
                    {/*                        id="state"*/}
                    {/*                        name="state"*/}
                    {/*                        value={data.state}*/}
                    {/*                        label="استان محل اقامت"*/}
                    {/*                        onChange={(e) => setData('state', e.target.value)}*/}
                    {/*                        error={errors.state}*/}
                    {/*                    >*/}
                    {/*                        <IranStatesOptions/>*/}
                    {/*                    </SelectInput>*/}

                    {/*                    <InputError message={errors.state} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-4">*/}
                    {/*                    <SelectInput*/}
                    {/*                        id="city"*/}
                    {/*                        name="name"*/}
                    {/*                        value={data.city}*/}
                    {/*                        label="شهر محل اقامت"*/}
                    {/*                        onChange={(e) => setData('city', e.target.value)}*/}
                    {/*                        error={errors.city}*/}
                    {/*                    >*/}
                    {/*                        <Cities state={data.state}/>*/}
                    {/*                    </SelectInput>*/}

                    {/*                    <InputError message={errors.city} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-5">*/}
                    {/*                    <TextInput*/}
                    {/*                        id="phone"*/}
                    {/*                        type="number"*/}
                    {/*                        name="phone"*/}
                    {/*                        label="شماره تلفن همراه"*/}
                    {/*                        value={data.phone}*/}
                    {/*                        autoComplete="phone"*/}
                    {/*                        onChange={(e) => setData('phone', e.target.value)}*/}
                    {/*                        error={errors.phone}*/}
                    {/*                    />*/}

                    {/*                    <InputError message={errors.phone} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                <div className="col-span-full lg:col-span-7">*/}
                    {/*                    <SelectInput*/}
                    {/*                        id="grade"*/}
                    {/*                        name="grade"*/}
                    {/*                        autoComplete="grade"*/}
                    {/*                        value={data.grade}*/}
                    {/*                        label="مقطع تحصیلی"*/}
                    {/*                        onChange={(e) => setData('grade', e.target.value)}*/}
                    {/*                        error={errors.grade}*/}
                    {/*                    >*/}
                    {/*                        <option value="" disabled>انتخاب کنید</option>*/}
                    {/*                        <option value="دکترای شنوایی شناسی">دکترای شنوایی شناسی</option>*/}
                    {/*                        <option value="کارشناس ارشد شنوایی شناسی">کارشناس ارشد شنوایی شناسی</option>*/}
                    {/*                        <option value="کارشناس شنوایی شناسی">کارشناس شنوایی شناسی</option>*/}
                    {/*                        <option value="دانشجوی کارشناسی شنوایی شناسی">دانشجوی کارشناسی شنوایی شناسی*/}
                    {/*                        </option>*/}
                    {/*                        <option value="دانشجوی کارشناسی ارشد شنوایی شناسی">دانشجوی کارشناسی ارشد*/}
                    {/*                            شنوایی*/}
                    {/*                            شناسی*/}
                    {/*                        </option>*/}
                    {/*                        <option value="دانشجوی دکترای شنوایی شناسی">دانشجوی دکترای شنوایی شناسی*/}
                    {/*                        </option>*/}
                    {/*                    </SelectInput>*/}

                    {/*                    <InputError message={errors.grade} className="mt-2"/>*/}
                    {/*                </div>*/}
                    {/*                {data.grade === "دانشجوی کارشناسی شنوایی شناسی" && (*/}
                    {/*                    <div className="col-span-full lg:col-span-5">*/}
                    {/*                        <SelectInput*/}
                    {/*                            id="education_year"*/}
                    {/*                            name="education_year"*/}
                    {/*                            autoComplete="education_year"*/}
                    {/*                            value={data.education_year}*/}
                    {/*                            label="مقطع تحصیلی"*/}
                    {/*                            onChange={(e) => setData('education_year', e.target.value)}*/}
                    {/*                            error={errors.education_year}*/}
                    {/*                        >*/}
                    {/*                            <option value="" disabled>انتخاب کنید</option>*/}
                    {/*                            <option value="سال اول">سال اول</option>*/}
                    {/*                            <option value="سال دوم">سال دوم</option>*/}
                    {/*                            <option value="سال سوم">سال سوم</option>*/}
                    {/*                            <option value="سال چهارم">سال چهارم</option>*/}
                    {/*                        </SelectInput>*/}

                    {/*                        <InputError message={errors.education_year} className="mt-2"/>*/}
                    {/*                    </div>*/}
                    {/*                )}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="mt-4 flex flex-col lg:flex-row gap-5">*/}
                    {/*            <SecondaryButton*/}
                    {/*                className="grow lg:grow-0 lg:w-1/5"*/}
                    {/*                disabled={processing}*/}
                    {/*                link*/}
                    {/*                href={route('home')}*/}
                    {/*            >*/}
                    {/*                بازگشت*/}
                    {/*            </SecondaryButton>*/}
                    {/*            <PrimaryButton*/}
                    {/*                className="grow"*/}
                    {/*                disabled={processing}*/}
                    {/*                type="submit"*/}
                    {/*            >*/}
                    {/*                ثبت و پرداخت*/}
                    {/*            </PrimaryButton>*/}
                    {/*        </div>*/}
                    {/*    </form>*/}
                    {/*)}*/}

                    <Footer/>
                </div>

            </div>
        </>
    );
}
