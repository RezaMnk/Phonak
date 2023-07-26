import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from '@inertiajs/react';
import {Player} from "@lottiefiles/react-lottie-player";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Address({ user }) {

    console.log(user)
    return (
        <GuestLayout className="!max-w-3xl">
            <Head title="آدرس ها"/>

            <div className="w-full text-center">
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/55b18cbe-9958-408a-a481-96ba04bd8b8a/naBtU2nNYR.json"
                    style={{ height: '300px', width: '300px' }}
                >
                </Player>
                <h4 className="font-bold text-lg">
                    در حال بررسی اطلاعات
                </h4>
                <p className="px-40 mt-5 mb-12">
                    اطلاعات شما از سمت مدیریت در حال بررسی می باشد، ‌لطفا تا تایید شدن اطلاعات منتظر بمانید.
                </p>
                <hr className="my-2 border-gray-300" />
                <div className="flex">
                    <PrimaryButton
                        className="w-9/12 ml-5 !px-4 !py-2"
                        link={true}
                        href={route('profile.edit')}
                    >
                        ویرایش اطلاعات ثبت شده
                    </PrimaryButton>
                    <DangerButton
                        className="w-3/12 !px-4 !py-2"
                        link={true}
                        method="POST"
                        href={route('logout')}
                        as="button"
                    >
                        خروج از حساب
                    </DangerButton>
                </div>
            </div>
        </GuestLayout>
    );
}
