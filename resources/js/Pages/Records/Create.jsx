import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Steps from "@/Pages/Records/Components/Steps.jsx";
import {createContext, useState} from "react";
import PatientStep from "@/Pages/Records/Steps/PatientStep.jsx";
import AidTypeStep from "@/Pages/Records/Steps/AidTypeStep.jsx";


export const StepContext = createContext();

export default function Create({ record }) {
    const [step, setStep] = useState(1)

    const prevStep = () => {
        setStep((prev) => prev - 1)
    };

    const nextStep = () => {
        setStep((prev) => prev + 1)
    };
    const showStep = () => {
        switch (step) {
            case 1:
                return <PatientStep />;
            case 2:
                return <AidTypeStep />;
            case 3:
                return <PatientStep />;
        }
    }


    return (
        <AuthenticatedLayout
            header={(
                <>
                    ایجاد بیمار
                </>
            )}
            breadcrumbs={
                {
                    'پرونده ها': route('records.index'),
                    'پرونده جدید': "#"
                }
            }
        >
            <Steps step={step} />

            <div className="flex flex-col sm:justify-center items-center mt-12">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <StepContext.Provider  value={{record, prevStep, nextStep}}>
                        {showStep()}
                    </StepContext.Provider>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
