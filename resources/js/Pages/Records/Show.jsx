import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import WarningButton from "@/Components/WarningButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Show({ record, user }) {

    const vent_sizes = {
        '2-3 mm': '2-3 mm',
        '1.5 mm': '1.5 mm',
        '1 mm': '1 mm',
        'groove': 'شیاری',
        'none': 'هیچکدام',
    }

    const dome_sizes = {
        'large': 'بزرگ',
        'medium': 'متوسط',
        'small': 'کوچک',
    }

    const tests_list = [
        '250',
        '500',
        '1000',
        '2000',
        '4000',
    ];

    const shipping_types = {
        'terminal': 'ترمینالی',
        'air': 'هوایی',
        'tipax': 'تیپاکس',
        'post': 'پست',
        'co-worker delivery': 'تحویل به پیک همکار',
        'company delivery': 'ارسال با پیک شرکت',
        'etc': 'سایر'
    };


    const print = () => {
        window.print();
    }

    const render_aid_info = (ear) => (
        <>
            {(record.type === 'CIC' || record.type === 'ITC') && (
                <>
                    <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                اندازه سمعک
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].hearing_aid_size}
                            </p>
                        </div>
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                اندازه ونت
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {vent_sizes[record.record_aid[ear].vent_size]}
                            </p>
                        </div>
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                مدل وکسگارد
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].wax_guard}
                            </p>
                        </div>
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                نوع رسیور
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].receiver}
                            </p>
                        </div>
                    </div>
                </>
            )}
            {record.type === 'BTE mold' && (
                <>
                    <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                قالب دارد؟
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].has_mold ? 'بله' : 'خیر'}
                            </p>
                        </div>
                        {record.record_aid[ear].has_mold === 1 && (
                            <>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        جنس قالب
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].mold_material === 'hard' ? 'سخت' : 'نرم'}
                                    </p>
                                </div>
                                {record.record_aid[ear].mold_material !== 'soft' && (
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                            ونت دارد؟
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.record_aid[ear].has_vent ? 'بله' : 'خیر'}
                                        </p>
                                    </div>
                                )}
                                <div className={`w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 ` + record.record_aid[ear].has_vent ? 'ml-5' : ''}>
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه قالب
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].mold_size}
                                    </p>
                                </div>
                                {record.record_aid[ear].has_vent && (
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                            اندازه ونت
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {vent_sizes[record.record_aid[ear].vent_size]}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
            {record.type === 'BTE tube' && (
                <>
                    <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                قالب دارد؟
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].has_mold ? 'بله' : 'خیر'}
                            </p>
                        </div>
                        {record.record_aid[ear].has_mold ? (
                            <>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        ونت دارد؟
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].has_vent ? 'بله' : 'خیر'}
                                    </p>
                                </div>
                                <div className={`w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2`}>
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه اسلیم تیوب
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        سایز {record.record_aid[ear].tube_size}
                                    </p>
                                </div>
                                {record.record_aid[ear].has_vent && (
                                    <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                            اندازه ونت
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {vent_sizes[record.record_aid[ear].vent_size]}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه اسلیم تیوب
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        سایز {record.record_aid[ear].tube_size}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        نوع Dome
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].dome_type}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه Dome
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {dome_sizes[record.record_aid[ear].dome_size]}
                                    </p>
                                </div>
                            </>

                        )}
                    </div>
                </>
            )}
            {record.type === 'RIC' && (
                <>
                    <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                        <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                            <p className="text-xs flex items-center">
                                <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                قالب دارد؟
                            </p>
                            <p className="mt-2 print:mt-1 print:text-xs">
                                {record.record_aid[ear].has_mold ? 'بله' : 'خیر'}
                            </p>
                        </div>
                        {record.record_aid[ear].has_mold ? (
                            <>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        نوع رسیور
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].receiver}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        نوع پوسته
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].shell_type}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه رسیور خارجی
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        سایز {record.record_aid[ear].external_receiver_size}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه ونت
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {vent_sizes[record.record_aid[ear].vent_size]}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        نوع رسیور
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].receiver}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه رسیور خارجی
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        سایز {record.record_aid[ear].external_receiver_size}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        نوع Dome
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.record_aid[ear].dome_type}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                                        اندازه Dome
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {dome_sizes[record.record_aid[ear].dome_size]}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            {record.record_aid[ear].description && (
                <div className="w-full mt-5 print:mt-1 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                    <p className="text-xs flex items-center">
                        <span className={`inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full ${ear === 'left' ? 'bg-sky-400 dark:bg-sky-600' : 'bg-red-400 dark:bg-red-600'}`}></span>
                        توضیحات
                    </p>
                    <p className="mt-2 print:mt-1 print:text-xs">
                        {record.record_aid[ear].description}
                    </p>
                </div>
            )}

        </>

    )

    return (
        <AuthenticatedLayout
            header={(
                <div className="flex flex-col xl:flex-row items-center gap-2">
                    <p>
                        نمایش سفارش سمعک شماره <span>{record.id}</span>
                    </p>
                    <span className="text-lg xl:mr-3">
                        شنوایی شناس: {record.user.name}
                    </span>
                    {record.status === 'completed' && (
                        <span className="text-lg text-yellow-600 dark:text-yellow-400">
                            (پرداخت نشده)
                        </span>
                    )}
                    {record.status === 'paid' && (
                        <span className="text-lg text-sky-600 dark:text-sky-400">
                            (پرداخت شده)
                        </span>
                    )}
                    {record.status === 'approved' && (
                        <span className="text-lg text-green-600 dark:text-green-400">
                            (تایید شده)
                        </span>
                    )}
                </div>
            )}
            breadcrumbs={
                {
                    'سفارشات سمعک': route('records.index'),
                    'نمایش سفارش سمعک': "#"
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
                                    href={route('admin.download_record', record.id)}
                                    target="_blank"
                                    className="!px-4 !py-2 text-xs"
                                >
                                    دریافت فایل سفارش
                                </WarningButton>
                            </>
                        )}
                    </div>
                    {(user.is_admin && record.status === 'paid') && (
                        <PrimaryButton
                            link
                            href={route('admin.approve_record', record.id)}
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
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg" id="info">
                    <div className="w-full text-gray-700 dark:text-slate-200 break-inside-avoid">
                        <div className="hidden print:flex gap-2 items-center text-lg font-semibold mb-5">
                            <p>
                                سفارش سمعک شماره <span>{record.id}</span>
                            </p>
                            <span className="text-lg xl:mr-3">
                                 - شنوایی شناس: {record.user.name}
                            </span>
                            {record.status === 'completed' && (
                                <span>
                                    (پرداخت نشده)
                                </span>
                            )}
                            {record.status === 'paid' && (
                                <span>
                                    (پرداخت شده)
                                </span>
                            )}
                            {record.status === 'approved' && (
                                <span>
                                    (تایید شده)
                                </span>
                            )}
                        </div>
                        <div className="break-inside-avoid">
                            <div>
                                <h5 className="print:text-xs">
                                    اطلاعات کاربر
                                </h5>
                                <hr className="dark:border-slate-600"/>
                            </div>
                            <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-6 print:mt-1">
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        نام و نام خانوادگی
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.name}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        نام و نام خانوادگی به لاتین
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.eng_name}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        کد ملی
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.national_code}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        سال تولد
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.birth_year}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        موقعیت
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.state} - {record.patient.city}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        نوع بیمه
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.insurance}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        تلفن همراه
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.phone}
                                    </p>
                                </div>
                                <div className="w-full print:w-1/5 xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        کد پستی
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.post_code}
                                    </p>
                                </div>
                                <div className="w-full xl:w-2/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        آدرس
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.patient.address}
                                    </p>
                                </div>
                            </div>

                            <div className="break-inside-avoid">
                                <div className="mt-12 print:mt-2">
                                    <h5 className="print:text-xs">
                                        محصول مورد سفارش
                                    </h5>
                                    <hr className="dark:border-slate-600"/>
                                </div>
                                <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            برند
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.brand}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            نوع
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.type}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            نام محصول
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.product.name}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            کد IRC
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.product.irc}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-5 xl:mt-8 print:mt-2">
                                    <div className="w-full xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            تعداد مورد سفارش
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.ear === 'both' ? 'دو عدد' : 'یک عدد'}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            سفارش پکیج دارد؟
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.has_package ? 'بله' : 'خیر'}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            سفارش قالب دارد؟
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.has_mold ? 'بله' : 'خیر'}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            سفارش شارژر دارد؟
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.has_charger ? 'بله' : 'خیر'}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/5 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            جمع فاکتور سفارش
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.total_price.toLocaleString('fa-IR')} ریال
                                        </p>
                                    </div>
                                </div>

                                {record.record_aid.left && (
                                    <>
                                        <div className="mt-12 print:mt-2">
                                            <h5 className="print:text-xs">
                                                مشخصات سمعک گوش چپ
                                            </h5>
                                            <hr className="dark:border-slate-600"/>
                                        </div>

                                        {render_aid_info('left')}
                                    </>
                                )}

                                {record.record_aid.right && (
                                    <>
                                        <div className="mt-12 print:mt-2">
                                            <h5 className="print:text-xs">
                                                مشخصات سمعک گوش راست
                                            </h5>
                                            <hr className="dark:border-slate-600"/>
                                        </div>

                                        {render_aid_info('right')}
                                    </>
                                )}
                            </div>
                        </div>

                        {record.record_aid.left && (
                            <div className="break-inside-avoid">
                                <div className="mt-12 print:mt-2">
                                    <h5 className="print:text-xs">
                                        ادیوگرام گوش چپ
                                    </h5>
                                    <hr className="dark:border-slate-600"/>
                                </div>

                                <div className="flex flex-col-reverse print:flex-row xl:flex-row space-y-5 print:space-y-1 space-y-reverse print:space-y-0 xl:space-y-0 print:space-x-reverse xl:space-x-reverse print:space-x-2 xl:space-x-10 mt-5 xl:mt-8 print:mt-1 break-inside-avoid">
                                    {[...tests_list].reverse().map((item, index) => (
                                        <div key={index} className="w-full flex text-gray-800 dark:text-slate-200">
                                            <div className="w-full flex flex-col">
                                                <span className="block text-sm print:text-xs cursor-pointer font-semibold bg-sky-200 dark:bg-sky-700 rounded-lg py-1 px-3 text-center">
                                                    {item}Hz
                                                </span>
                                                <div className="mt-2 block text-sm print:text-xs cursor-pointer font-semibold bg-gray-100 dark:bg-slate-700 rounded-lg py-3 print:py-1 text-center">
                                                    {record.audiogram.left["ac_" + item]}
                                                </div>
                                                <div className="mt-2 block text-sm print:text-xs cursor-pointer font-semibold bg-gray-100 dark:bg-slate-700 rounded-lg py-3 print:py-1 text-center">
                                                    {record.audiogram.left["bc_" + item] ? record.audiogram.left["bc_" + item] : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className="flex xl:hidden print:hidden">
                                                <div className="w-full mr-5 text-gray-800 dark:text-slate-200">
                                                    <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Freq</div>
                                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">AC</div>
                                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">BC</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="hidden xl:block print:block w-1/12 text-gray-800 dark:text-slate-200">
                                        <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Freq</div>
                                        <div className="text-center print:text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] print:py-1 px-2 mt-2">AC</div>
                                        <div className="text-center print:text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] print:py-1 px-2 mt-2">BC</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {record.record_aid.right && (
                            <div className="break-inside-avoid">
                                <div className="mt-12 print:mt-2">
                                    <h5 className="print:text-xs">
                                        ادیوگرام گوش راست
                                    </h5>
                                    <hr className="dark:border-slate-600"/>
                                </div>

                                <div className="flex flex-col-reverse print:flex-row xl:flex-row space-y-5 print:space-y-1 space-y-reverse print:space-y-0 xl:space-y-0 print:space-x-reverse xl:space-x-reverse print:space-x-2 xl:space-x-10 mt-5 xl:mt-8 print:mt-1 break-inside-avoid">
                                    {[...tests_list].reverse().map((item, index) => (
                                        <div key={index} className="w-full flex text-gray-800 dark:text-slate-200">
                                            <div className="w-full flex flex-col">
                                                <span className="block text-sm print:text-xs cursor-pointer font-semibold bg-red-200 dark:bg-red-700 rounded-lg py-1 px-3 text-center">
                                                    {item}Hz
                                                </span>
                                                <div className="mt-2 block text-sm print:text-xs cursor-pointer font-semibold bg-gray-100 dark:bg-slate-700 rounded-lg py-3 print:py-1 text-center">
                                                    {record.audiogram.right["ac_" + item]}
                                                </div>
                                                <div className="mt-2 block text-sm print:text-xs cursor-pointer font-semibold bg-gray-100 dark:bg-slate-700 rounded-lg py-3 print:py-1 text-center">
                                                    {record.audiogram.right["bc_" + item] ? record.audiogram.right["bc_" + item] : 'ثبت نشده'}
                                                </div>
                                            </div>
                                            <div className="flex xl:hidden print:hidden">
                                                <div className="w-full mr-5 text-gray-800 dark:text-slate-200">
                                                    <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Freq</div>
                                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">AC</div>
                                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">BC</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="hidden xl:block print:block w-1/12 text-gray-800 dark:text-slate-200">
                                        <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Freq</div>
                                        <div className="text-center print:text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] print:py-1 px-2 mt-2">AC</div>
                                        <div className="text-center print:text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] print:py-1 px-2 mt-2">BC</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="break-inside-avoid">
                            <div className="mt-12 print:mt-2">
                                <h5 className="print:text-xs">
                                    نحوه ارسال
                                </h5>
                                <hr className="dark:border-slate-600"/>
                            </div>
                            <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-6 print:mt-1">
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        تلفن همراه شنوایی شناس جهت ارسال صورتحساب
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.shipping.expert_phone}
                                    </p>
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        شیوه ارسال
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {shipping_types[record.shipping.type]}
                                    </p>
                                </div>
                                {record.shipping.type === 'etc' && (
                                    <div className="w-full xl:w-2/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            توضیحات شیوه ارسال
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.shipping.etc_delivery}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0 mt-6 print:mt-1 break-inside-avoid">
                            <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    بیمه سلامت دارد؟
                                </p>
                                <p className="mt-2 print:mt-1 print:text-xs">
                                    {record.shipping.has_health_insurance ? 'بله' : 'خیر'}
                                </p>
                            </div>
                            {record.shipping.has_health_insurance === 1 && (
                                <>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            تلفن همراه کاربر
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.shipping.phone}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            شماره نظام پزشکی شنوایی شناس
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.shipping.audiologist_med_number}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 xl:ml-5 print:ml-2">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            شماره نظام پزشکی پزشک گوش و حلق و بینی
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.shipping.otolaryngologist_med_number}
                                        </p>
                                    </div>
                                    <div className="w-full xl:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            نوع بیمه تکمیلی
                                        </p>
                                        <p className="mt-2 print:mt-1 print:text-xs">
                                            {record.shipping.supplementary_insurance}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex mt-6 print:mt-1 break-inside-avoid">
                            <div className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    آدرس ارسال محصول
                                </p>
                                <div className="print:border print:border-gray-900 print:p-3 print:text-xs print:w-fit mt-5 xl:mt-2">
                                    <p className="inline-flex flex-col print:flex-row xl:flex-row space-y-5 items-center print:space-y-0 xl:space-y-0">
                                            <span className="inline-block">
                                                {record.shipping.address.address}
                                            </span>
                                        <span className="inline-block xl:mr-5 xl:pr-5 xl:border-r print:mr-5 print:pr-5 print:border-r border-gray-300 dark:border-slate-600">
                                            کدپستی: {record.shipping.address.post_code}
                                            </span>
                                        {record.shipping.address.phone && (<span
                                            className="inline-block xl:mr-5 xl:pr-5 xl:border-r print:mr-5 print:pr-5 print:border-r border-gray-300 dark:border-slate-600">
                                            تلفن: {record.shipping.address.phone}
                                            </span>)}
                                    </p>
                                    <span className="hidden print:block text-xs mt-2">
                                        شنوایی شناس: {record.user.name}
                                    </span>
                                </div>

                            </div>
                        </div>
                        {record.shipping.description && (
                            <div className="flex mt-6 break-inside-avoid">
                                <div className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        توضیحات
                                    </p>
                                    <p className="mt-2 print:mt-1 print:text-xs">
                                        {record.shipping.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="break-inside-avoid print:hidden">
                            <div className="mt-12 print:mt-2">
                                <h5 className="print:text-xs">
                                    مدارک
                                </h5>
                                <hr className="dark:border-slate-600"/>
                            </div>
                            <div className="flex flex-col xl:flex-row space-y-5 print:space-y-0 xl:space-y-0 mt-3">
                                <div className="w-full print:w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 ml-0 xl:ml-12 break-inside-avoid">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        ادیوگرام
                                    </p>
                                    <a href={route('records.download', {record: record.id, name: 'audiogram'})} target="_blank" className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={record.audiogram_image_url} alt="تصویر ادیوگرام"/>
                                        </div>
                                    </a>
                                </div>
                                <div className="w-full print:w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1 ml-0 xl:ml-12 break-inside-avoid">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        مدرک شناسایی کاربر
                                    </p>
                                    <a href={route('records.download', {record: record.id, name: 'id'})} target="_blank" className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={record.id_card_image_url} alt="تصویر مدرک شناسایی کاربر"/>
                                        </div>
                                    </a>
                                </div>
                                <div className="w-full print:w-full xl:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 print:px-2 print:py-1">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        نسخه پزشک گوش و حلق و بینی
                                    </p>
                                    <a href={route('records.download', {record: record.id, name: 'prescription'})} target="_blank" className="mt-2">
                                        <div className="w-full p-2 rounded-lg bg-gray-100 dark:bg-slate-700">
                                            <img src={record.prescription_image_url} alt="تصویر نسخه پزشک گوش و حلق و بینی"/>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
