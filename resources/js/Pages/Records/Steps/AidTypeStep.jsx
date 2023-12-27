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
import {useFirstRender} from "@/Hooks/useFirstRender.js";

export default function AidTypeStep() {

    const {record, nextStep, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors, clearErrors} = useForm({
        brand: record.brand || '',
        type: record.type || '',
        ear: record.ear || '',
        product: record.product_id || '',
        has_mold: record.has_mold,
        has_package: record.has_package,
        has_charger: record.has_charger,
    });

    const firstRender = useFirstRender();

    const [ products, setProducts ] = useState({})
    const [ product, setProduct ] = useState(record.product_id || '')
    const [ productsItems, setProductsItems ] = useState({})
    const [ productItems, setProductItems ] = useState([])

    useEffect(() => {
        setData('product', product)
        const items = firstRender ? [record.has_package && 'package', record.has_mold && 'mold', record.has_charger && 'charger'] : ['package', 'charger'];
        setProductItems(items);
        clearErrors('product')
    }, [product])

    useEffect(() => {
        setData((data) => ({
            ...data,
            has_package: productItems.includes('package'),
            has_mold: productItems.includes('mold'),
            has_charger: productItems.includes('charger'),
        }))
    }, [productItems])

    useEffect(() => {
        if (data.type && data.brand)
        {
            get_products(data.type).then(() => {
                if (! firstRender)
                {
                    setData('product', '')
                    setProduct('')
                }
            })

        }
    }, [data.type, data.brand])

    const submit = (e) => {
        e.preventDefault();
        post(route('records.store_aid_type', record.id), {
            preserveScroll: true,
            onSuccess: () => {
                nextStep()
            }
        });
    };

    const get_products = async () => {
        try {
            const response = await axios.post(route('records.products'), { type: data.type, brand: data.brand });
            let new_products = response.data.products;
            if (new_products) {
                setProducts(new_products)

                let items = {};
                for (let loop_product of Object.values(products)) {
                    items[loop_product.id] = [];
                    if (loop_product.has_package) {
                        items[loop_product.id].push('package');
                    }
                    if (loop_product.has_mold) {
                        items[loop_product.id].push('mold');
                    }
                    if (loop_product.has_charger) {
                        items[loop_product.id].push('charger');
                    }
                }
                setProductsItems(items)
            } else {
                console.log('none')
            }
        } catch (error) {
            console.log('error!');
        }
    };


    return (
        <>
             <Head title="سفارش - نوع سفارش" />

             <form className="w-full" onSubmit={submit} noValidate>
                 <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                     <div className="w-full xl:w-1/3 ml-5 text-gray-700 dark:text-slate-200">
                         <p>
                             برند مورد سفارش:
                         </p>

                         <InputError message={errors.brand} className="mt-2"/>

                         <div className="mt-5 flex justify-between xl:justify-start">
                             <div className="inline-block ml-5">
                                 <RadioInput
                                     id="brand_phonak"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'phonak'}
                                     onChange={() => setData('brand', 'phonak')}
                                 />

                                 <InputLabel
                                     htmlFor="brand_phonak"
                                     className="bg-lime-500/30 dark:bg-lime-400/40 peer-checked:bg-lime-500/50 peer-checked:dark:bg-lime-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-green-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/phonak.png" alt="" className="w-24 h-24 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             فوناک
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block ml-5">
                                 <RadioInput
                                     id="brand_hansaton"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'hansaton'}
                                     onChange={() => setData('brand', 'hansaton')}
                                 />

                                 <InputLabel
                                     htmlFor="brand_hansaton"
                                     className="bg-red-500/30 dark:bg-red-400/40 peer-checked:bg-red-500/50 peer-checked:dark:bg-red-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-red-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/hansaton.png" alt="" className="w-24 h-24 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             هنزاتون
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block">
                                 <RadioInput
                                     id="brand_unitron"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'unitron'}
                                     onChange={() => setData('brand', 'unitron')}
                                 />

                                 <InputLabel
                                     htmlFor="brand_unitron"
                                     className="bg-sky-500/30 dark:bg-sky-400/40 peer-checked:bg-sky-500/50 peer-checked:dark:bg-sky-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-sky-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/unitron.png" alt="" className="w-24 h-24 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             یونیترون
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                         </div>
                     </div>
                     <div className="w-full xl:w-2/3 flex flex-col space-y-5 xl:space-y-0">
                         <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0">
                             <div className="w-full xl:w-1/2 ml-5 h-fit">
                                 <SelectInput
                                     id="type"
                                     name="name"
                                     value={data.type}
                                     label="نوع سفارش"
                                     onChange={(e) => setData('type', e.target.value)}
                                     error={errors.type}
                                 >
                                     <option value="" disabled="disabled">انتخاب کنید</option>
                                     <option value="CIC">CIC (داخل گوشی با باتری 10)</option>
                                     <option value="ITC">ITC (داخل گوشی با باتری 312)</option>
                                     <option value="BTE mold">BTE با/بدون قالب</option>
                                     <option value="BTE tube">BTE با اسلیم تیوب</option>
                                     <option value="RIC">RIC</option>
                                 </SelectInput>

                                 <InputError message={errors.type} className="mt-2"/>
                             </div>
                             <div className="w-full xl:w-1/2 h-fit">
                                 <SelectInput
                                     id="ear"
                                     name="ear"
                                     value={data.ear}
                                     label="نوع تجویز"
                                     onChange={(e) => setData('ear', e.target.value)}
                                     error={errors.ear}
                                 >
                                     <option value="" disabled="disabled">انتخاب کنید</option>
                                     <option value="right">تجویز تک گوشی گوش راست</option>
                                     <option value="left">تجویز تک گوشی گوش چپ</option>
                                     <option value="both">تجویز دو گوشی</option>
                                 </SelectInput>

                                 <InputError message={errors.ear} className="mt-2"/>
                             </div>
                         </div>
                         {Object.keys(products).length === 0 && (
                             <p className="block text-lg !mt-5 text-gray-700 dark:text-slate-300">
                                 با اطلاعات وارد شده، محصول قابل سفارشی برای گروه شما وجود ندارد!
                             </p>
                         )}
                         <div className={`!mt-5 transition-all ${! record.product_id && 'ease-in-out duration-500'} ${Object.keys(products).length ? 'max-h-full' : 'max-h-0'} overflow-hidden`}>
                             <ProductsSlider products={products} setProduct={setProduct} product={product} setProductItems={setProductItems} productItems={productItems} productsItems={productsItems} error={errors.product} />
                             <InputError message={errors.product} className="mt-2"/>
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
