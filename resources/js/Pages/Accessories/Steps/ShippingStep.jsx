import {Head, useForm} from '@inertiajs/react';

import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {useContext} from "react";
import {StepContext} from "@/Pages/Accessories/Create.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import Icon from "@/Components/Icon.jsx";

export default function ShippingStep() {

    const {accessory, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors} = useForm({
        expert_phone: accessory.shipping?.expert_phone || '',
        type: accessory.shipping?.type || '',
        etc_delivery: accessory.shipping?.etc_delivery || '',
        has_health_insurance: accessory.shipping?.has_health_insurance || false,
        phone: accessory.shipping?.phone || '',
        audiologist_med_number: accessory.shipping?.audiologist_med_number || '',
        otolaryngologist_med_number: accessory.shipping?.otolaryngologist_med_number || '',
        supplementary_insurance: accessory.shipping?.supplementary_insurance || '',
        description: accessory.shipping?.description || '',
        mail_address: accessory.shipping?.mail_address || accessory.shipping?.address.mail_address,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('accessories.store_shipping', accessory.id), {
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
                 <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                    <div className="w-full xl:w-1/3 ml-5">
                        <TextInput
                            id="expert_phone"
                            name="expert_phone"
                            type="number"
                            value={data.expert_phone}
                            label="تلفن همراه شنوایی شناس"
                            onChange={(e) => setData('expert_phone', e.target.value)}
                            error={errors.expert_phone}
                        />
                        <span className="text-gray-700 dark:text-slate-300 text-xs">
                            <Icon className="inline-block !w-4 !h-4 ml-1" viewBox="0 0 24 24" type="fill">
                                <path d="M15,8a1,1,0,0,1-1,1H6A1,1,0,0,1,6,7h8A1,1,0,0,1,15,8Zm-1,3H6a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Zm-4,4H6a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm13-3v8a3,3,0,0,1-3,3H4a3,3,0,0,1-3-3V4A3,3,0,0,1,4,1H16a3,3,0,0,1,3,3v7h3A1,1,0,0,1,23,12ZM17,4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H17Zm4,9H19v8h1a1,1,0,0,0,1-1Z"/>
                            </Icon>
                            جهت ارسال صورتحساب
                        </span>

                        <InputError message={errors.expert_phone} className="mt-2"/>
                    </div>
                    <div className="w-full xl:w-1/3 ml-5">
                        <SelectInput
                            id="type"
                            name="type"
                            value={data.type}
                            label="شیوه ارسال"
                            onChange={(e) => setData('type', e.target.value)}
                            error={errors.type}
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
                        <div className="w-full xl:w-1/3">
                            <TextInput
                                id="etc_delivery"
                                etc_delivery="etc_delivery"
                                value={data.etc_delivery}
                                label="شیوه ارسال محصول"
                                onChange={(e) => setData('etc_delivery', e.target.value)}
                                error={errors.etc_delivery}
                            />

                            <InputError message={errors.etc_delivery} className="mt-2"/>
                        </div>
                    )}
                </div>
                 <div className="mt-8 text-gray-700 dark:text-slate-200">
                     <div className="flex justify-between items-end">
                         <h5>
                             آدرس جهت ارسال
                         </h5>
                     </div>
                     <hr className="dark:border-slate-600"/>
                 </div>
                 <div className="flex mt-8">
                     <div className="w-full ml-5 text-gray-700 dark:text-slate-200">
                         <p>
                             مرسولات شما به کدام آدرس ارسال شوند؟
                         </p>

                         <InputError message={errors.mail_address} className="mt-2"/>

                         <div className="mb-5 mt-2">
                             <div className="mb-5">
                                 <RadioInput
                                     className="hidden peer"
                                     id="mail_address_work"
                                     name="mail_address"
                                     checked={data.mail_address === 'work'}
                                     onChange={() => setData('mail_address', 'work')}
                                 />

                                 <InputLabel
                                     className="block p-4 rounded-lg bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 border border-gray-200 dark:border-slate-500 peer-checked:border-sky-400"
                                     htmlFor="mail_address_work"
                                 >
                                     <div>
                                         <h6 className="font-semibold border-b pb-2">
                                             محل کار
                                         </h6>
                                         <p className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5 xl:mt-2">
                                            <span className="inline-block">
                                                {accessory.shipping.address.work_address}
                                            </span>
                                                     <span className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                            کدپستی: {accessory.shipping.address.work_post_code}
                                            </span>
                                             {accessory.shipping.address.work_phone && (<span
                                                 className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                            تلفن: {accessory.shipping.address.work_phone}
                                            </span>)}
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             {accessory.shipping.address.second_work_address && (
                                 <div className="mb-5">
                                     <RadioInput
                                         className="hidden peer"
                                         id="second_mail_address_work"
                                         name="mail_address"
                                         checked={data.mail_address === 'second_work'}
                                         onChange={() => setData('mail_address', 'second_work')}
                                     />

                                     <InputLabel
                                         className="block p-4 rounded-lg bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 border border-gray-200 dark:border-slate-500 peer-checked:border-sky-400"
                                         htmlFor="second_mail_address_work"
                                     >
                                         <div>
                                             <h6 className="font-semibold border-b pb-2">
                                                 محل کار دوم
                                             </h6>
                                             <p className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5 xl:mt-2">
                                                <span className="inline-block">
                                                    {accessory.shipping.address.second_work_address}
                                                </span>
                                                         <span className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                                کدپستی: {accessory.shipping.address.second_work_post_code}
                                                </span>
                                                         {accessory.shipping.address.second_work_phone && (<span
                                                             className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                                تلفن: {accessory.shipping.address.second_work_phone}
                                                </span>)}
                                             </p>
                                         </div>
                                     </InputLabel>
                                 </div>
                             )}
                             <div className="inline-block">
                                 <RadioInput
                                     className="hidden peer"
                                     id="mail_address_home"
                                     name="mail_address"
                                     checked={data.mail_address === 'home'}
                                     onChange={() => setData('mail_address', 'home')}
                                 />

                                 <InputLabel
                                     className="block p-4 rounded-lg bg-gray-100 dark:bg-slate-700 peer-checked:bg-sky-100 peer-checked:dark:bg-sky-900 border border-gray-200 dark:border-slate-500 peer-checked:border-sky-400"
                                     htmlFor="mail_address_home"
                                 >
                                     <div>
                                         <h6 className="font-semibold border-b pb-2">
                                             محل سکونت
                                         </h6>
                                         <p className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-5 xl:mt-2">
                                            <span className="inline-block">
                                                {accessory.shipping.address.home_address}
                                            </span>
                                                     <span className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                            کدپستی: {accessory.shipping.address.home_post_code}
                                            </span>
                                             {accessory.shipping.address.home_phone && (<span
                                                 className="inline-block xl:mr-5 xl:pr-5 xl:border-r border-gray-300 dark:border-slate-600">
                                            تلفن: {accessory.shipping.address.home_phone}
                                            </span>)}
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="mt-5 text-gray-700 dark:text-slate-200">
                     <h5>
                         بیمه سلامت
                     </h5>
                     <hr className="dark:border-slate-600"/>
                 </div>
                 <div className="flex mt-5 mb-5">
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
                     <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6 mb-5">
                         <div className="w-full xl:w-1/4 ml-5">
                             <TextInput
                                 id="phone"
                                 name="phone"
                                 type="number"
                                 value={data.phone}
                                 label="تلفن همراه کاربر"
                                 onChange={(e) => setData('phone', e.target.value)}
                                 error={errors.phone}
                             />

                             <InputError message={errors.phone} className="mt-2"/>
                         </div>
                         <div className="w-full xl:w-1/4 ml-5">
                             <TextInput
                                 id="audiologist_med_number"
                                 name="audiologist_med_number"
                                 type="number"
                                 value={data.audiologist_med_number}
                                 label="شماره نظام پزشکی شنوایی شناس"
                                 onChange={(e) => setData('audiologist_med_number', e.target.value)}
                                 error={errors.audiologist_med_number}
                             />

                             <InputError message={errors.audiologist_med_number} className="mt-2"/>
                         </div>
                         <div className="w-full xl:w-1/4 ml-5">
                             <TextInput
                                 id="otolaryngologist_med_number"
                                 name="otolaryngologist_med_number"
                                 type="number"
                                 value={data.otolaryngologist_med_number}
                                 label="شماره نظام پزشکی پزشک گوش و حلق و بینی"
                                 onChange={(e) => setData('otolaryngologist_med_number', e.target.value)}
                                 error={errors.otolaryngologist_med_number}
                             />

                             <InputError message={errors.otolaryngologist_med_number} className="mt-2"/>
                         </div>
                         <div className="w-full xl:w-1/4">
                             <TextInput
                                 id="supplementary_insurance"
                                 name="supplementary_insurance"
                                 value={data.supplementary_insurance}
                                 label="نوع بیمه تکمیلی"
                                 onChange={(e) => setData('supplementary_insurance', e.target.value)}
                                 error={errors.supplementary_insurance}
                             />

                             <InputError message={errors.supplementary_insurance} className="mt-2"/>
                         </div>
                     </div>
                )}

                 <div className="flex mt-16">
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
