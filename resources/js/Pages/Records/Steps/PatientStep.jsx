import {Head, useForm} from '@inertiajs/react';

import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import IranStatesOptions, {Cities} from "@/Partials/IranStatesOptions.jsx";
import {useContext, useState} from "react";
import {StepContext} from "@/Pages/Records/Create.jsx";

export default function PatientStep() {

    const {record, nextStep} = useContext(StepContext)

    const {data, setData, post, patch, processing, errors} = useForm({
        state: record?.patient?.state || 'تهران',
        city: record?.patient?.city || 'تهران',
        national_code: record?.patient?.national_code || '',
        name: record?.patient?.name || '',
        eng_name: record?.patient?.eng_name || '',
        address: record?.patient?.address || '',
        post_code: record?.patient?.post_code || '',
        phone: record?.patient?.phone || '',
        age: record?.patient?.age || ''
    });

    const [ disabled, setDisabled ] = useState(true)

    const submit = (e) => {
        e.preventDefault();

        if (record)
            patch(route('records.update', record.id), {
                preserveScroll: true,
                onSuccess: () => {
                    nextStep()
                }
            });
        else
            post(route('records.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    nextStep()
                }
            });
    };

    const update_patient = (new_patient) => {

        setData((data) => ({
            ...data,
            name: new_patient.name,
            eng_name: new_patient.eng_name,
            state: new_patient.state,
            city: new_patient.city,
            address: new_patient.address,
            post_code: new_patient.post_code,
            phone: new_patient.phone,
            age: new_patient.age,
        }))
    }

    const reset_form = () => {
        setData((data) => ({
            ...data,
            name: '',
            eng_name: '',
            state: 'تهران',
            city: 'تهران',
            address: '',
            post_code: '',
            phone: '',
            age: '',
        }))
    }

    const national_code_change = (e) => {
        setData('national_code', e.target.value);
        if (e.target.value.length === 10)
            check_national_code(e.target.value);
    };

    const check_national_code = async (national_code) => {
        try {
            const response = await axios.post(route('records.check_national_code'), { national_code });
            let patient = response.data.patient;
            if (patient) {
                update_patient(response.data.patient);
                setDisabled(true);
            } else {
                setDisabled(false);
                reset_form();
            }
        } catch (error) {
            console.log('error!');
            setDisabled(false);
        }
    };


    return (
        <>
            <Head title="پرونده جدید - بیمار" />

             <form className="w-full" onSubmit={submit}>
                <div className="mt-5 text-gray-700 dark:text-slate-200">
                    <div className="flex justify-between items-end">
                        <h5>
                            اطلاعات بیمار
                        </h5>
                        <div className={`transition-all ${data.national_code.length === 10 ? 'opacity-1 visible' : 'opacity-0 invisible'}`}>
                            <div className={`inline-block ml-1 w-2 h-2 ${disabled ? 'bg-yellow-500 dark:bg-yellow-300' : 'bg-green-500 dark:bg-green-300'} rounded-full`}></div>
                            <span className="text-sm">
                                بیمار {disabled ? 'قدیمی' : 'جدید'}
                            </span>
                        </div>
                    </div>
                    <hr className="dark:border-slate-600"/>
                </div>
                <div className="flex mt-6 mb-5">
                    <div className="w-1/6 ml-5">
                        <TextInput
                            id="national_code"
                            name="national_code"
                            type="number"
                            value={data.national_code}
                            label="کد ملی بیمار"
                            svgIcon={<path
                                d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                                strokeLinecap="round" strokeLinejoin="round"/>}
                            onChange={national_code_change}
                            error={errors.national_code}
                            required
                        />

                        <InputError message={errors.national_code} className="mt-2"/>
                    </div>
                    <div className="w-1/4 ml-5">
                        <TextInput
                            disabled={disabled}
                            id="name"
                            name="name"
                            value={data.name}
                            label="نام بیمار"
                            svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                           d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <InputError message={errors.name} className="mt-2"/>
                    </div>
                    <div className="w-[12%] ml-5">
                        <TextInput
                            disabled={disabled}
                            id="age"
                            name="age"
                            type="number"
                            value={data.age}
                            label="سن بیمار"
                            svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                           d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                            onChange={(e) => setData('age', e.target.value)}
                            error={errors.age}
                            required
                        />

                        <InputError message={errors.age} className="mt-2"/>
                    </div>
                    <div className="w-1/4 ml-5">
                        <TextInput
                            disabled={disabled}
                            id="phone"
                            name="phone"
                            type="number"
                            value={data.phone}
                            label="شماره تلفن بیمار"
                            svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                           d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                            onChange={(e) => setData('phone', e.target.value)}
                            error={errors.phone}
                            required
                        />

                        <InputError message={errors.phone} className="mt-2"/>
                    </div>
                    <div className="w-1/4">
                        <TextInput
                            disabled={disabled}
                            id="eng_name"
                            name="eng_name"
                            value={data.eng_name}
                            label="نام بیمار به انگلیسی"
                            svgIcon={<path strokeLinecap="round" strokeLinejoin="round"
                                           d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"/>}
                            onChange={(e) => setData('eng_name', e.target.value)}
                            error={errors.eng_name}
                            required
                        />

                        <InputError message={errors.eng_name} className="mt-2"/>
                    </div>
                </div>
                <div className="flex mt-3">
                    <div className="w-1/3 ml-5">
                        <SelectInput
                            disabled={disabled}
                            id="state"
                            name="state"
                            value={data.state}
                            label="استان اقامت"
                            onChange={(e) => setData('state', e.target.value)}
                            error={errors.state}
                            required
                        >
                            <IranStatesOptions />
                        </SelectInput>

                        <InputError message={errors.state} className="mt-2"/>
                    </div>
                    <div className="w-1/3 ml-5">
                        <SelectInput
                            disabled={disabled}
                            id="city"
                            name="name"
                            value={data.city}
                            label="شهر محل اقامت"
                            onChange={(e) => setData('city', e.target.value)}
                            error={errors.city}
                            required
                        >
                            <Cities state={data.state} />
                        </SelectInput>

                        <InputError message={errors.city} className="mt-2"/>
                    </div>
                    <div className="w-1/3">
                        <TextInput
                            disabled={disabled}
                            id="post_code"
                            name="post_code"
                            value={data.post_code}
                            label="کد پستی محل کار"
                            svgIcon={(
                                <g>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M10 3L8 21"/>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M16 3L14 21"/>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M3.5 9H21.5"/>
                                    <path xmlns="http://www.w3.org/2000/svg" d="M2.5 15H20.5"/>
                                </g>
                            )}
                            autoComplete="post_code"
                            onChange={(e) => setData('post_code', e.target.value)}
                            error={errors.post_code}
                            required
                        />

                        <InputError message={errors.post_code} className="mt-2"/>
                    </div>
                </div>

                <div className="mt-12 text-gray-700 dark:text-slate-200">
                    <h5>
                        مشخصات محل اقامت بیمار
                    </h5>
                    <hr className="dark:border-slate-600"/>
                </div>
                <div className="flex mt-3">
                    <TextAreaInput
                        disabled={disabled}
                        id="address"
                        name="address"
                        value={data.address}
                        rows="4"
                        label="آدرس محل اقامت"
                        svgIcon={<path
                            d="M3.99999 10L12 3L20 10L20 20H15V16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13C11.2043 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2043 9 16V20H4L3.99999 10Z"
                            strokeLinecap="round" strokeLinejoin="round"/>}
                        autoComplete="address"
                        onChange={(e) => setData('address', e.target.value)}
                        error={errors.address}
                        required
                    />

                    <InputError message={errors.address} className="mt-2"/>
                </div>
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
