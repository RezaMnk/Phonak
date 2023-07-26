import {createContext, useEffect, useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShippingStep from "@/Pages/Accessories/Steps/ShippingStep.jsx";
import ProductStep from "@/Pages/Accessories/Steps/ProductStep.jsx";


export const StepContext = createContext();

export default function Create({ accessory }) {
    const [step, setStep] = useState(parseInt(new URLSearchParams(window.location.search).get('step')) || 1);

    const prevStep = () => {
        setStep((prev) => prev - 1)
    };

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('step', step);

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }, [step]);

    const nextStep = () => {
        setStep((prev) => prev + 1)
    };


    const showStep = () => {
        switch (step) {
            case 1:
                return <ProductStep />;
            case 2:
                return <ShippingStep />;
        }
    }


    return (
        <AuthenticatedLayout
            header={(
                <>
                    ایجاد کاربر
                </>
            )}
            breadcrumbs={
                {
                    'سفارشات لوازم جانبی': route('accessories.index'),
                    [accessory ? ('ویرایش سفارش') : ('ایجاد سفارش')]: "#"
                }
            }
        >
            <div className="flex flex-col sm:justify-center items-center mt-12">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <StepContext.Provider value={{accessory, prevStep, nextStep}}>
                        {showStep()}
                    </StepContext.Provider>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
