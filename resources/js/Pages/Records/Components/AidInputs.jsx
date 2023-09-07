import SelectInput from "@/Components/SelectInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useContext} from "react";
import {AidContext} from "@/Pages/Records/Steps/AidStep.jsx";
import RadioInput from "@/Components/RadioInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import CheckboxInput from "@/Components/CheckboxInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";


export const AidSize = ({ ear, is_itc = false }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`hearing_aid_size_` + ear}
                name={`${ear}.hearing_aid_size`}
                value={data[ear].hearing_aid_size}
                label="اندازه سمعک"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        hearing_aid_size: e.target.value
                    },
                }))}
                error={errors['hearing_aid_size.' + ear]}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                {! is_itc && (<option value="CIC">CIC</option>)}
                <option value="Canal">Canal</option>
                <option value="Full shell">Full shell</option>
            </SelectInput>

            <InputError message={errors[ear]?.hearing_aid_size} className="mt-2"/>
        </>
    );
}

export const VentSize = ({ ear, required }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`vent_size_` + ear}
                name={`${ear}.vent_size`}
                value={data[ear].vent_size}
                label="اندازه ونت"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        vent_size: e.target.value
                    },
                }))}

                error={errors.vent_size}
                required={required}
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="2-3 mm">2-3 mm</option>
                <option value="1.5 mm">1.5 mm</option>
                <option value="1 mm">1 mm</option>
                <option value="groove">شیاری</option>
                <option value="none">هیچکدام</option>
            </SelectInput>

            <InputError message={errors[ear]?.vent_size} className="mt-2"/>
        </>
    );
}

export const WaxGuard = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`wax_guard_` + ear}
                name={`${ear}.wax_guard`}
                value={data[ear].wax_guard}
                label="مدل وکسگارد"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        wax_guard: e.target.value
                    },
                }))}
                error={errors.wax_guard}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="normal">معمولی</option>
                <option value="rotating">چرخشی</option>
            </SelectInput>

            <InputError message={errors[ear]?.wax_guard} className="mt-2"/>
        </>
    );
}

export const ReceiverType = ({ type = 'CIC', ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`receiver_` + ear}
                name={`${ear}.receiver`}
                value={data[ear].receiver}
                label="نوع رسیور"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        receiver: e.target.value
                    },
                }))}
                error={errors.receiver}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                {type === 'CIC' && (
                    <>
                        <option value="standard">standard</option>
                        <option value="power">power</option>
                        <option value="super power">super power</option>
                    </>
                )}
                {type === 'ITC' && (
                    <>
                        <option value="standard">standard</option>
                        <option value="power">power</option>
                        <option value="super power">super power</option>
                        <option value="ultra power">ultra power</option>
                    </>
                )}
                {type === 'RIC - mold' && (
                    <>
                        <option value="moderate">moderate</option>
                        <option value="power">power</option>
                        <option value="ultra power">ultra power</option>
                    </>
                )}
                {type === 'RIC - no mold' && (
                    <>
                        <option value="moderate">moderate</option>
                        <option value="power">power</option>
                    </>
                )}
            </SelectInput>

            <InputError message={errors[ear]?.receiver} className="mt-2"/>
        </>
    );
}

export const HasMold = ({ ear }) => {
    const {data, setData} = useContext(AidContext)
    return (
        <>
            <CheckboxInput
                id={`has_mold_` + ear}
                name={`${ear}.has_mold`}
                value={data[ear].has_mold}
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        has_mold: e.target.checked
                    },
                }))}
            />

            <InputLabel
                htmlFor={`has_mold_` + ear}
                value="قالب ارسال می‌کنم"
                className="mr-2"
            />
        </>
    );
}

export const MoldMaterial = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <div>
            <p className="inline-block font-medium text-sm text-gray-700 dark:text-slate-200">
                جنس قالب:
            </p>

            <InputError message={errors[ear]?.mail_address} className="mt-2"/>

            <div className="inline-block mr-4">
                <div className="inline-block ml-8 mt-2">
                    <RadioInput
                        id={`mold_material_hard_` + ear}
                        name={`${ear}.mold_material`}
                        checked={data[ear].mold_material === 'hard'}
                        onChange={() => setData((prevData) => ({
                            ...prevData,
                            [ear]: {
                                ...prevData[ear],
                                mold_material: 'hard'
                            },
                        }))}
                        required
                    />

                    <InputLabel
                        htmlFor={`mold_material_hard_` + ear}
                        value="سخت"
                        className="mr-2"
                    />
                </div>
                <div className="inline-block ml-8 mt-2">
                    <RadioInput
                        id={`mold_material_soft_` + ear}
                        name={`${ear}.mold_material`}
                        checked={data[ear].mold_material === 'soft'}
                        onChange={() => setData((prevData) => ({
                            ...prevData,
                            [ear]: {
                                ...prevData[ear],
                                mold_material: 'soft'
                            },
                        }))}
                        required
                    />

                    <InputLabel
                        htmlFor={`mold_material_soft_` + ear}
                        value="نرم"
                        className="mr-2"
                    />
                </div>
            </div>
        </div>
    );
}

