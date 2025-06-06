import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import WarningButton from "@/Components/WarningButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Show({ accessory, user }) {

    const shipping_types = {
        'terminal': 'ترمینالی',
        'air': 'هوایی',
        'tipax': 'تیپاکس',
        'post': 'پست',
        'co-worker delivery': 'تحویل به پیک همکار',
        'company delivery': 'ارسال با پیک شرکت',
        'etc': 'سایر'
    };

    const brands = {
        'phonak': 'فوناک',
        'hansaton': 'هنزاتون',
        'rayovac': 'ریوواک',
        'detax': 'دیتاکس',
        'etc': 'سایر',
    };

    return (
        <AuthenticatedLayout
            header={(
                <div className="flex items-center gap-2">
                    <p>
                        #<span>{accessory.id}</span>
                    </p>
                    <span className="text-lg xl:mr-3">
                         {accessory.user.name}
                    </span>
                    {accessory.status === 'completed' && (
                        <span className="text-lg text-yellow-600 dark:text-yellow-400">
                            (پرداخت نشده)
                        </span>
                    )}
                    {accessory.status === 'paid' && (
                        <span className="text-lg text-sky-600 dark:text-sky-400">
                                (پرداخت شده - {accessory.payment.transaction_id_short} {accessory.payment.gateway_name})
                        </span>
                    )}
                    {accessory.status === 'approved' && (
                        <span className="text-lg text-green-600 dark:text-green-400">
                                (تایید شده - {accessory.payment.transaction_id_short} {accessory.payment.gateway_name})
                        </span>
                    )}
                </div>
            )}
            breadcrumbs={
                {
                    'سفارشات لوازم جانی': route('accessories.index'),
                    'نمایش سفارش لوازم جانبی': "#"
                }
            }
            headerExtra={
                <div className="flex xl:flex-row flex-col gap-4">
                    <div className="flex gap-4">
                        <SecondaryButton
                            onClick={print}
                            className="w-full xl:w-fit !px-4 !py-2 text-xs"
                        >
                            پرینت سفارش
                        </SecondaryButton>
                        {user.is_admin && (
                            <>
                                <WarningButton
                                    link={true}
                                    href={route('admin.download_accessory', accessory.id)}
                                    target="_blank"
                                    className="!px-4 !py-2 text-xs"
                                >
                                    دریافت فایل سفارش
                                </WarningButton>
                            </>
                        )}
                    </div>
                    {(user.is_admin && accessory.status === 'paid') && (
                        <PrimaryButton
                            link
                            href={route('admin.approve_accessory', accessory.id)}
                            className="!px-4 !py-2 text-xs"
                        >
                            تایید سفارش
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="نمایش سفارش" />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full print:h-screen px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <div className="w-full text-gray-700 dark:text-slate-200">
                        <div className="hidden print:flex gap-2 items-center font-semibold mb-5">
                            <p>
                                #<span>{accessory.id}</span>
                            </p>
                            <span className="text-lg xl:mr-3">
                                  {accessory.user.name}
                            </span>
                            {accessory.status === 'completed' && (
                                <span>
                                    (پرداخت نشده)
                                </span>
                            )}
                            {accessory.status === 'paid' && (
                                <span>
                                    (پرداخت شده - {accessory.payment.transaction_id_short})
                                </span>
                            )}
                            {accessory.status === 'approved' && (
                                <span>
                                    (تایید شده - {accessory.payment.transaction_id_short})
                                </span>
                            )}
                        </div>
                        <div>
                            <h5>
                                محصول مورد سفارش
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 gap-5">
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    برند
                                </p>
                                <p className="mt-2">
                                    {brands[accessory.product.brand]}
                                    {accessory.product.brand === 'etc' && (' - ' + accessory.product.etc_brand)}
                                </p>
                            </div>
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    نام محصول
                                </p>
                                <p className="mt-2">
                                    {accessory.product.name}
                                </p>
                            </div>
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    کد IRC
                                </p>
                                <p className="mt-2">
                                    {accessory.product.irc}
                                </p>
                            </div>
                            {accessory.count && (
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        تعداد
                                    </p>
                                    <p className="mt-2">
                                        {accessory.count} عدد
                                    </p>
                                </div>
                            )}
                            {accessory.total_price && (<div
                                className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                <p className="text-xs flex items-center">
                                    <span
                                        className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    جمع فاکتور سفارش
                                </p>
                                <p className="mt-2 print:mt-1 print:text-xs">
                                    {accessory.total_price.toLocaleString('fa-IR')} ریال
                                </p>
                            </div>)}
                        </div>

                        <div className="mt-12">
                            <h5>
                                نحوه ارسال
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-6 gap-5">
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 ">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    تلفن همراه شنوایی شناس جهت ارسال صورتحساب
                                </p>
                                <p className="mt-2 print:mt-1 print:text-xs">
                                    {accessory.shipping.expert_phone}
                                </p>
                            </div>
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    شیوه ارسال
                                </p>
                                <p className="mt-2">
                                    {shipping_types[accessory.shipping.type]}
                                </p>
                            </div>
                            {accessory.shipping.type === 'etc' && (
                                <div className="w-full xl:w-2/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        توضیحات شیوه ارسال
                                    </p>
                                    <p className="mt-2">
                                        {accessory.shipping.etc_delivery}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex mt-6">
                            <div className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    آدرس ارسال محصول
                                </p>
                                <div
                                    className="print:border print:border-gray-900 print:p-3 print:text-xs print:w-fit mt-5 xl:mt-2">
                                    <p className="inline-flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0">
                                        <p className="inline-flex gap-1">
                                           <span className="print:hidden">
                                               استان:
                                           </span>
                                            <span>
                                                {accessory.shipping.address.state} -
                                            </span>
                                            <span className="print:hidden">
                                                شهر:
                                            </span>
                                            <span>
                                                {accessory.shipping.address.city}
                                            </span>
                                        </p>
                                        <span className="inline-block xl:mr-5 print:mr-5">
                                             {accessory.shipping.address.address}
                                         </span>
                                        <span
                                            className="inline-block xl:mr-5 xl:pr-5 xl:border-r print:mr-5 print:pr-5 print:border-r border-gray-300 dark:border-slate-600">
                                            کدپستی: {accessory.shipping.address.post_code}
                                            </span>
                                        {accessory.shipping.address.phone && (<span
                                            className="inline-block xl:mr-5 xl:pr-5 xl:border-r print:mr-5 print:pr-5 print:border-r border-gray-300 dark:border-slate-600">
                                            تلفن: {accessory.shipping.address.phone}
                                            </span>)}
                                    </p>
                                    <div className="hidden print:flex justify-between text-xs mt-2">
                                        <span>
                                            شنوایی شناس: {record.user.name} - {record.shipping.expert_phone}
                                        </span>
                                        <span>
                                            شیوه ارسال: {shipping_types[record.shipping.type]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {accessory.shipping.description && (
                            <div className="flex mt-6">
                                <div
                                    className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg print:px-2 print:py-1 p-3">
                                    <p className="text-xs flex items-center">
                                        <span
                                            className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
                                        توضیحات
                                    </p>
                                    <p className="mt-2">
                                        {accessory.shipping.description}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
