import {Head, useForm} from '@inertiajs/react';

import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {createContext, useContext} from "react";
import {StepContext} from "@/Pages/Records/Create.jsx";
import TextInput from "@/Components/TextInput.jsx";
import FileInput from "@/Components/FileInput.jsx";

export const AidContext = createContext();

export default function AudiogramStep() {

    const {record, nextStep, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors} = useForm({
        left: {
            'ac_250': record.audiogram?.left?.ac_250 || '',
            'ac_500': record.audiogram?.left?.ac_500 || '',
            'ac_1000': record.audiogram?.left?.ac_1000 || '',
            'ac_2000': record.audiogram?.left?.ac_2000 || '',
            'ac_4000': record.audiogram?.left?.ac_4000 || '',
            'bc_250': record.audiogram?.left?.bc_250 || '',
            'bc_500': record.audiogram?.left?.bc_500 || '',
            'bc_1000': record.audiogram?.left?.bc_1000 || '',
            'bc_2000': record.audiogram?.left?.bc_2000 || '',
            'bc_4000': record.audiogram?.left?.bc_4000 || '',
        },
        right: {
            'ac_250': record.audiogram?.right?.ac_250 || '',
            'ac_500': record.audiogram?.right?.ac_500 || '',
            'ac_1000': record.audiogram?.right?.ac_1000 || '',
            'ac_2000': record.audiogram?.right?.ac_2000 || '',
            'ac_4000': record.audiogram?.right?.ac_4000 || '',
            'bc_250': record.audiogram?.right?.bc_250 || '',
            'bc_500': record.audiogram?.right?.bc_500 || '',
            'bc_1000': record.audiogram?.right?.bc_1000 || '',
            'bc_2000': record.audiogram?.right?.bc_2000 || '',
            'bc_4000': record.audiogram?.right?.bc_4000 || '',
        },
        'audiogram_image': record.audiogram_image || '',
        'id_card_image': record.id_card_image || '',
        'prescription_image': record.prescription_image || '',
        'national_code_confirm_image': record.national_code_confirm_image || '',
        'commit_price_image': record.commit_price_image || '',
        'creditor_image': record.creditor_image || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('records.store_audiogram', record.id), {
            preserveScroll: true,
            onSuccess: () => {
                nextStep()
            },
        });
    };

    const tests_list = [
        '250',
        '500',
        '1000',
        '2000',
        '4000',
    ];

    const render_ear = (ear) => (
        <>
            <div className="flex flex-col xl:flex-row xl:space-x-reverse xl:space-x-5 space-y-5 xl:space-y-0">
                <div className="w-full flex flex-col-reverse xl:flex-row xl:space-x-reverse xl:space-x-10 space-y-reverse space-y-5 xl:space-y-0">
                    {[...tests_list].reverse().map((item, index) => (
                        <div key={index} className="flex text-gray-800 dark:text-slate-200">
                            <div className="w-full flex flex-col space-y-3">
                                <label htmlFor={`ac_${item}_` + ear} className="block text-sm cursor-pointer font-semibold bg-gray-200 dark:bg-slate-500 rounded-lg py-2 text-center">
                                    {item}Hz
                                </label>
                                <div>
                                    <TextInput
                                        className="text-center"
                                        size={2}
                                        id={`ac_${item}_` + ear}
                                        name={`${ear}.ac_${item}`}
                                        value={data[ear]['ac_' + item]}
                                        type="number"
                                        onChange={(e) => setData((prevData) => ({
                                            ...prevData,
                                            [ear]: {
                                                ...prevData[ear],
                                                ["ac_" + item]: e.target.value
                                            },
                                        }))}
                                        error={errors[ear + ".ac_" + item]}
                                    />
                                </div>
                                <div>
                                    <TextInput
                                        className="text-center"
                                        size={2}
                                        id={`bc_${item}_` + ear}
                                        name={`${ear}.bc_${item}`}
                                        value={data[ear]['bc_' + item]}
                                        type="number"
                                        onChange={(e) => setData((prevData) => ({
                                            ...prevData,
                                            [ear]: {
                                                ...prevData[ear],
                                                ["bc_" + item]: e.target.value
                                            },
                                        }))}
                                        error={errors[ear + ".bc_" + item]}
                                    />
                                </div>
                            </div>
                            <div className="flex xl:hidden">
                                <div className="w-full flex flex-col space-y-3 mr-5 text-gray-800 dark:text-slate-200">
                                    <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-2 px-2">Frequency</div>
                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2">AC</div>
                                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2">BC</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="hidden xl:flex xl:flex-col space-y-3 w-1/12 text-gray-800 dark:text-slate-200">
                        <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-2 px-2">Frequency</div>
                        <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2">AC</div>
                        <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2">BC</div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Head title="سفارش - ادیوگرام" />

             <form className="w-full" onSubmit={submit}>
                <AidContext.Provider value={{data, setData, errors}}>
                    {(record.ear === 'left' || record.ear === 'both') && (
                        <div>
                            <div className="mb-8">
                                <div className={`inline-block ml-2 w-3 h-3 bg-blue-400 rounded-full`}></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    ادیوگرام گوش چپ
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('left')}
                        </div>
                    )}

                    {(record.ear === 'right' || record.ear === 'both') && (
                        <div className={record.ear === 'both' ? 'mt-8' : ''}>
                            <div className="mb-8">
                                <div className={`inline-block ml-2 w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full`}></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    ادیوگرام گوش راست
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('right')}
                        </div>
                    )}

                    <div className='mt-8'>
                        <div className="mb-8">
                            <span className="text-lg text-gray-700 dark:text-slate-200">
                                سایر مدارک
                            </span>
                            <hr className="mt-1 dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-x-0 xl:gap-x-5 gap-y-5 xl:gap-y-0 mt-5">
                            <div className="w-full xl:w-1/2">
                                <FileInput
                                    name="audiogram_image"
                                    fileName={data.audiogram_image}
                                    viewLink={record.audiogram_image && record.audiogram_image_url}
                                    label="تصویر ادیوگرام"
                                    accept=".jpg, .jpeg"
                                    setData={(e) => setData('audiogram_image', e.target.files[0])}
                                    error={errors.audiogram_image}
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <FileInput
                                    name="id_card_image"
                                    fileName={data.id_card_image}
                                    viewLink={record.id_card_image && record.id_card_image_url}
                                    label="تصویر مدرک شناسایی (کارت ملی یا صفحه اول شناسنامه حاوی کد ملی)"
                                    accept=".jpg, .jpeg"
                                    setData={(e) => setData('id_card_image', e.target.files[0])}
                                    error={errors.id_card_image}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-x-0 xl:gap-x-5 gap-y-5 xl:gap-y-0 mt-5">
                            <div className="w-full xl:w-1/2">
                                <FileInput
                                    name="prescription_image"
                                    fileName={data.prescription_image}
                                    viewLink={record.prescription_image && record.prescription_image_url}
                                    label="تصویر نسخه پزشک گوش و حلق و بینی"
                                    accept=".jpg, .jpeg"
                                    setData={(e) => setData('prescription_image', e.target.files[0])}
                                    error={errors.prescription_image}
                                />
                            </div>
                            <div className="w-full xl:w-1/2">
                                <FileInput
                                    name="national_code_confirm"
                                    fileName={data.national_code_confirm_image}
                                    viewLink={record.national_code_confirm_image && record.national_code_confirm_image_url}
                                    label="تصویر تعهد عدم اعلام کدملی تکراری با متن ارسالی کارشناسان فروش"
                                    accept=".jpg, .jpeg"
                                    setData={(e) => setData('national_code_confirm_image', e.target.files[0])}
                                    error={errors.national_code_confirm_image}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-x-0 xl:gap-x-5 gap-y-5 xl:gap-y-0 mt-5">
                            <div className="w-full xl:w-2/4">
                                <FileInput
                                    name="commit_price_image"
                                    fileName={data.commit_price_image}
                                    viewLink={record.commit_price_image && record.commit_price_image_url}
                                    label="تصویر تعهدنامه فروش به قیمت مصوب"
                                    accept=".jpg, .jpeg"
                                    setData={(e) => setData('commit_price_image', e.target.files[0])}
                                    error={errors.commit_price_image}
                                />
                            </div>
                            <div className="w-full xl:w-1/4 flex flex-col gap-2 md:gap-4 justify-end">
                                <p className="text-sm text-center md:text-right font-semibold text-gray-700 dark:text-slate-200">
                                     از نمونه فایل تعهدنامه فروش به قیمت مصوب پیوست شده، استفاده نمایید.
                                </p>

                                <PrimaryButton
                                    link={true}
                                    target="_blank"
                                    download
                                    href="/storage/commit_price.pdf"
                                >
                                    دانلود فایل تعهدنامه
                                </PrimaryButton>
                            </div>
                        </div>
                        {!!record.user.creditor_image && (
                            <div className="flex flex-col xl:flex-row gap-x-0 xl:gap-x-5 gap-y-5 xl:gap-y-0 mt-5">
                                <div className="w-full xl:w-2/4">
                                    <FileInput
                                        name="creditor_image"
                                        fileName={data.creditor_image}
                                        viewLink={record.creditor_image && record.creditor_image_url}
                                        label="نامه تاییدیه بستانکاری"
                                        accept=".jpg, .jpeg"
                                        setData={(e) => setData('creditor_image', e.target.files[0])}
                                        error={errors.creditor_image}
                                    />
                                </div>
                                <div className="w-full xl:w-1/4 flex flex-col gap-2 md:gap-8 justify-end">
                                    <p className="text-sm text-center md:text-right font-semibold text-gray-700 dark:text-slate-200">
                                        میتوانید از نمونه نامه تاییدیه بستانکاری پیوست شده، استفاده نمایید.
                                    </p>

                                    <PrimaryButton
                                        link={true}
                                        target="_blank"
                                        download
                                        href="/storage/creditor-example.pdf"
                                    >
                                        دانلود فایل نمونه
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                        <div className="flex text-sm font-semibold mt-5 text-gray-700 dark:text-slate-200">
                            <span className="animate-pulse ml-1">توجه: </span>
                            مسئولیت صحت مدارک با کارشناس بوده و در صورت عدم تطبیق، سفارش حذف خواهد شد!
                        </div>
                    </div>
                </AidContext.Provider>
                 <div className="flex justify-between mt-8">
                     <DangerButton
                         className="!px-4 !py-2"
                         type="button"
                         onClick={prevStep}
                     >
                         مرحله قبل
                     </DangerButton>
                     <PrimaryButton
                         className="!px-4 !py-2"
                         disabled={processing}
                         type="submit"
                     >
                         مرحله بعد
                     </PrimaryButton>
                 </div>
             </form>
        </>
    );
}
