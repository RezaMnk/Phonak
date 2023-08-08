import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import WarningButton from "@/Components/WarningButton.jsx";

export default function Edit({ record }) {

    return (
        <AuthenticatedLayout
            header={(
                <>
                    نمایش سفارش
                </>
            )}
            breadcrumbs={
                {
                    'سفارشات': route('records.index'),
                    'نمایش سفارش': "#"
                }
            }
            headerExtra={
                <WarningButton
                    link={true}
                    href={route('records.edit', record.id)}
                    className="!px-4 !py-2 text-xs"
                >
                    ویرایش سفارش
                </WarningButton>
            }
        >
            <Head title="نمایش سفارش" />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <div className="w-full text-gray-700 dark:text-slate-200">
                        <div>
                            <h5>
                                اطلاعات کاربر
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-6">
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    نام و نام خانوادگی
                                </p>
                                <p className="mt-2">
                                    {record.patient.name}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    نام لاتین
                                </p>
                                <p className="mt-2">
                                    {record.patient.eng_name}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    کد ملی
                                </p>
                                <p className="mt-2">
                                    {record.patient.national_code}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    سال تولد
                                </p>
                                <p className="mt-2">
                                    {record.patient.birth_year}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    موقعیت
                                </p>
                                <p className="mt-2">
                                    {record.patient.state} - {record.patient.city}
                                </p>
                            </div>
                        </div>
                        <div className="flex mt-8">
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تلفن همراه
                                </p>
                                <p className="mt-2">
                                    {record.patient.phone}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    کد پستی
                                </p>
                                <p className="mt-2">
                                    {record.patient.post_code}
                                </p>
                            </div>
                            <div className="w-3/5 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    آدرس
                                </p>
                                <p className="mt-2">
                                    {record.patient.address}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h5>
                                اطلاعات سفارش
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-6">
                            <div className="w-1/3 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره تلفن همراه
                                </p>
                                <p className="mt-2">
                                    {record.info.phone}
                                </p>
                            </div>
                            <div className="w-1/3 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره تلفن ثابت
                                </p>
                                <p className="mt-2">
                                    {record.info.landline}
                                </p>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره تلفن واتساپ
                                </p>
                                <p className="mt-2">
                                    {record.info.whatsapp_phone}
                                </p>
                            </div>
                        </div>
                        {record.info.referral_name && (
                            <div className="flex mt-8">
                                <div className="w-1/5 flex flex-col ml-5">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        نام معرف اول
                                    </p>
                                    <p className="mt-2">
                                        {record.info.referral_name}
                                    </p>
                                </div>
                                <div className="w-2/5 flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        شماره تلفن معرف اول
                                    </p>
                                    <p className="mt-2">
                                        {record.info.referral_phone}
                                    </p>
                                </div>
                                {record.info.second_referral_name && (
                                    <>
                                        <div className="w-1/5 flex flex-col ml-5">
                                            <p className="text-xs flex items-center">
                                                <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                                نام معرف دوم
                                            </p>
                                            <p className="mt-2">
                                                {record.info.second_referral_name}
                                            </p>
                                        </div>
                                        <div className="w-1/5 flex flex-col">
                                            <p className="text-xs flex items-center">
                                                <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                                شماره تلفن معرف دوم
                                            </p>
                                            <p className="mt-2">
                                                {record.info.second_referral_phone}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {record.info.history_description && (
                            <div className="flex mt-6">
                                <div className="w-full flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        توضیحات سابقه همکاری با فوناک
                                    </p>
                                    <p className="mt-2">
                                        {record.info.history_description}
                                    </p>
                                </div>
                            </div>
                        )}
                        {record.info.conditions_description && (
                            <div className="flex mt-6">
                                <div className="w-full flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        توضیحات شرایط خاصی مرکز
                                    </p>
                                    <p className="mt-2">
                                        {record.info.conditions_description}
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="flex mt-6">
                            <div className="w-1/3 flex flex-col ml-12">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تصویر کارت ملی
                                </p>
                                <a href={record.info.id_card_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={record.info.id_card_image_url} alt="تصویر کارت ملی"/>
                                    </div>
                                </a>
                            </div>
                            <div className="w-1/3 flex flex-col ml-12">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تصویر کارت نظام پزشکی
                                </p>
                                <a href={record.info.med_card_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={record.info.med_card_image_url} alt="تصویر کارت ملی"/>
                                    </div>
                                </a>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تصویر مجوز فعالیت
                                </p>
                                <a href={record.info.license_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={record.info.license_image_url} alt="تصویر کارت ملی"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
