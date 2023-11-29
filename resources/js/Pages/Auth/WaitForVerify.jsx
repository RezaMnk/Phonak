import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from '@inertiajs/react';
import {Player} from "@lottiefiles/react-lottie-player";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Address({ user }) {

    return (
        <GuestLayout className="!max-w-3xl">
            <Head title="در انتظار تایید"/>

            <div className="w-full text-center text-gray-700 dark:text-slate-200">
                <Player
                    autoplay
                    loop
                    src={user.status === 'waiting' ? "/storage/animations/verifying.json" : "/storage/animations/error.json"}
                    style={{ height: '300px' }}
                >
                </Player>
                <h4 className="font-bold text-lg">
                    {user.status === 'waiting' ?  'در حال بررسی اطلاعات' : 'اطلاعات شما تایید نشد!'}
                </h4>
                <p className="px-12 md:px-40 mt-5 mb-12">
                    {user.status === 'waiting'
                        ? 'اطلاعات شما در حال بررسی می باشد، ظرف 48 ساعت کاری اینده اطلاعات شما بررسی میگردد و پس از تایید، به گروه واتساپی خانواده آشنا خواهید پیوست.'
                        : user.disapprove ? 'پیام مدیرییت: ' + user.disapprove : 'اطلاعات شما مورد تایید واقع نشدند. لطفا مجددا اطلاعات خود را بررسی بفرمایید.'
                    }
                </p>
                <hr className="my-2 border-gray-300 border-slate-600" />
                <div className="flex flex-col xl:flex-row gap-5">
                    <PrimaryButton
                        className="w-full xl:w-9/12 !px-4 !py-2"
                        link={true}
                        href={route('profile.edit')}
                    >
                        ویرایش اطلاعات ثبت شده
                    </PrimaryButton>
                    <DangerButton
                        className="w-full xl:w-3/12 !px-4 !py-2"
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
