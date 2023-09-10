import {Head, useForm} from '@inertiajs/react';

import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {createContext, useContext} from "react";
import {StepContext} from "@/Pages/Records/Create.jsx";
import {
    AidSize,
    Description, DomeSize, DomeType, ExternalReceiverSize, HasMold, HasVent, MoldMaterial,
    MoldSize,
    ReceiverType, ShellType, TubeSize,
    VentSize,
    WaxGuard
} from "@/Pages/Records/Components/AidInputs.jsx";

export const AidContext = createContext();

export default function AidStep() {

    const {record, nextStep, prevStep} = useContext(StepContext)

    const {data, setData, post, processing, errors} = useForm({
        left: {
            hearing_aid_size: record.aid?.left?.hearing_aid_size || '',
            vent_size: record.aid?.left?.vent_size || '',
            wax_guard: record.aid?.left?.wax_guard || '',
            receiver: record.aid?.left?.receiver || '',
            has_mold: record.aid?.left?.has_mold || false,
            mold_material: record.aid?.left?.mold_material || 'hard',
            mold_size: record.aid?.left?.mold_size || '',
            has_vent: record.aid?.left?.has_vent || false,
            tube_size: record.aid?.left?.tube_size || '',
            dome_type: record.aid?.left?.dome_type || '',
            dome_size: record.aid?.left?.dome_size || '',
            external_receiver_size: record.aid?.left?.external_receiver_size || '',
            shell_type: record.aid?.left?.shell_type || '',
            description: record.aid?.left?.description || '',
        },
        right: {
            hearing_aid_size: record.aid?.right?.hearing_aid_size || '',
            vent_size: record.aid?.right?.vent_size || '',
            wax_guard: record.aid?.right?.wax_guard || '',
            receiver: record.aid?.right?.receiver || '',
            has_mold: record.aid?.right?.has_mold || false,
            mold_material: record.aid?.right?.mold_material || 'hard',
            mold_size: record.aid?.right?.mold_size || '',
            has_vent: record.aid?.right?.has_vent || false,
            tube_size: record.aid?.right?.tube_size || '',
            dome_type: record.aid?.right?.dome_type || '',
            dome_size: record.aid?.right?.dome_size || '',
            external_receiver_size: record.aid?.right?.external_receiver_size || '',
            shell_type: record.aid?.right?.shell_type || '',
            description: record.aid?.right?.description || '',
        },
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('records.store_aid', record.id), {
            preserveScroll: true,
            onSuccess: () => {
                nextStep()
            }
        });
    };

    const render_ear = (ear) => (
        <>
            {(record.type === 'CIC' || record.type === 'ITC') && (
                <>
                    <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-3">
                        <div className="w-full xl:w-1/4 ml-5">
                            <AidSize ear={ear} is_cic={record.type === 'CIC'} />
                        </div>
                        <div className="w-full xl:w-1/4 ml-5">
                            <VentSize ear={ear} />
                        </div>
                        <div className="w-full xl:w-1/4 ml-5">
                            <WaxGuard ear={ear} />
                        </div>
                        <div className="w-full xl:w-1/4">
                            <ReceiverType ear={ear} type={record.type} />
                        </div>
                    </div>
                </>
            )}
            {record.type === 'BTE mold' && (
                <>
                    <div className="w-full">
                        <HasMold ear={ear} />
                    </div>
                    {data[ear].has_mold && (
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6">
                            <div className={`${data[ear].has_vent && data[ear].mold_material !== 'soft' ? 'w-full xl:w-3/12' : 'w-full xl:w-3/12'} ml-5 flex items-center`}>
                                <MoldMaterial ear={ear} />
                            </div>
                            {data[ear].mold_material !== 'soft' && (
                                <div className={`${data[ear].has_vent && data[ear].mold_material !== 'soft' ? 'w-full xl:w-2/12' : 'w-full xl:w-3/12'} ml-5 flex items-center`}>
                                    <HasVent ear={ear} />
                                </div>
                            )}

                            <div className={`${data[ear].has_vent && data[ear].mold_material !== 'soft' ? 'w-full xl:w-4/12 ml-5' : 'w-full xl:w-6/12'}`}>
                                <MoldSize ear={ear} />
                            </div>
                            {(data[ear].has_vent && data[ear].mold_material !== 'soft') && (
                                <div className="w-full xl:w-3/12">
                                    <VentSize ear={ear} />
                                </div>
                            )}
                        </div>
                    )}

                </>
            )}
            {record.type === 'BTE tube' && (
                <>
                    <div className="w-full">
                        <HasMold ear={ear} />
                    </div>
                    {data[ear].has_mold ? (
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6">
                            <div className="w-full xl:w-1/3 flex items-center">
                                <HasVent ear={ear} />
                            </div>
                            <div className={`${data[ear].has_vent ? 'w-full xl:w-1/3 ml-5' : 'w-full xl:w-2/3'}`}>
                                <TubeSize ear={ear} />
                            </div>
                            {data[ear].has_vent && (
                                <>
                                    <div className="w-full xl:w-1/2">
                                        <VentSize ear={ear} />
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6">
                            <div className="w-full xl:w-1/3 ml-5">
                                <TubeSize ear={ear} />
                            </div>
                            <div className="w-full xl:w-1/3 ml-5">
                                <DomeType ear={ear} />
                            </div>
                            <div className="w-full xl:w-1/3">
                                <DomeSize ear={ear} />
                            </div>
                        </div>
                    )}
                </>
            )}
            {record.type === 'RIC' && (
                <>
                    <div className="w-full">
                        <HasMold ear={ear} />
                    </div>
                    <div className="flex flex-col xl:flex-row space-y-5 xl:space-y-0 mt-6">
                        {data[ear].has_mold ? (
                            <>
                                <div className="w-full xl:-1/4 ml-5">
                                    <ReceiverType ear={ear} type="RIC - mold" />
                                </div>
                                <div className="w-full xl:w-1/4 ml-5">
                                    <ShellType ear={ear} hasSlimtip={data[ear].receiver !== 'ultra power'} />
                                </div>
                                <div className="w-full xl:w-1/4 ml-5">
                                    <ExternalReceiverSize ear={ear} />
                                </div>
                                <div className="w-full xl:w-1/4">
                                    <VentSize required={false} ear={ear} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full xl:w-1/4 ml-5">
                                    <ReceiverType ear={ear} type="RIC - no mold" />
                                </div>
                                <div className="w-full xl:w-1/4 ml-5">
                                    <ExternalReceiverSize ear={ear} />
                                </div>
                                <div className="w-full xl:w-1/4 ml-5">
                                    <DomeType ear={ear} />
                                </div>
                                <div className="w-full xl:w-1/4">
                                    <DomeSize ear={ear} />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className="w-full mt-5">
                <Description ear={ear} />
            </div>
        </>
    );

    return (
        <>
            <Head title="سفارش - اطلاعات سمعک" />

             <form className="w-full" onSubmit={submit}>
                <AidContext.Provider value={{data, setData, errors}}>
                    {(record.ear === 'left' || record.ear === 'both') && (
                        <div>
                            <div className="mb-8">
                                <div className="inline-block ml-2 w-3 h-3 bg-blue-400 rounded-full"></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    گوش چپ
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('left')}
                        </div>
                    )}

                    {(record.ear === 'right' || record.ear === 'both') && (
                        <div className={record.ear === 'both' ? 'mt-8' : ''}>
                            <div className="mb-8">
                                <div className="inline-block ml-2 w-3 h-3 bg-red-600 dark:bg-red-400 rounded-full"></div>
                                <span className="text-lg text-gray-700 dark:text-slate-200">
                                    گوش راست
                                </span>
                                <hr className="mt-1 dark:border-slate-600"/>
                            </div>
                            {render_ear('right')}
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