export const MoldSize = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`mold_size_` + ear}
                name={`${ear}.mold_size`}
                value={data[ear].mold_size}
                label="اندازه قالب"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        mold_size: e.target.value
                    },
                }))}
                error={errors.mold_size}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="Canal">Canal</option>
                <option value="Half shell">Half shell</option>
                <option value="Full shell">Full shell</option>
                <option value="Skeleton shell">Skeleton shell</option>
            </SelectInput>

            <InputError message={errors[ear]?.mold_size} className="mt-2"/>
        </>
    );
}

export const HasVent = ({ ear }) => {
    const {data, setData} = useContext(AidContext)
    return (
        <>
            <CheckboxInput
                id={`has_vent_` + ear}
                name={`${ear}.has_vent`}
                checked={data[ear].has_vent}
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        has_vent: e.target.checked
                    },
                }))}
            />

            <InputLabel
                htmlFor={`has_vent_` + ear}
                value="دارای ونت"
                className="mr-2"
            />
        </>
    );
}

export const TubeSize = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`tube_size_` + ear}
                name={`${ear}.tube_size`}
                value={data[ear].tube_size}
                label="اندازه اسلیم تیوب"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        tube_size: e.target.value
                    },
                }))}
                error={errors.tube_size}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="0">سایز 0</option>
                <option value="1">سایز 1</option>
                <option value="2">سایز 2</option>
                <option value="3">سایز 3</option>
            </SelectInput>

            <InputError message={errors[ear]?.tube_size} className="mt-2"/>
        </>
    );
}

export const DomeType = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`dome_type_` + ear}
                name={`${ear}.dome_type`}
                value={data[ear].dome_type}
                label="نوع Dome"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        dome_type: e.target.value
                    },
                }))}
                error={errors.dome_type}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="open">open</option>
                <option value="closed">closed</option>
                <option value="vented">vented</option>
                <option value="power">power</option>
            </SelectInput>

            <InputError message={errors[ear]?.dome_type} className="mt-2"/>
        </>
    );
}

export const DomeSize = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`dome_size_` + ear}
                name={`${ear}.dome_size`}
                value={data[ear].dome_size}
                label="اندازه Dome"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        dome_size: e.target.value
                    },
                }))}
                error={errors.dome_size}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="large">بزرگ</option>
                <option value="medium">متوسط</option>
                <option value="small">کوچک</option>
            </SelectInput>

            <InputError message={errors[ear]?.dome_size} className="mt-2"/>
        </>
    );
}

export const ExternalReceiverSize = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`external_receiver_size_` + ear}
                name={`${ear}.external_receiver_size`}
                value={data[ear].external_receiver_size}
                label="اندازه رسیور خارجی"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        external_receiver_size: e.target.value
                    },
                }))}
                error={errors.external_receiver_size}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="0">سایز 0</option>
                <option value="1">سایز 1</option>
                <option value="2">سایز 2</option>
                <option value="3">سایز 3</option>
            </SelectInput>

            <InputError message={errors[ear]?.external_receiver_size} className="mt-2"/>
        </>
    );
}

export const ShellType = ({ ear, hasSlimtip = true }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <SelectInput
                id={`shell_type_` + ear}
                name={`${ear}.shell_type`}
                value={data[ear].shell_type}
                label="نوع پوسته"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        shell_type: e.target.value
                    },
                }))}
                error={errors.shell_type}
                required
            >
                <option value="" disabled="disabled">انتخاب کنید</option>
                <option value="cshell">cshell</option>
                {hasSlimtip && (<option value="Slimtip">Slimtip</option>)}
            </SelectInput>

            <InputError message={errors[ear]?.shell_type} className="mt-2"/>
        </>
    );
}

export const Description = ({ ear }) => {
    const {data, setData, errors} = useContext(AidContext)
    return (
        <>
            <TextAreaInput
                id={`description_` + ear}
                name={`${ear}.description`}
                value={data[ear].description}
                rows="4"
                label="توضیحات"
                onChange={(e) => setData((prevData) => ({
                    ...prevData,
                    [ear]: {
                        ...prevData[ear],
                        description: e.target.value
                    },
                }))}
                error={errors.description}
            />

            <InputError message={errors[ear]?.description} className="mt-2"/>
        </>
    );
}
