import {Head, useForm} from '@inertiajs/react';
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useContext, useEffect, useState} from "react";
import {StepContext} from "@/Pages/Accessories/Create.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import ProductsSlider from "@/Pages/Accessories/Components/ProductsSlider.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function ProductStep() {

    const {accessory, nextStep} = useContext(StepContext)

    const {data, setData, post, patch, processing, errors, clearErrors, reset} = useForm({
        brand: accessory?.brand || '',
        count: accessory?.count || '',
        product: accessory?.product_id || '',
    });

    const [didMount, setDidMount] = useState(false)

    const [ products, setProducts ] = useState({})
    const [ product, setProduct ] = useState(accessory?.product || {})

    useEffect(() => { setDidMount(true) }, [])

    useEffect(() => {
        setData('product', product.id)
        clearErrors('product')
    }, [product])

    useEffect(() => {
        if (data.brand)
            get_products()

        if (didMount)
        {
            reset('product')
            setProduct({})
        }
    }, [data.brand])

    const submit = (e) => {
        e.preventDefault();
        if (accessory)
            patch(route('accessories.update', accessory.id), {
                preserveScroll: true,
                onSuccess: () => {
                    nextStep()
                }
            });
        else
            post(route('accessories.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    nextStep()
                }
            });
    };

    const get_products = async () => {
        try {
            const response = await axios.post(route('accessories.products'), { brand: data.brand });
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
             <Head title="سفارش - محصول" />

             <form className="w-full" onSubmit={submit} noValidate>
                 <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                     <div className="w-full xl:w-2/5 ml-5 text-gray-700 dark:text-slate-200">
                         <p>
                             برند مورد سفارش:
                         </p>

                         <InputError message={errors.brand} className="mt-2"/>

                         <div className="mt-5 flex flex-wrap gap-10 justify-around xl:justify-start">
                             <div className="inline-block">
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
                                         <img src="/storage/brands/phonak.png" alt="" className="w-20 h-20 object-contain"/>
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
                                 />

                                 <InputLabel
                                     htmlFor="brand_hansaton"
                                     className="bg-red-500/30 dark:bg-red-400/40 peer-checked:bg-red-500/50 peer-checked:dark:bg-red-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-red-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/hansaton.png" alt="" className="w-20 h-20 object-contain"/>
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
                                         <img src="/storage/brands/unitron.png" alt="" className="w-20 h-20 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             یونیترون
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block">
                                 <RadioInput
                                     id="brand_rayovac"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'rayovac'}
                                     onChange={() => setData('brand', 'rayovac')}
                                 />

                                 <InputLabel
                                     htmlFor="brand_rayovac"
                                     className="bg-stone-500/30 dark:bg-stone-400/40 peer-checked:bg-stone-500/50 peer-checked:dark:bg-stone-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-stone-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/rayovac.png" alt="" className="w-20 h-20 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             ریواک
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block">
                                 <RadioInput
                                     id="brand_detax"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'detax'}
                                     onChange={() => setData('brand', 'detax')}
                                 />

                                 <InputLabel
                                     htmlFor="brand_detax"
                                     className="bg-slate-500/30 dark:bg-slate-300/40 peer-checked:bg-slate-500/50 peer-checked:dark:bg-slate-300/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-slate-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/detax.png" alt="" className="w-20 h-20 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             دیتاکس
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                             <div className="inline-block">
                                 <RadioInput
                                     id="brand_etc"
                                     className="hidden peer"
                                     name="brand"
                                     checked={data.brand === 'etc'}
                                     onChange={() => setData('brand', 'etc')}
                                     required
                                 />

                                 <InputLabel
                                     htmlFor="brand_etc"
                                     className="bg-purple-500/30 dark:bg-purple-400/40 peer-checked:bg-purple-500/50 peer-checked:dark:bg-purple-400/50 border border-gray-200 dark:border-slate-500 rounded-lg peer-checked:border-purple-400"
                                 >
                                     <div className="p-2">
                                         <img src="/storage/brands/etc.png" alt="" className="w-20 h-20 object-contain"/>
                                         <hr className="my-4 border-gray-200 dark:border-slate-500"/>
                                         <p className="text-center">
                                             سایر
                                         </p>
                                     </div>
                                 </InputLabel>
                             </div>
                         </div>
                     </div>
                     <div className="w-full xl:w-3/5 flex flex-col space-y-5 xl:space-y-0">
                         <p className="mb-5 text-gray-700 dark:text-slate-200">
                             محصولات:
                         </p>
                         {Object.keys(products).length === 0 && (
                             <p className="text-lg text-gray-700 dark:text-slate-300">
                                 با اطلاعات وارد شده، محصول قابل سفارشی برای گروه شما وجود ندارد!
                             </p>
                         )}
                         <div className={`transition-all ${! accessory?.product_id && 'ease-in-out duration-500'} ${Object.keys(products).length ? 'max-h-full' : 'max-h-0'} overflow-hidden`}>
                             <ProductsSlider products={products} setProduct={setProduct} product={product.id} error={errors.product} />
                             <InputError message={errors.product} className="mt-2"/>
                         </div>
                     </div>
                 </div>
                 {product.has_count === 1 && (
                     <div className="flex mt-5">
                         <div className="w-full flex">
                             <div className="w-1/3 ml-5">
                                 <TextInput
                                     id="count"
                                     type="number"
                                     name="count"
                                     value={data.count}
                                     label="تعداد مورد سفارش"
                                     onChange={(e) => setData('count', e.target.value)}
                                     error={errors.count}
                                     required
                                 />

                                 <InputError message={errors.count} className="mt-2"/>
                             </div>
                         </div>
                     </div>
                 )}
                <div className="flex justify-end mt-8">
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
