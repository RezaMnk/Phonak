import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Player} from "@lottiefiles/react-lottie-player";

export default function OffLimits({ limit }) {

    return (
        <AuthenticatedLayout
            header="تکمیل ظرفیت"
        >
            <Head title="تکمیل ظرفیت" />

            <div className="w-full text-center text-gray-700 dark:text-slate-300">
                <Player
                    autoplay
                    loop
                    src="/storage/animations/warning.json"
                    style={{ height: '300px' }}
                >
                </Player>
                <h4 className="font-bold text-lg">
                    اتمام ظرفیت سفارش گذاری
                </h4>
                <p className="px-40 mt-5 mb-12">
                    ظرفیت سفارش گذاری شما به اتمام رسیده است. لطفا جهت سفارش گذاری، از دوره بعدی اقدام نمایید.
                </p>
                <p className="px-40 mt-5 mb-12 font-semibold">
                    تعداد سفارشات شما:
                    <span className="mr-2">
                        {limit}
                    </span>
                </p>
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
