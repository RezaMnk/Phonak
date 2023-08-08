import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import WarningButton from "@/Components/WarningButton.jsx";

export default function Edit({ user }) {

    return (
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
            headerExtra={
                <WarningButton
                    link={true}
                    href={route('profile.edit')}
                    className="!px-4 !py-2 text-xs"
                >
                    ویرایش پروفایل
                </WarningButton>
            }
        >
            <Head title="ویرایش پروفایل" />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <div className="w-full text-gray-700 dark:text-slate-200">
                        <div>
                            <h5>
                                اطلاعات فردی
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
                                    {user.name}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    کد ملی
                                </p>
                                <p className="mt-2">
                                    {user.national_code}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره نظام پزشکی
                                </p>
                                <p className="mt-2">
                                    {user.med_number}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    سال فارغ التحصیلی
                                </p>
                                <p className="mt-2">
                                    {user.grad_year}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    دانشگاه فارغ التحصیلی
                                </p>
                                <p className="mt-2">
                                    {user.university}
                                </p>
                            </div>
                        </div>
                        <div className="flex mt-8">
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    دانشگاه فارغ التحصیلی
                                </p>
                                <p className="mt-2">
                                    {user.university}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    استان محل اقامت
                                </p>
                                <p className="mt-2">
                                    {user.state}
                                </p>
                            </div>
                            <div className="w-1/5 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شهر محل اقامت
                                </p>
                                <p className="mt-2">
                                    {user.city}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h5>
                                آدرس های همکار
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex mt-6">
                            <div className="w-full flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    محل سکونت
                                    {user.address.mail_address === 'home' && (
                                        <span className="font-semibold mr-2 pr-2 border-r border-gray-300 dark:border-slate-600">
                                            محل ارسال محصولات پستی
                                        </span>
                                    )}
                                </p>
                                <p className="mt-2">
                                    <span className="inline-block">
                                        {user.address.home_address}
                                    </span>
                                    <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    کدپستی: {user.address.home_post_code}
                                    </span>
                                    <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    تلفن: {user.address.home_phone}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex mt-8">
                            <div className="w-full flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    محل کار
                                    {user.address.mail_address === 'work' && (
                                        <span className="mr-2 pr-2 border-r border-gray-300 dark:border-slate-600">
                                            محل ارسال محصولات پستی
                                        </span>
                                    )}
                                </p>
                                <p className="mt-2">
                                    <span className="inline-block">
                                        {user.address.work_address}
                                    </span>
                                    <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    کدپستی: {user.address.work_post_code}
                                    </span>
                                    <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    تلفن: {user.address.work_phone}
                                    </span>
                                </p>
                            </div>
                        </div>
                        {user.address.second_work_address && (
                            <div className="flex mt-8">
                                <div className="w-full flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        محل کار دوم
                                        {user.address.mail_address === 'second_work' && (
                                            <span className="mr-2 pr-2 border-r border-gray-300 dark:border-slate-600">
                                                محل ارسال محصولات پستی
                                            </span>
                                        )}
                                    </p>
                                    <p className="mt-2">
                                    <span className="inline-block">
                                        {user.address.home_address}
                                    </span>
                                        <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    کدپستی: {user.address.home_post_code}
                                    </span>
                                        <span className="inline-block mr-5 pr-5 border-r border-gray-300 dark:border-slate-600">
                                    تلفن: {user.address.home_phone}
                                    </span>
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="mt-12">
                            <h5>
                                اطلاعات تکمیلی
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
                                    {user.info.phone}
                                </p>
                            </div>
                            <div className="w-1/3 flex flex-col ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره تلفن ثابت
                                </p>
                                <p className="mt-2">
                                    {user.info.landline}
                                </p>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    شماره تلفن واتساپ
                                </p>
                                <p className="mt-2">
                                    {user.info.whatsapp_phone}
                                </p>
                            </div>
                        </div>
                        {user.info.referral_name && (
                            <div className="flex mt-8">
                                <div className="w-1/5 flex flex-col ml-5">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        نام معرف اول
                                    </p>
                                    <p className="mt-2">
                                        {user.info.referral_name}
                                    </p>
                                </div>
                                <div className="w-2/5 flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        شماره تلفن معرف اول
                                    </p>
                                    <p className="mt-2">
                                        {user.info.referral_phone}
                                    </p>
                                </div>
                                {user.info.second_referral_name && (
                                    <>
                                        <div className="w-1/5 flex flex-col ml-5">
                                            <p className="text-xs flex items-center">
                                                <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                                نام معرف دوم
                                            </p>
                                            <p className="mt-2">
                                                {user.info.second_referral_name}
                                            </p>
                                        </div>
                                        <div className="w-1/5 flex flex-col">
                                            <p className="text-xs flex items-center">
                                                <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                                شماره تلفن معرف دوم
                                            </p>
                                            <p className="mt-2">
                                                {user.info.second_referral_phone}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {user.info.history_description && (
                            <div className="flex mt-6">
                                <div className="w-full flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        توضیحات سابقه همکاری با فوناک
                                    </p>
                                    <p className="mt-2">
                                        {user.info.history_description}
                                    </p>
                                </div>
                            </div>
                        )}
                        {user.info.conditions_description && (
                            <div className="flex mt-6">
                                <div className="w-full flex flex-col">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        توضیحات شرایط خاصی مرکز
                                    </p>
                                    <p className="mt-2">
                                        {user.info.conditions_description}
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
                                <a href={user.info.id_card_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={user.info.id_card_image_url} alt="تصویر کارت ملی"/>
                                    </div>
                                </a>
                            </div>
                            <div className="w-1/3 flex flex-col ml-12">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تصویر کارت نظام پزشکی
                                </p>
                                <a href={user.info.med_card_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={user.info.med_card_image_url} alt="تصویر کارت ملی"/>
                                    </div>
                                </a>
                            </div>
                            <div className="w-1/3 flex flex-col">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                    تصویر مجوز فعالیت
                                </p>
                                <a href={user.info.license_image_url} target="_blank" className="mt-2">
                                    <div className="w-3/4 p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                        <img src={user.info.license_image_url} alt="تصویر کارت ملی"/>
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
