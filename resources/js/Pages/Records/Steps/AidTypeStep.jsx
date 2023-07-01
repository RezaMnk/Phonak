import {Head, useForm} from '@inertiajs/react';

import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {useContext, useEffect, useState} from "react";
import {StepContext} from "@/Pages/Records/Create.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import ProductsSlider from "@/Pages/Records/Components/ProductsSlider.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function AidTypeStep() {

    const {record, nextStep, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors, clearErrors} = useForm({
        brand: record.brand || '',
        type: record.type || '',
        ear: record.ear || '',
        product: record.product_id || '',
        count: record.count || '',
    });

    const [ accessoryType, setAccessoryType ] = useState('')
    const [ products, setProducts ] = useState({})
    const [ product, setProduct ] = useState(record.product_id || '')
    const [ hasCount, setHasCount ] = useState(true)

    useEffect(() => {
        setData('product', product)
        clearErrors('product')
    }, [product])

    useEffect(() => {
        setHasCount((['battery', 'molding'].includes(accessoryType) && data.type === 'accessories'));
    }, [accessoryType, data.type])

    useEffect(() => {
        if (record.type)
            get_products(data.type)
    }, [])

    const submit = (e) => {
        e.preventDefault();
        post(route('records.store_aid_type', record.id), {
            preserveScroll: true,
            onSuccess: () => {
                nextStep()
            }
        });
    };

    const type_change = (e) => {
        setData('type', e.target.value);
        if (e.target.value !== 'accessories')
            get_products(e.target.value);
    };

    const accessory_type_change = (e) => {
        setAccessoryType(e.target.value)

        get_products(data.type);

    };

    const get_products = async (type) => {
        try {
            const response = await axios.post(route('records.products'), { type, accessoryType });
            let new_products = response.data.products;
            if (new_products) {
                setProducts(new_products)
            } else {
                console.log('none')
            }
        } catch (error) {
            console.log('error!');
        }
    };


    return (
        <>
            <Head title="پرونده - نوع سفارش" />

             <form className="w-full" onSubmit={submit} noValidate>
                 <div className="flex mt-3">
                     <div className="w-1/4 ml-5 text-gray-700 dark:text-slate-200">
                         <p>
                             برند مورد سفارش:
                         </p>

                         <InputError message={errors.brand} className="mt-2"/>

                         <div className="mt-5">
                             <div className="inline-block ml-8">
                                 <RadioInput
                                     id="brand_phonak"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'phonak'}
                                     onChange={() => setData('brand', 'phonak')}
                                     required
                                 />

                                 <InputLabel
                                     htmlFor="brand_phonak"
                                     className="border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-green-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/logo.png" alt="" className="w-24 h-24"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             فوناک
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block">
                                 <RadioInput
                                     id="brand_hansaton"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'hansaton'}
                                     onChange={() => setData('brand', 'hansaton')}
                                     required
                                 />

                                 <InputLabel
                                     htmlFor="brand_hansaton"
                                     className="border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-green-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/logo.png" alt="" className="w-24 h-24"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             هنزاتون
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                         </div>
                     </div>
                     <div className="w-3/4 flex flex-col">
                         <div className="w-full flex">
                             <div className={`${hasCount ? 'w-1/3' : 'w-1/2'} ml-5 h-fit`}>
                                 <SelectInput
                                     id="type"
                                     name="name"
                                     value={data.type}
                                     label="نوع سفارش"
                                     onChange={type_change}
                                     error={errors.type}
                                     required
                                 >
                                     <option value="" disabled="disabled">انتخاب کنید</option>
                                     <option value="CIC">CIC (داخل گوشی با باتری 10)</option>
                                     <option value="ITC">ITC (داخل گوشی با باتری 312)</option>
                                     <option value="BTE mold">BTE با/بدون قالب</option>
                                     <option value="BTE tube">BTE با اسلیم تیوب</option>
                                     <option value="RIC">RIC</option>
                                     <option value="accessories">سایر لوازم جانبی</option>
                                 </SelectInput>

                                 <InputError message={errors.type} className="mt-2"/>
                             </div>
                             <div className={`${hasCount ? 'w-1/3 ml-5' : 'w-1/2'} h-fit`}>
                                 {data.type === 'accessories' ? (
                                     <>
                                         <SelectInput
                                             id="accessory-type"
                                             name="accessory-type"
                                             value={accessoryType}
                                             label="نوع لواز حانبی"
                                             onChange={accessory_type_change}
                                             error={errors.ear}
                                             required
                                         >
                                             <option value="" disabled="disabled">انتخاب کنید</option>
                                             <option value="battery">باتری</option>
                                             <option value="adjustment">ابزار های تنظیمی</option>
                                             <option value="molding">خمیر قالبگیری</option>
                                         </SelectInput>

                                         <InputError message={errors.ear} className="mt-2"/>
                                     </>
                                 ) : (
                                     <>
                                         <SelectInput
                                             id="ear"
                                             name="ear"
                                             value={data.ear}
                                             label="نوع تجویز"
                                             onChange={(e) => setData('ear', e.target.value)}
                                             required
                                         >
                                             <option value="" disabled="disabled">انتخاب کنید</option>
                                             <option value="right">تجویز تک گوشی گوش راست</option>
                                             <option value="left">تجویز تک گوشی گوش چپ</option>
                                             <option value="both">تجویز دو گوشی</option>
                                         </SelectInput>
                                     </>
                                 )}
                             </div>
                             {hasCount && (
                                 <div className="w-1/3 h-fit">
                                     <>
                                         <TextInput
                                             id="count"
                                             name="count"
                                             type="number"
                                             value={data.count}
                                             label="تعداد مورد سفارش محصول"
                                             onChange={(e) => setData('count', e.target.value)}
                                             error={errors.count}
                                             required
                                         />

                                         <InputError message={errors.count} className="mt-2"/>
                                     </>
                                 </div>
                             )}
                         </div>
                         <div className={`mt-5 transition-all ${! record.product_id && 'ease-in-out duration-500'} ${Object.keys(products).length ? 'max-h-full' : 'max-h-0'} overflow-hidden`}>
                             <ProductsSlider products={products}  setProduct={setProduct} product={product} error={errors.product} />
                         </div>
                     </div>

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
                        مرحله بعد
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
