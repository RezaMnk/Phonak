import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";


export default function CreateOrEdit({ setting }) {
    const {data, setData, patch, post, processing, errors} = useForm({
        group: setting?.group || '',
        max_record_order: setting?.max_record_order || '',
        max_accessory_order: setting?.max_accessory_order || '',
        start_time: setting?.start_time_formatted || '',
        end_time: setting?.end_time_formatted || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (setting)
            patch(route('settings.update', setting.id));
        else
            post(route('settings.store'));
    };

    return (
        <AuthenticatedLayout
            header={setting ? (
                <>
                    ویرایش تنظیم گروه بندی برای گروه {setting.group}
                </>
            ) : (
                <>
                    تنظیم جدید
                </>
            )}
            breadcrumbs={
                {
                    'تنظیمات': route('settings.index'),
                    [setting ? 'ویرایش تنظیم گروه بندی' : 'تنظیم جدید']: "#"
                }
            }
        >
            <Head title={setting ? 'ویرایش تنظیم گروه بندی' : 'تنظیم جدید'} />

            <div className="flex flex-col sm:justify-center items-center">
                <div className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-white dark:border-slate-600 sm:rounded-lg">
                    <form className="w-full" onSubmit={submit}>
                        <div className="mt-5 text-gray-700 dark:text-slate-200">
                            <h5>
                                اطلاعات تنظیم
                            </h5>
                            <hr className="dark:border-slate-600"/>
                        </div>
                        <div className="flex flex-col space-y-5 mt-6 mb-5">
                            <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 xl:space-x-reverse">
                                <div className="w-full xl:w-1/5">
                                    <TextInput
                                        id="group"
                                        name="group"
                                        type="number"
                                        value={data.group}
                                        label="شماره گروه"
                                        svgIcon={
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        }
                                        onChange={(e) => setData('group', e.target.value)}
                                        error={errors.group}
                                    />

                                    <InputError message={errors.group} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-2/5">
                                    <TextInput
                                        id="start_time"
                                        name="start_time"
                                        type="datetime-local"
                                        value={data.start_time}
                                        label="شروع تاریخ سفارش گذاری"
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        error={errors.start_time}
                                    />

                                    <InputError message={errors.start_time} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-2/5">
                                    <TextInput
                                        id="end_time"
                                        name="end_time"
                                        type="datetime-local"
                                        value={data.end_time}
                                        label="پایان تاریخ سفارش گذاری"
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        error={errors.end_time}
                                    />

                                    <InputError message={errors.end_time} className="mt-2"/>
                                </div>
                            </div>
                            <div className="w-full flex flex-col xl:flex-row space-y-5 xl:space-y-0 xl:space-x-5 xl:space-x-reverse">
                                <div className="w-full xl:w-1/4">
                                    <TextInput
                                        id="max_record_order"
                                        name="max_record_order"
                                        type="number"
                                        value={data.max_record_order}
                                        label="حداکثر سفارش سمعک"
                                        svgIcon={
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        }
                                        onChange={(e) => setData('max_record_order', e.target.value)}
                                        error={errors.max_record_order}
                                    />

                                    <InputError message={errors.max_record_order} className="mt-2"/>
                                </div>
                                <div className="w-full xl:w-1/4">
                                    <TextInput
                                        id="max_accessory_order"
                                        name="max_accessory_order"
                                        type="number"
                                        value={data.max_accessory_order}
                                        label="حداکثر سفارش لوازم جانبی"
                                        svgIcon={
                                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        }
                                        onChange={(e) => setData('max_accessory_order', e.target.value)}
                                        error={errors.max_accessory_order}
                                    />

                                    <InputError message={errors.max_accessory_order} className="mt-2"/>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 mb-5">

                        </p>

                        <div className="flex justify-between mt-8">
                            <DangerButton
                                className="!px-4 !py-2"
                                link={true}
                                href={route('settings.index')}
                            >
                                لغو
                            </DangerButton>
                            <PrimaryButton
                                className="!px-4 !py-2"
                                disabled={processing}
                            >
                                {setting ? 'ثبت تغییرات' : 'ذخیره تنظیم'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
