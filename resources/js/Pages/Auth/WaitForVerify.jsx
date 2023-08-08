import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from '@inertiajs/react';
import {Player} from "@lottiefiles/react-lottie-player";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Address({ user }) {

    return (
        <GuestLayout className="!max-w-3xl">
            <Head title="در انتظار تایید"/>

            <div className="w-full text-center">
                <Player
                    autoplay
                    loop
                    src={user.status === 'waiting' ? "/storage/animations/verifying.json" : "/storage/animations/error.json"}
                    style={{ height: '300px' }}
                >
                </Player>
                <h4 className="font-bold text-lg">
                    {user.status === 'waiting' ?  'در حال بررسی اطلاعات' : 'اطلاعات شما تایید نشدند!'}
                </h4>
                <p className="px-40 mt-5 mb-12">
                    {user.status === 'waiting'
                        ? 'اطلاعات شما در حال بررسی می باشد، ظرف یکروز کاری اینده اطلاعات شما بررسی میگردد.'
                        : user.disapprove ? 'پیام مدیرییت: ' + user.disapprove : 'اطلاعات شما مورد تایید واقع نشدند. لطفا مجددا اطلاعات خود را بررسی بفرمایید.'
                    }
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
