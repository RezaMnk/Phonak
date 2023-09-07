import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import WarningButton from "@/Components/WarningButton.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useEffect} from "react";

export default function Record({ accessory }) {

    useEffect(() => {
        function downloadAndInlineResources(url, callback) {
            fetch(url)
                .then(response => response.text())
                .then(data => callback(data))
                .catch(error => console.error('Error fetching resource:', error));
        }

        function inlineExternalScriptsAndStyles() {
            const modulePreloadTags = Array.from(document.querySelectorAll('link[rel="modulepreload"][href]'));
            const scriptTags = Array.from(document.querySelectorAll('script[src]'));

            modulePreloadTags.forEach(modulePreloadTag => modulePreloadTag.remove());
            scriptTags.forEach(scriptTag => scriptTag.remove());

            const modifiedHtml = document.documentElement.outerHTML;
            const blob = new Blob([modifiedHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'سفارش لوازم جانبی شماره ' + accessory.id + '.html';
            a.click();
            window.close();
        }

        inlineExternalScriptsAndStyles()
    }, [])

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
        'unitron': 'یونیترون',
        'rayovac': 'ریوواک',
        'detax': 'دیتاکس',
        'etc': 'سایر',
    };


    return (
        <div className="min-h-screen items-center flex bg-gray-100 p-24 print:p-4">
            <Head title="نمایش سفارش" />

            <div className="w-full flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <div className="w-full text-gray-700 dark:text-slate-200">
                        <div>
                            <h5>
                                محصول مورد سفارش
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5 md:mt-8">
                            <div className="w-full md:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    برند
                                </p>
                                <p className="mt-2">
                                    {brands[accessory.product.brand]}
                                    {accessory.product.brand === 'etc' && (' - ' + accessory.product.etc_brand)}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    نام محصول
                                </p>
                                <p className="mt-2">
                                    {accessory.product.name}
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block print:hidden min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    کد IRC
                                </p>
                                <p className="mt-2">
                                    {accessory.product.irc}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h5>
                                نحوه ارسال
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6">
                            <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    شیوه ارسال
                                </p>
                                <p className="mt-2">
                                    {shipping_types[accessory.shipping.type]}
                                </p>
                            </div>
                            {accessory.shipping.type === 'etc' && (
                                <div className="w-full md:w-3/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                        توضیحات شیوه ارسال
                                    </p>
                                    <p className="mt-2">
                                        {accessory.shipping.etc_delivery}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-6">
                            <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    بیمه سلامت دارد؟
                                </p>
                                <p className="mt-2">
                                    {accessory.shipping.has_health_insurance ? 'بله' : 'خیر'}
                                </p>
                            </div>
                            {accessory.shipping.has_health_insurance === 1 && (
                                <>
                                    <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            تلفن همراه کاربر
                                        </p>
                                        <p className="mt-2">
                                            {accessory.shipping.phone}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            شماره نظام پزشکی شنوایی شناس
                                        </p>
                                        <p className="mt-2">
                                            {accessory.shipping.audiologist_med_number}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            شماره نظام پزشکی پزشک گوش و حلق و بینی
                                        </p>
                                        <p className="mt-2">
                                            {accessory.shipping.otolaryngologist_med_number}
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/4 flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 ml-5">
                                        <p className="text-xs flex items-center">
                                            <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                            نوع بیمه تکمیلی
                                        </p>
                                        <p className="mt-2">
                                            {accessory.shipping.supplementary_insurance}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex mt-6">
                            <div className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                                <p className="text-xs flex items-center">
                                    <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-slate-400 dark:bg-slate-600"></span>
                                    آدرس ارسال محصول
                                </p>
                                <p className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5 md:mt-2">
                                            <span className="inline-block">
                                                {accessory.shipping.address.address}
                                            </span>
                                    <span className="inline-block md:mr-5 md:pr-5 md:border-r border-gray-300 dark:border-slate-600">
                                            کدپستی: {accessory.shipping.address.post_code}
                                            </span>
                                    {accessory.shipping.address.phone && (<span
                                        className="inline-block md:mr-5 md:pr-5 md:border-r border-gray-300 dark:border-slate-600">
                                            تلفن: {accessory.shipping.address.phone}
                                            </span>)}
                                </p>
                            </div>
                        </div>
                        {accessory.shipping.description && (
                            <div className="flex mt-6">
                                <div className="w-full flex flex-col bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                                    <p className="text-xs flex items-center">
                                        <span className="inline-block min-h-[10px] ml-2 w-[2px] h-full bg-sky-400 dark:bg-sky-600"></span>
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
        </div>
    );
}
