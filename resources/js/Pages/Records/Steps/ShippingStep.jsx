import {Head, useForm} from '@inertiajs/react';

import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import {useContext, useState} from "react";
import {StepContext} from "@/Pages/Records/Create.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import RadioInput from "@/Components/RadioInput.jsx";

export default function ShippingStep() {

    const {record, nextStep, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors} = useForm({
        type: record.shipping?.type || '',
        etc_delivery: record.shipping?.etc_delivery || '',
        has_health_insurance: record.shipping?.has_health_insurance || false,
        phone: record.shipping?.phone || '',
        audiologist_med_number: record.shipping?.audiologist_med_number || '',
        otolaryngologist_med_number: record.shipping?.otolaryngologist_med_number || '',
        description: record.shipping?.description || '',
        mail_address: record.shipping?.mail_address || record.shipping?.address.mail_address,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('records.store_shipping', record.id), {
            preserveScroll: true,
            // onSuccess: () => {
            //     nextStep()
            // }
        });
    };


    return (
        <>
            <Head title="سفارش - ارسال محصول" />

             <form className="w-full" onSubmit={submit}>
                <div className="mt-5 text-gray-700 dark:text-slate-200">
                    <div className="flex justify-between items-end">
                        <h5>
                            ارسال محصول
                        </h5>
                    </div>
                    <hr className="dark:border-slate-600"/>
                </div>
                <div className="flex mt-6 mb-5">
                    <div className="w-1/3 ml-5">
                        <SelectInput
                            id="type"
                            name="type"
                            value={data.type}
                            label="شیوه ارسال"
                            onChange={(e) => setData('type', e.target.value)}
                            error={errors.type}
                            required
                        >
                            <option value="" disabled="disabled">انتخاب کنید</option>
                            <option value="terminal">ترمینالی</option>
                            <option value="air">هوایی</option>
                            <option value="tipax">تیپاکس</option>
                            <option value="post">پست</option>
                            <option value="co-worker delivery">تحویل به پیک همکار</option>
                            <option value="company delivery">ارسال با پیک شرکت</option>
                            <option value="etc">سایر</option>
                        </SelectInput>

                        <InputError message={errors.type} className="mt-2"/>
                    </div>
                    {data.type === 'etc' && (
                        <div className="w-2/3">
                            <TextInput
                                id="etc_delivery"
                                etc_delivery="etc_delivery"
                                value={data.etc_delivery}
                                label="شیوه ارسال محصول"
                                onChange={(e) => setData('etc_delivery', e.target.value)}
                                error={errors.etc_delivery}
                                required
                            />

                            <InputError message={errors.etc_delivery} className="mt-2"/>
                        </div>
                    )}
                </div>
                <div className="flex mt-12 mb-5">
                    <div className="w-full">
                        <CheckboxInput
                            id="has_health_insurance"
                            name="has_health_insurance"
                            checked={data.has_health_insurance}
                            onChange={(e) => setData('has_health_insurance', e.target.checked)}
                        />

                        <InputLabel
                            htmlFor="has_health_insurance"
                            value="تمایل به دریافت برگه بیمه سلامت"
                            className="mr-2"
                        />
                    </div>
                </div>
                 {data.has_health_insurance && (
                     <>
                         <div className="mt-12 text-gray-700 dark:text-slate-200">
                             <h5>
                                 بیمه سلامت
                             </h5>
                             <hr className="dark:border-slate-600"/>
                         </div>
                         <div className="flex mt-6 mb-5">
                             <div className="w-1/4 ml-5">
                                 <TextInput
                                     id="phone"
                                     name="phone"
                                     type="number"
                                     value={data.phone}
                                     label="تلفن همراه کاربر"
                                     onChange={(e) => setData('phone', e.target.value)}
                                     error={errors.phone}
                                     required
                                 />

                                 <InputError message={errors.phone} className="mt-2"/>
                             </div>
                             <div className="w-1/4 ml-5">
                                 <TextInput
                                     id="audiologist_med_number"
                                     name="audiologist_med_number"
                                     type="number"
                                     value={data.audiologist_med_number}
                                     label="شماره نظام پزشکی شنوایی شناس"
                                     onChange={(e) => setData('audiologist_med_number', e.target.value)}
                                     error={errors.audiologist_med_number}
                                     required
                                 />

                                 <InputError message={errors.audiologist_med_number} className="mt-2"/>
                             </div>
                             <div className="w-1/4 ml-5">
                                 <TextInput
                                     id="otolaryngologist_med_number"
                                     name="otolaryngologist_med_number"
                                     type="number"
                                     value={data.otolaryngologist_med_number}
                                     label="شماره نظام پزشکی پزشک گوش و حلق و بینی"
                                     onChange={(e) => setData('otolaryngologist_med_number', e.target.value)}
                                     error={errors.otolaryngologist_med_number}
                                     required
                                 />

                                 <InputError message={errors.otolaryngologist_med_number} className="mt-2"/>
                             </div>
                             <div className="w-1/4 ml-5">
                                 <TextInput
                                     id="supplementary_insurance"
                                     name="supplementary_insurance"
                                     value={data.supplementary_insurance}
                                     label="نوع بیمه تکمیلی"
                                     onChange={(e) => setData('supplementary_insurance', e.target.value)}
                                     error={errors.supplementary_insurance}
                                     required
                                 />

                                 <InputError message={errors.supplementary_insurance} className="mt-2"/>
                             </div>
                         </div>
                     </>
                 )}
                 <div className="mt-8 text-gray-700 dark:text-slate-200">
                     <div className="flex justify-between items-end">
                         <h5>
                             آدرس جهت ارسال
                         </h5>
                     </div>
                     <hr className="dark:border-slate-600"/>
                 </div>
                 <div className="flex mt-8">
                     <div className="w-1/2 ml-5 text-gray-700 dark:text-slate-200">
                         <p>
                             مرسولات شما به کدام آدرس ارسال شوند؟
                         </p>

                         <InputError message={errors.mail_address} className="mt-2"/>

                         <div className="mb-5 mt-2">
                             <div className="inline-block ml-8">
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
                             {record.shipping.address.second_work_address && (
                                 <div className="inline-block ml-8">
                                     <RadioInput
                                         id="second_mail_address_work"
                                         name="mail_address"
                                         checked={data.mail_address === 'second_work'}
                                         onChange={() => setData('mail_address', 'second_work')}
                                         required
                                     />

                                     <InputLabel
                                         htmlFor="second_mail_address_work"
                                         value="محل کار دوم"
                                         className="mr-2"
                                     />
                                 </div>
                             )}
                             <div className="inline-block">
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
                 <div className="flex mt-8">
                     <TextAreaInput
                         id="description"
                         name="description"
                         value={data.description}
                         rows="3"
                         label="توضیحات"
                         onChange={(e) => setData('description', e.target.value)}
                         error={errors.description}
                     />

                     <InputError message={errors.description} className="mt-2"/>
                 </div>

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
                         ذخیره و بستن سفارش
                     </PrimaryButton>
                 </div>
            </form>
        </>
    );
}
