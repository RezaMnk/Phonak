import {createContext, useEffect, useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Steps from "@/Pages/Records/Components/Steps.jsx";
import PatientStep from "@/Pages/Records/Steps/PatientStep.jsx";
import AidTypeStep from "@/Pages/Records/Steps/AidTypeStep.jsx";
import AidStep from "@/Pages/Records/Steps/AidStep.jsx";
import AudiogramStep from "@/Pages/Records/Steps/AudiogramStep.jsx";


export const StepContext = createContext();

export default function Create({ record }) {
    const [step, setStep] = useState(parseInt(new URLSearchParams(window.location.search).get('step')) || 1);
    const passedSteps = record?.status ? (record.status === 'completed' ? 5 : record?.status) : 1;

    const prevStep = () => {
        setStep((prev) => prev - 1);
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
                return <PatientStep />;
            case 2:
                return <AidTypeStep />;
            case 3:
                return <AidStep />;
            case 4:
                return <AudiogramStep />;
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
            <Steps step={step} passedSteps={passedSteps} />

            <div className="flex flex-col sm:justify-center items-center mt-12">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <StepContext.Provider value={{record, prevStep, nextStep}}>
                        {showStep()}
                    </StepContext.Provider>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
