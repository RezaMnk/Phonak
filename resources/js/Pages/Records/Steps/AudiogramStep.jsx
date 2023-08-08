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
            'audiogram_image': record.audiogram?.left?.audiogram_image || '',
            'id_card_image': record.audiogram?.left?.id_card_image || '',
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
            'audiogram_image': record.audiogram?.right?.audiogram_image || '',
            'id_card_image': record.audiogram?.right?.id_card_image || '',
        },
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
            <div className="flex flex-col-reverse md:flex-row space-y-5 md:space-y-0 md:space-x-reverse md:space-x-10">
                {[...tests_list].reverse().map((item, index) => (
                    <div key={index} className="flex text-gray-800 dark:text-slate-200">
                        <div className="w-full flex flex-col">
                            <label htmlFor={`ac_${item}_` + ear} className="block text-sm cursor-pointer font-semibold bg-gray-200 dark:bg-slate-500 rounded-lg py-1 text-center">
                                {item}Hz
                            </label>
                            <div className="mt-2">
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
                                    error={errors["ac_" + item]}
                                />
                            </div>
                            <div className="mt-2">
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
                                    error={errors["bc_" + item]}
                                />
                            </div>
                        </div>
                        <div className="flex md:hidden">
                            <div className="w-full mr-5 text-gray-800 dark:text-slate-200">
                                <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Frequency</div>
                                <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">AC</div>
                                <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">BC</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="hidden md:block w-1/12 text-gray-800 dark:text-slate-200">
                    <div className="text-center text-xs font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-1 px-2">Frequency</div>
                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">AC</div>
                    <div className="text-center font-semibold bg-gray-200 dark:bg-slate-900 rounded-lg py-[.65rem] px-2 mt-2">BC</div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Head title="سفارش - آدیوگرام" />

             <form className="w-full" onSubmit={submit}>
                <AidContext.Provider value={{data, setData, errors}}>
                    {(record.ear === 'left' || record.ear === 'both') && (
                        <div>
                            <div className="mb-8">
                                <div className={`inline-block ml-2 w-3 h-3 bg-blue-400 rounded-full`}></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    آدیوگرام گوش چپ
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('left')}
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5">
                                <div className="w-full md:w-1/2 ml-2">
                                    <FileInput
                                        name="left.audiogram_image"
                                        fileName={data.left.audiogram_image}
                                        viewLink={record.audiogram?.left?.audiogram_image_url}
                                        label="تصویر آدیوگرام"
                                        accept=".jpg, .jpeg"
                                        setData={(e) => {
                                            setData((prevData) => ({
                                                ...prevData,
                                                ['left']: {
                                                    ...prevData['left'],
                                                    'audiogram_image': e.target.files[0]
                                                },
                                            }))}
                                        }
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <FileInput
                                        name="left.id_card_image"
                                        fileName={data.left.id_card_image}
                                        viewLink={record.audiogram?.left?.id_card_image_url}
                                        label="تصویر مدرک شناسایی (کارت ملی یا صفحه اول شناسنامه حاوی کد ملی)"
                                        accept=".jpg, .jpeg"
                                        setData={(e) => {
                                            setData((prevData) => ({
                                                ...prevData,
                                                ['left']: {
                                                    ...prevData['left'],
                                                    'id_card_image': e.target.files[0]
                                                },
                                            }))}
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {(record.ear === 'right' || record.ear === 'both') && (
                        <div className={record.ear === 'both' ? 'mt-8' : ''}>
                            <div className="mb-8">
                                <div className={`inline-block ml-2 w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full`}></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    آدیوگرام گوش راست
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('right')}
                            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 mt-5">
                                <div className="w-full md:w-1/2 ml-2">
                                    <FileInput
                                        name="right.audiogram_image"
                                        fileName={data.right.audiogram_image}
                                        viewLink={record.audiogram?.right?.audiogram_image_url}
                                        label="تصویر آدیوگرام"
                                        accept=".jpg, .jpeg"
                                        setData={(e) => {
                                            setData((prevData) => ({
                                                ...prevData,
                                                ['right']: {
                                                    ...prevData['right'],
                                                    'audiogram_image': e.target.files[0]
                                                },
                                            }))}
                                        }
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <FileInput
                                        name="right.id_card_image"
                                        fileName={data.right.id_card_image}
                                        viewLink={record.audiogram?.right?.id_card_image_url}
                                        label="تصویر مدرک شناسایی (کارت ملی یا صفحه اول شناسنامه)"
                                        accept=".jpg, .jpeg"
                                        setData={(e) => {
                                            setData((prevData) => ({
                                                ...prevData,
                                                ['right']: {
                                                    ...prevData['right'],
                                                    'id_card_image': e.target.files[0]
                                                },
                                            }))}
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}
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
