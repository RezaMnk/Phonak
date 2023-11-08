import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Player} from "@lottiefiles/react-lottie-player";

export default function OutOfSchedule({ start_time, end_time }) {

    return (
        <AuthenticatedLayout
            header="بازه زمانی غیرمجاز"
        >
            <Head title="بازه زمانی غیرمجاز" />

            <div className="w-full text-center text-gray-700 dark:text-slate-300">
                <Player
                    autoplay
                    loop
                    src="/storage/animations/warning.json"
                    style={{ height: '300px' }}
                >
                </Player>
                <h4 className="font-bold text-lg">
                    بازه زمانی غیرمجاز
                </h4>
                <p className="px-40 mt-5 mb-12">
                    شما در این بازه زمانی مجاز به سفارش گذاری نمی باشید.
                </p>
                {(start_time & end_time) === 1 && (
                    <div className="text-sm font-semibold">
                        <p className="px-40 mt-8">
                            شروع سفارش گذاری: {start_time}
                        </p>
                        <p className="px-40 mt-4 mb-12">
                            پایان سفارش گذاری: {end_time}
                        </p>
                    </div>
                )}

                <div className="flex justify-center">
                    <PrimaryButton
                        className="w-3/12 ml-5 !px-4 !py-2"
                        link={true}
                        href={route('records.index')}
                    >
                        بازگشت به صفحه سفارشات
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
